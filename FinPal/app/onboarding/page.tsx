"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StepIndicator } from "@/components/onboarding/step-indicator"
import { UserProvider, useUser } from "@/lib/user-context"
import type { UserProfile } from "@/types/user"
import { translations, type Language } from "@/lib/translations"

function OnboardingContent() {
  const router = useRouter()
  const { setUser } = useUser()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: "",
    email: "",
    age: undefined,
    country: undefined,
    language: undefined,
    advisor: undefined,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Track current language for real-time UI updates
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English")
  
  // Update current language when user selects it
  useEffect(() => {
    if (formData.language) {
      setCurrentLanguage(formData.language as Language)
    }
  }, [formData.language])
  
  // Translation helper
  const t = (key: keyof typeof translations.English) => {
    return translations[currentLanguage][key]
  }

  const totalSteps = 6

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.language) {
          newErrors.language = "Please select your preferred language"
        }
        break
      case 2:
        if (!formData.name || formData.name.trim().length < 2) {
          newErrors.name = "Please enter your name (at least 2 characters)"
        }
        break
      case 3:
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address"
        }
        break
      case 4:
        if (!formData.age || formData.age < 18 || formData.age > 120) {
          newErrors.age = "Please enter a valid age (18-120)"
        }
        break
      case 5:
        if (!formData.country) {
          newErrors.country = "Please select your country"
        }
        break
      case 6:
        if (!formData.advisor) {
          newErrors.advisor = "Please select your advisor"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        setUser(formData as UserProfile)
        router.push("/chat")
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-primary">{t("selectLanguage")}</h2>
              {formData.language && (
                <p className="text-lg text-muted-foreground">
                  {t("youChose")} <span className="font-semibold text-primary">{t(formData.language.toLowerCase() as any)}</span>
                </p>
              )}
            </div>
            <div className="space-y-4">
              <div className="grid gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.language === "English"
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, language: "English" })}
                >
                  {t("english")}
                  {formData.language === "English" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.language === "Japanese"
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, language: "Japanese" })}
                >
                  {t("japanese")}
                  {formData.language === "Japanese" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.language === "Chinese Simplified"
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, language: "Chinese Simplified" })}
                >
                  {t("chineseSimplified")}
                  {formData.language === "Chinese Simplified" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.language === "Chinese Traditional"
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, language: "Chinese Traditional" })}
                >
                  {t("chineseTraditional")}
                  {formData.language === "Chinese Traditional" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
              </div>
              {errors.language && <p className="text-destructive text-base">{errors.language}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-primary">{t("enterName")}</h2>
            </div>
            <div className="space-y-4">
              <Label htmlFor="name" className="text-xl font-semibold">
                {t("name")}
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t("namePlaceholder")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-xl h-14 bg-white"
                autoFocus
              />
              {errors.name && <p className="text-destructive text-base">{errors.name}</p>}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-primary">{t("enterEmail")}</h2>
            </div>
            <div className="space-y-4">
              <Label htmlFor="email" className="text-xl font-semibold">
                {t("emailAddress")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-xl h-14 bg-white"
                autoFocus
              />
              {errors.email && <p className="text-destructive text-base">{errors.email}</p>}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-primary">{t("enterAge")}</h2>
            </div>
            <div className="space-y-4">
              <Label htmlFor="age" className="text-xl font-semibold">
                {t("age")}
              </Label>
              <Input
                id="age"
                type="number"
                placeholder={t("agePlaceholder")}
                value={formData.age || ""}
                onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) || undefined })}
                className="text-xl h-14 bg-white"
                min="18"
                max="120"
                autoFocus
              />
              {errors.age && <p className="text-destructive text-base">{errors.age}</p>}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-primary">{t("selectCountry")}</h2>
              {formData.country && (
                <p className="text-lg text-muted-foreground">
                  {t("youChose")} <span className="font-semibold text-primary">{formData.country === "China" ? t("china") : formData.country === "Hong Kong" ? t("hongKong") : formData.country === "Japan" ? t("japan") : formData.country === "Taiwan" ? t("taiwan") : t("australia")}</span>
                </p>
              )}
            </div>
            <div className="space-y-4">
              <div className="grid gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.country === "China"
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, country: "China" })}
                >
                  <span className="text-2xl mr-3">🇨🇳</span> {t("china")}
                  {formData.country === "China" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.country === "Hong Kong"
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, country: "Hong Kong" })}
                >
                  <span className="text-2xl mr-3">🇭🇰</span> {t("hongKong")}
                  {formData.country === "Hong Kong" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.country === "Japan"
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, country: "Japan" })}
                >
                  <span className="text-2xl mr-3">🇯🇵</span> {t("japan")}
                  {formData.country === "Japan" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.country === "Taiwan"
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, country: "Taiwan" })}
                >
                  <span className="text-2xl mr-3">🇹🇼</span> {t("taiwan")}
                  {formData.country === "Taiwan" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`h-16 text-xl justify-start border-2 transition-all ${
                    formData.country === "Australia"
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                      : "bg-white hover:bg-accent border-border"
                  }`}
                  onClick={() => setFormData({ ...formData, country: "Australia" })}
                >
                  <span className="text-2xl mr-3">🇦🇺</span> {t("australia")}
                  {formData.country === "Australia" && <span className="ml-auto text-2xl">✓</span>}
                </Button>
              </div>
              {errors.country && <p className="text-destructive text-base">{errors.country}</p>}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-primary">{t("selectAdvisor")}</h2>
              {formData.advisor && (
                <p className="text-lg text-muted-foreground">
                  {t("youChose")} <span className="font-semibold text-primary">{t(formData.advisor.toLowerCase() as any)}</span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-6">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, advisor: "Bobby" })}
                className={`flex flex-col items-center p-6 rounded-xl border-4 transition-all relative ${
                  formData.advisor === "Bobby"
                    ? "border-primary bg-primary/10 shadow-lg scale-105"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                {formData.advisor === "Bobby" && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg">
                    ✓
                  </div>
                )}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-5xl mb-3">
                  👨‍💼 
                </div>
                <span className="text-xl font-semibold">{t("bobby")}</span>
                <span className="text-sm text-muted-foreground mt-1">{t("bobbyDescription")}</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, advisor: "Jess" })}
                className={`flex flex-col items-center p-6 rounded-xl border-4 transition-all relative ${
                  formData.advisor === "Jess"
                    ? "border-primary bg-primary/10 shadow-lg scale-105"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                {formData.advisor === "Jess" && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg">
                    ✓
                  </div>
                )}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-5xl mb-3">
                  👩‍💼
                </div>
                <span className="text-xl font-semibold">{t("jess")}</span>
                <span className="text-sm text-muted-foreground mt-1">{t("jessDescription")}</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, advisor: "Greg" })}
                className={`flex flex-col items-center p-6 rounded-xl border-4 transition-all relative ${
                  formData.advisor === "Greg"
                    ? "border-primary bg-primary/10 shadow-lg scale-105"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                {formData.advisor === "Greg" && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-lg">
                    ✓
                  </div>
                )}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-5xl mb-3">
                  👨‍🏫
                </div>
                <span className="text-xl font-semibold">{t("greg")}</span>
                <span className="text-sm text-muted-foreground mt-1">{t("gregDescription")}</span>
              </button>
            </div>
            {errors.advisor && <p className="text-destructive text-base text-center mt-4">{errors.advisor}</p>}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-3xl shadow-xl bg-card border-2">

        <CardContent className="pt-6">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          <div className="mt-8">{renderStep()}</div>

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-14 text-xl bg-white border-2"
                size="lg"
              >
                {t("back")}
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 h-14 text-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              size="lg"
            >
              {currentStep === totalSteps ? t("finish") : t("next")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <UserProvider>
      <OnboardingContent />
    </UserProvider>
  )
}
