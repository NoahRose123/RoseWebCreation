'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Monitor,
  Code,
  Smartphone,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { addBooking } from '../../lib/firebase'
import RoseWebHeader from '../components/RoseWebHeader'
import RoseWebFooter from '../components/RoseWebFooter'

export default function RoseWebBookingsPage() {
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Monthly',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const services = [
    {
      id: 'Website Monthly',
      name: 'Website Monthly',
      price: '$40',
      period: 'per month',
      icon: Monitor,
      description: 'Responsive website with monthly maintenance'
    },
    {
      id: 'Website Yearly',
      name: 'Website Yearly',
      price: '$200',
      period: 'per year',
      icon: Monitor,
      description: 'Responsive website with yearly maintenance'
    },
    {
      id: 'Custom Software/App',
      name: 'Custom Software/App',
      price: 'Contact',
      period: 'for quote',
      icon: Code,
      description: 'Custom software solutions tailored to your needs'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await addBooking({
        ...bookingForm,
        address: 'N/A', // Not applicable for web development
        status: 'Pending',
        createdAt: new Date().toISOString(),
        selectedDate: new Date().toISOString().split('T')[0],
        selectedTime: 'TBD'
      }, 'roseweb-bookings')
      
      setSubmitSuccess(true)
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        service: 'Website Monthly',
        message: ''
      })
      
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RoseWebHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Book Your Web Development Project
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Let's create something amazing together. Get started with your web development project today.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Get Started</h2>
                  
                  {submitSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <p className="text-green-800 font-medium">
                          Booking submitted successfully! We'll contact you soon.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email (optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service *
                      </label>
                      <select
                        required
                        value={bookingForm.service}
                        onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.price} {service.period}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Details
                      </label>
                      <textarea
                        rows={4}
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          Book Consultation
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>

                {/* Services Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Services</h3>
                    <div className="space-y-4">
                      {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <service.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{service.name}</h4>
                              <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                              <p className="text-blue-600 font-semibold">
                                {service.price} {service.period}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What to Expect</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Free consultation call
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Detailed project proposal
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Regular progress updates
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Post-launch support
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RoseWebFooter />
    </div>
  )
}



