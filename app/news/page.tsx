import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "Humanitarian Aid Reaches Gaza After Delays",
    description:
      "Aid trucks have finally been allowed to enter Gaza after weeks of blockade, bringing essential supplies to civilians.",
    date: "May 15, 2025",
    source: "Al Jazeera",
    category: "Humanitarian",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Global Protests Continue in Support of Palestine",
    description: "Hundreds of thousands march in major cities around the world calling for an end to the violence.",
    date: "May 14, 2025",
    source: "Middle East Eye",
    category: "Activism",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Medical Facilities in Gaza Face Critical Shortages",
    description:
      "Hospitals report severe shortages of medical supplies and fuel for generators as casualties continue to rise.",
    date: "May 13, 2025",
    source: "WHO Report",
    category: "Healthcare",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "UN General Assembly Passes Resolution on Palestine",
    description: "The resolution calls for immediate ceasefire and unrestricted humanitarian access.",
    date: "May 12, 2025",
    source: "United Nations",
    category: "Politics",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Economic Impact of Boycott Movements Growing",
    description:
      "Companies targeted by boycott campaigns report significant drops in sales across Middle East markets.",
    date: "May 11, 2025",
    source: "Financial Times",
    category: "Economy",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function NewsPage() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Latest News</h1>
      </div>

      <div className="space-y-4">
        {newsArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge>{article.category}</Badge>
              </div>
            </div>
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{article.date}</span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">{article.source}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <CardDescription>{article.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" size="sm" className="ml-auto" asChild>
                <Link href={article.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read Full Article
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Load More News
      </Button>
    </div>
  )
}
