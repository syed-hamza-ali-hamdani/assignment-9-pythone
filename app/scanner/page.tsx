"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Camera, Check, X, Upload, ImageIcon, AlertCircle, Scan, Globe, Share2, Ban } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"

/**
 * BarcodeInfo class - Contains information about a barcode
 */
class BarcodeInfo {
  barcode: string
  country: string
  countryCode: string
  manufacturer: string

  constructor(barcode: string, country: string, countryCode: string, manufacturer: string) {
    this.barcode = barcode
    this.country = country
    this.countryCode = countryCode
    this.manufacturer = manufacturer
  }

  /**
   * Gets the flag emoji for the country
   */
  getFlagEmoji(): string {
    // Convert country code to flag emoji (each letter is converted to a regional indicator symbol emoji)
    return this.countryCode
      .toUpperCase()
      .split("")
      .map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      .join("")
  }
}

/**
 * BarcodeDetector class - Handles barcode detection and information lookup
 */
class BarcodeDetector {
  /**
   * Detects a barcode from an image
   * @param imageData - The image data to analyze
   * @returns A promise that resolves to the detected barcode
   */
  static async detect(imageData: File | string): Promise<string> {
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return a random barcode number for demo
    const barcodes = [
      "8901234567890", // India
      "5901234567890", // Poland
      "7901234567890", // Norway
      "6291041500213", // UAE
      "7290103152017", // Israel
      "8410014001005", // Spain
      "5000157024898", // UK
      "0078742022871", // USA
    ]
    return barcodes[Math.floor(Math.random() * barcodes.length)]
  }

  /**
   * Gets information about a barcode
   * @param barcode - The barcode to look up
   * @returns Information about the barcode
   */
  static getBarcodeInfo(barcode: string): BarcodeInfo {
    // Get country information based on barcode prefix
    // In a real app, this would use a comprehensive database
    const prefix = barcode.substring(0, 3)

    // Map of country codes and names by barcode prefix
    const countryMap: Record<string, [string, string, string]> = {
      // Format: [Country Name, ISO Country Code, Manufacturer]
      "890": ["India", "IN", "Local Manufacturer"],
      "590": ["Poland", "PL", "Polish Company"],
      "790": ["Norway", "NO", "Norwegian Producer"],
      "629": ["UAE", "AE", "Middle East Distributor"],
      "729": ["Israel", "IL", "Israeli Company"],
      "841": ["Spain", "ES", "Spanish Producer"],
      "500": ["United Kingdom", "GB", "British Company"],
      "007": ["United States", "US", "American Corporation"],
    }

    // Look up country info or use default
    const [country, countryCode, manufacturer] = countryMap[prefix] || ["Unknown", "XX", "Unknown Manufacturer"]

    return new BarcodeInfo(barcode, country, countryCode, manufacturer)
  }
}

/**
 * Product class - Represents a product in the database
 */
class Product {
  barcode: string
  name: string
  boycott: boolean
  reason?: string
  alternatives?: string[]
  barcodeInfo: BarcodeInfo

  /**
   * Creates a new Product instance
   */
  constructor(barcode: string, name: string, boycott: boolean, reason?: string, alternatives?: string[]) {
    this.barcode = barcode
    this.name = name
    this.boycott = boycott
    this.reason = reason
    this.alternatives = alternatives
    this.barcodeInfo = BarcodeDetector.getBarcodeInfo(barcode)
  }

  /**
   * Checks if the product is from Israel
   */
  isFromIsrael(): boolean {
    return this.barcodeInfo.countryCode === "IL"
  }

  /**
   * Gets the boycott status considering country of origin
   */
  getBoycottStatus(): boolean {
    // Products from Israel should always be boycotted
    if (this.isFromIsrael()) {
      return true
    }
    return this.boycott
  }

  /**
   * Gets the boycott reason considering country of origin
   */
  getBoycottReason(): string {
    if (this.isFromIsrael()) {
      return "Product is from Israel - Boycott all Israeli products"
    }
    return this.reason || "Company supports occupation"
  }
}

/**
 * ProductDatabase class - Handles product lookup and database operations
 */
class ProductDatabase {
  // Static database of products (would be fetched from a server in a real app)
  static products: Record<string, Product> = {
    "8901234567890": new Product("8901234567890", "CocaCola", true, "Supports occupation through investments", [
      "Local soda brands",
      "Water",
    ]),
    "5901234567890": new Product("5901234567890", "Nestlé", true, "Operations in occupied territories", [
      "Local food brands",
      "Ethical companies",
    ]),
    "7901234567890": new Product("7901234567890", "Local Organic Produce", false),
    "6291041500213": new Product("6291041500213", "Middle Eastern Dates", false),
    "7290103152017": new Product("7290103152017", "Israeli Product", true, "Product is from Israel", [
      "Local alternatives",
      "Products from Palestine",
    ]),
    "8410014001005": new Product("8410014001005", "Spanish Olive Oil", false),
    "5000157024898": new Product("5000157024898", "British Tea", true, "Parent company supports occupation", [
      "Local tea brands",
      "Fair trade options",
    ]),
    "0078742022871": new Product("0078742022871", "American Snack", true, "Company has investments in Israel", [
      "Local snacks",
      "Ethical brands",
    ]),
  }

  /**
   * Looks up a product by barcode
   * @param barcode - The barcode to look up
   * @returns A promise that resolves to the product information
   */
  static async lookup(barcode: string): Promise<Product> {
    // Simulate database lookup time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return product info if found, or generate random result if not
    if (this.products[barcode]) {
      return this.products[barcode]
    }

    // If product not found, create a new one with barcode info
    const barcodeInfo = BarcodeDetector.getBarcodeInfo(barcode)
    const isFromIsrael = barcodeInfo.countryCode === "IL"

    return new Product(
      barcode,
      `Unknown Product from ${barcodeInfo.country}`,
      isFromIsrael,
      isFromIsrael ? "Product is from Israel - Boycott all Israeli products" : undefined,
    )
  }
}

/**
 * ScanResult class - Represents the result of a barcode scan
 */
class ScanResult {
  barcode: string
  product: Product
  timestamp: Date

  /**
   * Creates a new ScanResult instance
   */
  constructor(barcode: string, product: Product) {
    this.barcode = barcode
    this.product = product
    this.timestamp = new Date()
  }

  /**
   * Gets a formatted timestamp string
   */
  getFormattedTimestamp(): string {
    return this.timestamp.toLocaleString()
  }
}

/**
 * ScannerPage component - Handles barcode scanning functionality
 */
export default function ScannerPage() {
  // State variables
  const [scanning, setScanning] = useState(false) // Track if camera scanning is active
  const [processing, setProcessing] = useState(false) // Track if image is being processed
  const [progress, setProgress] = useState(0) // Track processing progress
  const [result, setResult] = useState<ScanResult | null>(null) // Store scan result
  const [uploadedImage, setUploadedImage] = useState<string | null>(null) // Store uploaded image URL
  const [error, setError] = useState<string | null>(null) // Store error messages
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]) // Store scan history
  const [showHistory, setShowHistory] = useState(false) // Toggle scan history display

  const fileInputRef = useRef<HTMLInputElement>(null) // Reference to file input element
  const isMobile = useMobile() // Check if user is on mobile device

  // Effect to load scan history from localStorage on component mount
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("scanHistory")
      if (savedHistory) {
        try {
          // Parse saved history
          const parsedHistory = JSON.parse(savedHistory)

          // Convert plain objects back to ScanResult instances
          const convertedHistory = parsedHistory.map((item: any) => {
            const barcodeInfo = new BarcodeInfo(
              item.product.barcodeInfo.barcode,
              item.product.barcodeInfo.country,
              item.product.barcodeInfo.countryCode,
              item.product.barcodeInfo.manufacturer,
            )

            const product = new Product(
              item.product.barcode,
              item.product.name,
              item.product.boycott,
              item.product.reason,
              item.product.alternatives,
            )

            // Manually set barcodeInfo since it's not passed to constructor
            product.barcodeInfo = barcodeInfo

            const result = new ScanResult(item.barcode, product)
            result.timestamp = new Date(item.timestamp)
            return result
          })

          setScanHistory(convertedHistory)
        } catch (error) {
          console.error("Failed to parse scan history:", error)
        }
      }
    }
  }, [])

  // Effect to save scan history to localStorage when it changes
  useEffect(() => {
    if (scanHistory.length > 0) {
      localStorage.setItem("scanHistory", JSON.stringify(scanHistory))
    }
  }, [scanHistory])

  // Effect to simulate progress during processing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (processing) {
      // Reset progress
      setProgress(0)

      // Update progress every 100ms
      interval = setInterval(() => {
        setProgress((prev) => {
          // Increase progress by random amount
          const increment = Math.random() * 15
          const newProgress = Math.min(prev + increment, 95)
          return newProgress
        })
      }, 100)
    } else if (progress > 0 && progress < 100) {
      // Complete progress when processing is done
      setProgress(100)
    }

    // Clean up interval on unmount or when processing changes
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [processing, progress])

  /**
   * Starts camera scanning
   */
  const startScanning = () => {
    setScanning(true)
    setError(null)

    // In a real app, we would initialize the barcode scanner here
    // For demo purposes, we'll simulate a scan after 3 seconds
    setTimeout(async () => {
      try {
        // Simulate finding a barcode
        const barcode = await BarcodeDetector.detect("camera-feed")

        // Look up product information
        const product = await ProductDatabase.lookup(barcode)

        // Create scan result
        const scanResult = new ScanResult(barcode, product)

        // Update state
        setResult(scanResult)

        // Add to scan history
        setScanHistory((prev) => [scanResult, ...prev])
      } catch (err) {
        console.error("Scanning error:", err)
        setError("Failed to scan barcode. Please try again or upload an image.")
      } finally {
        setScanning(false)
      }
    }, 3000)
  }

  /**
   * Handles file upload for barcode scanning
   */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setProcessing(true)
      setError(null)

      // Display the uploaded image
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)

      // Process the image to detect barcode
      const barcode = await BarcodeDetector.detect(file)

      // Look up product information
      const product = await ProductDatabase.lookup(barcode)

      // Create scan result
      const scanResult = new ScanResult(barcode, product)

      // Update state
      setResult(scanResult)

      // Add to scan history
      setScanHistory((prev) => [scanResult, ...prev])
    } catch (error) {
      console.error("Error processing image:", error)
      setError(
        "Could not detect a barcode in this image. Please try another image or ensure the barcode is clearly visible.",
      )
      setResult(null)
    } finally {
      setProcessing(false)
    }
  }

  /**
   * Triggers file upload dialog
   */
  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  /**
   * Resets scan state
   */
  const resetScan = () => {
    setResult(null)
    setUploadedImage(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  /**
   * Shares scan result
   */
  const shareResult = async () => {
    if (!result) return

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Palestine Support App - Scan Result",
          text: `I scanned ${result.product.name} (${result.barcode}) from ${result.product.barcodeInfo.country}. ${
            result.product.getBoycottStatus()
              ? "This product should be BOYCOTTED! " + result.product.getBoycottReason()
              : "This product is OK to purchase."
          }`,
          url: window.location.href,
        })
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(
          `I scanned ${result.product.name} (${result.barcode}) from ${result.product.barcodeInfo.country}. ${
            result.product.getBoycottStatus()
              ? "This product should be BOYCOTTED! " + result.product.getBoycottReason()
              : "This product is OK to purchase."
          }`,
        )
        alert("Result copied to clipboard!")
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  /**
   * Clears scan history
   */
  const clearHistory = () => {
    setScanHistory([])
    localStorage.removeItem("scanHistory")
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Scanner</h1>
        <Button variant="outline" size="sm" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? "Hide History" : "Show History"}
        </Button>
      </div>

      {/* Instructions card */}
      <Card className="border-l-4 border-l-green-600">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <Globe className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-xl mb-1">Barcode Country Scanner</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upload a barcode image to identify the product's country of origin. Israeli products will be
                automatically flagged for boycott.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scan history section */}
      {showHistory && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Scan History</CardTitle>
              {scanHistory.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearHistory}>
                  Clear History
                </Button>
              )}
            </div>
            <CardDescription>Your recent product scans</CardDescription>
          </CardHeader>
          <CardContent>
            {scanHistory.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No scan history yet</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {scanHistory.map((scan, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-sm ${
                      scan.product.getBoycottStatus()
                        ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        : "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{scan.product.name}</div>
                        <div className="text-xs text-gray-500">{new Date(scan.timestamp).toLocaleString()}</div>
                      </div>
                      <Badge variant={scan.product.getBoycottStatus() ? "destructive" : "outline"}>
                        {scan.product.getBoycottStatus() ? "Boycott" : "OK"}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center text-xs">
                      <Globe className="h-3 w-3 mr-1" />
                      <span>
                        {scan.product.barcodeInfo.getFlagEmoji()} {scan.product.barcodeInfo.country}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Scanning tabs - Choose between upload and camera */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="camera" disabled={!isMobile}>
            Live Camera
          </TabsTrigger>
        </TabsList>

        {/* Upload image tab content */}
        <TabsContent value="upload" className="space-y-4">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square flex items-center justify-center">
                {/* Show processing state */}
                {processing ? (
                  <div className="text-center space-y-4 p-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
                      <Scan className="h-8 w-8 text-green-600 dark:text-green-400 animate-pulse" />
                    </div>
                    <h2 className="text-xl font-medium">Processing Image</h2>
                    <p className="text-sm text-gray-500">Detecting barcode and checking database...</p>
                    <Progress value={progress} className="w-full max-w-xs mx-auto" />
                  </div>
                ) : uploadedImage && result ? (
                  // Show result with uploaded image
                  <div className="text-center space-y-4 p-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded barcode"
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Display barcode number */}
                    <div className="bg-gray-200 dark:bg-gray-700 py-1 px-3 rounded-full inline-block">
                      <p className="text-xs font-mono">{result.barcode}</p>
                    </div>

                    {/* Display country information */}
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">
                        {result.product.barcodeInfo.getFlagEmoji()} {result.product.barcodeInfo.country}
                      </span>
                    </div>

                    {/* Show boycott status */}
                    {result.product.isFromIsrael() ? (
                      // Israeli product - always boycott
                      <div className="mt-4">
                        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto">
                          <Ban className="h-10 w-10 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="bg-red-600 text-white py-2 px-4 rounded-md mt-4 mx-auto inline-block">
                          ISRAELI PRODUCT - BOYCOTT
                        </div>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-2">{result.product.name}</p>
                        <p className="text-sm mt-2">
                          This product is from Israel and should be boycotted. Please choose an alternative product.
                        </p>
                        {result.product.alternatives && result.product.alternatives.length > 0 && (
                          <div className="mt-4 text-sm">
                            <span className="font-medium">Alternatives:</span>
                            <ul className="list-disc list-inside mt-1">
                              {result.product.alternatives.map((alt, i) => (
                                <li key={i}>{alt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : result.product.getBoycottStatus() ? (
                      // Non-Israeli boycotted product
                      <>
                        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto mt-4">
                          <X className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Boycott This Product</h2>
                        <p className="text-sm">{result.product.name} is on the boycott list.</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Reason:</span> {result.product.getBoycottReason()}
                        </p>
                        {result.product.alternatives && result.product.alternatives.length > 0 && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Alternatives:</span>
                            <ul className="list-disc list-inside mt-1">
                              {result.product.alternatives.map((alt, i) => (
                                <li key={i}>{alt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      // Safe product
                      <>
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mt-4">
                          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-xl font-bold text-green-600 dark:text-green-400">Product Clear</h2>
                        <p className="text-sm">
                          {result.product.name} from {result.product.barcodeInfo.country} is not on the boycott list.
                          This product is okay to purchase.
                        </p>
                      </>
                    )}
                    <div className="flex space-x-2 justify-center mt-4">
                      <Button onClick={resetScan} variant="outline">
                        Scan Another
                      </Button>
                      <Button onClick={shareResult} variant="outline" className="flex items-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : uploadedImage ? (
                  // Show uploaded image while analyzing
                  <div className="text-center space-y-2">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded barcode"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-gray-500">Analyzing image...</p>
                  </div>
                ) : (
                  // Show upload prompt
                  <div className="text-center space-y-4 p-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-medium">Upload a Barcode Image</h2>
                    <p className="text-sm text-gray-500">
                      Take a clear photo of the product barcode and upload it to check its country of origin and boycott
                      status
                    </p>
                    <Button onClick={triggerFileUpload} className="mt-2 bg-green-600 hover:bg-green-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Show error message if there is one */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Camera scanning tab content */}
        <TabsContent value="camera" className="space-y-4">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square flex items-center justify-center">
                {scanning ? (
                  // Show scanning state
                  <div className="text-center space-y-4 p-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
                      <Camera className="h-8 w-8 text-green-600 dark:text-green-400 animate-pulse" />
                    </div>
                    <h2 className="text-xl font-medium">Scanning...</h2>
                    <p className="text-sm text-gray-500">Position barcode in the center of the screen</p>

                    {/* Scanning guide overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-64 h-32 border-2 border-green-500 rounded-lg border-dashed"></div>
                    </div>
                  </div>
                ) : result ? (
                  // Show scan result
                  <div className="text-center space-y-4 p-6">
                    {/* Display barcode number */}
                    <div className="bg-gray-200 dark:bg-gray-700 py-1 px-3 rounded-full inline-block">
                      <p className="text-xs font-mono">{result.barcode}</p>
                    </div>

                    {/* Display country information */}
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Globe className="h-4 w-4" />
                      <span className="font-medium">
                        {result.product.barcodeInfo.getFlagEmoji()} {result.product.barcodeInfo.country}
                      </span>
                    </div>

                    {/* Show boycott status */}
                    {result.product.isFromIsrael() ? (
                      // Israeli product - always boycott
                      <div className="mt-4">
                        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto">
                          <Ban className="h-10 w-10 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="bg-red-600 text-white py-2 px-4 rounded-md mt-4 mx-auto inline-block">
                          ISRAELI PRODUCT - BOYCOTT
                        </div>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-2">{result.product.name}</p>
                        <p className="text-sm mt-2">
                          This product is from Israel and should be boycotted. Please choose an alternative product.
                        </p>
                        {result.product.alternatives && result.product.alternatives.length > 0 && (
                          <div className="mt-4 text-sm">
                            <span className="font-medium">Alternatives:</span>
                            <ul className="list-disc list-inside mt-1">
                              {result.product.alternatives.map((alt, i) => (
                                <li key={i}>{alt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : result.product.getBoycottStatus() ? (
                      // Non-Israeli boycotted product
                      <>
                        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mx-auto mt-4">
                          <X className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Boycott This Product</h2>
                        <p className="text-sm">{result.product.name} is on the boycott list.</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Reason:</span> {result.product.getBoycottReason()}
                        </p>
                        {result.product.alternatives && result.product.alternatives.length > 0 && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Alternatives:</span>
                            <ul className="list-disc list-inside mt-1">
                              {result.product.alternatives.map((alt, i) => (
                                <li key={i}>{alt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      // Safe product
                      <>
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mt-4">
                          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-xl font-bold text-green-600 dark:text-green-400">Product Clear</h2>
                        <p className="text-sm">
                          {result.product.name} from {result.product.barcodeInfo.country} is not on the boycott list.
                          This product is okay to purchase.
                        </p>
                      </>
                    )}
                    <div className="flex space-x-2 justify-center mt-4">
                      <Button onClick={resetScan} variant="outline">
                        Scan Another
                      </Button>
                      <Button onClick={shareResult} variant="outline" className="flex items-center">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Show camera ready state
                  <div className="text-center space-y-4 p-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-medium">Camera Scanner</h2>
                    <p className="text-sm text-gray-500">
                      Point your camera at a product barcode to check its country of origin and boycott status
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Camera scan button */}
          {!scanning && !result && (
            <Button onClick={startScanning} className="w-full bg-green-600 hover:bg-green-700">
              <Camera className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          )}

          {/* Show error message if there is one */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>

      {/* How to use instructions card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to use the barcode scanner</CardTitle>
          <CardDescription>
            Follow these steps to check a product's country of origin and boycott status
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Upload a photo of the product barcode or use the camera scanner</li>
            <li>Wait for the app to analyze the barcode and identify the country of origin</li>
            <li>The app will automatically flag Israeli products for boycott</li>
            <li>For other products, the app will check if the company is on the boycott list</li>
            <li>If a product should be boycotted, you'll see alternative suggestions</li>
            <li>Share your findings with others to spread awareness</li>
          </ol>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-red-600">Important:</span> All Israeli products should be boycotted as
              part of the BDS (Boycott, Divestment, Sanctions) movement to support Palestinian rights.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
