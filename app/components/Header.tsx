'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Prices', href: '#pricing' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
             className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Image
              src="/rosewebc.png"
              alt="RoseWeb Design Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
                         <span className="font-bold text-xl text-secondary-900">
               RoseWeb Creation
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
                  } else {
                    document.getElementById(item.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                whileHover={{ y: -2 }}
                className="font-medium transition-colors duration-300 text-secondary-700 hover:text-primary-600"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              onClick={() => {
                // Trigger booking modal by dispatching a custom event
                const event = new CustomEvent('openBookingModal')
                window.dispatchEvent(event)
              }}
            >
              Contact
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm"
          >
                         {isMenuOpen ? (
               <X className="h-6 w-6 text-secondary-900" />
             ) : (
               <Menu className="h-6 w-6 text-secondary-900" />
             )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-xl mt-4 p-6"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsMenuOpen(false)
                    if (item.name === 'Home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    } else {
                      document.getElementById(item.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
              <button 
                className="btn-primary w-full mt-4"
                onClick={() => {
                  // Trigger booking modal by dispatching a custom event
                  const event = new CustomEvent('openBookingModal')
                  window.dispatchEvent(event)
                }}
              >
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
