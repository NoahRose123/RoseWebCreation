'use client'

import { motion } from 'framer-motion'
import { Zap, Users, Gauge, Star } from 'lucide-react'

const fleet = [
  {
    name: "Standard Jet Ski",
    image: "/jetskimain.jpg",
    description: "Perfect for beginners and families. Easy to handle with excellent stability.",
    specs: {
      capacity: "3 riders",
      weight: "400 lbs max",
      speed: "Up to 50 mph",
      power: "150 HP"
    },
    features: ["Stable design", "Easy controls", "Family friendly", "Safety features"],
    price: "$150/HR",
    popular: false
  },
  {
    name: "Supercharged Beast",
    image: "/jetski1.jpg",
    description: "High-performance machine for experienced riders seeking maximum thrills.",
    specs: {
      capacity: "2 riders",
      weight: "300 lbs max",
      speed: "Up to 70 mph",
      power: "300 HP"
    },
    features: ["High performance", "Advanced controls", "Thrilling speed", "Pro rider"],
    price: "$200/HR",
    popular: true
  },
  {
    name: "Premium Cruiser",
    image: "/jetski2.jpg",
    description: "Luxury jet ski with premium features and comfortable riding experience.",
    specs: {
      capacity: "3 riders",
      weight: "450 lbs max",
      speed: "Up to 60 mph",
      power: "200 HP"
    },
    features: ["Luxury comfort", "Premium features", "Smooth ride", "All riders"],
    price: "$175/HR",
    popular: false
  }
]

export default function FleetSection() {
  return (
    <section id="fleet" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary-lime/5 rounded-full blur-3xl"></div>
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
            <span className="gradient-text">OUR</span>
            <br />
            <span className="text-white">PREMIUM FLEET</span>
          </h2>
          <p className="text-xl text-secondary-cyan max-w-3xl mx-auto">
            Choose from our selection of high-quality jet skis designed for every skill level
          </p>
        </motion.div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {fleet.map((jetSki, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -10 }}
              className={`relative glass-effect rounded-2xl overflow-hidden card-hover ${
                jetSki.popular ? 'ring-2 ring-primary-lime' : ''
              }`}
            >
              {/* Popular Badge */}
              {jetSki.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-primary-lime to-secondary-cyan text-black px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star size={16} />
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${jetSki.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{jetSki.name}</h3>
                  <p className="text-gray-200 text-sm">{jetSki.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-primary-lime">{jetSki.price}</div>
                  <div className="text-sm text-gray-400">ALL-INCLUSIVE</div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <Users className="w-6 h-6 text-secondary-cyan mx-auto mb-1" />
                    <div className="text-sm text-gray-400">Capacity</div>
                    <div className="font-bold text-white">{jetSki.specs.capacity}</div>
                  </div>
                  <div className="text-center">
                    <Gauge className="w-6 h-6 text-accent-orange mx-auto mb-1" />
                    <div className="text-sm text-gray-400">Speed</div>
                    <div className="font-bold text-white">{jetSki.specs.speed}</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-6 h-6 text-primary-lime mx-auto mb-1" />
                    <div className="text-sm text-gray-400">Power</div>
                    <div className="font-bold text-white">{jetSki.specs.power}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-6 h-6 bg-secondary-cyan rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-xs font-bold text-black">W</span>
                    </div>
                    <div className="text-sm text-gray-400">Weight</div>
                    <div className="font-bold text-white">{jetSki.specs.weight}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    {jetSki.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary-lime rounded-full"></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 ${
                    jetSki.popular
                      ? 'bg-gradient-to-r from-primary-lime to-secondary-cyan text-black hover:scale-105'
                      : 'bg-gradient-to-r from-accent-orange to-accent-red text-white hover:scale-105'
                  }`}
                >
                  BOOK THIS JET SKI
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fleet Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-lime/10 to-secondary-cyan/10 p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 ALL JET SKIS INCLUDE:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🛟</div>
                <h4 className="font-bold text-primary-lime mb-2">Safety Equipment</h4>
                <p className="text-gray-300 text-sm">Life jackets, safety briefing, emergency equipment</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⛽</div>
                <h4 className="font-bold text-secondary-cyan mb-2">Fuel Included</h4>
                <p className="text-gray-300 text-sm">No hidden fuel costs - everything is included</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">👨‍🏫</div>
                <h4 className="font-bold text-accent-orange mb-2">Expert Training</h4>
                <p className="text-gray-300 text-sm">Professional instruction for all skill levels</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
