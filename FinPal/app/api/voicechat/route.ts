import { openai } from "@ai-sdk/openai"

export async function GET() {
  try {
    // Request ephemeral key from OpenAI Realtime endpoint
    const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPEN_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: {
          type: "realtime",
          model: "gpt-realtime", // or "gpt-4o-realtime-preview"
        },
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error("Failed to fetch ephemeral key:", text)
      return new Response(JSON.stringify({ error: "Failed to fetch ephemeral key" }), { status: 500, headers: { "Content-Type": "application/json" } })
    }

    const data = await response.json()
    // data.value contains the ephemeral key string
    return new Response(JSON.stringify({ value: data.value }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Error generating ephemeral key:", err)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}