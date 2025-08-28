'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar, Zap } from 'lucide-react'

const heroImages = [
  '/jetskimain.jpg',
  '/jetski1.jpg', 
  '/jetski2.jpg'
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-base-charcoal/80 via-base-navy/60 to-base-charcoal/80"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Water Splash Effect */}
      <div className="absolute inset-0 z-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary-cyan/20 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-lime/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 font-display"
          >
            <span className="gradient-text">BRP</span>
            <br />
            <span className="text-white">DIAGNOSTICS</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-secondary-cyan mb-8 font-medium"
          >
            Premium Jet Ski Rental Experience
          </motion.p>

          {/* Price Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-primary-lime to-secondary-cyan text-black p-6 rounded-2xl mb-8 inline-block"
          >
            <div className="text-4xl md:text-5xl font-black">$150/HR ALL-IN</div>
            <div className="text-lg font-bold">FREE FUEL THIS WEEK</div>
          </motion.div>

          {/* Urgency Warning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-gradient-to-r from-accent-orange to-accent-red text-white p-4 rounded-xl mb-8 inline-block animate-pulse-glow"
          >
            <div className="flex items-center space-x-2">
              <Zap size={24} />
              <span className="text-lg font-bold">LIMITED SLOTS DAILY</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToBooking}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <Calendar size={24} />
              <span>BOOK NOW</span>
            </motion.button>

            <motion.a
              href="tel:647-264-2606"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2"
            >
              <Phone size={24} />
              <span>CALL 647-264-2606</span>
            </motion.a>
          </motion.div>

          {/* Key Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-primary-lime font-bold text-lg">✅ NO BOAT LICENSE REQUIRED</div>
            </div>
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-secondary-cyan font-bold text-lg">⚡ Supercharged Beast Available</div>
            </div>
            <div className="glass-effect p-4 rounded-xl">
              <div className="text-accent-orange font-bold text-lg">🎯 Beginners Welcome</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
