'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import BookingSection from '@/components/BookingSection'
import FleetSection from '@/components/FleetSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CountdownTimer from '@/components/CountdownTimer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for smooth animations
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-charcoal via-base-navy to-base-charcoal flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-lime border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary-lime neon-text">BRP DIAGNOSTICS</h2>
          <p className="text-secondary-cyan mt-2">Loading your adventure...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-charcoal via-base-navy to-base-charcoal">
      {/* Floating Elements Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary-lime rounded-full animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-secondary-cyan rounded-full animate-float animation-delay-1000 opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent-orange rounded-full animate-float animation-delay-2000 opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-primary-neon rounded-full animate-float animation-delay-3000 opacity-25"></div>
      </div>

      {/* Promotional Banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-gradient-to-r from-accent-orange to-accent-red text-white text-center py-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <span className="font-bold text-lg">🔥 FREE FUEL THIS WEEK! 🔥</span>
          <CountdownTimer />
        </div>
      </motion.div>

      <Header />
      
      <HeroSection />
      <FeaturesSection />
      <FleetSection />
      <BookingSection />
      <TestimonialsSection />
      <ContactSection />
      
      <Footer />
    </main>
  )
}
