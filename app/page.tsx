import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, List, Heart, AlertCircle, ArrowRight, Globe, Ban } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// HomePage component - Main landing page of the application
export default function HomePage() {
  // Mock data for updates
  const updates = [
    {
      id: 1,
      title: "Humanitarian Aid Reaches Northern Gaza",
      description: "Aid trucks have finally been allowed to enter northern Gaza after weeks of blockade.",
      date: "May 15, 2025",
      category: "Humanitarian",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Medical Facilities Face Critical Shortages",
      description: "Hospitals report severe shortages of medical supplies and fuel for generators.",
      date: "May 14, 2025",
      category: "Healthcare",
      image: "https://www.pim.com.pk/wp-content/uploads/2017/09/healthcare.jpg?height=200&width=400",
    },
    {
      id: 3,
      title: "Global Protests Continue in Support",
      description: "Hundreds of thousands march in major cities around the world calling for peace.",
      date: "May 13, 2025",
      category: "Activism",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1790170122.jpg?c=original?height=200&width=400",
    },
  ]

  // Mock data for boycotted brands
  const boycottedBrands = [
    {
      id: 1,
      name: "Coca-Cola",
      category: "Beverages",
      logo: "/placeholder.svg?height=60&width=60",
      reason: "Supports occupation through investments",
    },
    {
      id: 2,
      name: "McDonald's",
      category: "Fast Food",
      logo: "/placeholder.svg?height=60&width=60",
      reason: "Financial support to occupation",
    },
    {
      id: 3,
      name: "Nestlé",
      category: "Food & Beverages",
      logo: "/placeholder.svg?height=60&width=60",
      reason: "Operations in occupied territories",
    },
    {
      id: 4,
      name: "Starbucks",
      category: "Beverages",
      logo: "/placeholder.svg?height=60&width=60",
      reason: "Financial ties to occupation",
    },
  ]

  // Mock data for daily duas
  const dailyDua = {
    arabic: "اللَّهُمَّ انْصُرْ إِخْوَانَنَا الْمُسْتَضْعَفِينَ فِي فِلَسْطِين",
    transliteration: "Allahumma-nsur ikhwānanal-mustaḍ'afīna fī filasṭīn",
    translation: "O Allah, grant victory to our oppressed brothers and sisters in Palestine",
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        {/* Hero background with overlay */}
        <div className="relative h-[600px] w-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Palestine Support"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>

          {/* Palestinian flag color strips at top */}
          <div className="absolute top-0 left-0 right-0 h-4 flex">
            <div className="w-1/4 bg-black"></div>
            <div className="w-1/4 bg-white"></div>
            <div className="w-1/4 bg-green-600"></div>
            <div className="w-1/4 bg-red-600"></div>
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 container mx-auto">
          <Badge className="bg-red-600 mb-4 py-1 px-4 text-white">Stand With Palestine</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl">
            Support Palestine Through Awareness & Action
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8">
            Join the global movement to support Palestine through boycotts, donations, and raising awareness. Together
            we can make a difference.
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" asChild>
              <Link href="/scanner">
                <Search className="h-5 w-5 mr-2" />
                Scan Products
              </Link>
            </Button>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" asChild>
              <Link href="/donate">
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/brands">
                <Ban className="h-5 w-5 mr-2" />
                Boycott List
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="container px-4 mx-auto space-y-16">
        {/* Alert banner for important updates */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start">
          <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-800 text-lg">Urgent: Humanitarian Crisis Continues</h3>
            <p className="text-red-700 mt-2">
              The humanitarian situation in Gaza remains critical with shortages of food, water, and medical supplies.
              Your support through donations and boycotts is more important than ever.
            </p>
            <Button variant="outline" className="mt-4 border-red-600 text-red-600 hover:bg-red-50" asChild>
              <Link href="/donate">
                How You Can Help <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How You Can Support Palestine</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our app provides multiple ways to support the Palestinian cause through practical actions and awareness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="border-2 border-green-600 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-4 px-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Scan Products</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Scan barcodes to check if products are from companies that should be boycotted.
                </p>
                <Button variant="link" className="text-green-600 mt-auto" asChild>
                  <Link href="/scanner">
                    Open Scanner <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-red-600 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-4 px-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
                  <List className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Boycott List</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  View comprehensive lists of companies and products to boycott with alternatives.
                </p>
                <Button variant="link" className="text-red-600 mt-auto" asChild>
                  <Link href="/brands">
                    View List <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-black dark:border-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-4 px-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="font-bold text-xl mb-2">Stay Informed</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Get the latest updates on the situation in Gaza and global solidarity movements.
                </p>
                <Button variant="link" className="text-gray-900 dark:text-gray-100 mt-auto" asChild>
                  <Link href="/updates">
                    Latest Updates <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 border-green-600 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-4 px-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Donate</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Support trusted organizations providing humanitarian aid to Palestinians.
                </p>
                <Button variant="link" className="text-green-600 mt-auto" asChild>
                  <Link href="/donate">
                    Donate Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Scanner Highlight Section */}
        <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="bg-green-600 mb-4">Featured Tool</Badge>
              <h2 className="text-3xl font-bold mb-4">Barcode Scanner</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our advanced barcode scanner helps you make informed purchasing decisions. Simply scan a product barcode
                or upload an image to:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Globe className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span>Identify the product's country of origin</span>
                </li>
                <li className="flex items-start">
                  <Ban className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                  <span>Check if it's from a company that should be boycotted</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                  <span>Get automatic alerts for Israeli products</span>
                </li>
                <li className="flex items-start">
                  <Heart className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span>Find ethical alternatives to boycotted products</span>
                </li>
              </ul>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/scanner">
                  Try the Scanner <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Barcode Scanner" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-bold text-xl">Scan any product barcode</p>
                  <p className="text-sm text-white/80">Instantly know if you should boycott it</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Updates Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Latest Updates</h2>
            <Link href="/updates" className="text-green-600 hover:text-green-700 flex items-center">
              View all updates
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((update) => (
              <Card key={update.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={update.image || "/placeholder.svg"} alt={update.title} fill className="object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-600">{update.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="text-sm text-gray-500 mb-2">{update.date}</div>
                  <h3 className="font-bold text-xl mb-2">{update.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{update.description}</p>
                  <Link
                    href={`/updates#${update.id}`}
                    className="text-green-600 hover:text-green-700 font-medium flex items-center"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Boycott Brands Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Boycott These Brands</h2>
            <Link href="/brands" className="text-red-600 hover:text-red-700 flex items-center">
              View full list
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {boycottedBrands.map((brand) => (
              <Card key={brand.id} className="hover:shadow-lg transition-shadow border-red-200">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 mb-4">
                    <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      Boycott
                    </div>
                  </div>
                  <h3 className="font-bold mb-1">{brand.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{brand.category}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{brand.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Daily Dua Section */}
        <section className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-8">
          <div className="flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-green-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Daily Dua for Palestine</h2>
            <div className="max-w-2xl">
              <p className="text-2xl font-arabic text-right leading-loose mb-4">{dailyDua.arabic}</p>
              <p className="text-lg italic text-gray-600 dark:text-gray-400 mb-2">{dailyDua.transliteration}</p>
              <p className="text-lg font-medium mb-6">{dailyDua.translation}</p>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50" asChild>
                <Link href="/duas">
                  View More Duas <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section>
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-full min-h-[300px]">
                <Image src="/placeholder.svg?height=400&width=600" alt="Community" fill className="object-cover" />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="bg-green-600 mb-4 w-fit">Join Us</Badge>
                <h2 className="text-3xl font-bold mb-4">Be Part of Our Community</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Connect with others supporting Palestine. Share updates, resources, and organize local events.
                  Together our voices are stronger and our impact greater.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/community">Join Community</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth">Sign Up</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
