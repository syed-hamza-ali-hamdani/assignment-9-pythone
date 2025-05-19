"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for boycotted brands
const boycottedBrands = [
  {
    id: 1,
    name: "Coca-Cola",
    category: "Beverages",
    reason: "Supports occupation through investments and operations",
    alternatives: ["Local soda brands", "Water", "Homemade beverages"],
  },
  {
    id: 2,
    name: "McDonald's",
    category: "Fast Food",
    reason: "Financial support to occupation",
    alternatives: ["Local restaurants", "Independent food vendors"],
  },
  {
    id: 3,
    name: "Nestlé",
    category: "Food & Beverages",
    reason: "Operations in occupied territories",
    alternatives: ["Local food brands", "Ethical food companies"],
  },
  {
    id: 4,
    name: "Starbucks",
    category: "Beverages",
    reason: "Financial ties to occupation",
    alternatives: ["Local coffee shops", "Independent cafes"],
  },
  {
    id: 5,
    name: "HP",
    category: "Technology",
    reason: "Provides technology for checkpoints and surveillance",
    alternatives: ["Lenovo", "Acer", "Local tech brands"],
  },
  {
    id: 6,
    name: "Puma",
    category: "Clothing",
    reason: "Sponsors teams in occupied territories",
    alternatives: ["Adidas", "New Balance", "Local clothing brands"],
  },
  {
    id: 7,
    name: "Airbnb",
    category: "Hospitality",
    reason: "Listings in illegal settlements",
    alternatives: ["Local hotels", "Booking.com", "Independent accommodations"],
  },
  {
    id: 8,
    name: "Caterpillar",
    category: "Construction",
    reason: "Equipment used for demolitions",
    alternatives: ["Komatsu", "Local construction equipment"],
  },
]

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories for filter
  const categories = Array.from(new Set(boycottedBrands.map((brand) => brand.category)))

  // Filter brands based on search term and selected category
  const filteredBrands = boycottedBrands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? brand.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Boycott List</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search brands..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setSearchTerm("")}>
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <Card key={brand.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{brand.name}</h3>
                    <Badge variant="outline" className="mt-1">
                      {brand.category}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Why boycott:</span> {brand.reason}
                </p>
                <div className="mt-2">
                  <span className="text-sm font-medium">Alternatives:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {brand.alternatives.map((alt, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No brands found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
