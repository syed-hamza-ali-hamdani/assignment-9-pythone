"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  LogOut,
  Edit,
  Camera,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Home,
  Globe,
  MessageSquare,
  ImageIcon,
  Video,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  Flag,
  Bookmark,
  UserPlus,
  Lock,
  Users,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Types
interface Post {
  id: number
  content: string
  media?: {
    type: "image" | "video"
    url: string
  }[]
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked?: boolean
}

interface Friend {
  id: number
  name: string
  avatar: string
  mutualFriends?: number
}

interface Activity {
  id: number
  type: "post" | "donation" | "boycott" | "comment"
  content: string
  timestamp: string
  target?: string
}

// Mock data
const mockPosts: Post[] = [
  {
    id: 1,
    content: "Just attended a solidarity march in London. Thousands showed up! #FreePalestine",
    media: [
      {
        type: "image",
        url: "/placeholder.svg?height=300&width=500",
      },
    ],
    timestamp: "2 hours ago",
    likes: 128,
    comments: 24,
    shares: 37,
  },
  {
    id: 2,
    content:
      "Important reminder: These brands are still on the boycott list. Please share with your networks to raise awareness. Every purchase is a political decision. #BoycottForPalestine",
    timestamp: "Yesterday",
    likes: 95,
    comments: 12,
    shares: 42,
  },
  {
    id: 3,
    content:
      "Just donated to medical aid for Gaza. They're providing essential supplies to hospitals. If you can, please consider donating: [link in bio] #SupportGaza",
    media: [
      {
        type: "image",
        url: "/placeholder.svg?height=300&width=500",
      },
    ],
    timestamp: "3 days ago",
    likes: 215,
    comments: 31,
    shares: 89,
  },
]

const mockFriends: Friend[] = [
  { id: 1, name: "Ahmed Hassan", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 12 },
  { id: 2, name: "Sarah Khan", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 8 },
  { id: 3, name: "Mohammed Ali", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 5 },
  { id: 4, name: "Fatima Zahra", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 3 },
  { id: 5, name: "Omar Farooq", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 7 },
  { id: 6, name: "Aisha Ahmed", avatar: "/placeholder.svg?height=40&width=40", mutualFriends: 2 },
]

const mockActivities: Activity[] = [
  { id: 1, type: "post", content: "Shared an update about the situation in Gaza", timestamp: "2 hours ago" },
  { id: 2, type: "donation", content: "Donated to Medical Aid for Palestinians", timestamp: "Yesterday" },
  { id: 3, type: "boycott", content: "Added Coca-Cola to boycott list", timestamp: "3 days ago" },
  {
    id: 4,
    type: "comment",
    content: "Commented on a post about the humanitarian crisis",
    timestamp: "1 week ago",
    target: "Gaza Updates",
  },
]

// ProfilePage component - User profile management with Facebook-like interface
export default function ProfilePage() {
  // Get auth state from context
  const { user, isLoggedIn, logout } = useAuth()
  const router = useRouter()

  // State variables
  const [isEditing, setIsEditing] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; url: string }[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [postPrivacy, setPostPrivacy] = useState<"public" | "friends" | "private">("public")
  const [profileInfo, setProfileInfo] = useState({
    bio: "Supporting Palestine and raising awareness through boycotts and donations.",
    location: "London, UK",
    education: "University of London",
    work: "Human Rights Advocate",
    joined: "January 2023",
  })

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const coverPhotoInputRef = useRef<HTMLInputElement>(null)
  const profilePhotoInputRef = useRef<HTMLInputElement>(null)

  // Function to handle user logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  // Handle media selection
  const handleMediaSelect = (type: "image" | "video") => {
    if (type === "image" && fileInputRef.current) {
      fileInputRef.current.click()
    } else if (type === "video" && videoInputRef.current) {
      videoInputRef.current.click()
    }
  }

  // Handle media upload
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 20
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return newProgress
      })
    }, 200)

    // Process each file
    Array.from(files).forEach((file) => {
      // Create object URL for preview
      const mediaUrl = URL.createObjectURL(file)
      setSelectedMedia((prev) => [...prev, { type, url: mediaUrl }])
    })

    // Reset file input
    e.target.value = ""
  }

  // Remove selected media
  const removeSelectedMedia = (index: number) => {
    setSelectedMedia((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle post submission
  const handlePostSubmit = async () => {
    if (!newPostContent.trim() && selectedMedia.length === 0) return

    // Create new post
    const newPost: Post = {
      id: Date.now(),
      content: newPostContent,
      media: selectedMedia.length > 0 ? selectedMedia : undefined,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
    }

    // Add post to state
    setPosts([newPost, ...posts])

    // Reset form
    setNewPostContent("")
    setSelectedMedia([])
  }

  // Handle post interaction (like, comment, share)
  const handlePostInteraction = (postId: number, action: "like" | "comment" | "share") => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          if (action === "like") {
            // Toggle like status
            const liked = !post.liked
            return {
              ...post,
              liked,
              likes: liked ? post.likes + 1 : post.likes - 1,
            }
          }
          if (action === "comment") {
            return {
              ...post,
              comments: post.comments + 1,
            }
          }
          if (action === "share") {
            return {
              ...post,
              shares: post.shares + 1,
            }
          }
        }
        return post
      }),
    )
  }

  // Handle cover photo upload
  const handleCoverPhotoUpload = () => {
    if (coverPhotoInputRef.current) {
      coverPhotoInputRef.current.click()
    }
  }

  // Handle profile photo upload
  const handleProfilePhotoUpload = () => {
    if (profilePhotoInputRef.current) {
      profilePhotoInputRef.current.click()
    }
  }

  // Get privacy icon
  const getPrivacyIcon = (privacy: "public" | "friends" | "private") => {
    switch (privacy) {
      case "public":
        return <Globe className="h-4 w-4" />
      case "friends":
        return <Users className="h-4 w-4" />
      case "private":
        return <Lock className="h-4 w-4" />
    }
  }

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className="container px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        <Card className="text-center p-6 border-green-600 border-2">
          <CardContent className="pt-6">
            {/* Palestinian flag colors */}
            <div className="flex space-x-1 mx-auto w-fit mb-4">
              <div className="w-4 h-8 bg-black"></div>
              <div className="w-4 h-8 bg-white border border-gray-300"></div>
              <div className="w-4 h-8 bg-green-600"></div>
              <div className="w-4 h-8 bg-red-600"></div>
            </div>

            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <h2 className="text-xl font-bold mt-4">Sign In</h2>
            <p className="text-gray-500 mt-2">
              Create an account or sign in to post updates, save favorite duas, and track your boycott impact.
            </p>

            <div className="mt-6 space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => router.push("/auth")}>
                Sign In
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/auth?tab=register")}>
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Profile header with cover photo and profile info */}
      <Card className="overflow-hidden">
        <div className="relative">
          {/* Cover photo */}
          <div className="relative h-64 w-full bg-gradient-to-r from-green-600 to-green-700">
            {/* Palestinian flag color strip */}
            <div className="absolute top-0 left-0 right-0 h-2 flex">
              <div className="w-1/4 bg-black"></div>
              <div className="w-1/4 bg-white"></div>
              <div className="w-1/4 bg-green-600"></div>
              <div className="w-1/4 bg-red-600"></div>
            </div>

            {/* Cover photo edit button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/20 text-white hover:bg-black/30"
              onClick={handleCoverPhotoUpload}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              type="file"
              ref={coverPhotoInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Handle cover photo upload
                  console.log("Cover photo uploaded:", file.name)
                }
              }}
            />
          </div>

          {/* Profile info section */}
          <div className="relative px-6 pb-6">
            {/* Profile photo */}
            <div className="absolute -top-16 left-6 border-4 border-white dark:border-gray-950 rounded-full">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt={user?.name || "User"} />
                <AvatarFallback className="text-3xl">{getInitials()}</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-gray-100 dark:bg-gray-800 h-10 w-10"
                onClick={handleProfilePhotoUpload}
              >
                <Camera className="h-5 w-5" />
              </Button>
              <input
                type="file"
                ref={profilePhotoInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // Handle profile photo upload
                    console.log("Profile photo uploaded:", file.name)
                  }
                }}
              />
            </div>

            {/* Profile actions */}
            <div className="flex justify-end mt-4 mb-16">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Friend
                </Button>
                <Button variant="outline" size="sm" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>

            {/* User details */}
            <div className="mt-2">
              <h2 className="text-2xl font-bold">{user?.name || "User Name"}</h2>
              <p className="text-gray-500">{user?.email || "user@example.com"}</p>
              <p className="mt-2 text-sm">{profileInfo.bio}</p>

              {/* User info */}
              <div className="flex flex-wrap gap-4 mt-4">
                {profileInfo.location && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profileInfo.location}</span>
                  </div>
                )}
                {profileInfo.work && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{profileInfo.work}</span>
                  </div>
                )}
                {profileInfo.education && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    <span>{profileInfo.education}</span>
                  </div>
                )}
                {profileInfo.joined && (
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined {profileInfo.joined}</span>
                  </div>
                )}
              </div>

              {/* Activity stats */}
              <div className="flex space-x-6 mt-6">
                <div>
                  <span className="font-bold">{posts.length}</span>
                  <span className="text-gray-500 text-sm ml-1">Posts</span>
                </div>
                <div>
                  <span className="font-bold">12</span>
                  <span className="text-gray-500 text-sm ml-1">Boycotts</span>
                </div>
                <div>
                  <span className="font-bold">5</span>
                  <span className="text-gray-500 text-sm ml-1">Donations</span>
                </div>
                <div>
                  <span className="font-bold">{mockFriends.length}</span>
                  <span className="text-gray-500 text-sm ml-1">Friends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Edit profile dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your profile information. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">
                Bio
              </label>
              <Textarea
                id="bio"
                value={profileInfo.bio}
                onChange={(e) => setProfileInfo({ ...profileInfo, bio: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="location" className="text-right">
                Location
              </label>
              <Input
                id="location"
                value={profileInfo.location}
                onChange={(e) => setProfileInfo({ ...profileInfo, location: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="education" className="text-right">
                Education
              </label>
              <Input
                id="education"
                value={profileInfo.education}
                onChange={(e) => setProfileInfo({ ...profileInfo, education: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="work" className="text-right">
                Work
              </label>
              <Input
                id="work"
                value={profileInfo.work}
                onChange={(e) => setProfileInfo({ ...profileInfo, work: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditing(false)} className="bg-green-600 hover:bg-green-700">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="space-y-6">
          {/* Intro card */}
          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-bold text-lg">Intro</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{profileInfo.bio}</p>

              <div className="space-y-2">
                {profileInfo.work && (
                  <div className="flex items-center text-sm">
                    <Briefcase className="h-4 w-4 mr-3 text-gray-500" />
                    <span>Works at {profileInfo.work}</span>
                  </div>
                )}
                {profileInfo.education && (
                  <div className="flex items-center text-sm">
                    <GraduationCap className="h-4 w-4 mr-3 text-gray-500" />
                    <span>Studied at {profileInfo.education}</span>
                  </div>
                )}
                {profileInfo.location && (
                  <div className="flex items-center text-sm">
                    <Home className="h-4 w-4 mr-3 text-gray-500" />
                    <span>Lives in {profileInfo.location}</span>
                  </div>
                )}
                {profileInfo.joined && (
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                    <span>Joined {profileInfo.joined}</span>
                  </div>
                )}
              </div>

              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                Edit Details
              </Button>
            </CardContent>
          </Card>

          {/* Friends card */}
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <h3 className="font-bold text-lg">Friends</h3>
              <Link href="#" className="text-sm text-green-600 hover:underline">
                See all friends
              </Link>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 mb-4">{mockFriends.length} friends</div>
              <div className="grid grid-cols-3 gap-2">
                {mockFriends.map((friend) => (
                  <Link href="#" key={friend.id} className="text-center">
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-1">
                      <Image
                        src={friend.avatar || "/placeholder.svg"}
                        alt={friend.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs font-medium truncate">{friend.name}</div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Photos card */}
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <h3 className="font-bold text-lg">Photos</h3>
              <Link href="#" className="text-sm text-green-600 hover:underline">
                See all photos
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=Photo ${i}`}
                      alt={`Photo ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create post card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name || "User"} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div
                    className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2.5 text-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => document.getElementById("post-textarea")?.focus()}
                  >
                    What's on your mind, {user?.name?.split(" ")[0] || "User"}?
                  </div>

                  <Textarea
                    id="post-textarea"
                    placeholder={`What's on your mind, ${user?.name?.split(" ")[0] || "User"}?`}
                    className="mt-2 resize-none"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />

                  {/* Media preview grid */}
                  {selectedMedia.length > 0 && (
                    <div className="mt-3">
                      <div
                        className={`grid gap-2 ${
                          selectedMedia.length === 1
                            ? "grid-cols-1"
                            : selectedMedia.length === 2
                              ? "grid-cols-2"
                              : selectedMedia.length >= 3
                                ? "grid-cols-3"
                                : ""
                        }`}
                      >
                        {selectedMedia.map((media, index) => (
                          <div key={index} className="relative rounded-lg overflow-hidden">
                            {media.type === "image" ? (
                              <div className="relative aspect-square">
                                <Image
                                  src={media.url || "/placeholder.svg"}
                                  alt="Selected media"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="relative aspect-video">
                                <video src={media.url} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-black/30 hover:bg-black/50 text-white rounded-full"
                                    onClick={() => window.open(media.url, "_blank")}
                                  >
                                    <Video className="h-8 w-8" />
                                  </Button>
                                </div>
                              </div>
                            )}
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 rounded-full"
                              onClick={() => removeSelectedMedia(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upload progress */}
                  {isUploading && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Uploading media...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                        onClick={() => handleMediaSelect("image")}
                      >
                        <ImageIcon className="h-5 w-5 mr-2 text-green-600" />
                        Photo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500"
                        onClick={() => handleMediaSelect("video")}
                      >
                        <Video className="h-5 w-5 mr-2 text-blue-600" />
                        Video
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleMediaUpload(e, "image")}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <input
                        type="file"
                        ref={videoInputRef}
                        onChange={(e) => handleMediaUpload(e, "video")}
                        accept="video/*"
                        multiple
                        className="hidden"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            {getPrivacyIcon(postPrivacy)}
                            <span className="ml-2 capitalize">{postPrivacy}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setPostPrivacy("public")}>
                            <Globe className="h-4 w-4 mr-2" />
                            Public
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setPostPrivacy("friends")}>
                            <Users className="h-4 w-4 mr-2" />
                            Friends
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setPostPrivacy("private")}>
                            <Lock className="h-4 w-4 mr-2" />
                            Only me
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        onClick={handlePostSubmit}
                        disabled={!newPostContent.trim() && selectedMedia.length === 0}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name || "User"} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user?.name || "User"}</div>
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span>{getPrivacyIcon(postPrivacy)}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit post
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save post
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Flag className="h-4 w-4 mr-2" />
                        Delete post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Post content */}
                <p className="whitespace-pre-wrap mb-3">{post.content}</p>

                {/* Media content */}
                {post.media && post.media.length > 0 && (
                  <div className="mb-3">
                    {post.media.length === 1 ? (
                      <div className="relative rounded-lg overflow-hidden">
                        {post.media[0].type === "image" ? (
                          <div className="relative h-96 w-full">
                            <Image
                              src={post.media[0].url || "/placeholder.svg"}
                              alt="Post image"
                              fill
                              className="object-contain bg-gray-100 dark:bg-gray-800"
                            />
                          </div>
                        ) : (
                          <video
                            src={post.media[0].url}
                            controls
                            className="w-full rounded-lg"
                            poster="/placeholder.svg?height=300&width=500"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-1">
                        {post.media.map((media, index) => (
                          <div key={index} className="relative rounded-lg overflow-hidden aspect-square">
                            {media.type === "image" ? (
                              <Image
                                src={media.url || "/placeholder.svg"}
                                alt="Post image"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <video
                                src={media.url}
                                className="w-full h-full object-cover"
                                poster="/placeholder.svg?height=150&width=150"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Interaction stats */}
                {(post.likes > 0 || post.comments > 0 || post.shares > 0) && (
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    {post.likes > 0 && (
                      <div className="flex items-center">
                        <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full mr-1">
                          <ThumbsUp className="h-3 w-3 text-green-600" />
                        </div>
                        {post.likes} {post.likes === 1 ? "like" : "likes"}
                      </div>
                    )}
                    <div className="flex space-x-3">
                      {post.comments > 0 && <div>{post.comments} comments</div>}
                      {post.shares > 0 && <div>{post.shares} shares</div>}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-0">
                <div className="flex justify-between w-full border-t border-b py-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex-1 ${post.liked ? "text-green-600" : "text-gray-500"}`}
                    onClick={() => handlePostInteraction(post.id, "like")}
                  >
                    <ThumbsUp className={`h-4 w-4 mr-1 ${post.liked ? "fill-green-600" : ""}`} />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-500"
                    onClick={() => handlePostInteraction(post.id, "comment")}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Comment
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-500"
                    onClick={() => handlePostInteraction(post.id, "share")}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Logout button */}
      <Button
        variant="outline"
        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  )
}
