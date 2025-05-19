"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageSquare,
  Share2,
  ImageIcon,
  Send,
  X,
  AlertCircle,
  Video,
  MoreHorizontal,
  Smile,
  ThumbsUp,
  UserPlus,
  Flag,
  Bookmark,
  Globe,
  Lock,
  Users,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Image from "next/image"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"

// Types
interface MediaFile {
  id: string
  type: "image" | "video"
  url: string
  file?: File
}

interface Comment {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
}

interface Post {
  id: number
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  media: MediaFile[]
  timestamp: string
  likes: number
  comments: Comment[]
  shares: number
  privacy: "public" | "friends" | "private"
  liked?: boolean
  bookmarked?: boolean
}

// Mock data for community posts
const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: "Ahmed Hassan",
      username: "ahmed_h",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Just attended a solidarity march in London. Thousands showed up! #FreePalestine",
    media: [
      {
        id: "img1",
        type: "image",
        url: "/placeholder.svg?height=300&width=500",
      },
      {
        id: "img2",
        type: "image",
        url: "/placeholder.svg?height=300&width=500",
      },
    ],
    timestamp: "2 hours ago",
    likes: 128,
    comments: [
      {
        id: "c1",
        user: {
          name: "Sarah Khan",
          username: "sarah_k",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Amazing turnout! I was there too!",
        timestamp: "1 hour ago",
        likes: 12,
      },
      {
        id: "c2",
        user: {
          name: "Mohammed Ali",
          username: "mo_ali",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Thank you for supporting the cause! 🇵🇸",
        timestamp: "30 minutes ago",
        likes: 8,
      },
    ],
    shares: 37,
    privacy: "public",
  },
  {
    id: 2,
    user: {
      name: "Sarah Khan",
      username: "sarah_k",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Important reminder: These brands are still on the boycott list. Please share with your networks to raise awareness. Every purchase is a political decision. #BoycottForPalestine",
    media: [],
    timestamp: "5 hours ago",
    likes: 95,
    comments: [
      {
        id: "c3",
        user: {
          name: "Ahmed Hassan",
          username: "ahmed_h",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Thanks for the reminder! I've been avoiding these brands.",
        timestamp: "4 hours ago",
        likes: 5,
      },
    ],
    shares: 42,
    privacy: "public",
  },
  {
    id: 3,
    user: {
      name: "Mohammed Ali",
      username: "mo_ali",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Just donated to medical aid for Gaza. They're providing essential supplies to hospitals. If you can, please consider donating: [link in bio] #SupportGaza",
    media: [
      {
        id: "vid1",
        type: "video",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
    timestamp: "Yesterday",
    likes: 215,
    comments: [
      {
        id: "c4",
        user: {
          name: "Sarah Khan",
          username: "sarah_k",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Thank you for sharing this. Just donated as well!",
        timestamp: "Yesterday",
        likes: 15,
      },
      {
        id: "c5",
        user: {
          name: "Ahmed Hassan",
          username: "ahmed_h",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Great initiative! Every bit helps.",
        timestamp: "Yesterday",
        likes: 10,
      },
      {
        id: "c6",
        user: {
          name: "Fatima Zahra",
          username: "fatima_z",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "I'll share this with my network. 🇵🇸❤️",
        timestamp: "Yesterday",
        likes: 7,
      },
    ],
    shares: 89,
    privacy: "public",
  },
]

// CommunityPage component - Social community features
export default function CommunityPage() {
  // Get auth state from context
  const { user, isLoggedIn } = useAuth()
  const router = useRouter()

  // State variables
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("trending")
  const [commentText, setCommentText] = useState<Record<number, string>>({})
  const [expandedComments, setExpandedComments] = useState<Record<number, boolean>>({})
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [postPrivacy, setPostPrivacy] = useState<"public" | "friends" | "private">("public")

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  // Handle image selection
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

    // Check if we're adding too many files
    if (selectedMedia.length + files.length > 10) {
      setError("You can only upload up to 10 files per post")
      return
    }

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

    try {
      // Process each file
      Array.from(files).forEach((file) => {
        // Check file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          setError("File size should be less than 50MB")
          return
        }

        // Check file type
        if (type === "image" && !file.type.startsWith("image/")) {
          setError("Please select an image file")
          return
        }

        if (type === "video" && !file.type.startsWith("video/")) {
          setError("Please select a video file")
          return
        }

        // Create object URL for preview
        const mediaUrl = URL.createObjectURL(file)
        const mediaId = `media-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

        setSelectedMedia((prev) => [
          ...prev,
          {
            id: mediaId,
            type,
            url: mediaUrl,
            file,
          },
        ])
      })

      setError(null)
    } catch (error) {
      console.error("Error processing media:", error)
      setError("Failed to process media. Please try again.")
      setIsUploading(false)
      clearInterval(interval)
    }

    // Reset file input
    e.target.value = ""
  }

  // Remove selected media
  const removeSelectedMedia = (id: string) => {
    setSelectedMedia((prev) => prev.filter((media) => media.id !== id))
  }

  // Handle post submission
  const handlePostSubmit = async () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      router.push("/auth")
      return
    }

    // Validate post content
    if (!newPostContent.trim() && selectedMedia.length === 0) {
      setError("Please add some text or media to your post")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create new post
      const newPost: Post = {
        id: Date.now(),
        user: {
          name: user?.name || "You",
          username: "user",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: newPostContent,
        media: selectedMedia,
        timestamp: "Just now",
        likes: 0,
        comments: [],
        shares: 0,
        privacy: postPrivacy,
      }

      // Add post to state
      setPosts([newPost, ...posts])

      // Reset form
      setNewPostContent("")
      setSelectedMedia([])
      setPostPrivacy("public")
    } catch (error) {
      console.error("Post submission error:", error)
      setError("Failed to submit post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle post interaction (like, comment, share)
  const handlePostInteraction = (postId: number, action: "like" | "share") => {
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

  // Handle bookmark
  const handleBookmark = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            bookmarked: !post.bookmarked,
          }
        }
        return post
      }),
    )
  }

  // Handle comment submission
  const handleCommentSubmit = (postId: number) => {
    if (!commentText[postId]?.trim()) return

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: `comment-${Date.now()}`,
            user: {
              name: user?.name || "You",
              username: "user",
              avatar: "/placeholder.svg?height=40&width=40",
            },
            content: commentText[postId],
            timestamp: "Just now",
            likes: 0,
          }

          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )

    // Clear comment text
    setCommentText((prev) => ({ ...prev, [postId]: "" }))
  }

  // Toggle expanded comments
  const toggleExpandComments = (postId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  // Handle like comment
  const handleLikeComment = (postId: number, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  likes: comment.likes + 1,
                }
              }
              return comment
            }),
          }
        }
        return post
      }),
    )
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
          <h1 className="text-2xl font-bold">Community</h1>
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

            <h2 className="text-xl font-bold mt-4">Join Our Community</h2>
            <p className="text-gray-500 mt-2">
              Sign in to post updates, share resources, and connect with others supporting Palestine.
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

        {/* Show some posts as preview */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Recent Community Posts</h2>
          {posts.slice(0, 3).map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.user.name}</div>
                    <div className="text-xs text-gray-500 flex items-center">
                      @{post.user.username} • {post.timestamp} • {getPrivacyIcon(post.privacy)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap">{post.content}</p>
                {post.media.length > 0 && (
                  <div className="mt-3">
                    {post.media.length === 1 ? (
                      <div className="relative rounded-lg overflow-hidden">
                        {post.media[0].type === "image" ? (
                          <div className="relative h-64 w-full">
                            <Image
                              src={post.media[0].url || "/placeholder.svg"}
                              alt="Post image"
                              fill
                              className="object-cover"
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
                      <div className="grid grid-cols-2 gap-2">
                        {post.media.slice(0, 4).map((media, index) => (
                          <div key={media.id} className="relative rounded-lg overflow-hidden aspect-square">
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
                            {index === 3 && post.media.length > 4 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-xl font-bold">+{post.media.length - 4}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between border-t">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                  <Heart className="h-4 w-4 mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  {post.comments.length}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Share2 className="h-4 w-4 mr-1" />
                  {post.shares}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Community</h1>
      </div>

      {/* Create post card */}
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user?.name || "Your profile"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share an update, news, or resource..."
                className="resize-none mb-3"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />

              {/* Media preview grid */}
              {selectedMedia.length > 0 && (
                <div className="mb-3">
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
                    {selectedMedia.map((media) => (
                      <div key={media.id} className="relative rounded-lg overflow-hidden">
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
                          onClick={() => removeSelectedMedia(media.id)}
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
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Uploading media...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Error message */}
              {error && (
                <Alert variant="destructive" className="mb-3">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-between items-center mt-3">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMediaSelect("image")}
                    disabled={selectedMedia.length >= 10 || isSubmitting}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Photo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMediaSelect("video")}
                    disabled={selectedMedia.length >= 10 || isSubmitting}
                  >
                    <Video className="h-4 w-4 mr-2" />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center">
                        {getPrivacyIcon(postPrivacy)}
                        <span className="ml-2 capitalize">{postPrivacy}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0">
                      <div className="p-1">
                        <Button
                          variant={postPrivacy === "public" ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setPostPrivacy("public")}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Public
                        </Button>
                        <Button
                          variant={postPrivacy === "friends" ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setPostPrivacy("friends")}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Friends
                        </Button>
                        <Button
                          variant={postPrivacy === "private" ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setPostPrivacy("private")}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Only me
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Button
                    onClick={handlePostSubmit}
                    disabled={(!newPostContent.trim() && selectedMedia.length === 0) || isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed tabs */}
      <Tabs defaultValue="trending" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Posts feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.user.name}</div>
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <span>@{post.user.username}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                      <span>•</span>
                      <span>{getPrivacyIcon(post.privacy)}</span>
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
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleBookmark(post.id)}>
                      <Bookmark className="h-4 w-4 mr-2" />
                      {post.bookmarked ? "Remove bookmark" : "Bookmark"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow {post.user.name}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Flag className="h-4 w-4 mr-2" />
                      Report post
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {/* Post content */}
              <p className="whitespace-pre-wrap mb-3">{post.content}</p>

              {/* Media content */}
              {post.media.length > 0 && (
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
                  ) : post.media.length === 2 ? (
                    <div className="grid grid-cols-2 gap-1">
                      {post.media.map((media) => (
                        <div key={media.id} className="relative rounded-lg overflow-hidden aspect-square">
                          {media.type === "image" ? (
                            <Image
                              src={media.url || "/placeholder.svg"}
                              alt="Post image"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="relative h-full">
                              <video
                                src={media.url}
                                className="w-full h-full object-cover"
                                poster="/placeholder.svg?height=150&width=150"
                              />
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
                        </div>
                      ))}
                    </div>
                  ) : post.media.length === 3 ? (
                    <div className="grid grid-cols-3 gap-1">
                      {post.media.map((media) => (
                        <div key={media.id} className="relative rounded-lg overflow-hidden aspect-square">
                          {media.type === "image" ? (
                            <Image
                              src={media.url || "/placeholder.svg"}
                              alt="Post image"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="relative h-full">
                              <video
                                src={media.url}
                                className="w-full h-full object-cover"
                                poster="/placeholder.svg?height=150&width=150"
                              />
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1">
                      {post.media.slice(0, 4).map((media, index) => (
                        <div key={media.id} className="relative rounded-lg overflow-hidden aspect-square">
                          {media.type === "image" ? (
                            <Image
                              src={media.url || "/placeholder.svg"}
                              alt="Post image"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="relative h-full">
                              <video
                                src={media.url}
                                className="w-full h-full object-cover"
                                poster="/placeholder.svg?height=150&width=150"
                              />
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
                          {index === 3 && post.media.length > 4 && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer">
                                  <span className="text-white text-xl font-bold">+{post.media.length - 4}</span>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>All Media</DialogTitle>
                                  <DialogDescription>
                                    {post.media.length} items from {post.user.name}'s post
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                  {post.media.map((media) => (
                                    <div key={media.id} className="relative rounded-lg overflow-hidden aspect-square">
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
                                          controls
                                          className="w-full h-full object-cover"
                                          poster="/placeholder.svg?height=150&width=150"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Interaction stats */}
              {(post.likes > 0 || post.comments.length > 0 || post.shares > 0) && (
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
                    {post.comments.length > 0 && <div>{post.comments.length} comments</div>}
                    {post.shares > 0 && <div>{post.shares} shares</div>}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-between border-t border-b py-1 mb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 ${post.liked ? "text-green-600" : "text-gray-500"}`}
                  onClick={() => handlePostInteraction(post.id, "like")}
                >
                  <Heart className={`h-4 w-4 mr-1 ${post.liked ? "fill-green-600" : ""}`} />
                  Like
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-gray-500"
                  onClick={() => toggleExpandComments(post.id)}
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

              {/* Comments section */}
              {(expandedComments[post.id] || post.comments.length > 0) && (
                <div className="space-y-3">
                  {/* Comment input */}
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.name || "Your profile"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex items-center space-x-2">
                      <Input
                        placeholder="Write a comment..."
                        value={commentText[post.id] || ""}
                        onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit(post.id)}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={!commentText[post.id]?.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Comments list */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3 pl-10">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                              <div className="font-medium text-sm">{comment.user.name}</div>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-xs mt-1 text-gray-500">
                              <button
                                className="hover:text-green-600"
                                onClick={() => handleLikeComment(post.id, comment.id)}
                              >
                                Like
                              </button>
                              <button className="hover:text-green-600">Reply</button>
                              <span>{comment.timestamp}</span>
                              {comment.likes > 0 && (
                                <div className="flex items-center">
                                  <ThumbsUp className="h-3 w-3 text-green-600 mr-1" />
                                  {comment.likes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Load More Posts
      </Button>
    </div>
  )
}
