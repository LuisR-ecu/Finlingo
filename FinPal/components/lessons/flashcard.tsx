"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface FlashcardProps {
  title: string
  content: string
}

export function Flashcard({ title, content }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card
        className="cursor-pointer transition-all hover:shadow-xl min-h-[400px] flex flex-col"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardContent className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          {!isFlipped ? (
            <div className="space-y-6">
              <div className="text-6xl mb-6">📚</div>
              <h3 className="text-3xl font-bold text-primary">{title}</h3>
              <p className="text-xl text-muted-foreground">Click to reveal the answer</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-6xl mb-6">💡</div>
              <p className="text-2xl leading-relaxed">{content}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-lg h-14 px-8 bg-transparent"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          {isFlipped ? "Show Question" : "Show Answer"}
        </Button>
      </div>
    </div>
  )
}
