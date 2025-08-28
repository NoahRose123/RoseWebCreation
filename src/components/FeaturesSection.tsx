'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Users, Shield, Zap, Star, Clock } from 'lucide-react'

const features = [
  {
    icon: CheckCircle,
    title: "NO BOAT LICENSE REQUIRED",
    description: "Jump right in! No special permits or licenses needed to enjoy our jet skis.",
    color: "text-primary-lime"
  },
  {
    icon: Users,
    title: "Rated for 3 Riders / 400 lbs",
    description: "Perfect for families and groups. Safe capacity for up to 3 people.",
    color: "text-secondary-cyan"
  },
  {
    icon: Shield,
    title: "Safety Gear Included",
    description: "Life jackets, safety briefing, and all necessary equipment provided.",
    color: "text-accent-orange"
  },
  {
    icon: Star,
    title: "Friendly Staff",
    description: "Our team greets, trains & handles everything A-Z. Beginners welcome!",
    color: "text-primary-neon"
  },
  {
    icon: Zap,
    title: "Supercharged Beast Available",
    description: "For experienced riders seeking maximum thrills and performance.",
    color: "text-accent-red"
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Available 9 AM - 5 PM daily. Extended hours available on request.",
    color: "text-secondary-blue"
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-lime/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-cyan/5 rounded-full blur-3xl"></div>
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
            <span className="gradient-text">WHY CHOOSE</span>
            <br />
            <span className="text-white">BRP DIAGNOSTICS?</span>
          </h2>
          <p className="text-xl text-secondary-cyan max-w-3xl mx-auto">
            Experience the ultimate jet ski adventure with our premium service and unbeatable features
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="glass-effect p-8 rounded-2xl card-hover group"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={32} className={feature.color} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary-lime transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-lime/20 to-secondary-cyan/20 p-8 rounded-2xl border border-white/20"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              🎯 PERFECT FOR BEGINNERS & EXPERTS ALIKE
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="text-xl font-bold text-primary-lime mb-2">For Beginners:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Complete safety training included</li>
                  <li>• Patient, experienced instructors</li>
                  <li>• Calm water areas available</li>
                  <li>• No experience necessary</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-accent-orange mb-2">For Experts:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• High-performance jet skis</li>
                  <li>• Advanced riding areas</li>
                  <li>• Customized experiences</li>
                  <li>• Extended rental options</li>
                </ul>
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
          <div className="bg-gradient-to-r from-accent-orange to-accent-red text-white p-6 rounded-2xl inline-block">
            <h3 className="text-2xl font-bold mb-2">READY FOR THE ADVENTURE?</h3>
            <p className="text-lg mb-4">Book your slot now before they're gone!</p>
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              BOOK NOW - $150/HR
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
