import { createContext, useContext, useState, useEffect } from 'react'
import { getWebsiteContent, updateWebsiteContent } from './firebase'

export interface WebsiteContent {
  // Hero Section
  heroTitle: string
  heroSubtitle: string
  
  // Services Section
  servicesTitle: string
  servicesSubtitle: string
  
  // Pricing Section
  pricingTitle: string
  pricingSubtitle: string
  
  // Testimonials Section
  testimonialsTitle: string
  testimonialsSubtitle: string
  
  // Contact Section
  contactTitle: string
  contactSubtitle: string
  
  // Footer
  footerDescription: string
  
  // Business Info
  businessName: string
  phoneNumber: string
  email: string
  serviceArea: string
}

const defaultContent: WebsiteContent = {
  heroTitle: "Mobile Mountain Detail",
  heroSubtitle: "We bring the mountain of quality car detailing services right to your doorstep. Professional, convenient, and guaranteed satisfaction.",
  
  servicesTitle: "Our Detailing Services",
  servicesSubtitle: "Professional mobile car detailing services that bring the mountain of quality right to your location.",
  
  pricingTitle: "Pricing Plans",
  pricingSubtitle: "Choose the perfect detailing package for your vehicle. All prices include travel to your location.",
  
  testimonialsTitle: "What Our Customers Say",
  testimonialsSubtitle: "Don't just take our word for it. Here's what our satisfied customers have to say about our services.",
  
  contactTitle: "Get In Touch",
  contactSubtitle: "Ready to give your vehicle the attention it deserves? Contact us today to schedule your appointment.",
  
  footerDescription: "We bring the mountain of quality car detailing services right to your doorstep. Professional, convenient, and guaranteed satisfaction.",
  
  businessName: "Mobile Mountain Detail",
  phoneNumber: "(555) 123-4567",
  email: "info@mobilemountaindetail.com",
  serviceArea: "25-mile radius"
}

const WebsiteContentContext = createContext<{
  content: WebsiteContent
  updateContent: (updates: Partial<WebsiteContent>) => void
  resetContent: () => void
}>({
  content: defaultContent,
  updateContent: () => {},
  resetContent: () => {}
})

export const useWebsiteContent = () => useContext(WebsiteContentContext)

export const WebsiteContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<WebsiteContent>(defaultContent)
  const [loading, setLoading] = useState(true)

  // Load content from Firebase on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const firebaseContent = await getWebsiteContent()
        setContent(firebaseContent)
      } catch (error) {
        console.error('Error loading website content:', error)
        // Keep default content if Firebase fails
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const updateContent = async (updates: Partial<WebsiteContent>) => {
    try {
      const newContent = { ...content, ...updates }
      setContent(newContent)
      await updateWebsiteContent(newContent)
    } catch (error) {
      console.error('Error updating website content:', error)
      // Revert to previous content if update fails
      setContent(content)
    }
  }

  const resetContent = async () => {
    try {
      setContent(defaultContent)
      await updateWebsiteContent(defaultContent)
    } catch (error) {
      console.error('Error resetting website content:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading website content...</p>
        </div>
      </div>
    )
  }

  return (
    <WebsiteContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </WebsiteContentContext.Provider>
  )
}
