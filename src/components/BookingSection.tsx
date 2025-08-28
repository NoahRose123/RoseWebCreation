'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Phone, Mail, MapPin, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'

interface BookingForm {
  name: string
  email: string
  phone: string
  date: string
  time: string
  duration: string
  riders: number
  jetSkiType: string
  specialRequests: string
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
]

const jetSkiTypes = [
  { id: 'standard', name: 'Standard Jet Ski', price: 150 },
  { id: 'supercharged', name: 'Supercharged Beast', price: 200 },
  { id: 'premium', name: 'Premium Cruiser', price: 175 }
]

export default function BookingSection() {
  const [formData, setFormData] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: '1',
    riders: 1,
    jetSkiType: 'standard',
    specialRequests: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof BookingForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    const selectedJetSki = jetSkiTypes.find(js => js.id === formData.jetSkiType)
    const basePrice = selectedJetSki?.price || 150
    return basePrice * parseInt(formData.duration)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Here you would integrate with Firebase
    // const bookingData = {
    //   ...formData,
    //   total: calculateTotal(),
    //   timestamp: new Date().toISOString(),
    //   status: 'pending'
    // }
    // await addDoc(collection(db, 'bookings'), bookingData)

    toast.success('Booking request submitted! We\'ll contact you shortly to confirm.')
    setIsSubmitting(false)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      duration: '1',
      riders: 1,
      jetSkiType: 'standard',
      specialRequests: ''
    })
  }

  const selectedJetSki = jetSkiTypes.find(js => js.id === formData.jetSkiType)

  return (
    <section id="booking" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-lime/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-display">
            <span className="gradient-text">BOOK</span>
            <br />
            <span className="text-white">YOUR ADVENTURE</span>
          </h2>
          <p className="text-xl text-secondary-cyan max-w-3xl mx-auto">
            Reserve your jet ski today and get ready for an unforgettable water adventure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-6 h-6 text-primary-lime mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                    placeholder="647-264-2606"
                  />
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-6 h-6 text-secondary-cyan mr-2" />
                  Booking Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-lime transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time *</label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-lime transition-colors"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration (Hours) *</label>
                    <select
                      required
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-lime transition-colors"
                    >
                      <option value="1">1 Hour</option>
                      <option value="2">2 Hours</option>
                      <option value="3">3 Hours</option>
                      <option value="4">4 Hours</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of Riders *</label>
                    <select
                      required
                      value={formData.riders}
                      onChange={(e) => handleInputChange('riders', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-lime transition-colors"
                    >
                      <option value={1}>1 Rider</option>
                      <option value={2}>2 Riders</option>
                      <option value={3}>3 Riders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Jet Ski Type *</label>
                  <select
                    required
                    value={formData.jetSkiType}
                    onChange={(e) => handleInputChange('jetSkiType', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-lime transition-colors"
                  >
                    {jetSkiTypes.map(jetSki => (
                      <option key={jetSki.id} value={jetSki.id}>
                        {jetSki.name} - ${jetSki.price}/hr
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Special Requests</label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-lime to-secondary-cyan text-black font-bold py-4 px-8 rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>SUBMIT BOOKING REQUEST</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Price Summary */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <CreditCard className="w-6 h-6 text-primary-lime mr-2" />
                Booking Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Jet Ski Type:</span>
                  <span className="text-white font-medium">{selectedJetSki?.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Duration:</span>
                  <span className="text-white font-medium">{formData.duration} hour(s)</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Riders:</span>
                  <span className="text-white font-medium">{formData.riders} person(s)</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Rate per hour:</span>
                  <span className="text-white font-medium">${selectedJetSki?.price}</span>
                </div>
                
                <hr className="border-white/20" />
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white">Total:</span>
                  <span className="text-2xl font-black text-primary-lime">${calculateTotal()}</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">✅ What's Included</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-lime rounded-full"></div>
                  <span>Jet ski rental with fuel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-lime rounded-full"></div>
                  <span>Safety equipment (life jackets)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-lime rounded-full"></div>
                  <span>Safety briefing and training</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-lime rounded-full"></div>
                  <span>Professional staff assistance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-lime rounded-full"></div>
                  <span>No hidden fees</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">📞 Need Help?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-lime" />
                  <a href="tel:647-264-2606" className="text-white hover:text-primary-lime transition-colors">
                    647-264-2606
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary-cyan" />
                  <span className="text-white">info@brpdiagnostics.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-accent-orange" />
                  <span className="text-white">9 AM - 5 PM Daily</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
