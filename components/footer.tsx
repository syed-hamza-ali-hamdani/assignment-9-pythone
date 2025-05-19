import Link from "next/link"
import {
  Heart,
  Github,
  Twitter,
  Instagram,
  Facebook,
  ExternalLink,
  Mail,
  MapPin,
  Youtube,
  Calendar,
  BookOpen,
  DollarSign,
  Headphones,
  Newspaper,
  Info,
  Ban,
  Search,
  Users,
  Globe,
  Flag,
  Camera,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white to-green-50 dark:from-gray-950 dark:to-green-950/20 pt-16 pb-6">
      {/* Palestinian flag color strip */}
      <div className="flex w-full h-2 mb-10">
        <div className="w-1/4 bg-black"></div>
        <div className="w-1/4 bg-white"></div>
        <div className="w-1/4 bg-green-600"></div>
        <div className="w-1/4 bg-red-600"></div>
      </div>

      <div className="container px-4 mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex space-x-1">
                <div className="w-3 h-6 bg-black"></div>
                <div className="w-3 h-6 bg-white border border-gray-300 dark:border-gray-700"></div>
                <div className="w-3 h-6 bg-green-600"></div>
                <div className="w-3 h-6 bg-red-600"></div>
              </div>
              <span className="font-bold text-xl">Palestine Support</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Supporting Palestine through awareness, boycotts, and donations. Together we can make a difference in the
              struggle for justice and human rights.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <Link
                href="https://twitter.com/palestinesupport"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com/palestinesupport"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://facebook.com/palestinesupport"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://youtube.com/palestinesupport"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="https://github.com/palestinesupport"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-green-700 dark:text-green-500">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <Info className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Home
              </Link>
              <Link
                href="/updates"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <Newspaper className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Gaza Updates
              </Link>
              <Link
                href="/brands"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <Ban className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Boycott Brands
              </Link>
              <Link
                href="/scanner"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <Camera className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Barcode Scanner
              </Link>
              <Link
                href="/community"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <Users className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Community
              </Link>
              <Link
                href="/duas"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <BookOpen className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Daily Duas
              </Link>
              <Link
                href="/donate"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <DollarSign className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Donate
              </Link>
              <Link
                href="/search"
                className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
              >
                <Search className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                Search Products
              </Link>
            </div>
          </div>

          {/* Column 3: Support Organizations */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-green-700 dark:text-green-500">Support Organizations</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.pcrf.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                  Palestine Children's Relief Fund
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.map.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                  Medical Aid for Palestinians
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.unrwa.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                  UNRWA
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.islamic-relief.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                  Islamic Relief
                </Link>
              </li>
              <li>
                <Link
                  href="https://bdsmovement.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2 text-green-600 dark:text-green-500" />
                  BDS Movement
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-green-700 dark:text-green-500">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on Palestine and ways to help.
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white dark:bg-gray-800 border-green-200 dark:border-green-800 focus-visible:ring-green-500"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700">Subscribe</Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">contact@palestinesupport.org</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">Global Movement</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">+1 (123) 456-7890</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Organizations */}
        <div className="mb-16">
          <h3 className="font-bold text-lg mb-6 text-center text-green-700 dark:text-green-500">
            Featured Organizations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="relative h-16 w-32 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={`/placeholder.svg?height=64&width=128&text=Partner ${i}`}
                    alt={`Partner ${i}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="font-bold text-lg mb-6 text-center text-green-700 dark:text-green-500">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Global Day of Action for Palestine",
                date: "June 5, 2025",
                location: "Worldwide",
                icon: <Globe className="h-5 w-5 text-green-600 dark:text-green-500" />,
              },
              {
                title: "Boycott Awareness Workshop",
                date: "June 12, 2025",
                location: "Online",
                icon: <Headphones className="h-5 w-5 text-green-600 dark:text-green-500" />,
              },
              {
                title: "Palestine Solidarity Conference",
                date: "June 20-22, 2025",
                location: "London, UK",
                icon: <Calendar className="h-5 w-5 text-green-600 dark:text-green-500" />,
              },
            ].map((event, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-green-100 dark:border-green-900"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{event.icon}</div>
                  <div>
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{event.date}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App download */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 mb-16 border border-green-200 dark:border-green-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="font-bold text-lg mb-2 text-green-700 dark:text-green-500">
                Get the Palestine Support App
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Download our mobile app to stay connected and support Palestine on the go.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#" className="block transition-transform hover:scale-105">
                  <Image
                    src="/placeholder.svg?height=40&width=120&text=App Store"
                    alt="Download on App Store"
                    width={120}
                    height={40}
                    className="h-10 w-auto rounded-md shadow-sm"
                  />
                </Link>
                <Link href="#" className="block transition-transform hover:scale-105">
                  <Image
                    src="/placeholder.svg?height=40&width=120&text=Google Play"
                    alt="Get it on Google Play"
                    width={120}
                    height={40}
                    className="h-10 w-auto rounded-md shadow-sm"
                  />
                </Link>
              </div>
            </div>
            <div className="relative h-32 w-32 md:h-40 md:w-40">
              <Image
                src="/placeholder.svg?height=160&width=160&text=App"
                alt="Palestine Support App"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-16">
          <h3 className="font-bold text-lg mb-6 text-center text-green-700 dark:text-green-500">
            Educational Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="#"
              className="bg-white dark:bg-gray-900 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-sm hover:shadow-md border border-green-100 dark:border-green-900"
            >
              <h4 className="font-medium text-sm mb-2 text-green-700 dark:text-green-500">History of Palestine</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Learn about the rich history and culture of Palestine through the ages.
              </p>
            </Link>
            <Link
              href="#"
              className="bg-white dark:bg-gray-900 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-sm hover:shadow-md border border-green-100 dark:border-green-900"
            >
              <h4 className="font-medium text-sm mb-2 text-green-700 dark:text-green-500">Understanding BDS</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                A comprehensive guide to the Boycott, Divestment and Sanctions movement.
              </p>
            </Link>
            <Link
              href="#"
              className="bg-white dark:bg-gray-900 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-sm hover:shadow-md border border-green-100 dark:border-green-900"
            >
              <h4 className="font-medium text-sm mb-2 text-green-700 dark:text-green-500">Humanitarian Crisis</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Current information about the humanitarian situation in Gaza and the West Bank.
              </p>
            </Link>
            <Link
              href="#"
              className="bg-white dark:bg-gray-900 p-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-sm hover:shadow-md border border-green-100 dark:border-green-900"
            >
              <h4 className="font-medium text-sm mb-2 text-green-700 dark:text-green-500">How You Can Help</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Practical ways to support Palestinians through advocacy, donations, and more.
              </p>
            </Link>
          </div>
        </div>

        {/* Palestinian flag color strip */}
        <div className="flex w-full h-1 mb-8">
          <div className="w-1/4 bg-black"></div>
          <div className="w-1/4 bg-white"></div>
          <div className="w-1/4 bg-green-600"></div>
          <div className="w-1/4 bg-red-600"></div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Palestine Support App. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center">
            Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for Palestine
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">
            <Flag className="h-3 w-3 inline-block mr-1" /> Stand with Palestine. Free Palestine.
          </p>
        </div>
      </div>
    </footer>
  )
}
