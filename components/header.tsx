"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/auth-provider"

// Header component - Main navigation header for the application
export function Header() {
  // State variables
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Control mobile menu state

  const pathname = usePathname() // Get current path
  const router = useRouter() // Next.js router for navigation
  const { user, isLoggedIn, logout } = useAuth() // Get auth state from context

  // Function to handle user logout
  const handleLogout = () => {
    // Log the user out
    logout()

    // Redirect to home page
    router.push("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      {/* Main header container */}
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo and site title */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-6 bg-black"></div>
            <div className="w-3 h-6 bg-white border border-gray-300 dark:border-gray-700"></div>
            <div className="w-3 h-6 bg-green-600"></div>
            <div className="w-3 h-6 bg-red-600"></div>
          </div>
          <span className="font-bold text-lg">Palestine Support</span>
        </Link>

        {/* User actions section */}
        <div className="flex items-center space-x-2">
          {/* Conditional rendering based on authentication status */}
          {isLoggedIn ? (
            // User dropdown menu when logged in
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {user?.name && <p className="font-medium">{user.name}</p>}
                    {user?.email && <p className="w-[200px] truncate text-sm text-gray-500">{user.email}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/community">My Posts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/scanner">Scan Products</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Login button when not logged in
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth">
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
          )}

          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              {/* Mobile navigation menu */}
              <nav className="flex flex-col space-y-4 mt-6">
                <Link
                  href="/"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/updates"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/updates" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gaza Updates
                </Link>
                <Link
                  href="/brands"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/brands" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Boycott Brands
                </Link>
                <Link
                  href="/search"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/search" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Product Search
                </Link>
                <Link
                  href="/donate"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/donate" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </Link>
                <Link
                  href="/duas"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/duas" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daily Duas
                </Link>
                <Link
                  href="/community"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/community" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Community
                </Link>
                <Link
                  href="/scanner"
                  className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    pathname === "/scanner" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Barcode Scanner
                </Link>

                {/* Conditional rendering of auth links */}
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        pathname === "/profile" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      className="px-4 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 text-red-600 text-left"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className={`px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      pathname === "/auth" ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Palestinian flag color strip */}
      <div className="flex w-full h-1">
        <div className="w-1/4 bg-black"></div>
        <div className="w-1/4 bg-white"></div>
        <div className="w-1/4 bg-green-600"></div>
        <div className="w-1/4 bg-red-600"></div>
      </div>
    </header>
  )
}
