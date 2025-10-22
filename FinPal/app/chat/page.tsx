"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useChat, type UIMessage } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Navigation } from "@/components/layout/navigation"
import { UserProvider, useUser } from "@/lib/user-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2, BookOpen, Sparkles, Mic } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime'
import type { Lesson } from "@/types/user"

function ChatContent() {
  const { user, addLesson, addMessage, chatHistory } = useUser()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [input, setInput] = useState("")
  const [isUserReady, setIsUserReady] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const userRef = useRef(user)
  const shouldAutoScrollRef = useRef(true)

  // Voice chat state
  const [voiceChatActive, setVoiceChatActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [agentSession, setAgentSession] = useState<RealtimeSession | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    userRef.current = user
    if (user) setIsUserReady(true)
  }, [user])

  // Setup AI SDK chat
  const initialMessages: UIMessage[] = user ? chatHistory.map(msg => ({
    id: msg.id,
    role: msg.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: msg.content }],
  })) : []

  const { messages, status, sendMessage } = useChat({
    messages: initialMessages.length > 0 ? initialMessages : undefined,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      prepareSendMessagesRequest: ({ messages, id }) => {
        const currentUser = userRef.current
        if (!currentUser) throw new Error("Please complete onboarding first")
        return { body: { messages, id, userProfile: currentUser } }
      },
    }),
    onFinish: ({ messages: allMessages }) => {
      const existingIds = new Set(chatHistory.map(m => m.id))
      allMessages.forEach(msg => {
        if (!existingIds.has(msg.id)) {
          const textContent = msg.parts.filter(p => p.type === "text").map(p => p.text).join("")
          addMessage({ id: msg.id, role: msg.role as "user" | "assistant", content: textContent, timestamp: new Date() })
        }
      })
    },
  })

  // Scroll handling
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      shouldAutoScrollRef.current = scrollHeight - scrollTop - clientHeight < 100
    }
    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (shouldAutoScrollRef.current) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "submitted" || status === "streaming") return
    if (!isUserReady || !userRef.current) return toast({ title: t("pleaseWait"), description: t("loadingProfile"), variant: "destructive" })
    const userMessage = input.trim()
    setInput("")
    shouldAutoScrollRef.current = true
    sendMessage({ text: userMessage })
  }

  // Voice chat functions
  const startVoiceChat = async () => {
    if (!isUserReady) return
    setVoiceChatActive(true)

    const agent = new RealtimeAgent({
      name: user.advisor,
      instructions: 'You are a helpful assistant.',
    })
    const session = new RealtimeSession(agent)

    try {
      // Fetch ephemeral key from server
      const { value: ephemeralKey } = await fetch('/api/voicechat').then(res => res.json())
      await session.connect({ apiKey: ephemeralKey })
      setAgentSession(session)
      toast({ title: "Voice Chat Started", description: "You can speak now!" })

      // Play audio from agent
      session.on('audio', (audioBuffer: AudioBuffer) => {
        const ctx = new AudioContext()
        const source = ctx.createBufferSource()
        source.buffer = audioBuffer
        source.connect(ctx.destination)
        source.start()
      })

      session.on('response', (message: any) => console.log("Assistant says:", message.output_text))

    } catch (err) {
      console.error(err)
      toast({ title: "Error", description: "Failed to start voice chat.", variant: "destructive" })
      setVoiceChatActive(false)
    }
  }

  const startVoiceRecording = async () => {
    if (!agentSession) return
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaStreamRef.current = stream
    const recorder = new MediaRecorder(stream)
    audioChunksRef.current = []

    recorder.ondataavailable = (event) => audioChunksRef.current.push(event.data)
    recorder.start()
    mediaRecorderRef.current = recorder
    setIsRecording(true)
  }

  const stopAndSubmitVoice = async () => {
    if (!mediaRecorderRef.current || !agentSession) return
    mediaRecorderRef.current.stop()
    setIsRecording(false)

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
      const arrayBuffer = await audioBlob.arrayBuffer()
      try {
        await agentSession.sendAudio(arrayBuffer)
      } catch (err) {
        console.error("Failed to send audio to agent:", err)
        toast({ title: "Error", description: "Failed to send voice message.", variant: "destructive" })
      }

      mediaStreamRef.current?.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
      mediaRecorderRef.current = null
      audioChunksRef.current = []
    }
  }

  if (!user) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t("completeOnboarding")}</h2>
          <p className="text-lg text-muted-foreground mb-6">{t("needOnboarding")}</p>
          <Button asChild size="lg"><a href="/onboarding">{t("goToOnboarding")}</a></Button>
        </CardContent>
      </Card>
    </div>
  )

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t("goodMorning")
    if (hour < 18) return t("goodAfternoon")
    return t("goodEvening")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

     <div className="mb-4 pl-12 pt-6 pr-6 pb-2 flex items-center gap-4">
        <h1 className="text-4xl font-bold">{getGreeting()}, {user.name}!</h1>

        {!voiceChatActive && (
          <Button size="lg" className="flex items-center gap-2" onClick={startVoiceChat} disabled={!isUserReady}>
            <Mic className="h-5 w-5" />
            Start Voice Chat
          </Button>
        )}

        {voiceChatActive && !isRecording && (
          <Button size="lg" className="flex items-center gap-2" onClick={startVoiceRecording}>
            <Mic className="h-5 w-5" />
            Speak
          </Button>
        )}

        {voiceChatActive && isRecording && (
          <Button size="lg" className="flex items-center gap-2 bg-red-600 hover:bg-red-700" onClick={stopAndSubmitVoice}>
            <Mic className="h-5 w-5" />
            Stop & Submit
          </Button>
        )}
      </div>


      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-5xl">
        <Card className="flex-1 flex flex-col mb-6 shadow-lg">
          <CardContent className="flex-1 flex flex-col p-6">
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto mb-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="bg-primary/10 p-6 rounded-full mb-6">
                    <Sparkles className="h-16 w-16 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{t("welcomeToChat")}</h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                    {t("chatDescription")}
                  </p>
                  <div className="grid gap-3 md:grid-cols-2 w-full max-w-2xl">
                    {[t("question1"), t("question2"), t("question3")].map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        className="text-lg h-auto py-3 px-4 text-left justify-start bg-card hover:bg-accent break-words whitespace-normal"
                        onClick={() => setInput(question)}
                        disabled={!isUserReady}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                  {!isUserReady && (
                    <p className="text-sm text-muted-foreground mt-4">
                      <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                      {t("loadingProfile")}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-2xl px-6 py-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                        {message.parts.map((part, idx) => part.type === "text" && (
                          <p key={idx} className="text-lg leading-relaxed whitespace-pre-wrap mb-2">{part.text}</p>
                        ))}
                        {/* Show citations if present */}
                        {message.role === "assistant" && message.parts.some(p => p.type === "tool-searchWeb" && p.state === "output-available" && (p.output as any)?.sources) && (
                          <div className="mt-4 pt-4 border-t border-border/30">
                            <div className="flex items-center gap-2 mb-3">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm font-semibold text-foreground">Sources & Citations</p>
                            </div>
                            <div className="space-y-2">
                              {message.parts
                                .filter((p): p is Extract<typeof p, { type: "tool-searchWeb"; state: "output-available" }> => 
                                  p.type === "tool-searchWeb" && p.state === "output-available" && !!(p as any).output?.sources
                                )
                                .flatMap(p => (p as any).output.sources || [])
                                .slice(0, 5)
                                .map((source: any, idx: number) => (
                                  <a
                                    key={idx}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-2 p-2 rounded hover:bg-background/50 transition-colors group"
                                  >
                                    <span className="text-xs font-mono text-muted-foreground mt-0.5 flex-shrink-0">[{idx + 1}]</span>
                                    <span className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline break-all">
                                      {source.url}
                                    </span>
                                  </a>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Show loading indicator when AI is thinking */}
                  {(status === "submitted" || status === "streaming") && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl px-6 py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground mt-2">{t("thinking")}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isUserReady ? t("typeMessage") : t("loadingProfile")}
                className="flex-1 text-lg min-h-[80px] resize-none"
                disabled={!isUserReady}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <Button 
                type="submit" 
                size="lg" 
                disabled={!isUserReady || status === "submitted" || status === "streaming" || !input.trim()} 
                className="h-[80px] px-8"
              >
                {!isUserReady ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : status === "submitted" || status === "streaming" ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Send className="h-6 w-6" />
                )}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-3 text-center">
              {t("pressEnterToSend")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <p className="text-base text-center">
              <strong>{t("tipCreateLesson")}</strong>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default function ChatPage() {
  return (
    <UserProvider>
      <ChatContent />
    </UserProvider>
  )
}
