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
  Zap,
  Mountain,
  Award,
  Clock3
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
        'Paint Correction',
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
        'Ceramic Coating',
        'Engine Bay Cleaning',
        'Headlight Restoration',
        'Paint Protection Film',
        '1 Year Warranty'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addBooking({
        ...bookingData,
        status: 'Pending',
        createdAt: new Date().toISOString()
      })

      // Reset form
      setBookingData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      })
      setShowBookingModal(false)
      
      // Show success message
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('There was an error submitting your booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Hero Section - Grey Theme */}
      <section id="home" className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-800/60"></div>
        <div className="container-custom section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Mountain className="h-8 w-8 text-gray-300" />
                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {content.heroTitle}
                </h1>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed">
                {content.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="btn-primary bg-gray-600 hover:bg-gray-700 text-white border-2 border-gray-500"
                >
                  Book Appointment
                  <Calendar className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary bg-transparent hover:bg-gray-700 text-white border-2 border-gray-400"
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
                {/* Hero Image Collage - Only 4 images as requested */}
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
                    src="/mobile-mountain-hero-5.jpg"
                    alt="Mobile Mountain Detail - Professional Car Detailing"
                    width={200}
                    height={120}
                    className="w-full h-auto rounded-lg shadow-2xl"
                    priority
                  />
                  <Image
                    src="/mobile-mountain-hero-6.jpg"
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
      </section>

      {/* Services Section - Grey Theme */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
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
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-gray-600 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Grey Theme */}
      <section id="pricing" className="py-20 bg-gray-100">
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.pricingTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.pricingSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`bg-white rounded-xl shadow-lg p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-gray-600 relative scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => {
                    setSelectedService(plan.name)
                    setShowBookingModal(true)
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
                    plan.popular
                      ? 'bg-gray-800 hover:bg-gray-900 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Grey Theme */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.testimonialsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.testimonialsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
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
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Grey Theme */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.contactTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-gray-600 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">{content.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-gray-600 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">{content.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-gray-600 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-900">Service Area</p>
                      <p className="text-gray-600">{content.serviceArea}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Professional Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <Clock3 className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Convenient Mobile Service</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Safe & Eco-Friendly Products</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-700">Experienced Team</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book Your Appointment</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service *
                  </label>
                  <select
                    required
                    value={bookingData.service}
                    onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="Basic Wash - $45">Basic Wash - $45</option>
                    <option value="Premium Detail - $125">Premium Detail - $125</option>
                    <option value="Ultimate Detail - $200">Ultimate Detail - $200</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <select
                    required
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    <option value="">Select a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={bookingData.message}
                    onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Any special requests or notes..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Appointment'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Booking submitted successfully! We'll contact you soon.</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
