'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Check, Phone, Mail, MapPin, Clock, Shield, Award, Car, Sparkles, Zap } from 'lucide-react'
import { addBooking } from '../../lib/firebase'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function MobileMountainPage() {
  // Default content for Mobile Mountain
  const content = {
    heroTitle: 'Professional Mobile Car Detailing',
    heroSubtitle: 'We bring the detailing service to you. Professional, convenient, and exceptional results every time.',
    servicesTitle: 'Our Premium Services',
    servicesSubtitle: 'Professional car detailing services delivered right to your doorstep. We use premium products and techniques to restore your vehicle\'s beauty.',
    pricingTitle: 'Transparent Pricing',
    pricingSubtitle: 'No hidden fees, no surprises. Our pricing is clear and competitive for professional mobile detailing services.',
    testimonialsTitle: 'What Our Customers Say',
    testimonialsSubtitle: 'Don\'t just take our word for it. Here\'s what our satisfied customers have to say about our mobile detailing services.',
    businessName: 'Mobile Mountain Detail',
    phoneNumber: '(555) 123-4567',
    email: 'info@mobilemountain.com',
    serviceArea: 'Greater Denver Metro Area',
    footerDescription: 'Professional mobile car detailing services. We bring the detailing to you with premium quality and convenience.'
  }
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
  const [availableSlots, setAvailableSlots] = useState<Array<{date: string, times: string[]}>>([])

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
    }
  ]

  // Generate available slots for next 30 days
  useEffect(() => {
    const generateSlots = () => {
      const slots = []
      const today = new Date()
      
      for (let i = 0; i < 30; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        const dateStr = date.toISOString().split('T')[0]
        
        // Generate time slots from 8 AM to 6 PM
        const times = []
        for (let hour = 8; hour <= 18; hour++) {
          times.push(`${hour.toString().padStart(2, '0')}:00`)
        }
        
        slots.push({
          date: dateStr,
          times: times
        })
      }
      
      setAvailableSlots(slots)
    }
    
    generateSlots()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
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
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section - New Design with Custom Car Styling */}
      <section id="home" className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Custom Car Animation */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="relative"
          >
            {/* Car Body */}
            <div className="w-96 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full relative">
              {/* Car Windows */}
              <div className="absolute top-2 left-8 w-16 h-8 bg-blue-200 rounded-lg"></div>
              <div className="absolute top-2 right-8 w-16 h-8 bg-blue-200 rounded-lg"></div>
              
              {/* Car Wheels */}
              <div className="absolute -bottom-2 left-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600"></div>
              <div className="absolute -bottom-2 right-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600"></div>
              
              {/* Car Details */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            
            {/* Sparkles around car */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -left-4"
            >
              <Sparkles className="h-6 w-6 text-yellow-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -right-4"
            >
              <Zap className="h-6 w-6 text-blue-400" />
            </motion.div>
          </motion.div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Car className="h-12 w-12 text-blue-400 mr-4" />
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  {content?.heroTitle || 'Professional Mobile Car Detailing'}
                </h1>
              </div>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {content?.heroSubtitle || 'We bring the detailing service to you. Professional, convenient, and exceptional results every time.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  Book Your Detail
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
                >
                  View Services
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Artistic Car Detail Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full max-w-4xl mx-auto"
              >
                {/* Central Car Silhouette */}
                <div className="relative">
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
                    className="w-32 h-16 mx-auto mb-8"
                  >
                    <Car className="w-full h-full text-white/80" />
                  </motion.div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative w-80 h-80">
                      {/* Protection Shield */}
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
                      
                      {/* Sparkles */}
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
                      
                      {/* Clock */}
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
                      
                      {/* Award */}
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
                      
                      {/* Zap */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                        className="absolute top-8 left-8"
                      >
                        <Zap className="h-6 w-6 text-orange-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Floating Particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                      className="absolute w-2 h-2 bg-white/60 rounded-full"
                      style={{
                        left: `${20 + (i * 60) % 80}%`,
                        top: `${30 + (i * 40) % 60}%`
                      }}
                    />
                  ))}
                </div>
                
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content?.servicesTitle || 'Our Premium Services'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content?.servicesSubtitle || 'Professional car detailing services delivered right to your doorstep. We use premium products and techniques to restore your vehicle\'s beauty.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic Wash</h3>
              <p className="text-gray-600 mb-6">Exterior wash, tire cleaning, and interior vacuum. Perfect for regular maintenance.</p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Exterior hand wash
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Tire and wheel cleaning
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Interior vacuum
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Window cleaning
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Detail</h3>
              <p className="text-gray-600 mb-6">Complete interior and exterior detailing with premium products and attention to detail.</p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Everything in Basic Wash
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Interior deep cleaning
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Leather conditioning
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Clay bar treatment
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ultimate Detail</h3>
              <p className="text-gray-600 mb-6">Our most comprehensive service including paint correction and ceramic coating.</p>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Everything in Premium Detail
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Paint correction
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Ceramic coating
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Engine bay cleaning
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-900 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {content?.pricingTitle || 'Transparent Pricing'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content?.pricingSubtitle || 'No hidden fees, no surprises. Our pricing is clear and competitive for professional mobile detailing services.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-2xl text-center border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4">Basic Wash</h3>
              <div className="text-4xl font-bold text-blue-400 mb-6">$45</div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Exterior hand wash
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Tire and wheel cleaning
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Interior vacuum
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Window cleaning
                </li>
              </ul>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Book Now
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blue-600 p-8 rounded-2xl text-center border-2 border-blue-500 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Detail</h3>
              <div className="text-4xl font-bold mb-6">$125</div>
              <ul className="space-y-3 text-blue-100 mb-8">
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-yellow-400 mr-2" />
                  Everything in Basic Wash
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-yellow-400 mr-2" />
                  Interior deep cleaning
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-yellow-400 mr-2" />
                  Leather conditioning
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-yellow-400 mr-2" />
                  Clay bar treatment
                </li>
              </ul>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-white hover:bg-gray-100 text-blue-600 py-3 rounded-lg font-semibold transition-colors"
              >
                Book Now
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-2xl text-center border border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4">Ultimate Detail</h3>
              <div className="text-4xl font-bold text-purple-400 mb-6">$200</div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Everything in Premium Detail
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Paint correction
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Ceramic coating
                </li>
                <li className="flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-400 mr-2" />
                  Engine bay cleaning
                </li>
              </ul>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Book Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content?.testimonialsTitle || 'What Our Customers Say'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content?.testimonialsSubtitle || 'Don\'t just take our word for it. Here\'s what our satisfied customers have to say about our mobile detailing services.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl"
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
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 text-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">{content?.phoneNumber || '(555) 123-4567'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">{content?.email || 'info@mobilemountain.com'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold">Service Area</p>
                    <p className="text-gray-600">{content?.serviceArea || 'Greater Denver Metro Area'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-600">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6">Book Your Appointment</h3>
              <p className="text-gray-600 mb-6">
                Schedule your mobile detailing service today. We'll come to your location and give your vehicle the professional care it deserves.
              </p>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Schedule Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* New Booking Modal with Calendar Interface */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book Your Detail</h3>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Booking Submitted!</h4>
                <p className="text-gray-600">We'll contact you soon to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Address *</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.address}
                      onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Basic Wash - $45">Basic Wash - $45</option>
                    <option value="Premium Detail - $125">Premium Detail - $125</option>
                    <option value="Ultimate Detail - $200">Ultimate Detail - $200</option>
                  </select>
                </div>

                {/* Calendar Interface */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Date & Time</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Date</label>
                      <select
                        required
                        value={bookingForm.selectedDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, selectedDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a date</option>
                        {availableSlots.map((slot) => (
                          <option key={slot.date} value={slot.date}>
                            {new Date(slot.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Time</label>
                      <select
                        required
                        value={bookingForm.selectedTime}
                        onChange={(e) => setBookingForm({ ...bookingForm, selectedTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={!bookingForm.selectedDate}
                      >
                        <option value="">Select a time</option>
                        {bookingForm.selectedDate && 
                          availableSlots
                            .find(slot => slot.date === bookingForm.selectedDate)
                            ?.times.map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    rows={3}
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or vehicle details..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
