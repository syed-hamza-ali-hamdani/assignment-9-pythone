"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Copy, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Mock data for daily duas
const duas = [
  {
    id: 1,
    arabic: "اللَّهُمَّ انْصُرْ إِخْوَانَنَا الْمُسْتَضْعَفِينَ فِي فِلَسْطِين",
    transliteration: "Allahumma-nsur ikhwānanal-mustaḍ'afīna fī filasṭīn",
    translation: "O Allah, grant victory to our oppressed brothers and sisters in Palestine",
    occasion: "For the oppressed",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ احْفَظْ أَهْلَنَا فِي فِلَسْطِين",
    transliteration: "Allahummahfadh ahlana fi filastin",
    translation: "O Allah, protect our people in Palestine",
    occasion: "For protection",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    arabic: "اللَّهُمَّ فَرِّجْ كَرْبَهُمْ وَنَفِّسْ هَمَّهُمْ",
    transliteration: "Allahumma farrij karbahum wa naffis hammahum",
    translation: "O Allah, relieve their distress and remove their worries",
    occasion: "For relief from hardship",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    arabic: "اللَّهُمَّ اشْفِ مَرْضَاهُمْ وَارْحَمْ شُهَدَاءَهُمْ",
    transliteration: "Allahumma-shfi mardahum warham shuhadā'ahum",
    translation: "O Allah, heal their sick and have mercy on their martyrs",
    occasion: "For healing and mercy",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    arabic: "اللَّهُمَّ كُنْ لَهُمْ وَلَا تَكُنْ عَلَيْهِمْ",
    transliteration: "Allahumma kun lahum wa la takun 'alayhim",
    translation: "O Allah, be for them and not against them",
    occasion: "For divine support",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    arabic: "اللَّهُمَّ ارْزُقْهُمْ الصَّبْرَ وَالثَّبَاتَ",
    transliteration: "Allahummar-zuqhum aṣ-ṣabra wath-thabāt",
    translation: "O Allah, grant them patience and steadfastness",
    occasion: "For patience",
    image: "/placeholder.svg?height=200&width=200",
  },
]

// DuasPage component - Shows daily prayers for Palestine
export default function DuasPage() {
  // Function to copy dua text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification here
  }

  // Function to share dua
  const shareDua = (dua: (typeof duas)[0]) => {
    if (navigator.share) {
      navigator.share({
        title: "Dua for Palestine",
        text: `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(`${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`)
      alert("Dua copied to clipboard!")
    }
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daily Duas</h1>
      </div>

      {/* Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-green-600 to-green-700">
          {/* Palestinian flag color strips at top */}
          <div className="absolute top-0 left-0 right-0 h-2 flex">
            <div className="w-1/4 bg-black"></div>
            <div className="w-1/4 bg-white"></div>
            <div className="w-1/4 bg-green-600"></div>
            <div className="w-1/4 bg-red-600"></div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <BookOpen className="h-12 w-12 text-white mb-2" />
            <h2 className="text-xl font-bold text-white">Prayers for Palestine</h2>
            <p className="text-white/90 text-sm max-w-md mt-1">
              Supplications to recite for our brothers and sisters in Palestine
            </p>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These supplications are meant to be recited with sincerity and focus. The best times for making dua are
            during the last third of the night, between the adhan and iqamah, while fasting, while traveling, and during
            prostration in prayer.
          </p>
        </CardContent>
      </Card>

      {/* Featured Dua */}
      <Card className="border-2 border-green-600">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 aspect-square">
              <Image src="/placeholder.svg?height=300&width=300" alt="Dua of the Day" fill className="object-cover" />
              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                Dua of the Day
              </div>
            </div>
            <div className="p-6 flex-1">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-medium">Dua for the Oppressed</h3>
              </div>
              <p className="text-xl font-arabic text-right leading-loose mb-4">
                اللَّهُمَّ انْصُرْ إِخْوَانَنَا الْمُسْتَضْعَفِينَ فِي فِلَسْطِين
              </p>
              <p className="text-sm italic mb-2">Allahumma-nsur ikhwānanal-mustaḍ'afīna fī filasṭīn</p>
              <p className="text-sm font-medium mb-4">
                O Allah, grant victory to our oppressed brothers and sisters in Palestine
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard("اللَّهُمَّ انْصُرْ إِخْوَانَنَا الْمُسْتَضْعَفِينَ فِي فِلَسْطِين")}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Arabic
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      "Allahumma-nsur ikhwānanal-mustaḍ'afīna fī filasṭīn\n\nO Allah, grant victory to our oppressed brothers and sisters in Palestine",
                    )
                  }
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Translation
                </Button>
                <Button variant="outline" size="sm" onClick={() => shareDua(duas[0])}>
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid of duas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {duas.slice(1).map((dua) => (
          <Card key={dua.id} className="overflow-hidden">
            <div className="p-4 bg-green-50 dark:bg-green-950/30 border-b flex items-start">
              <div className="flex-1">
                <h3 className="font-medium text-sm text-green-800 dark:text-green-300">{dua.occasion}</h3>
                <p className="text-xl mt-2 font-arabic text-right leading-loose">{dua.arabic}</p>
              </div>
            </div>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm italic">{dua.transliteration}</p>
              <p className="text-sm font-medium">{dua.translation}</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="text-xs" onClick={() => copyToClipboard(dua.arabic)}>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => shareDua(dua)}>
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional information */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium">About These Duas</h3>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            These supplications are selected from authentic Islamic sources and are particularly relevant for times of
            hardship and oppression. Making dua (supplication) is an important act of worship in Islam, and it is
            especially encouraged during times of difficulty.
          </p>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Remember to make dua with a present heart and firm belief that Allah will respond. The Prophet Muhammad
            (peace be upon him) said: "The supplication of every one of you is granted if he does not grow impatient."
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
