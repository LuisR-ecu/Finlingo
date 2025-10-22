"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserProvider, useUser } from "@/lib/user-context"

function HomeContent() {
  const router = useRouter()
  const { isOnboarded } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading && isOnboarded) {
      router.push("/chat")
    }
  }, [isOnboarded, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // ✅ Always show both buttons
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="text-center max-w-2xl">
        <h1>Welcome to FinPal</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your free, personal financial advisor.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/onboarding")}
            size="lg"
            className="h-16 px-12 text-2xl font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            Create Account
          </Button>

          <Button
            onClick={() => router.push("/signin")}
            size="lg"
            className="h-16 px-12 text-2xl font-semibold bg-muted hover:bg-muted/90 text-foreground"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  )
}
