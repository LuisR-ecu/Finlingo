"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, Calendar, Trash2 } from "lucide-react"
import type { Lesson } from "@/types/user"
import Link from "next/link"

interface LessonCardProps {
  lesson: Lesson
  onDelete?: (id: string) => void
}

export function LessonCard({ lesson, onDelete }: LessonCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {lesson.type === "flashcard" ? (
                <BookOpen className="h-5 w-5 text-primary" />
              ) : (
                <Brain className="h-5 w-5 text-accent" />
              )}
              <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {lesson.type === "flashcard" ? "Flashcard" : "Quiz"}
              </span>
            </div>
            <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
            <CardDescription className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(lesson.createdAt)}
            </CardDescription>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(lesson.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-muted-foreground mb-4 line-clamp-2">{lesson.content}</p>
        <Button asChild size="lg" className="w-full text-lg h-12">
          <Link href={`/lessons/${lesson.id}`}>{lesson.type === "flashcard" ? "Review Flashcard" : "Take Quiz"}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
