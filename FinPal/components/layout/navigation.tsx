"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, MessageSquare, BookOpen, User } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { LanguageSelector } from "@/components/ui/language-selector"

export function Navigation() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    // { href: "/dashboard", label: t("dashboard"), icon: Home },
    { href: "/chat", label: t("chat"), icon: MessageSquare },
    { href: "/lessons", label: t("lessons"), icon: BookOpen },
    { href: "/profile", label: t("profile"), icon: User },
  ]

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/chat" className="text-2xl font-bold text-primary">
            FinPal
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="lg"
                  className="text-lg h-12 px-6"
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-5 w-5" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  )
}
