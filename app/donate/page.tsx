import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for donation organizations
const organizations = [
  {
    id: 1,
    name: "Palestine Children's Relief Fund",
    description: "Providing medical and humanitarian aid to injured and sick children",
    link: "https://www.pcrf.net/",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    name: "Medical Aid for Palestinians",
    description: "Providing medical aid to Palestinians living under occupation and as refugees",
    link: "https://www.map.org.uk/",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 3,
    name: "UNRWA",
    description: "UN agency supporting Palestinian refugees with education, healthcare, and social services",
    link: "https://www.unrwa.org/",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 4,
    name: "Islamic Relief",
    description: "Providing emergency aid and long-term development projects",
    link: "https://www.islamic-relief.org/",
    image: "/placeholder.svg?height=100&width=200",
  },
]

export default function DonatePage() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Donate</h1>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <Heart className="h-12 w-12 mx-auto text-red-500" />
            <h2 className="text-xl font-bold">Support Palestine</h2>
            <p className="text-sm text-gray-500">
              Your donations can make a real difference in the lives of Palestinians facing humanitarian crisis. Below
              are trusted organizations working directly to provide aid.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {organizations.map((org) => (
          <Card key={org.id}>
            <CardHeader className="p-4 pb-0">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-md overflow-hidden">
                  <Image src={org.image || "/placeholder.svg"} alt={org.name} fill className="object-cover" />
                </div>
                <div>
                  <CardTitle className="text-lg">{org.name}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <CardDescription>{org.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" asChild>
                <Link href={org.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Donate Now
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium">Donation Tips</h3>
          <ul className="text-sm mt-2 space-y-2 list-disc list-inside">
            <li>Verify the organization is registered and legitimate</li>
            <li>Check that donations go directly to aid, not administrative costs</li>
            <li>Consider recurring donations for sustained support</li>
            <li>Share donation links with friends and family to increase impact</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
