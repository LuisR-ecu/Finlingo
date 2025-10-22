"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { UserProfile, Lesson, ChatMessage } from "@/types/user"

interface UserContextType {
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void
  lessons: Lesson[]
  addLesson: (lesson: Lesson) => void
  chatHistory: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  clearChat: () => void
  isOnboarded: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isOnboarded, setIsOnboarded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile")
    const savedLessons = localStorage.getItem("lessons")
    const savedChat = localStorage.getItem("chatHistory")

    if (savedUser) {
      setUserState(JSON.parse(savedUser))
      setIsOnboarded(true)
    }
    if (savedLessons) {
      setLessons(JSON.parse(savedLessons))
    }
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat))
    }
  }, [])

  const setUser = (newUser: UserProfile | null) => {
    setUserState(newUser)
    if (newUser) {
      localStorage.setItem("userProfile", JSON.stringify(newUser))
      setIsOnboarded(true)
    } else {
      localStorage.removeItem("userProfile")
      setIsOnboarded(false)
    }
  }

  const addLesson = (lesson: Lesson) => {
    const updatedLessons = [...lessons, lesson]
    setLessons(updatedLessons)
    localStorage.setItem("lessons", JSON.stringify(updatedLessons))
  }

  const addMessage = (message: ChatMessage) => {
    const updatedChat = [...chatHistory, message]
    setChatHistory(updatedChat)
    localStorage.setItem("chatHistory", JSON.stringify(updatedChat))
  }

  const clearChat = () => {
    setChatHistory([])
    localStorage.removeItem("chatHistory")
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        lessons,
        addLesson,
        chatHistory,
        addMessage,
        clearChat,
        isOnboarded,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
