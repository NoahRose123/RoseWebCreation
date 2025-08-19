'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  Car, 
  Sparkles, 
  Shield, 
  Star,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  X,
  Wrench,
  Droplets,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import Header from '../components/MobileMountainHeader'
import Footer from '../components/MobileMountainFooter'
import { addBooking } from '../../lib/firebase'
import { useWebsiteContent } from '../../lib/websiteContent'

export default function MobileMountainPage() {
  const { content } = useWebsiteContent()
  const [isVisible, setIsVisible] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    setIsVisible(true)
    
    const handleOpenBookingModal = () => {
      setShowBookingModal(true)
    }

    window.addEventListener('openBookingModal', handleOpenBookingModal)
    
    return () => {
      window.removeEventListener('openBookingModal', handleOpenBookingModal)
    }
  }, [])

  const services = [
    {
      icon: Sparkles,
      title: 'Exterior Detailing',
      description: 'Complete exterior wash, wax, and paint protection for your vehicle.',
      features: ['Hand Wash', 'Clay Bar Treatment', 'Paint Protection']
    },
    {
      icon: Car,
      title: 'Interior Detailing',
      description: 'Deep cleaning and sanitization of your vehicle\'s interior surfaces.',
      features: ['Vacuum & Steam Clean', 'Leather Treatment', 'Odor Elimination']
    },
    {
      icon: Zap,
      title: 'Full Detail Package',
      description: 'Comprehensive detailing service covering both interior and exterior.',
      features: ['Complete Service', 'Premium Products', 'Satisfaction Guaranteed']
    }
  ]

  const pricingPlans = [
    {
      name: 'Basic Wash',
      price: '$45',
      period: 'per vehicle',
      features: [
        'Exterior Hand Wash',
        'Tire & Wheel Cleaning',
        'Window Cleaning',
        'Interior Vacuum',
        'Dashboard Wipe Down'
      ],
      popular: false
    },
    {
      name: 'Premium Detail',
      price: '$125',
      period: 'per vehicle',
      features: [
        'Everything in Basic',
        'Clay Bar Treatment',
        'Paint Protection Wax',
        'Interior Deep Clean',
        'Leather Conditioning',
        'Odor Elimination'
      ],
      popular: true
    },
    {
      name: 'Ultimate Detail',
      price: '$200',
      period: 'per vehicle',
      features: [
        'Everything in Premium',
        'Paint Correction',
        'Ceramic Coating',
        'Engine Bay Cleaning',
        'Headlight Restoration',
        'Premium Products'
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Local Business Owner',
      content: 'Mobile Mountain Detail transformed my truck completely. Professional service and amazing results!',
      rating: 5,
      image: '/mobile-mountain-logo.jpg'
    },
    {
      name: 'Mike Chen',
      role: 'Car Enthusiast',
      content: 'Best detailing service I\'ve ever used. They come to you and the quality is outstanding.',
      rating: 5,
      image: '/mobile-mountain-logo.jpg'
    }
  ]

  const mockBookings = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      service: 'Premium Detail',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'Emily Davis',
      email: 'emily@example.com',
      service: 'Basic Wash',
      date: '2024-01-16',
      time: '2:00 PM',
      status: 'Pending'
    }
  ]

  const analytics = {
    totalBookings: 45,
    completionRate: 95
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create new booking data
      const newBooking = {
        ...bookingData,
        status: 'Pending' as const
      }
      
      // Add booking to Firestore (using 'mobile-mountain-bookings' collection)
      await addBooking(newBooking, 'mobile-mountain-bookings')
      
      // Reset form and close modal
      setShowBookingModal(false)
      setBookingData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      })
      
      // Show success message
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    } catch (error) {
      console.error('Error submitting booking:', error)
      // Show a more user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      // Fallback: Store booking locally if Firebase fails
      if (errorMessage.includes('permissions') || errorMessage.includes('network')) {
        // Store in localStorage as fallback
        const existingBookings = JSON.parse(localStorage.getItem('mobile-mountain-bookings') || '[]')
        const newBooking = {
          ...bookingData,
          status: 'Pending',
          id: Date.now(),
          createdAt: new Date().toISOString()
        }
        existingBookings.push(newBooking)
        localStorage.setItem('mobile-mountain-bookings', JSON.stringify(existingBookings))
        
        // Reset form and close modal
        setShowBookingModal(false)
        setBookingData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          message: ''
        })
        
        // Show success message
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 5000)
        
        alert('Booking submitted successfully! We\'ll contact you soon to confirm.')
      } else {
        alert('There was an error submitting your booking. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
             {/* Hero Section */}
       <section id="home" className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-blue-900/50"></div>
        <div className="container-custom section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
                             <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                 {content.heroTitle}
               </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="btn-primary bg-blue-600 hover:bg-blue-700"
                >
                  Book Appointment
                  <Calendar className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary bg-gray-700 hover:bg-gray-600 text-white"
                >
                  View Pricing
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                                 <div className="grid grid-cols-2 gap-4">
                   <Image
                     src="/mobile-mountain-hero.jpg"
                     alt="Mobile Mountain Detail - Professional Car Detailing"
                     width={200}
                     height={120}
                     className="w-full h-auto rounded-lg shadow-2xl"
                     priority
                   />
                   <Image
                     src="/mobile-mountain-hero-2.jpg"
                     alt="Mobile Mountain Detail - Professional Car Detailing"
                     width={200}
                     height={120}
                     className="w-full h-auto rounded-lg shadow-2xl"
                     priority
                   />
                   <Image
                     src="/mobile-mountain-hero-3.jpg"
                     alt="Mobile Mountain Detail - Professional Car Detailing"
                     width={200}
                     height={120}
                     className="w-full h-auto rounded-lg shadow-2xl"
                     priority
                   />
                   <Image
                     src="/mobile-mountain-hero-4.jpg"
                     alt="Mobile Mountain Detail - Professional Car Detailing"
                     width={200}
                     height={120}
                     className="w-full h-auto rounded-lg shadow-2xl"
                     priority
                   />
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-white animate-bounce" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.servicesTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.servicesSubtitle}
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
                className="bg-gray-50 rounded-xl p-8 card-hover border border-gray-200"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pricing Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect detailing package for your vehicle. All plans include our mobile service and quality guarantee.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-lg p-8 card-hover border-2 ${
                  plan.popular ? 'border-blue-500 relative' : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600'
                  }`}
                >
                  Book Service
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Service Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide mobile car detailing services throughout the local area. Contact us to confirm service availability in your location.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 card-hover border border-gray-200 text-center"
            >
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Areas</h3>
              <p className="text-gray-600 mb-6">
                Serving residential areas within a 25-mile radius of our base location.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Residential Homes</li>
                <li>• Office Buildings</li>
                <li>• Apartment Complexes</li>
                <li>• Shopping Centers</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 card-hover border border-gray-200 text-center"
            >
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Hours</h3>
              <p className="text-gray-600 mb-6">
                We work around your schedule to provide convenient service times.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Weekdays: 8 AM - 6 PM</li>
                <li>• Weekends: 9 AM - 5 PM</li>
                <li>• Evening Appointments</li>
                <li>• Same-Day Service Available</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 card-hover border border-gray-200 text-center"
            >
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Guarantee</h3>
              <p className="text-gray-600 mb-6">
                We stand behind our work with a satisfaction guarantee.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• 100% Satisfaction Guarantee</li>
                <li>• Professional Equipment</li>
                <li>• Eco-Friendly Products</li>
                <li>• Insured & Licensed</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our mobile detailing service.
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
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 card-hover border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center space-x-1 mr-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                                                 <Image
              src="/rosewebc.png"
              alt="Rose Web Creation"
              width={48}
              height={48}
              className="rounded-lg"
            />
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Vehicle?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Book your mobile car detailing service today and experience the difference professional care makes for your vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Now
              </button>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
              >
                View Pricing
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3"
        >
          <CheckCircle className="h-6 w-6" />
          <div>
            <h4 className="font-semibold">Booking Submitted!</h4>
            <p className="text-sm">We'll contact you soon to confirm your appointment.</p>
          </div>
          <button
            onClick={() => setShowSuccessMessage(false)}
            className="text-white hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book Detailing Service</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <select 
                value={bookingData.service}
                onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Service</option>
                <option value="Basic Wash - $45">Basic Wash - $45</option>
                <option value="Premium Detail - $125">Premium Detail - $125</option>
                <option value="Ultimate Detail - $200">Ultimate Detail - $200</option>
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When would you like service?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <textarea
                placeholder="Tell us about your vehicle and any special requests..."
                rows={4}
                value={bookingData.message}
                onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Book Service'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
