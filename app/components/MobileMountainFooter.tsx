'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Car, Sparkles, Shield } from 'lucide-react'
import Image from 'next/image'

export default function MobileMountainFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/mobile-mountain-logo-new.png"
                alt="Mobile Mountain Detail"
                width={120}
                height={120}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">Mobile Mountain Detail</h3>
                <p className="text-gray-400">Professional Mobile Car Detailing</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              We bring the mountain of quality car detailing services right to your doorstep. 
              Professional, convenient, and guaranteed satisfaction.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="tel:+1234567890"
                whileHover={{ scale: 1.1 }}
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors duration-300"
              >
                <Phone className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:info@mobilemountaindetail.com"
                whileHover={{ scale: 1.1 }}
                className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Car className="h-4 w-4 mr-2 text-blue-400" />
                Basic Wash
              </li>
              <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Sparkles className="h-4 w-4 mr-2 text-blue-400" />
                Premium Detail
              </li>
              <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Shield className="h-4 w-4 mr-2 text-blue-400" />
                Ultimate Detail
              </li>
              <li className="flex items-center text-gray-300 hover:text-white transition-colors duration-300">
                <Car className="h-4 w-4 mr-2 text-blue-400" />
                Interior Detailing
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-blue-400" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span>info@mobilemountaindetail.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                <span>Mobile Service - We Come To You!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
                         <p className="text-gray-400 text-sm">
               © 2024 Mobile Mountain Detail. All rights reserved.
             </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Service Areas
              </a>
              <button 
                onClick={() => window.location.href = '/mobile-mountain/admin'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
