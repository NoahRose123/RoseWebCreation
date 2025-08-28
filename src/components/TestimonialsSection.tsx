'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Amazing experience! The staff was incredibly friendly and the jet ski was in perfect condition. No license required made it so easy to get started. Will definitely be back!",
    avatar: "👩‍🦰"
  },
  {
    name: "Mike Chen",
    rating: 5,
    text: "The Supercharged Beast was absolutely incredible! As an experienced rider, I was blown away by the performance. BRP Diagnostics knows how to deliver an adrenaline rush!",
    avatar: "👨‍🦱"
  },
  {
    name: "Emily Rodriguez",
    rating: 5,
    text: "Perfect for our family outing. The safety briefing was thorough and the equipment was top-notch. Kids had a blast and we felt completely safe the whole time.",
    avatar: "👩‍🦳"
  },
  {
    name: "David Thompson",
    rating: 5,
    text: "First time jet skiing and the staff made it so easy! Patient instruction and the $150/hr all-inclusive price was exactly what was advertised. Highly recommend!",
    avatar: "👨‍🦲"
  },
  {
    name: "Lisa Wang",
    rating: 5,
    text: "The booking process was smooth and the jet ski exceeded expectations. Professional service from start to finish. Already planning our next visit!",
    avatar: "👩‍🦱"
  },
  {
    name: "James Wilson",
    rating: 5,
    text: "Incredible value for money! The fuel was included as promised and the jet ski was in excellent condition. Staff went above and beyond to ensure we had a great time.",
    avatar: "👨‍🦰"
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary-lime/5 rounded-full blur-3xl"></div>
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
            <span className="gradient-text">WHAT OUR</span>
            <br />
            <span className="text-white">CUSTOMERS SAY</span>
          </h2>
          <p className="text-xl text-secondary-cyan max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-effect p-6 rounded-2xl card-hover"
            >
              {/* Quote Icon */}
              <div className="flex justify-end mb-4">
                <Quote className="w-8 h-8 text-primary-lime/50" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">Verified Customer</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-lime/20 to-secondary-cyan/20 p-8 rounded-2xl border border-white/20">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">5.0/5.0</h3>
            <p className="text-xl text-secondary-cyan mb-4">Average Customer Rating</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-lime">500+</div>
                <div className="text-gray-300">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary-cyan">1000+</div>
                <div className="text-gray-300">Rentals Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent-orange">100%</div>
                <div className="text-gray-300">Safety Record</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-accent-orange to-accent-red text-white p-8 rounded-2xl">
            <h3 className="text-3xl font-bold mb-4">JOIN OUR HAPPY CUSTOMERS!</h3>
            <p className="text-xl mb-6">Book your jet ski adventure today and create memories that last a lifetime</p>
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black font-bold py-4 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              BOOK NOW - $150/HR
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
