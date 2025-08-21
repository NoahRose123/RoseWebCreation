'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Check, Phone, Mail, MapPin, Clock, Shield, Award, Car, Sparkles, Zap, Calendar, Users, Truck } from 'lucide-react'
import { addBooking } from '../../lib/firebase'
import ErrorBoundary from '../components/ErrorBoundary'

export default function MobileMountainPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: 'Basic Wash - $45',
    selectedDate: '',
    selectedTime: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const services = [
    {
      title: 'Basic Wash',
      price: '$45',
      description: 'Perfect for regular maintenance',
      features: ['Exterior hand wash', 'Tire and wheel cleaning', 'Interior vacuum', 'Window cleaning'],
      icon: Shield,
      color: 'blue'
    },
    {
      title: 'Premium Detail',
      price: '$125',
      description: 'Complete interior and exterior detailing',
      features: ['Everything in Basic Wash', 'Interior deep cleaning', 'Leather conditioning', 'Clay bar treatment'],
      icon: Award,
      color: 'green',
      popular: true
    },
    {
      title: 'Ultimate Detail',
      price: '$200',
      description: 'Showroom quality with paint correction',
      features: ['Everything in Premium Detail', 'Paint correction', 'Ceramic coating', 'Engine bay cleaning'],
      icon: Star,
      color: 'purple'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Local Business Owner',
      content: 'Mobile Mountain Detail transformed my truck completely. Professional service and amazing results!',
      rating: 5,
      image: '/testimonial-profile.png'
    },
    {
      name: 'Mike Chen',
      role: 'Car Enthusiast',
      content: 'Best detailing service I\'ve ever used. They come to you and the quality is outstanding.',
      rating: 5,
      image: '/testimonial-profile.png'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Fleet Manager',
      content: 'We use Mobile Mountain for our entire fleet. Reliable, professional, and exceptional quality every time.',
      rating: 5,
      image: '/testimonial-profile.png'
    }
  ]

  const stats = [
    { number: '500+', label: 'Happy Customers', icon: Users },
    { number: '1000+', label: 'Vehicles Detailed', icon: Car },
    { number: '50+', label: 'Service Areas', icon: MapPin },
    { number: '24/7', label: 'Customer Support', icon: Phone }
  ]

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      await addBooking({
        ...bookingForm,
        status: 'Pending',
        createdAt: new Date().toISOString()
      }, 'mobile-mountain-bookings')
      
      setSubmitSuccess(true)
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        service: 'Basic Wash - $45',
        selectedDate: '',
        selectedTime: '',
        message: ''
      })
      
      setTimeout(() => {
        setIsBookingModalOpen(false)
        setSubmitSuccess(false)
      }, 2000)
    } catch (error) {
      console.error('Error submitting booking:', error)
      setError('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [bookingForm])

  const handleInputChange = useCallback((field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }))
  }, [])

  const openBookingModal = useCallback(() => {
    setIsBookingModalOpen(true)
  }, [])

  const closeBookingModal = useCallback(() => {
    setIsBookingModalOpen(false)
    setSubmitSuccess(false)
    setError(null)
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/mobile-mountain" className="flex items-center space-x-4">
              <Image
                src="/mobile-mountain-logo-new.png"
                alt="Mobile Mountain Detail"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white">Mobile Mountain Detail</h1>
                <p className="text-blue-400 text-sm">Professional Mobile Detailing</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="#home" className="text-gray-300 hover:text-white font-medium transition-colors">
                Home
              </Link>
              <Link href="#services" className="text-gray-300 hover:text-white font-medium transition-colors">
                Services
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white font-medium transition-colors">
                Pricing
              </Link>
              <Link href="#contact" className="text-gray-300 hover:text-white font-medium transition-colors">
                Contact
              </Link>
              <button
                onClick={openBookingModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Book Now
              </button>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
            </div>

            <button
              onClick={openBookingModal}
              className="lg:hidden bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6"
              >
                <Truck className="h-4 w-4 mr-2" />
                Mobile Service - We Come To You
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                Professional
                <span className="text-blue-400 block">Car Detailing</span>
                At Your Doorstep
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Experience premium mobile car detailing services. We bring professional-grade equipment and expertise right to your location for exceptional results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openBookingModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
                >
                  Book Your Detail
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  View Services
                </motion.button>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-48 h-24 mx-auto mb-8"
                >
                  <Car className="w-full h-full text-blue-400" />
                </motion.div>
                
                <div className="relative w-96 h-96">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-80 h-80">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2"
                      >
                        <Shield className="h-8 w-8 text-blue-400" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        className="absolute top-8 right-8"
                      >
                        <Sparkles className="h-6 w-6 text-yellow-400" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-8 right-8"
                      >
                        <Clock className="h-6 w-6 text-green-400" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
                        className="absolute bottom-8 left-8"
                      >
                        <Award className="h-6 w-6 text-purple-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional car detailing services delivered right to your doorstep. We use premium products and techniques to restore your vehicle's beauty.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gray-700 p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative ${
                  service.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`w-16 h-16 bg-${service.color}-600/20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <service.icon className={`h-8 w-8 text-${service.color}-400`} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">{service.price}</div>
                <p className="text-gray-300 mb-6">{service.description}</p>
                
                <ul className="text-left space-y-3 text-gray-300">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={openBookingModal}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Book This Service
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Mobile Mountain Detail?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another detailing service. We're your trusted partner in vehicle care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: 'Mobile Service',
                description: 'We come to you, saving you time and hassle'
              },
              {
                icon: Shield,
                title: 'Premium Products',
                description: 'Only the highest quality detailing products'
              },
              {
                icon: Award,
                title: 'Expert Technicians',
                description: 'Certified professionals with years of experience'
              },
              {
                icon: Clock,
                title: 'Flexible Scheduling',
                description: 'Book appointments that work for your schedule'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our mobile detailing services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-700 p-8 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to give your vehicle the care it deserves? Contact us today to schedule your mobile detailing appointment.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-400 mr-4" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-gray-300">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-400 mr-4" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-gray-300">info@mobilemountain.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-400 mr-4" />
                  <div>
                    <p className="font-semibold text-white">Service Area</p>
                    <p className="text-gray-300">Greater Denver Metro Area</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-blue-400 mr-4" />
                  <div>
                    <p className="font-semibold text-white">Hours</p>
                    <p className="text-gray-300">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Book Your Appointment</h3>
              <p className="text-gray-300 mb-6">
                Schedule your mobile detailing service today. We'll come to your location and give your vehicle the professional care it deserves.
              </p>
              <button
                onClick={openBookingModal}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Schedule Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="/mobile-mountain-logo-new.png"
                  alt="Mobile Mountain Detail"
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">Mobile Mountain Detail</h3>
                  <p className="text-blue-400 text-sm">Professional Mobile Detailing</p>
                </div>
              </div>
              <p className="text-gray-400">
                Professional mobile car detailing services. We bring the detailing to you with premium quality and convenience.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Basic Wash</li>
                <li>Premium Detail</li>
                <li>Ultimate Detail</li>
                <li>Paint Correction</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>(555) 123-4567</li>
                <li>info@mobilemountain.com</li>
                <li>Denver Metro Area</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Friday: 8AM-6PM</li>
                <li>Saturday: 8AM-6PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
              <Link href="/mobile-mountain/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/mobile-mountain/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
            <p>&copy; 2024 Mobile Mountain Detail. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence mode="wait">
        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Book Your Detail</h3>
                <button
                  onClick={closeBookingModal}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Booking Submitted!</h4>
                  <p className="text-gray-300">We'll contact you soon to confirm your appointment.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email (Optional)</label>
                      <input
                        type="email"
                        value={bookingForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Service Address *</label>
                      <input
                        type="text"
                        required
                        value={bookingForm.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Service</label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    >
                      <option value="Basic Wash - $45">Basic Wash - $45</option>
                      <option value="Premium Detail - $125">Premium Detail - $125</option>
                      <option value="Ultimate Detail - $200">Ultimate Detail - $200</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={bookingForm.selectedDate}
                      onChange={(e) => handleInputChange('selectedDate', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Time</label>
                    <select
                      value={bookingForm.selectedTime}
                      onChange={(e) => handleInputChange('selectedTime', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    >
                      <option value="">Select a time</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Additional Notes</label>
                    <textarea
                      rows={3}
                      value={bookingForm.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                      placeholder="Any special requests or vehicle details..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
                 )}
       </AnimatePresence>
       </div>
     </ErrorBoundary>
   )
 }

