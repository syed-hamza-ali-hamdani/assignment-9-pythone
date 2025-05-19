"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  SearchIcon,
  X,
  Check,
  Filter,
  ArrowRight,
  Ban,
  Globe,
  Tag,
  ShoppingBag,
  Building,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

// Types
interface Product {
  id: number
  name: string
  category: string
  barcode?: string
  manufacturer: string
  country: string
  countryCode: string
  boycott: boolean
  reason?: string
  alternatives?: string[]
  image?: string
  popularity: number
}

interface Brand {
  id: number
  name: string
  category: string
  reason: string
  alternatives: string[]
  products: string[]
  logo?: string
  popularity: number
}

interface SearchHistory {
  id: string
  term: string
  timestamp: Date
  type: "product" | "brand" | "general"
}

// Mock data for boycotted brands
const boycottedBrands: Brand[] = [
  {
    id: 1,
    name: "Coca-Cola",
    category: "Beverages",
    reason: "Supports occupation through investments and operations",
    alternatives: ["Local soda brands", "Water", "Homemade beverages"],
    products: ["Coca-Cola", "Sprite", "Fanta", "Diet Coke", "Coke Zero"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 95,
  },
  {
    id: 2,
    name: "McDonald's",
    category: "Fast Food",
    reason: "Financial support to occupation",
    alternatives: ["Local restaurants", "Independent food vendors"],
    products: ["Big Mac", "McChicken", "Happy Meal", "McNuggets"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 90,
  },
  {
    id: 3,
    name: "Nestlé",
    category: "Food & Beverages",
    reason: "Operations in occupied territories",
    alternatives: ["Local food brands", "Ethical food companies"],
    products: ["Nescafé", "KitKat", "Nesquik", "Maggi", "Purina", "Perrier"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 85,
  },
  {
    id: 4,
    name: "Starbucks",
    category: "Beverages",
    reason: "Financial ties to occupation",
    alternatives: ["Local coffee shops", "Independent cafes"],
    products: ["Coffee", "Frappuccino", "Cold Brew", "Espresso"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 80,
  },
  {
    id: 5,
    name: "HP",
    category: "Technology",
    reason: "Provides technology for checkpoints and surveillance",
    alternatives: ["Lenovo", "Acer", "Local tech brands"],
    products: ["Laptops", "Printers", "Ink", "Monitors"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 75,
  },
  {
    id: 6,
    name: "Puma",
    category: "Clothing",
    reason: "Sponsors teams in occupied territories",
    alternatives: ["Adidas", "New Balance", "Local clothing brands"],
    products: ["Shoes", "Sportswear", "T-shirts", "Accessories"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 70,
  },
  {
    id: 7,
    name: "Sabra",
    category: "Food",
    reason: "Partially owned by the Strauss Group, which supports Israeli military",
    alternatives: ["Homemade hummus", "Local brands", "Other dip varieties"],
    products: ["Hummus", "Guacamole", "Salsa"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 65,
  },
  {
    id: 8,
    name: "SodaStream",
    category: "Beverages",
    reason: "Headquarters in illegal settlement territory",
    alternatives: ["Traditional soda", "Homemade carbonated drinks"],
    products: ["Sparkling water makers", "Carbonation bottles", "Flavors"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 60,
  },
  {
    id: 9,
    name: "Airbnb",
    category: "Travel",
    reason: "Listings in illegal settlements",
    alternatives: ["Local hotels", "Alternative booking platforms"],
    products: ["Accommodation bookings", "Experiences"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 55,
  },
  {
    id: 10,
    name: "Caterpillar",
    category: "Construction",
    reason: "Provides bulldozers used for home demolitions",
    alternatives: ["Other construction equipment brands"],
    products: ["Bulldozers", "Construction equipment", "Work boots"],
    logo: "/placeholder.svg?height=60&width=60",
    popularity: 50,
  },
]

// Mock data for products
const products: Product[] = [
  {
    id: 1,
    name: "Coca-Cola Classic",
    category: "Beverages",
    barcode: "5449000000996",
    manufacturer: "The Coca-Cola Company",
    country: "United States",
    countryCode: "US",
    boycott: true,
    reason: "Parent company supports occupation",
    alternatives: ["Local soda brands", "Water", "Homemade beverages"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 95,
  },
  {
    id: 2,
    name: "Sprite",
    category: "Beverages",
    barcode: "5449000131805",
    manufacturer: "The Coca-Cola Company",
    country: "United States",
    countryCode: "US",
    boycott: true,
    reason: "Parent company supports occupation",
    alternatives: ["Local soda brands", "Water", "Homemade beverages"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 90,
  },
  {
    id: 3,
    name: "KitKat",
    category: "Confectionery",
    barcode: "7613035260122",
    manufacturer: "Nestlé",
    country: "Switzerland",
    countryCode: "CH",
    boycott: true,
    reason: "Parent company has operations in occupied territories",
    alternatives: ["Local chocolate brands", "Ethical chocolate companies"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 85,
  },
  {
    id: 4,
    name: "Nescafé Gold",
    category: "Beverages",
    barcode: "7613036932769",
    manufacturer: "Nestlé",
    country: "Switzerland",
    countryCode: "CH",
    boycott: true,
    reason: "Parent company has operations in occupied territories",
    alternatives: ["Local coffee brands", "Fair trade coffee"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 80,
  },
  {
    id: 5,
    name: "Sabra Hummus",
    category: "Food",
    barcode: "040822011058",
    manufacturer: "Sabra Dipping Co.",
    country: "United States",
    countryCode: "US",
    boycott: true,
    reason: "Partially owned by the Strauss Group, which supports Israeli military",
    alternatives: ["Homemade hummus", "Local brands", "Other dip varieties"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 75,
  },
  {
    id: 6,
    name: "HP Laptop",
    category: "Technology",
    barcode: "889899374795",
    manufacturer: "HP Inc.",
    country: "United States",
    countryCode: "US",
    boycott: true,
    reason: "Company provides technology for checkpoints and surveillance",
    alternatives: ["Lenovo", "Acer", "Local tech brands"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 70,
  },
  {
    id: 7,
    name: "Puma Running Shoes",
    category: "Clothing",
    barcode: "4056969794513",
    manufacturer: "Puma",
    country: "Germany",
    countryCode: "DE",
    boycott: true,
    reason: "Sponsors teams in occupied territories",
    alternatives: ["Adidas", "New Balance", "Local clothing brands"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 65,
  },
  {
    id: 8,
    name: "SodaStream Fizzi",
    category: "Beverages",
    barcode: "7290014679658",
    manufacturer: "SodaStream",
    country: "Israel",
    countryCode: "IL",
    boycott: true,
    reason: "Headquarters in illegal settlement territory",
    alternatives: ["Traditional soda", "Homemade carbonated drinks"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 60,
  },
  {
    id: 9,
    name: "Dates from Jordan",
    category: "Food",
    barcode: "6254001234567",
    manufacturer: "Jordan Valley Farms",
    country: "Jordan",
    countryCode: "JO",
    boycott: false,
    image: "/placeholder.svg?height=200&width=200",
    popularity: 55,
  },
  {
    id: 10,
    name: "Turkish Coffee",
    category: "Beverages",
    barcode: "8690504012345",
    manufacturer: "Turkish Coffee Co.",
    country: "Turkey",
    countryCode: "TR",
    boycott: false,
    image: "/placeholder.svg?height=200&width=200",
    popularity: 50,
  },
  {
    id: 11,
    name: "Palestinian Olive Oil",
    category: "Food",
    barcode: "6255001234567",
    manufacturer: "Palestine Fair Trade",
    country: "Palestine",
    countryCode: "PS",
    boycott: false,
    image: "/placeholder.svg?height=200&width=200",
    popularity: 45,
  },
  {
    id: 12,
    name: "Malaysian Chocolate",
    category: "Confectionery",
    barcode: "9556001234567",
    manufacturer: "Malaysian Cocoa Board",
    country: "Malaysia",
    countryCode: "MY",
    boycott: false,
    image: "/placeholder.svg?height=200&width=200",
    popularity: 40,
  },
  {
    id: 13,
    name: "Israeli Dates",
    category: "Food",
    barcode: "7290001234567",
    manufacturer: "Israeli Agricultural Co.",
    country: "Israel",
    countryCode: "IL",
    boycott: true,
    reason: "Product from Israel",
    alternatives: ["Dates from Jordan", "Dates from Tunisia", "Dates from Algeria"],
    image: "/placeholder.svg?height=200&width=200",
    popularity: 35,
  },
  {
    id: 14,
    name: "Indonesian Coffee",
    category: "Beverages",
    barcode: "8997001234567",
    manufacturer: "Indonesian Coffee Producers",
    country: "Indonesia",
    countryCode: "ID",
    boycott: false,
    image: "/placeholder.svg?height=200&width=200",
    popularity: 30,
  },
  {
    id: 15,
    name: "Lebanese Tahini",
    category: "Food",
    barcode: "6281001234567",
    manufacturer: "Lebanese Food Co.",
    country: "Lebanon",
    countryCode: "LB",
    boycott: false,
    image: "/placeholder.svg?height=200&width=200",
    popularity: 25,
  },
]

// Flatten products for search
const allProducts = boycottedBrands.flatMap((brand) =>
  brand.products.map((product) => ({
    product,
    brandId: brand.id,
    brandName: brand.name,
  })),
)

// Search page component
export default function SearchPage() {
  // Get search params from URL
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialCategory = searchParams.get("category") || "all"
  const router = useRouter()

  // State variables
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchProgress, setSearchProgress] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [popularSearches] = useState<string[]>([
    "Coca-Cola",
    "Nestlé",
    "McDonald's",
    "Israeli products",
    "Hummus",
    "Coffee",
    "Chocolate",
    "Alternatives",
  ])

  const searchInputRef = useRef<HTMLInputElement>(null)

  // Effect to load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        // Convert date strings back to Date objects
        const convertedHistory = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }))
        setSearchHistory(convertedHistory)

        // Extract recent searches
        const recent = convertedHistory
          .sort(
            (a: SearchHistory, b: SearchHistory) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
          )
          .slice(0, 5)
          .map((item: SearchHistory) => item.term)

        setRecentSearches([...new Set(recent)])
      } catch (error) {
        console.error("Failed to parse search history:", error)
      }
    }
  }, [])

  // Effect to perform search when URL params change
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, initialCategory as string)
    }
  }, [initialQuery, initialCategory])

  // Get unique categories
  const categories = Array.from(
    new Set([...products.map((p) => p.category), ...boycottedBrands.map((b) => b.category)]),
  )

  // Get unique countries
  const countries = Array.from(new Set(products.map((p) => p.country)))

  // Handle search
  const handleSearch = async (term = searchTerm, category = selectedCategory) => {
    if (!term.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setSearchProgress(0)
    setHasSearched(true)

    // Update URL with search params
    const params = new URLSearchParams()
    params.set("q", term)
    if (category !== "all") {
      params.set("category", category)
    }
    router.push(`/search?${params.toString()}`, { scroll: false })

    // Simulate search progress
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 100)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const normalizedTerm = term.toLowerCase()

      // Search in brands
      let brandResults = boycottedBrands.filter((brand) => {
        if (category !== "all" && category !== "brands" && brand.category !== category) {
          return false
        }

        return (
          brand.name.toLowerCase().includes(normalizedTerm) ||
          brand.category.toLowerCase().includes(normalizedTerm) ||
          brand.products.some((p) => p.toLowerCase().includes(normalizedTerm))
        )
      })

      // Apply country filter if selected
      let productResults = products.filter((product) => {
        if (category !== "all" && category !== "products" && product.category !== category) {
          return false
        }

        if (selectedCountries.length > 0 && !selectedCountries.includes(product.country)) {
          return false
        }

        if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
          return false
        }

        return (
          product.name.toLowerCase().includes(normalizedTerm) ||
          product.category.toLowerCase().includes(normalizedTerm) ||
          product.manufacturer.toLowerCase().includes(normalizedTerm) ||
          product.country.toLowerCase().includes(normalizedTerm) ||
          (product.barcode && product.barcode.includes(normalizedTerm))
        )
      })

      // Apply sorting
      if (sortBy === "popularity") {
        brandResults = brandResults.sort((a, b) => b.popularity - a.popularity)
        productResults = productResults.sort((a, b) => b.popularity - a.popularity)
      } else if (sortBy === "name_asc") {
        brandResults = brandResults.sort((a, b) => a.name.localeCompare(b.name))
        productResults = productResults.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortBy === "name_desc") {
        brandResults = brandResults.sort((a, b) => b.name.localeCompare(a.name))
        productResults = productResults.sort((a, b) => b.name.localeCompare(a.name))
      }

      // Combine results
      const combinedResults = [
        ...brandResults.map((brand) => ({ type: "brand", data: brand })),
        ...productResults.map((product) => ({ type: "product", data: product })),
      ]

      // Save search to history
      const newSearch: SearchHistory = {
        id: `search-${Date.now()}`,
        term,
        timestamp: new Date(),
        type: category === "brands" ? "brand" : category === "products" ? "product" : "general",
      }

      const updatedHistory = [newSearch, ...searchHistory].slice(0, 50) // Keep last 50 searches
      setSearchHistory(updatedHistory)
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory))

      // Update recent searches
      const updatedRecent = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5)
      setRecentSearches(updatedRecent)

      setSearchResults(combinedResults)
      setSearchProgress(100)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
      clearInterval(interval)
    }
  }

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    handleSearch(searchTerm, category)
  }

  // Handle country filter toggle
  const handleCountryToggle = (country: string) => {
    setSelectedCountries((prev) => {
      if (prev.includes(country)) {
        return prev.filter((c) => c !== country)
      } else {
        return [...prev, country]
      }
    })
  }

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setHasSearched(false)
    router.push("/search")
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Get flag emoji
  const getFlagEmoji = (countryCode: string) => {
    return countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      .join("")
  }

  // Filter results by tab
  const filteredResults =
    activeTab === "all" ? searchResults : searchResults.filter((result) => result.type === activeTab)

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Search</h1>
      </div>

      {/* Search info card */}
      <Card className="border-l-4 border-l-green-600">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <SearchIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-1">Boycott Search Engine</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Search for products or brands to check if they should be boycotted. Enter a product name, company name,
                barcode, or country of origin.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search bar */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            ref={searchInputRef}
            placeholder="Search products, brands, or barcodes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {searchTerm && (
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={clearSearch}>
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
        <div className="flex space-x-2">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="brands">Brands</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => handleSearch()} className="bg-green-600 hover:bg-green-700">
            Search
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-gray-100 dark:bg-gray-800" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search progress */}
      {isSearching && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Searching...</span>
            <span>{Math.round(searchProgress)}%</span>
          </div>
          <Progress value={searchProgress} className="h-1" />
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
            <CardDescription>Refine your search results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sort options */}
              <div>
                <h3 className="font-medium mb-2">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Country filter */}
              <div>
                <h3 className="font-medium mb-2">Filter by Country</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {countries.map((country) => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox
                        id={`country-${country}`}
                        checked={selectedCountries.includes(country)}
                        onCheckedChange={() => handleCountryToggle(country)}
                      />
                      <label htmlFor={`country-${country}`} className="text-sm flex items-center cursor-pointer">
                        <span className="mr-1">
                          {getFlagEmoji(products.find((p) => p.country === country)?.countryCode || "XX")}
                        </span>
                        {country}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category filter */}
              <div>
                <h3 className="font-medium mb-2">Filter by Category</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCountries([])
                setSelectedCategories([])
                setSortBy("relevance")
              }}
            >
              Reset Filters
            </Button>
            <Button onClick={() => handleSearch()} className="bg-green-600 hover:bg-green-700">
              Apply Filters
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Recent and popular searches */}
      {!hasSearched && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        setSearchTerm(term)
                        handleSearch(term)
                      }}
                    >
                      <SearchIcon className="h-3 w-3 mr-1" />
                      {term}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Popular searches */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Popular Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setSearchTerm(term)
                      handleSearch(term)
                    }}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {term}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search results */}
      {hasSearched && (
        <div className="space-y-4">
          {/* Results count */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">
              {isSearching ? "Searching..." : `${filteredResults.length} results for "${searchTerm}"`}
            </h2>
            {searchResults.length > 0 && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="brand">Brands</TabsTrigger>
                  <TabsTrigger value="product">Products</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>

          {/* No results message */}
          {!isSearching && filteredResults.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mt-4">No Boycott Items Found</h2>
              <p className="text-sm mt-2 max-w-md mx-auto">
                The search term "{searchTerm}" did not match any boycotted products or brands in our database. It may be
                safe to purchase, but always double-check with other sources.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Brand results */}
              {filteredResults.filter((result) => result.type === "brand").length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Building className="h-5 w-5 mr-2 text-gray-500" />
                    Brands
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredResults
                      .filter((result) => result.type === "brand")
                      .map((result, index) => (
                        <Card key={index} className="border-l-4 border-l-red-600 overflow-hidden">
                          <div className="flex p-4">
                            <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                              <Image
                                src={result.data.logo || "/placeholder.svg?height=64&width=64"}
                                alt={result.data.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold">{result.data.name}</h3>
                                  <Badge variant="outline" className="mt-1">
                                    {result.data.category}
                                  </Badge>
                                </div>
                                <Badge variant="destructive">Boycott</Badge>
                              </div>
                              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Why boycott:</span> {result.data.reason}
                              </p>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-4 border-t">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="products" className="border-none">
                                <AccordionTrigger className="py-1 text-sm">
                                  Products ({result.data.products.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {result.data.products.map((product: string, i: number) => (
                                      <Badge key={i} variant="secondary" className="text-xs">
                                        {product}
                                      </Badge>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="alternatives" className="border-none">
                                <AccordionTrigger className="py-1 text-sm">
                                  Alternatives ({result.data.alternatives.length})
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {result.data.alternatives.map((alt: string, i: number) => (
                                      <Badge
                                        key={i}
                                        variant="outline"
                                        className="text-xs bg-green-50 dark:bg-green-900/20"
                                      >
                                        {alt}
                                      </Badge>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              )}

              {/* Product results */}
              {filteredResults.filter((result) => result.type === "product").length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2 text-gray-500" />
                    Products
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredResults
                      .filter((result) => result.type === "product")
                      .map((result, index) => (
                        <Card
                          key={index}
                          className={`overflow-hidden ${
                            result.data.boycott ? "border-l-4 border-l-red-600" : "border-l-4 border-l-green-600"
                          }`}
                        >
                          <div className="flex p-4">
                            <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                              <Image
                                src={result.data.image || "/placeholder.svg?height=64&width=64"}
                                alt={result.data.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-bold">{result.data.name}</h3>
                                  <div className="flex items-center mt-1 space-x-2">
                                    <Badge variant="outline">{result.data.category}</Badge>
                                    <span className="text-xs text-gray-500 flex items-center">
                                      <Globe className="h-3 w-3 mr-1" />
                                      {getFlagEmoji(result.data.countryCode)} {result.data.country}
                                    </span>
                                  </div>
                                </div>
                                {result.data.boycott ? (
                                  <Badge variant="destructive">Boycott</Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                                  >
                                    Safe
                                  </Badge>
                                )}
                              </div>
                              {result.data.boycott && (
                                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">Why boycott:</span> {result.data.reason}
                                </p>
                              )}
                              {result.data.barcode && (
                                <p className="text-xs mt-2 text-gray-500 font-mono">Barcode: {result.data.barcode}</p>
                              )}
                            </div>
                          </div>
                          {result.data.boycott && result.data.alternatives && (
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 border-t">
                              <div className="text-sm font-medium mb-1">Alternatives:</div>
                              <div className="flex flex-wrap gap-1">
                                {result.data.alternatives.map((alt: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20">
                                    {alt}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search tips */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Search Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                  <SearchIcon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Search by Brand Name</h3>
                  <p className="text-xs text-gray-500">
                    Enter a company name like "Coca-Cola" or "Nestlé" to see if it's on the boycott list
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                  <ShoppingBag className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Search by Product Name</h3>
                  <p className="text-xs text-gray-500">
                    Enter specific product names like "KitKat" or "Sprite" to check their status
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                  <Globe className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Search by Country</h3>
                  <p className="text-xs text-gray-500">
                    Enter a country name like "Israel" to find products from that country
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-2">
                  <Ban className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Check Alternatives</h3>
                  <p className="text-xs text-gray-500">
                    For boycotted products, we provide ethical alternatives you can use instead
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan barcode card */}
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 md:mr-6">
              <h3 className="font-bold text-lg mb-2">Can't find what you're looking for?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Use our barcode scanner to instantly check if a product should be boycotted by scanning its barcode.
              </p>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/scanner">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Open Barcode Scanner
                </Link>
              </Button>
            </div>
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <Image
                src="/placeholder.svg?height=160&width=160&text=Scan"
                alt="Barcode Scanner"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Boycott information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
            Important Boycott Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            The BDS (Boycott, Divestment, Sanctions) movement calls for boycotting companies that profit from or
            contribute to the occupation and human rights violations. Here's why your consumer choices matter:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-medium text-sm mb-2">Economic Impact</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Boycotts put economic pressure on companies that support or profit from occupation, forcing them to
                reconsider their involvement.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-medium text-sm mb-2">Raising Awareness</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                By boycotting and explaining why to others, you help raise awareness about the situation and encourage
                more people to take action.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-medium text-sm mb-2">Supporting Alternatives</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Choosing ethical alternatives helps support businesses that respect human rights and international law.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/brands">
              View Complete Boycott List
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
