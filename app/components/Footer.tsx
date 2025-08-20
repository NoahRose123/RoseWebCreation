'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Shield, Award } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src="/mobile-mountain-logo-new.png"
                alt="Mobile Mountain Detail"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Professional mobile car detailing services. We bring the detailing to you with premium quality and convenience.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-xs text-gray-300">
                <Award className="h-3 w-3 mr-1 text-yellow-400" />
                <span>Licensed & Insured</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center text-xs text-gray-300">
                <Shield className="h-3 w-3 mr-1 text-green-400" />
                <span>Quality Guaranteed</span>
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
                <Link href="/mobile-mountain/bookings" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/mobile-mountain/admin" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Our Services</h3>
            <ul className="space-y-1 text-gray-300 text-sm">
              <li>Basic Wash - $45</li>
              <li>Premium Detail - $125</li>
              <li>Ultimate Detail - $200</li>
              <li>Interior Deep Clean</li>
              <li>Exterior Protection</li>
              <li>Paint Correction</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">info@mobilemountain.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">Greater Denver Metro Area</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-gray-300 text-sm">Mon-Sat: 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              © {currentYear} Mobile Mountain Detail. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="/mobile-mountain/admin" className="text-gray-400 hover:text-white text-xs transition-colors">
                Admin Access
              </Link>
              <Link href="/mobile-mountain/bookings" className="text-gray-400 hover:text-white text-xs transition-colors">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
