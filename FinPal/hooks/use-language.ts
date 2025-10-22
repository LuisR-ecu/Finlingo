import { useUser } from "@/lib/user-context"
import { translations, type Language, type TranslationKey } from "@/lib/translations"

export function useLanguage() {
  const { user } = useUser()
  
  // Default to English if no user or language selected
  const currentLanguage: Language = (user?.language as Language) || "English"
  
  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key]
  }
  
  return {
    language: currentLanguage,
    t,
  }
}

