'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Shield, Award, Code, Monitor, Smartphone, ArrowRight } from 'lucide-react'

export default function RoseWebFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Rose Web Creation</h3>
                <p className="text-sm text-gray-400">Professional Web Development</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              We create stunning, responsive websites and custom software solutions that help businesses grow and succeed online.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-xs text-gray-300">
                <Award className="h-3 w-3 mr-1 text-yellow-400" />
                <span>Professional Quality</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center text-xs text-gray-300">
                <Shield className="h-3 w-3 mr-1 text-green-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link href="#home" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Our Services</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li className="flex items-center">
                <Monitor className="h-3 w-3 mr-2 text-purple-400" />
                Website Development
              </li>
              <li className="flex items-center">
                <Code className="h-3 w-3 mr-2 text-blue-400" />
                Custom Software
              </li>
              <li className="flex items-center">
                <Smartphone className="h-3 w-3 mr-2 text-green-400" />
                Mobile Apps
              </li>
              <li>SEO Optimization</li>
              <li>E-commerce Solutions</li>
              <li>Maintenance & Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-purple-400" />
                <span className="text-gray-300 text-sm">(555) 987-6543</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">info@rosewebcreation.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-green-400" />
                <span className="text-gray-300 text-sm">Serving Nationwide</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-yellow-400" />
                <span className="text-gray-300 text-sm">24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} Rose Web Creation. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          
          {/* Mobile Mountain Link */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                Looking for mobile car detailing services?
              </p>
              <Link 
                href="/mobile-mountain" 
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
              >
                Visit Mobile Mountain Detail
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
