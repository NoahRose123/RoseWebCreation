'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronDown, 
  Monitor, 
  Smartphone, 
  Code, 
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
  X
} from 'lucide-react'
import Image from 'next/image'
import RoseWebHeader from './components/RoseWebHeader'
import RoseWebFooter from './components/RoseWebFooter'
import { addBooking } from '../lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    selectedDate: '',
    selectedTime: '',
    message: ''
  })
  const [pricing, setPricing] = useState({
    websiteMonthly: 40,
    websiteYearly: 200,
    customSoftware: 'Contact'
  })
  const [isLoading, setIsLoading] = useState(true)

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

  // Load pricing from Firebase with proper error handling
  useEffect(() => {
    const loadPricing = async () => {
      try {
        // Check if db is properly initialized
        if (!db || typeof db.doc !== 'function') {
          console.log('Firebase not properly initialized, using default pricing')
          setIsLoading(false)
          return
        }

        const pricingDoc = await getDoc(doc(db, 'roseweb-settings', 'pricing'))
        if (pricingDoc.exists()) {
          const data = pricingDoc.data()
          setPricing({
            websiteMonthly: data.websiteMonthly || 40,
            websiteYearly: data.websiteYearly || 200,
            customSoftware: data.customSoftware || 'Contact'
          })
        } else {
          console.log('Pricing document not found, using default values')
        }
      } catch (error) {
        console.warn('Error loading pricing, using defaults:', error)
        // Keep default pricing if there's an error
      } finally {
        setIsLoading(false)
      }
    }
    
    loadPricing()
  }, [])

  const services = [
    {
      icon: Monitor,
      title: 'Website Development',
      description: 'Custom websites built with modern technologies and responsive design.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading']
    },
    {
      icon: Code,
      title: 'Custom Software',
      description: 'Tailored software solutions to streamline your business operations.',
      features: ['Custom Development', 'Scalable Solutions', '24/7 Support']
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['Native Development', 'Cross-Platform', 'App Store Optimization']
    }
  ]

  const pricingPlans = [
    {
      name: 'Website Monthly',
      price: `$${pricing.websiteMonthly}`,
      period: 'per month',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Content Management',
        'Basic Analytics',
        'Email Support'
      ],
      popular: false
    },
    {
      name: 'Website Yearly',
      price: `$${pricing.websiteYearly}`,
      period: 'per year',
      features: [
        'Everything in Monthly',
        'Priority Support',
        'Advanced Analytics',
        'Custom Domain',
        'SSL Certificate',
        '2 Months Free'
      ],
      popular: true
    },
    {
      name: 'Custom Software/App',
      price: pricing.customSoftware,
      period: 'for quote',
      features: [
        'Custom Development',
        'Scalable Architecture',
        'Database Design',
        'API Integration',
        '24/7 Support',
        'Maintenance Included'
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'RoseWeb Creation transformed our online presence completely. Our new website increased conversions by 300%.',
      rating: 5,
      image: '/masonsolutions.png'
    },
         {
       name: 'Michael Chen',
       role: 'Founder, Digital Agency',
       content: 'Professional, creative, and delivered exactly what we needed. Highly recommended!',
       rating: 5,
       image: '/mooseplumbing.png'
     }
  ]

  const mockBookings = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      service: 'Website Monthly',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      service: 'Custom Software',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'Pending'
    }
  ]

  const analytics = {
    totalBookings: 45,
    monthlyRevenue: 1250,
    averageRating: 4.8,
    completionRate: 95
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Create new booking data
      const newBooking = {
        ...bookingData,
        status: 'Pending' as const,
        createdAt: new Date().toISOString()
      }
      
      // Add booking to Firestore
      await addBooking(newBooking, 'roseweb-bookings')
      
      // Reset form and close modal
      setShowBookingModal(false)
      setBookingData({
        name: '',
        email: '',
        phone: '',
        address: '',
        service: '',
        selectedDate: '',
        selectedTime: '',
        message: ''
      })
      
      // Show success message
      alert('Booking submitted successfully! We will contact you soon.')
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('There was an error submitting your booking. Please try again.')
    }
  }

  // Prevent hydration mismatch by not rendering until loaded
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <RoseWebHeader />
      
      {/* Hero Section */}
      <section id="home" className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-white/50"></div>
        <div className="container-custom section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                Transform Your <span className="text-primary-600">Digital Presence</span>
              </h1>
              <p className="text-xl text-secondary-600 leading-relaxed">
                We create stunning, modern websites and applications that help businesses grow and succeed in the digital world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="btn-primary"
                >
                  Book Appointment
                  <Calendar className="ml-2 h-5 w-5" />
                </button>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary"
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
                <Image
                  src="/hero.svg"
                  alt="Digital Solutions Illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-primary-600 animate-bounce" />
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
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              We offer comprehensive web design and development services to help your business thrive online.
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
                 className="bg-white rounded-xl shadow-lg p-8 card-hover border border-gray-100"
               >
                 <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                   <service.icon className="h-8 w-8 text-primary-600" />
                 </div>
                 <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                   {service.title}
                 </h3>
                 <p className="text-secondary-600 mb-6">
                   {service.description}
                 </p>
                 <ul className="space-y-2">
                   {service.features.map((feature) => (
                     <li key={feature} className="flex items-center text-sm text-secondary-600">
                       <CheckCircle className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
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
        <section id="pricing" className="section-padding gradient-bg">
         <div className="container-custom">
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="text-center mb-16"
           >
             <h2 className="text-4xl font-bold text-secondary-900 mb-4">
               Pricing Plans
             </h2>
             <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
               Choose the perfect plan for your business needs. All plans include our premium support and quality guarantee.
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
                   plan.popular ? 'border-primary-500 relative' : 'border-gray-100'
                 }`}
               >
                 {plan.popular && (
                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                     <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                       Most Popular
                     </span>
                   </div>
                 )}
                 <div className="text-center mb-8">
                   <h3 className="text-2xl font-bold text-secondary-900 mb-4">{plan.name}</h3>
                   <div className="mb-4">
                     <span className="text-4xl font-bold text-primary-600">{plan.price}</span>
                     <span className="text-secondary-600 ml-2">{plan.period}</span>
                   </div>
                 </div>
                 <ul className="space-y-4 mb-8">
                   {plan.features.map((feature) => (
                     <li key={feature} className="flex items-center text-secondary-600">
                       <CheckCircle2 className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0" />
                       {feature}
                     </li>
                   ))}
                 </ul>
                 <button 
                   onClick={() => setShowBookingModal(true)}
                   className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                     plan.popular 
                       ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl' 
                       : 'bg-white hover:bg-gray-50 text-primary-600 border-2 border-primary-600'
                   }`}
                 >
                   {plan.price === 'Contact' ? 'Get Quote' : 'Choose Plan'}
                 </button>
               </motion.div>
             ))}
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
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
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
                 className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-8 card-hover border border-primary-100"
               >
                 <div className="flex items-center mb-6">
                   <Image
                     src={testimonial.image}
                     alt={testimonial.name}
                     width={60}
                     height={60}
                     className="rounded-full mr-4"
                   />
                   <div>
                     <h4 className="font-semibold text-secondary-900">{testimonial.name}</h4>
                     <p className="text-sm text-secondary-600">{testimonial.role}</p>
                     <div className="flex mt-1">
                       {[...Array(testimonial.rating)].map((_, i) => (
                         <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                       ))}
                     </div>
                   </div>
                 </div>
                 <p className="text-secondary-700 italic">
                   "{testimonial.content}"
                 </p>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-secondary-900 mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-secondary-600 mb-8">
                Let's discuss how we can help bring your vision to life. Get in touch with us today for a free consultation.
              </p>
              
                             <div className="space-y-6">
                 <div className="flex items-center space-x-4">
                   <div className="bg-primary-100 p-3 rounded-lg">
                     <Mail className="h-6 w-6 text-primary-600" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-secondary-900">Email</h3>
                     <p className="text-secondary-600">rosewebc@gmail.com</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center space-x-4">
                   <div className="bg-primary-100 p-3 rounded-lg">
                     <Phone className="h-6 w-6 text-primary-600" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-secondary-900">Phone</h3>
                     <p className="text-secondary-600">(289) 213-0256</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center space-x-4">
                   <div className="bg-primary-100 p-3 rounded-lg">
                     <MapPin className="h-6 w-6 text-primary-600" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-secondary-900">Location</h3>
                     <p className="text-secondary-600">Niagara, Ontario</p>
                   </div>
                 </div>
               </div>
            </motion.div>
            
                         <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               viewport={{ once: true }}
               className="bg-white rounded-2xl shadow-xl p-8"
             >
                               <h3 className="text-2xl font-semibold text-secondary-900 mb-6">
                  Book Your Appointment
                </h3>
               <div className="space-y-6">
                 <button 
                   onClick={() => setShowBookingModal(true)}
                   className="btn-primary w-full"
                 >
                   Book Now
                   <Calendar className="ml-2 h-5 w-5" />
                 </button>
                 
               </div>
             </motion.div>
          </div>
        </div>
      </section>



      <RoseWebFooter />

       {/* Booking Modal */}
       {showBookingModal && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
           >
                           <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-secondary-900">Book Appointment</h3>
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
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                   required
                 />
                 <input
                   type="text"
                   placeholder="Last Name"
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 />
               </div>
               <input
                 type="email"
                 placeholder="Email Address"
                 value={bookingData.email}
                 onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 required
               />
               <input
                 type="tel"
                 placeholder="Phone Number"
                 value={bookingData.phone}
                 onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 required
               />
               <select 
                 value={bookingData.service}
                 onChange={(e) => setBookingData({...bookingData, service: e.target.value})}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                 required
               >
                 <option value="">Select Service</option>
                 <option value={`Website Monthly - $${pricing.websiteMonthly}`}>Website Monthly - ${pricing.websiteMonthly}</option>
                 <option value={`Website Yearly - $${pricing.websiteYearly}`}>Website Yearly - ${pricing.websiteYearly}</option>
                 <option value={`Custom Software/App - ${pricing.customSoftware}`}>Custom Software/App - {pricing.customSoftware}</option>
               </select>
                               <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    When would you like a call?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                                          value={bookingData.selectedDate}
                    onChange={(e) => setBookingData({...bookingData, selectedDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="time"
                                          value={bookingData.selectedTime}
                    onChange={(e) => setBookingData({...bookingData, selectedTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
               <textarea
                 placeholder="Tell us about your project..."
                 rows={4}
                 value={bookingData.message}
                 onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
               ></textarea>
                               <button type="submit" className="btn-primary w-full">
                  Book Appointment
                </button>
             </form>
           </motion.div>
         </div>
       )}

       {/* Analytics Modal */}
       {showAnalytics && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
           >
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-2xl font-bold text-secondary-900">Analytics Dashboard</h3>
               <button
                 onClick={() => setShowAnalytics(false)}
                 className="text-gray-400 hover:text-gray-600"
               >
                 <X className="h-6 w-6" />
               </button>
             </div>
             
             {/* Analytics Overview */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
               <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm text-primary-600 font-medium">Total Bookings</p>
                     <p className="text-3xl font-bold text-primary-900">{analytics.totalBookings}</p>
                   </div>
                   <Calendar className="h-8 w-8 text-primary-600" />
                 </div>
               </div>
               <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm text-green-600 font-medium">Monthly Revenue</p>
                     <p className="text-3xl font-bold text-green-900">${analytics.monthlyRevenue}</p>
                   </div>
                   <DollarSign className="h-8 w-8 text-green-600" />
                 </div>
               </div>
               <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm text-yellow-600 font-medium">Avg Rating</p>
                     <p className="text-3xl font-bold text-yellow-900">{analytics.averageRating}</p>
                   </div>
                   <Star className="h-8 w-8 text-yellow-600 fill-current" />
                 </div>
               </div>
               <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-sm text-purple-600 font-medium">Completion Rate</p>
                     <p className="text-3xl font-bold text-purple-900">{analytics.completionRate}%</p>
                   </div>
                   <TrendingUp className="h-8 w-8 text-purple-600" />
                 </div>
               </div>
             </div>

             {/* Recent Bookings */}
             <div>
               <h4 className="text-xl font-semibold text-secondary-900 mb-4">Recent Bookings</h4>
               <div className="bg-gray-50 rounded-xl p-6">
                 <div className="space-y-4">
                   {mockBookings.map((booking) => (
                     <div key={booking.id} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                       <div>
                         <h5 className="font-semibold text-secondary-900">{booking.name}</h5>
                         <p className="text-sm text-secondary-600">{booking.email}</p>
                         <p className="text-sm text-primary-600">{booking.service}</p>
                       </div>
                       <div className="text-right">
                         <p className="text-sm text-secondary-600">{booking.date}</p>
                         <p className="text-sm text-secondary-600">{booking.time}</p>
                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                           booking.status === 'Confirmed' 
                             ? 'bg-green-100 text-green-800' 
                             : 'bg-yellow-100 text-yellow-800'
                         }`}>
                           {booking.status}
                         </span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </motion.div>
         </div>
       )}
     </div>
   )
 }
