import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for Gaza updates
const gazaUpdates = [
  {
    id: 1,
    title: "Humanitarian Aid Reaches Northern Gaza",
    description:
      "Aid trucks have finally been allowed to enter northern Gaza after weeks of blockade, bringing essential supplies to civilians in desperate need. The convoy included food, water, and medical supplies.",
    date: "May 15, 2025",
    time: "14:30",
    source: "Al Jazeera",
    category: "Humanitarian",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: true,
  },
  {
    id: 2,
    title: "Medical Facilities Face Critical Shortages",
    description:
      "Hospitals report severe shortages of medical supplies and fuel for generators as casualties continue to rise. Doctors are performing surgeries without anesthesia and basic medical equipment.",
    date: "May 15, 2025",
    time: "10:15",
    source: "WHO Report",
    category: "Healthcare",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: true,
  },
  {
    id: 3,
    title: "Global Protests Continue in Support of Palestine",
    description:
      "Hundreds of thousands march in major cities around the world calling for an end to the violence. Demonstrations were held in London, New York, Paris, and many other cities.",
    date: "May 14, 2025",
    time: "18:45",
    source: "Middle East Eye",
    category: "Activism",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: false,
  },
  {
    id: 4,
    title: "UN General Assembly Passes Resolution",
    description:
      "The resolution calls for immediate ceasefire and unrestricted humanitarian access. The vote passed with a significant majority, though several countries abstained.",
    date: "May 14, 2025",
    time: "12:20",
    source: "United Nations",
    category: "Politics",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: false,
  },
  {
    id: 5,
    title: "Economic Impact of Boycott Movements Growing",
    description:
      "Companies targeted by boycott campaigns report significant drops in sales across Middle East markets. Several major corporations have seen their stock prices affected.",
    date: "May 13, 2025",
    time: "09:30",
    source: "Financial Times",
    category: "Economy",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: false,
  },
  {
    id: 6,
    title: "Water Crisis Worsens in Gaza",
    description:
      "Access to clean water has reached critically low levels, raising concerns about waterborne diseases. International organizations warn of a potential public health disaster.",
    date: "May 12, 2025",
    time: "16:45",
    source: "UNICEF",
    category: "Humanitarian",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: true,
  },
  {
    id: 7,
    title: "Children's Education Disrupted by Conflict",
    description:
      "Schools and universities remain closed as conflict continues to affect education. An entire generation of students is missing crucial educational opportunities.",
    date: "May 11, 2025",
    time: "11:20",
    source: "UNESCO",
    category: "Education",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: false,
  },
  {
    id: 8,
    title: "Journalists Face Increasing Dangers in Conflict Zone",
    description:
      "Press freedom organizations report growing threats to media workers covering the conflict. Several journalists have been injured or killed while reporting.",
    date: "May 10, 2025",
    time: "08:15",
    source: "Reporters Without Borders",
    category: "Media",
    link: "#",
    image: "/placeholder.svg?height=200&width=400",
    important: false,
  },
]

// UpdatesPage component - Shows latest news and updates from Gaza
export default function UpdatesPage() {
  // Get important updates
  const importantUpdates = gazaUpdates.filter((update) => update.important)

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gaza Live Updates</h1>
      </div>

      {/* Live updates banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg flex items-center">
        <div className="relative mr-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        </div>
        <div>
          <h2 className="font-bold">Live Updates</h2>
          <p className="text-sm text-white/80">Latest news and developments from Gaza</p>
        </div>
      </div>

      {/* Important updates section */}
      {importantUpdates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
            Critical Updates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {importantUpdates.slice(0, 2).map((update) => (
              <Card key={update.id} className="border-red-500 border-2 overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={update.image || "/placeholder.svg"} alt={update.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive">{update.category}</Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="destructive">Urgent</Badge>
                  </div>
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">
                      {update.date}, {update.time}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{update.source}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription>{update.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" className="ml-auto" asChild>
                    <Link href={update.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Read Full Article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Timeline of updates */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Recent Updates</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gazaUpdates.slice(0, 6).map((update, index) => (
            <Card key={update.id} className={index === 0 ? "border-green-600 border-2" : ""}>
              <div className="relative h-40 w-full">
                <Image src={update.image || "/placeholder.svg"} alt={update.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge
                    className={
                      update.category === "Humanitarian"
                        ? "bg-green-600"
                        : update.category === "Healthcare"
                          ? "bg-blue-600"
                          : update.category === "Activism"
                            ? "bg-purple-600"
                            : update.category === "Politics"
                              ? "bg-orange-600"
                              : update.category === "Education"
                                ? "bg-yellow-600"
                                : "bg-gray-600"
                    }
                  >
                    {update.category}
                  </Badge>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-600">Latest</Badge>
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{update.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">
                    {update.date}, {update.time}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{update.source}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <CardDescription className="line-clamp-3">{update.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="ml-auto" asChild>
                  <Link href={update.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Full Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">
        Load More Updates
      </Button>
    </div>
  )
}
