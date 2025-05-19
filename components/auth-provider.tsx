"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the shape of our user object
type User = {
  name: string
  email: string
  avatar?: string
}

// Define the shape of our auth context
type AuthContextType = {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, name: string) => void
  register: (email: string, name: string) => void
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider component - Manages authentication state across the app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State to track authentication status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Effect to load authentication state from localStorage on component mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Get authentication state from localStorage
      const loggedIn = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(loggedIn)

      // If logged in, get user data
      if (loggedIn) {
        const userData = localStorage.getItem("user")
        if (userData) {
          try {
            setUser(JSON.parse(userData))
          } catch (error) {
            console.error("Failed to parse user data:", error)
            // Reset auth state if data is corrupted
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("user")
          }
        }
      }

      // Mark as loaded
      setIsLoaded(true)
    }
  }, [])

  // Function to handle user login
  const login = (email: string, name: string) => {
    // Create user object
    const newUser = { email, name }

    // Update state
    setUser(newUser)
    setIsLoggedIn(true)

    // Store in localStorage
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  // Function to handle user registration
  const register = (email: string, name: string) => {
    // For this demo, registration is the same as login
    login(email, name)
  }

  // Function to handle user logout
  const logout = () => {
    // Clear authentication data
    setUser(null)
    setIsLoggedIn(false)

    // Remove from localStorage
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
  }

  // Function to update user profile
  const updateProfile = (data: Partial<User>) => {
    if (!user) return

    // Update user data
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)

    // Update localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  // Only render children after we've checked localStorage
  if (!isLoaded && typeof window !== "undefined") {
    return null // Or a loading spinner
  }

  // Provide auth context to children
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
