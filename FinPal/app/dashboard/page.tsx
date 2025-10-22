"use client"

import { Navigation } from "@/components/layout/navigation"
import { UserProvider, useUser } from "@/lib/user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, BookOpen, Shield, TrendingUp } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"

function DashboardContent() {
  const { user, lessons } = useUser()
  const { t } = useLanguage()

  if (!user) {
    return null
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return t("goodMorning")
    if (hour < 18) return t("goodAfternoon")
    return t("goodEvening")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {getGreeting()}, {user.name}!
          </h1>
          <p className="text-xl text-muted-foreground">{t("readyToLearn")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/chat">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t("startLearning")}</CardTitle>
                    <CardDescription className="text-lg">{t("chatWithAdvisor")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  {t("askQuestions")}
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/lessons">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <BookOpen className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{t("myLessons")}</CardTitle>
                    <CardDescription className="text-lg">{t("reviewMaterials")}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground">
                  You have {lessons.length} saved {lessons.length === 1 ? t("lessonCount") : t("lessonsCount")}
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
        
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  )
}
