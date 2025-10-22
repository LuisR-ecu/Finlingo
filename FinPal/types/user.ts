export interface UserProfile {
  name: string
  email: string
  age: number
  country: "China" | "Japan" | "Hong Kong" | "Taiwan" | "Australia"
  language: "English" | "Japanese" | "Chinese Simplified" | "Chinese Traditional"
  advisor?: "Bobby" | "Jess" | "Greg"
}

export interface Lesson {
  id: string
  title: string
  content: string
  type: "flashcard" | "quiz"
  createdAt: Date
  topic: string
  questions?: QuizQuestion[]
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}
