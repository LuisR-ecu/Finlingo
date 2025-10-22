"use client"

import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/layout/navigation"
import { UserProvider, useUser } from "@/lib/user-context"
import { Flashcard } from "@/components/lessons/flashcard"
import { Quiz } from "@/components/lessons/quiz"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

function LessonDetailContent() {
  const params = useParams()
  const router = useRouter()
  const { lessons } = useUser()

  const lesson = lessons.find((l) => l.id === params.id)

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Lesson Not Found</h1>
            <p className="text-xl text-muted-foreground mb-8">This lesson doesn't exist or has been deleted.</p>
            <Button asChild size="lg" className="text-xl h-16 px-12">
              <Link href="/lessons">Back to Lessons</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" size="lg" className="mb-6 text-lg bg-transparent">
          <Link href="/lessons">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Lessons
          </Link>
        </Button>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-xl text-muted-foreground capitalize">{lesson.type} Lesson</p>
        </div>

        {lesson.type === "flashcard" ? (
          <Flashcard title={lesson.title} content={lesson.content} />
        ) : (
          <Quiz title={lesson.title} questions={lesson.questions || []} />
        )}
      </main>
    </div>
  )
}

export default function LessonDetailPage() {
  return (
    <UserProvider>
      <LessonDetailContent />
    </UserProvider>
  )
}
