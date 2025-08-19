'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function MobileMountainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Bookings', href: '/mobile-mountain/bookings' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <Image
              src="/mobile-mountain-logo.jpg"
              alt="Mobile Mountain Detail"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className={`font-bold text-xl transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Mobile Mountain Detail
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  if (item.name === 'Home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  } else if (item.name === 'Bookings') {
                    window.location.href = item.href
                  } else {
                    document.getElementById(item.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                whileHover={{ y: -2 }}
                className={`font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-gray-200 hover:text-white'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
              onClick={() => {
                // Trigger booking modal by dispatching a custom event
                const event = new CustomEvent('openBookingModal')
                window.dispatchEvent(event)
              }}
            >
              Book Now
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-gray-200'
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg mt-2 p-4"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMenuOpen(false)
                    if (item.name === 'Home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else if (item.name === 'Bookings') {
                      window.location.href = item.href
                    } else {
                      document.getElementById(item.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-left"
                onClick={() => {
                  setIsMenuOpen(false)
                  // Trigger booking modal by dispatching a custom event
                  const event = new CustomEvent('openBookingModal')
                  window.dispatchEvent(event)
                }}
              >
                Book Now
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
