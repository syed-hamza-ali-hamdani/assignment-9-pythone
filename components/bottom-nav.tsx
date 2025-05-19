"use client"

import { Home, Search, List, BookOpen, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Updates",
      href: "/updates",
      icon: BookOpen,
    },
    {
      name: "Brands",
      href: "/brands",
      icon: List,
    },
    {
      name: "Search",
      href: "/search",
      icon: Search,
    },
    {
      name: "Community",
      href: "/community",
      icon: Users,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Palestinian flag color strip */}
      <div className="flex w-full h-1">
        <div className="w-1/4 bg-black"></div>
        <div className="w-1/4 bg-white"></div>
        <div className="w-1/4 bg-green-600"></div>
        <div className="w-1/4 bg-red-600"></div>
      </div>

      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-green-600 dark:text-green-500" : "text-gray-500 dark:text-gray-400",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
