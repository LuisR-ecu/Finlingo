import { openai } from "@ai-sdk/openai"
import { streamText, tool, convertToModelMessages, stepCountIs } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { messages, userProfile } = body

    console.log("API /api/chat received:", { 
      hasMessages: !!messages, 
      hasUserProfile: !!userProfile,
      userProfile 
    })

    // Handle missing userProfile
    if (!userProfile) {
      console.error("Missing userProfile in request")
      return new Response(
        JSON.stringify({ 
          error: "User profile is required. Please complete onboarding first.",
          receivedBody: Object.keys(body)
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

  // Get advisor personality with default fallback
  const advisorPersona = {
    Bobby: "You are Bobby, a warm and encouraging financial advisor with a nurturing personality. You use gentle language and often share personal anecdotes to make concepts relatable.",
    Jess: "You are Jess, a professional and knowledgeable financial expert who is straightforward but kind. You focus on practical, actionable advice.",
    Greg: "You are Greg, a friendly and patient teacher who loves using simple analogies and real-world examples. You have a calm, reassuring presence.",
  }[userProfile?.advisor || "Bobby"]

  // Language instruction mapping with default fallback
  const languageInstruction = {
    Japanese: "CRITICAL: You MUST respond ONLY in Japanese (日本語). Never use English except for proper nouns.",
    Mandarin: "CRITICAL: You MUST respond ONLY in Simplified Chinese/Mandarin (简体中文). Never use English except for proper nouns.",
    Cantonese: "CRITICAL: You MUST respond ONLY in Traditional Chinese/Cantonese (繁體中文/粵語). Never use English except for proper nouns.",
    English: "Respond in simple, clear English suitable for elderly learners.",
  }[userProfile?.language || "English"]

  // Build system prompt with user's cultural context
  const systemPrompt = `${advisorPersona}

User Profile:
- Name: ${userProfile.name}
- Age: ${userProfile.age}
- Country: ${userProfile.country}
- Language: ${userProfile.language}

${languageInstruction}

Important Guidelines:
1. Use simple, clear language appropriate for elderly learners aged ${userProfile.age}
2. Provide culturally relevant examples specific to ${userProfile.country}
3. Focus on fraud prevention and scam awareness, which is critical for elderly users in Asia
4. Break down complex financial concepts into easy-to-understand explanations
5. Be encouraging and patient - many elderly users may feel embarrassed about financial questions
6. When discussing regulations or laws, always specify they are for ${userProfile.country}
7. Use the web search tool to find current, accurate financial information specific to their region
8. When you use the searchWeb tool, ALWAYS synthesize and explain the search results in your response
9. After receiving search results, provide a clear, elderly-friendly explanation based on that information
10. Adapt your tone to match ${userProfile.advisor}'s personality

Topics to prioritize:
- Fraud and scam prevention (phone scams, email phishing, fake investment schemes)
- Basic banking (savings accounts, checking accounts, ATM safety)
- Retirement planning and pension systems in ${userProfile.country}
- Healthcare and insurance
- Safe online banking practices
- Understanding interest rates and fees

Always verify information is current and region-specific before providing advice.`

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(5), // Allow multiple steps for tool use + response
    tools: {
      searchWeb: tool({
        description: `Search the web for current financial information, regulations, and resources specific to ${userProfile.country}. Use this to find:
- Government financial literacy resources
- Banking regulations and consumer protection laws
- Common scams targeting elderly people
- Retirement and pension information
- Healthcare and insurance options
- Current interest rates and financial products`,
        inputSchema: z.object({
          query: z.string().describe("The search query to find financial information"),
        }),
        execute: async ({ query }) => {
          try {
            // Use Perplexity API for web search
            const perplexityApiKey = process.env.PERPLEXITY_API_KEY
            
            if (!perplexityApiKey) {
              console.log("No Perplexity API key found, using placeholder data")
              return {
                answer: `I searched for "${query}" but web search is not fully configured yet. Here's what I can tell you based on my knowledge: This information is specific to ${userProfile.country}. For the most accurate and up-to-date information, please consult official government financial websites.`,
                sources: []
              }
            }

            console.log('Calling Perplexity API for query:', query)

            const response = await fetch('https://api.perplexity.ai/chat/completions', {
              method: 'POST',
              headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'authorization': `Bearer ${perplexityApiKey}`,
              },
              body: JSON.stringify({
                model: 'sonar',
                messages: [
                  {
                    role: 'user',
                    content: `Find current, accurate information about: ${query}. Focus on information specific to ${userProfile.country} and relevant for elderly users.`
                  }
                ],
                temperature: 0.2,
                max_tokens: 800,
                return_citations: true, // Get citations from Perplexity
              }),
            })

            if (!response.ok) {
              const errorText = await response.text()
              console.error('Perplexity API error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
              })
              throw new Error(`Perplexity API error: ${response.status} - ${errorText}`)
            }

            const data = await response.json()
            const answer = data.choices?.[0]?.message?.content || 'No results found'
            const citations = data.citations || []

            console.log('Perplexity search successful:', {
              query,
              hasAnswer: !!answer,
              citationCount: citations.length
            })

            return {
              answer,
              sources: citations.slice(0, 5).map((url: string) => ({ url })),
              query
            }
          } catch (error) {
            console.error('Search error:', error)
            return {
              answer: `I attempted to search for "${query}" but encountered an issue. Based on my knowledge about ${userProfile.country}, I can still provide general guidance. For the most current information, please consult official sources.`,
              sources: [],
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          }
        },
      }),
      generateLesson: tool({
        description:
          "Generate a structured lesson (flashcard or quiz) based on the current conversation topic. Use this when the user wants to save what they learned or practice with a quiz.",
        inputSchema: z.object({
          topic: z.string().describe("The financial topic to create a lesson about"),
          type: z.enum(["flashcard", "quiz"]).describe("Type of lesson to generate"),
          content: z.string().describe("The main content or explanation for the flashcard"),
          questions: z
            .array(
              z.object({
                question: z.string(),
                options: z.array(z.string()),
                correctAnswer: z.number(),
                explanation: z.string(),
              }),
            )
            .optional()
            .describe("Quiz questions if type is quiz"),
        }),
        execute: async ({ topic, type, content, questions }) => {
          return {
            success: true,
            lesson: {
              topic,
              type,
              content,
              questions,
            },
          }
        },
      }),
    },
  })

  return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Error in /api/chat:", error)
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
