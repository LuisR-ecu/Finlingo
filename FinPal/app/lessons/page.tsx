"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navigation"
import { UserProvider, useUser } from "@/lib/user-context"
import { LessonCard } from "@/components/lessons/lesson-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Brain, Filter } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"

function LessonsContent() {
  const { user, lessons } = useUser()
  const { t } = useLanguage()
  const [filter, setFilter] = useState<"all" | "flashcard" | "quiz">("all")

  if (!user) {
    return null
  }

  const filteredLessons = lessons.filter((lesson) => {
    if (filter === "all") return true
    return lesson.type === filter
  })

  const flashcardCount = lessons.filter((l) => l.type === "flashcard").length
  const quizCount = lessons.filter((l) => l.type === "quiz").length

  const handleDeleteLesson = (id: string) => {
    if (confirm(t("deleteLessonConfirm"))) {
      const updatedLessons = lessons.filter((l) => l.id !== id)
      localStorage.setItem("lessons", JSON.stringify(updatedLessons))
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("myLessons")}</h1>
          <p className="text-xl text-muted-foreground">{t("reviewAndPractice")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-gradient-to-br from-card to-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg text-muted-foreground mb-1">{t("totalLessons")}</p>
                  <p className="text-5xl font-bold text-primary">{lessons.length}</p>
                </div>
                <BookOpen className="h-12 w-12 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg text-muted-foreground mb-1">{t("flashcards")}</p>
                  <p className="text-5xl font-bold text-accent">{flashcardCount}</p>
                </div>
                <BookOpen className="h-12 w-12 text-accent opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-success/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg text-muted-foreground mb-1">{t("quizzes")}</p>
                  <p className="text-5xl font-bold text-success">{quizCount}</p>
                </div>
                <Brain className="h-12 w-12 text-success opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-semibold">{t("filter")}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="lg"
              onClick={() => setFilter("all")}
              className="text-lg bg-transparent"
            >
              {t("all")} ({lessons.length})
            </Button>
            <Button
              variant={filter === "flashcard" ? "default" : "outline"}
              size="lg"
              onClick={() => setFilter("flashcard")}
              className="text-lg bg-transparent"
            >
              {t("flashcards")} ({flashcardCount})
            </Button>
            <Button
              variant={filter === "quiz" ? "default" : "outline"}
              size="lg"
              onClick={() => setFilter("quiz")}
              className="text-lg bg-transparent"
            >
              {t("quizzes")} ({quizCount})
            </Button>
          </div>
        </div>

        {filteredLessons.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="text-8xl mb-6">📚</div>
              <h2 className="text-3xl font-bold mb-4">{t("noLessonsYet")}</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {filter === "all"
                  ? t("startChatting")
                  : filter === "flashcard" 
                    ? t("noFlashcardsYet")
                    : t("noQuizzesYet")}
              </p>
              <Button asChild size="lg" className="text-xl h-16 px-12">
                <Link href="/chat">{t("startLearning")}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onDelete={handleDeleteLesson} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function LessonsPage() {
  return (
    <UserProvider>
      <LessonsContent />
    </UserProvider>
  )
}
