'use client'

import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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
            <span className="gradient-text">GET IN</span>
            <br />
            <span className="text-white">TOUCH</span>
          </h2>
          <p className="text-xl text-secondary-cyan max-w-3xl mx-auto">
            Ready to start your jet ski adventure? Contact us today!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Phone Number */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-lime to-secondary-cyan rounded-xl flex items-center justify-center">
                  <Phone className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                  <a 
                    href="tel:647-264-2606" 
                    className="text-2xl font-bold text-primary-lime hover:text-primary-neon transition-colors"
                  >
                    647-264-2606
                  </a>
                  <p className="text-gray-300 text-sm">Available 9 AM - 5 PM Daily</p>
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary-cyan to-accent-orange rounded-xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                  <a 
                    href="mailto:info@brpdiagnostics.com" 
                    className="text-lg text-secondary-cyan hover:text-secondary-blue transition-colors"
                  >
                    info@brpdiagnostics.com
                  </a>
                  <p className="text-gray-300 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-accent-red rounded-xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                  <p className="text-gray-300">
                    Toronto Waterfront<br />
                    Lake Ontario<br />
                    Ontario, Canada
                  </p>
                  <p className="text-gray-300 text-sm">Exact location provided upon booking</p>
                </div>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-neon to-primary-lime rounded-xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Operating Hours</h3>
                  <div className="space-y-1 text-gray-300">
                    <div>Monday - Sunday: 9:00 AM - 5:00 PM</div>
                    <div className="text-sm">Extended hours available on request</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                  placeholder="647-264-2606"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-lime transition-colors">
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="pricing">Pricing Question</option>
                  <option value="safety">Safety Information</option>
                  <option value="general">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-lime transition-colors"
                  placeholder="Tell us about your jet ski adventure plans..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-lime to-secondary-cyan text-black font-bold py-4 px-8 rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          </motion.div>
        </div>

        {/* Social Media & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Call */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <Phone className="w-12 h-12 text-primary-lime mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Call Now</h3>
              <p className="text-gray-300 mb-4">Speak with our team directly</p>
              <a
                href="tel:647-264-2606"
                className="inline-block bg-gradient-to-r from-primary-lime to-secondary-cyan text-black font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                CALL 647-264-2606
              </a>
            </motion.div>

            {/* WhatsApp */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-gray-300 mb-4">Quick messaging for instant replies</p>
              <a
                href="https://wa.me/16472642606"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-transform duration-300"
              >
                SEND MESSAGE
              </a>
            </motion.div>

            {/* Social Media */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <Instagram className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Follow Us</h3>
              <p className="text-gray-300 mb-4">See our latest adventures</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-accent-orange to-accent-red text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">🚨 EMERGENCY CONTACT</h3>
            <p className="text-lg mb-4">For urgent matters or last-minute bookings</p>
            <a
              href="tel:647-264-2606"
              className="inline-block bg-white text-black font-bold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300 text-xl"
            >
              CALL NOW: 647-264-2606
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
