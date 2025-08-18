'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Monthly Website',
      description: 'Perfect for small businesses and startups',
      monthlyPrice: 22,
      yearlyPrice: null,
      features: [
        'Custom Website Development',
        'Content Management System',
        'Basic SEO Optimization',
        'Mobile Responsive Design',
        'Email Support',
        'SSL Certificate',
        'Basic Analytics',
        'Social Media Integration',
        'Contact Forms',
        'Blog Setup'
      ],
      limitations: [
        'Up to 10 pages',
        'Basic customization',
        'Standard hosting',
        'Email support only'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Yearly Website',
      description: 'Ideal for growing businesses with annual commitment',
      monthlyPrice: null,
      yearlyPrice: 165,
      features: [
        'Everything in Monthly Website',
        'Advanced SEO Tools',
        'Priority Support',
        'Custom Integrations',
        'Advanced Analytics',
        'A/B Testing',
        'Marketing Automation',
        'CRM Integration',
        'Payment Gateway Setup',
        'Inventory Management',
        'Order Management',
        'Customer Reviews',
        'Loyalty Programs'
      ],
      limitations: [
        'Up to 50 pages',
        'Standard customization',
        'Premium hosting',
        'Priority support'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Custom Software',
      description: 'For businesses with unique software needs',
      monthlyPrice: null,
      yearlyPrice: null,
      features: [
        'Custom Software Development',
        'Tailored Solutions',
        'Dedicated Development Team',
        'Advanced Security',
        'SLA Guarantee',
        'Custom Integrations',
        'API Development',
        'Third-party Integrations',
        'Advanced Reporting',
        'Custom Branding',
        'Multi-language Support',
        'Advanced Analytics',
        'Custom Workflows',
        'Enterprise SSO',
        'Advanced Permissions'
      ],
      limitations: [
        'Unlimited features',
        'Full customization',
        'Enterprise hosting',
        'Dedicated support'
      ],
      cta: 'Contact Us',
      popular: false
    }
  ]

  const addOns = [
    {
      name: 'AI Content Generation',
      description: 'GPT-4 powered content creation for your website',
      price: 'Contact Us'
    },
    {
      name: 'Brand Design',
      description: 'Complete brand identity including logo and design assets',
      price: 'Contact Us'
    },
    {
      name: 'Custom Software',
      description: 'Tailored software solutions for your specific needs',
      price: 'Contact Us'
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Choose the Perfect Plan for Your Business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Scale from startup to enterprise with our flexible pricing plans
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 ${
                plan.popular
                  ? 'border-blue-500 scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  {plan.monthlyPrice && billingCycle === 'monthly' && (
                    <div className="text-4xl font-bold text-gray-900">
                      ${plan.monthlyPrice}
                      <span className="text-lg font-normal text-gray-600">/mo</span>
                    </div>
                  )}
                  {plan.yearlyPrice && billingCycle === 'yearly' && (
                    <div className="text-4xl font-bold text-gray-900">
                      ${plan.yearlyPrice}
                      <span className="text-lg font-normal text-gray-600">/year</span>
                    </div>
                  )}
                  {!plan.monthlyPrice && !plan.yearlyPrice && (
                    <div className="text-4xl font-bold text-gray-900">
                      Contact Us
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What&apos;s included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation) => (
                        <li key={limitation} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link
                  href={plan.cta === 'Contact Us' ? '/contact' : '#contact'}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Additional Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {addOns.map((addon) => (
               <div key={addon.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {addon.name}
                </h4>
                <p className="text-gray-600 mb-4">
                  {addon.description}
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  {addon.price}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept e-transfer and invoices for all our services.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all new subscriptions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
