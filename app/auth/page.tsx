"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

// AuthPage component - Handles user authentication (login/register)
export default function AuthPage() {
  // Get search params to determine initial tab
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login"

  // State variables for form handling
  const [email, setEmail] = useState("") // Store user email
  const [password, setPassword] = useState("") // Store user password
  const [name, setName] = useState("") // Store user name (for registration)
  const [showPassword, setShowPassword] = useState(false) // Toggle password visibility
  const [isLoading, setIsLoading] = useState(false) // Loading state for form submission
  const [error, setError] = useState<string | null>(null) // Store error messages

  const router = useRouter() // Next.js router for navigation
  const { login, register } = useAuth() // Get auth functions from context

  // Function to handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission behavior
    setError(null) // Clear previous errors

    // Validate form inputs
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true) // Set loading state to true

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would make an API call to authenticate the user
      // For demo purposes, we're just simulating a successful login
      login(email, name || "User")

      // Redirect to home page after successful login
      router.push("/")
    } catch (error) {
      console.error("Login error:", error)
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  // Function to handle registration form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission behavior
    setError(null) // Clear previous errors

    // Validate form inputs
    if (!name || !email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true) // Set loading state to true

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would make an API call to register the user
      // For demo purposes, we're just simulating a successful registration
      register(email, name)

      // Redirect to home page after successful registration
      router.push("/")
    } catch (error) {
      console.error("Registration error:", error)
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-6">
      {/* Main authentication card */}
      <Card className="w-full max-w-md">
        {/* Palestinian flag color strip at the top of the card */}
        <div className="flex w-full h-2">
          <div className="w-1/4 bg-black"></div>
          <div className="w-1/4 bg-white"></div>
          <div className="w-1/4 bg-green-600"></div>
          <div className="w-1/4 bg-red-600"></div>
        </div>

        {/* Card header with logo and title */}
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="flex space-x-1 mb-2">
            <div className="w-4 h-8 bg-black"></div>
            <div className="w-4 h-8 bg-white border border-gray-300"></div>
            <div className="w-4 h-8 bg-green-600"></div>
            <div className="w-4 h-8 bg-red-600"></div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one to support Palestine
          </CardDescription>
        </CardHeader>

        {/* Card content with login/register tabs */}
        <CardContent>
          <Tabs defaultValue={initialTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Show error message if there is one */}
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">{error}</div>}

            {/* Login form tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Register form tab */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Password</Label>
                  <div className="relative">
                    <Input
                      id="password-register"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Card footer with additional information */}
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-500">
            By signing in, you agree to support the Palestinian cause and use this app responsibly.
          </div>
        </CardFooter>

        {/* Palestinian flag color strip at the bottom of the card */}
        <div className="flex w-full h-2">
          <div className="w-1/4 bg-black"></div>
          <div className="w-1/4 bg-white"></div>
          <div className="w-1/4 bg-green-600"></div>
          <div className="w-1/4 bg-red-600"></div>
        </div>
      </Card>
    </div>
  )
}
