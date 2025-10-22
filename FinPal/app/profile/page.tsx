"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navigation"
import { UserProvider, useUser } from "@/lib/user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { User, Mail, Calendar, Globe, Languages, LogOut } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import type { UserProfile } from "@/types/user"

function ProfileContent() {
  const router = useRouter()
  const { user, setUser, lessons, clearChat } = useUser()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserProfile | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize formData when user is loaded
  if (user && !formData) {
    setFormData(user)
  }

  if (!user || !formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("completeOnboarding")}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t("needOnboarding")}
            </p>
            <Button asChild size="lg">
              <a href="/onboarding">{t("goToOnboarding")}</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.age || formData.age < 18 || formData.age > 120) {
      newErrors.age = "Age must be between 18 and 120"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      setUser(formData)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData(user)
    setErrors({})
    setIsEditing(false)
  }

  const handleLogout = () => {
    if (confirm(t("confirmLogout"))) {
      setUser(null)
      clearChat()
      localStorage.clear()
      router.push("/onboarding")
    }
  }

  const getCountryFlag = (country: string) => {
    switch (country) {
      case "China":
        return "🇨🇳"
      case "Japan":
        return "🇯🇵"
      case "Hong Kong":
        return "🇭🇰"
      case "Taiwan":
        return "🇹🇼"
      case "Australia":
        return "🇦🇺"
      default:
        return "🌏"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("myProfile")}</h1>
          <p className="text-xl text-muted-foreground">{t("accountDetails")}</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{t("personalInformation")}</CardTitle>
                  <CardDescription className="text-lg">{t("accountDetails")}</CardDescription>
                </div>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)} size="lg" className="text-lg">
{t("editProfile")}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="edit-name" className="text-xl flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {t("name")}
                    </Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="text-xl h-14"
                    />
                    {errors.name && <p className="text-destructive text-base">{errors.name}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="edit-email" className="text-xl flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      {t("email")}
                    </Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="text-xl h-14"
                    />
                    {errors.email && <p className="text-destructive text-base">{errors.email}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="edit-age" className="text-xl flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {t("age")}
                    </Label>
                    <Input
                      id="edit-age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) })}
                      className="text-xl h-14"
                      min="18"
                      max="120"
                    />
                    {errors.age && <p className="text-destructive text-base">{errors.age}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="edit-country" className="text-xl flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      {t("country")}
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value as UserProfile["country"] })}
                    >
                      <SelectTrigger className="text-xl h-14">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="China" className="text-xl py-4">
                          🇨🇳 China
                        </SelectItem>
                        <SelectItem value="Hong Kong" className="text-xl py-4">
                          🇭🇰 Hong Kong
                        </SelectItem>
                        <SelectItem value="Taiwan" className="text-xl py-4">
                          🇹🇼 Taiwan
                        </SelectItem>
                        <SelectItem value="Japan" className="text-xl py-4">
                          🇯🇵 Japan
                        </SelectItem>
                        <SelectItem value="Australia" className="text-xl py-4">
                          🇦🇺 Australia
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="edit-language" className="text-xl flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      {t("language")}
                    </Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) =>
                        setFormData({ ...formData, language: value as UserProfile["language"] })
                      }
                    >
                      <SelectTrigger className="text-xl h-14">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English" className="text-xl py-4">
                          English
                        </SelectItem>
                        <SelectItem value="Japanese" className="text-xl py-4">
                          日本語 (Japanese)
                        </SelectItem>
                        <SelectItem value="Chinese Simplified" className="text-xl py-4">
                          简体中文 (Chinese Simplified)
                        </SelectItem>
                        <SelectItem value="Chinese Traditional" className="text-xl py-4">
                          繁體中文 (Chinese Traditional)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={handleSave} size="lg" className="flex-1 text-lg h-14">
                      {t("saveChanges")}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="lg"
                      className="flex-1 text-lg h-14 bg-transparent"
                    >
                      {t("cancel")}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-5 w-5" />
                        <span className="text-lg">{t("name")}</span>
                      </div>
                      <p className="text-2xl font-semibold">{user.name}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-5 w-5" />
                        <span className="text-lg">{t("email")}</span>
                      </div>
                      <p className="text-2xl font-semibold">{user.email}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                        <span className="text-lg">{t("age")}</span>
                      </div>
                      <p className="text-2xl font-semibold">{user.age} {t("yearsOld")}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-5 w-5" />
                        <span className="text-lg">{t("country")}</span>
                      </div>
                      <p className="text-2xl font-semibold">
                        {getCountryFlag(user.country)} {user.country}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Languages className="h-5 w-5" />
                        <span className="text-lg">{t("language")}</span>
                      </div>
                      <p className="text-2xl font-semibold">{user.language}</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t("learningProgress")}</CardTitle>
              <CardDescription className="text-lg">{t("achievements")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <p className="text-5xl font-bold text-primary mb-2">{lessons.length}</p>
                  <p className="text-lg text-muted-foreground">{t("lessonsCompleted")}</p>
                </div>
                <div className="text-center p-6 bg-accent/5 rounded-lg">
                  <p className="text-5xl font-bold text-accent mb-2">
                    {lessons.filter((l) => l.type === "quiz").length}
                  </p>
                  <p className="text-lg text-muted-foreground">{t("quizzesTaken")}</p>
                </div>
                <div className="text-center p-6 bg-success/5 rounded-lg">
                  <p className="text-5xl font-bold text-success mb-2">
                    {lessons.filter((l) => l.type === "flashcard").length}
                  </p>
                  <p className="text-lg text-muted-foreground">{t("flashcardsReviewed")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-2xl text-destructive">{t("dangerZone")}</CardTitle>
              <CardDescription className="text-lg">{t("irreversibleActions")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLogout} variant="destructive" size="lg" className="text-lg h-14">
                <LogOut className="mr-2 h-5 w-5" />
{t("logOutClearData")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <UserProvider>
      <ProfileContent />
    </UserProvider>
  )
}
