'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-lime to-secondary-cyan rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl font-display">BRP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-display">BRP DIAGNOSTICS</h1>
              <p className="text-xs text-secondary-cyan">Premium Jet Ski Rental</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-white hover:text-primary-lime transition-colors duration-300 font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('fleet')}
              className="text-white hover:text-primary-lime transition-colors duration-300 font-medium"
            >
              Fleet
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className="text-white hover:text-primary-lime transition-colors duration-300 font-medium"
            >
              Book Now
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-primary-lime transition-colors duration-300 font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Phone Number */}
          <motion.a
            href="tel:647-264-2606"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-primary-lime to-secondary-cyan text-black px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
          >
            <Phone size={20} />
            <span>647-264-2606</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 pb-4"
          >
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('features')}
                className="text-white hover:text-primary-lime transition-colors duration-300 font-medium text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('fleet')}
                className="text-white hover:text-primary-lime transition-colors duration-300 font-medium text-left"
              >
                Fleet
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className="text-white hover:text-primary-lime transition-colors duration-300 font-medium text-left"
              >
                Book Now
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-primary-lime transition-colors duration-300 font-medium text-left"
              >
                Contact
              </button>
              <a
                href="tel:647-264-2606"
                className="flex items-center space-x-2 bg-gradient-to-r from-primary-lime to-secondary-cyan text-black px-4 py-2 rounded-lg font-bold w-fit"
              >
                <Phone size={20} />
                <span>647-264-2606</span>
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
