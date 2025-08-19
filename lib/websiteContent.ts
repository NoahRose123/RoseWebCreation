import { createContext, useContext, useState, useEffect } from 'react'

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
  const [content, setContent] = useState<WebsiteContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mobile-mountain-content')
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent
    }
    return defaultContent
  })

  const updateContent = (updates: Partial<WebsiteContent>) => {
    const newContent = { ...content, ...updates }
    setContent(newContent)
    if (typeof window !== 'undefined') {
      localStorage.setItem('mobile-mountain-content', JSON.stringify(newContent))
    }
  }

  const resetContent = () => {
    setContent(defaultContent)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mobile-mountain-content')
    }
  }

  return (
    <WebsiteContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </WebsiteContentContext.Provider>
  )
}
