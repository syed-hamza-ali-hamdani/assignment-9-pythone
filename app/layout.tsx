import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNav } from "@/components/bottom-nav"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Palestine Support App",
  description: "Support Palestine with news, boycott information, and more",
  manifest: "/manifest.json",
  themeColor: "#10b981", // Green color from the Palestinian flag
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Palestine Support",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Wrap the app with AuthProvider to manage authentication state */}
          <AuthProvider>
            <Header />
            <main className="min-h-screen pb-16 pt-16">{children}</main>
            <BottomNav />
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
