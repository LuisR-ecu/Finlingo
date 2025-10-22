"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react"
import type { QuizQuestion } from "@/types/user"

interface QuizProps {
  title: string
  questions: QuizQuestion[]
}

export function Quiz({ title, questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setCompleted(false)
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="w-full max-w-3xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="text-8xl mb-6">{percentage >= 70 ? "🎉" : "📚"}</div>
            <CardTitle className="text-4xl mb-4">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-8">
            <div className="space-y-4">
              <p className="text-6xl font-bold text-primary">
                {score} / {questions.length}
              </p>
              <p className="text-2xl text-muted-foreground">
                You scored {percentage}%{percentage >= 70 ? " - Great job!" : " - Keep practicing!"}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 pt-6">
              <div className="p-6 bg-success/10 rounded-lg">
                <p className="text-5xl font-bold text-success mb-2">{score}</p>
                <p className="text-lg text-muted-foreground">Correct Answers</p>
              </div>
              <div className="p-6 bg-destructive/10 rounded-lg">
                <p className="text-5xl font-bold text-destructive mb-2">{questions.length - score}</p>
                <p className="text-lg text-muted-foreground">Incorrect Answers</p>
              </div>
            </div>

            <Button onClick={handleRestart} size="lg" className="text-xl h-16 px-12">
              <RotateCcw className="mr-2 h-6 w-6" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-xl font-semibold text-primary">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <h3 className="text-3xl font-bold leading-tight">{question.question}</h3>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectAnswer = index === question.correctAnswer
              const showCorrect = showExplanation && isCorrectAnswer
              const showIncorrect = showExplanation && isSelected && !isCorrect

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  variant={showCorrect ? "default" : showIncorrect ? "destructive" : "outline"}
                  className={`w-full h-auto py-6 px-8 text-xl text-left justify-start items-center gap-4 ${
                    showCorrect ? "bg-success hover:bg-success" : ""
                  } ${!showExplanation ? "bg-card hover:bg-accent" : ""}`}
                  size="lg"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showCorrect && <CheckCircle2 className="h-7 w-7 flex-shrink-0" />}
                  {showIncorrect && <XCircle className="h-7 w-7 flex-shrink-0" />}
                </Button>
              )
            })}
          </div>

          {showExplanation && (
            <Card
              className={`${isCorrect ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {isCorrect ? (
                    <CheckCircle2 className="h-8 w-8 text-success flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-8 w-8 text-destructive flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <p className="text-xl font-semibold mb-3">{isCorrect ? "Correct!" : "Not quite right"}</p>
                    <p className="text-lg leading-relaxed">{question.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {showExplanation && (
            <Button onClick={handleNext} size="lg" className="w-full text-xl h-16">
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
