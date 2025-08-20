'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export default function RoseWebHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Business Name */}
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/rosewebc-original.png"
              alt="Rose Web Creation"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-gray-900">Rose Web Creation</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </Link>
            <Link href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Prices
            </Link>
            <Link href="/bookings" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Book Appointment
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Admin
            </Link>
          </nav>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>(289) 213-0256</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>rosewebc@gmail.com</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                href="#home" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#services" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="#pricing" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Prices
              </Link>
              <Link 
                href="/bookings" 
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Appointment
              </Link>
              <Link 
                href="/admin" 
                className="block text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}
