"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/hooks/use-language"
import { useUser } from "@/lib/user-context"
import { Languages } from "lucide-react"
import type { Language } from "@/lib/translations"

export function LanguageSelector() {
  const { language, t } = useLanguage()
  const { setUser, user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLanguage: Language) => {
    if (user) {
      setUser({ ...user, language: newLanguage })
    }
    setIsOpen(false)
  }

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: "English", label: "English", flag: "🇺🇸" },
    { value: "Japanese", label: "日本語", flag: "🇯🇵" },
    { value: "Chinese Simplified", label: "简体中文", flag: "🇨🇳" },
    { value: "Chinese Traditional", label: "繁體中文", flag: "🇹🇼" },
  ]

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{language}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg z-50">
          <div className="p-2">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => handleLanguageChange(lang.value)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-3 hover:bg-accent transition-colors ${
                  language === lang.value ? "bg-accent" : ""
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.label}</span>
                {language === lang.value && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
