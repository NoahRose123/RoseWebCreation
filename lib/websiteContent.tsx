'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getWebsiteContent, saveWebsiteContent, WebsiteContent } from './firebase'

interface WebsiteContentContextType {
  content: WebsiteContent | null
  updateContent: (updates: Partial<WebsiteContent>) => void
  saveContent: () => Promise<void>
  loading: boolean
}

const WebsiteContentContext = createContext<WebsiteContentContextType | undefined>(undefined)

export const useWebsiteContent = () => {
  const context = useContext(WebsiteContentContext)
  if (context === undefined) {
    throw new Error('useWebsiteContent must be used within a WebsiteContentProvider')
  }
  return context
}

export const WebsiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [pendingUpdates, setPendingUpdates] = useState<Partial<WebsiteContent>>({})

  // Load content from Firestore on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        const firebaseContent = await getWebsiteContent()
        if (firebaseContent) {
          setContent(firebaseContent as WebsiteContent)
        } else {
          // Set default content if none exists
          const defaultContent: WebsiteContent = {
            heroTitle: 'Professional Mobile Car Detailing',
            heroSubtitle: 'We bring the detailing service to you. Professional, convenient, and exceptional results every time.',
            servicesTitle: 'Our Premium Services',
            servicesSubtitle: 'Professional car detailing services delivered right to your doorstep. We use premium products and techniques to restore your vehicle\'s beauty.',
            pricingTitle: 'Transparent Pricing',
            pricingSubtitle: 'No hidden fees, no surprises. Our pricing is clear and competitive for professional mobile detailing services.',
            testimonialsTitle: 'What Our Customers Say',
            testimonialsSubtitle: 'Don\'t just take our word for it. Here\'s what our satisfied customers have to say about our mobile detailing services.',
            businessName: 'Mobile Mountain Detail',
            phoneNumber: '(555) 123-4567',
            email: 'info@mobilemountain.com',
            serviceArea: 'Greater Denver Metro Area',
            footerDescription: 'Professional mobile car detailing services. We bring the detailing to you with premium quality and convenience.'
          }
          setContent(defaultContent)
        }
      } catch (error) {
        console.error('Error loading website content:', error)
        // Set default content on error
        const defaultContent: WebsiteContent = {
          heroTitle: 'Professional Mobile Car Detailing',
          heroSubtitle: 'We bring the detailing service to you. Professional, convenient, and exceptional results every time.',
          servicesTitle: 'Our Premium Services',
          servicesSubtitle: 'Professional car detailing services delivered right to your doorstep. We use premium products and techniques to restore your vehicle\'s beauty.',
          pricingTitle: 'Transparent Pricing',
          pricingSubtitle: 'No hidden fees, no surprises. Our pricing is clear and competitive for professional mobile detailing services.',
          testimonialsTitle: 'What Our Customers Say',
          testimonialsSubtitle: 'Don\'t just take our word for it. Here\'s what our satisfied customers have to say about our mobile detailing services.',
          businessName: 'Mobile Mountain Detail',
          phoneNumber: '(555) 123-4567',
          email: 'info@mobilemountain.com',
          serviceArea: 'Greater Denver Metro Area',
          footerDescription: 'Professional mobile car detailing services. We bring the detailing to you with premium quality and convenience.'
        }
        setContent(defaultContent)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  const updateContent = (updates: Partial<WebsiteContent>) => {
    setPendingUpdates(prev => ({ ...prev, ...updates }))
    
    // Update local state immediately for real-time preview
    if (content) {
      setContent({ ...content, ...updates })
    }
  }

  const saveContent = async () => {
    if (!content) return
    
    try {
      const contentToSave = { ...content, ...pendingUpdates }
      await saveWebsiteContent(contentToSave)
      setPendingUpdates({})
      console.log('Website content saved successfully')
    } catch (error) {
      console.error('Error saving website content:', error)
      throw error
    }
  }

  const value: WebsiteContentContextType = {
    content,
    updateContent,
    saveContent,
    loading
  }

  return (
    <WebsiteContentContext.Provider value={value}>
      {children}
    </WebsiteContentContext.Provider>
  )
}
