'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      title: "Client Portal & Dashboard",
      description: "Comprehensive client management and analytics",
      items: [
        {
          title: "Analytics for Clients",
          description: "Track website performance and client engagement"
        },
        {
          title: "Client Information",
          description: "Manage client profiles and project details"
        },
        {
          title: "File Sharing",
          description: "Secure document exchange and collaboration"
        }
      ]
    },
    {
      title: "AI-Powered Website Builder",
      description: "Intelligent tools for rapid development and optimization",
      items: [
        {
          title: "Industry Templates",
          description: "Pre-built templates for various industries"
        },
        {
          title: "AI Customization",
          description: "Smart customization based on your brand"
        },
        {
          title: "Responsive Design",
          description: "Mobile-first responsive layouts"
        },
        {
          title: "Brand Integration",
          description: "Seamless brand integration across all pages"
        },
        {
          title: "GPT-4 Integration",
          description: "AI-powered content generation"
        },
        {
          title: "SEO-Optimized Content",
          description: "Search engine optimized content creation"
        },
        {
          title: "Multi-language Support",
          description: "Support for multiple languages"
        },
        {
          title: "Tone Customization",
          description: "Customize content tone and style"
        },
        {
          title: "Auto Meta Tags",
          description: "Automatic meta tag generation"
        },
        {
          title: "Schema Markup",
          description: "Structured data for better SEO"
        },
        {
          title: "Sitemap Generation",
          description: "Automatic XML sitemap creation"
        },
        {
          title: "Keyword Optimization",
          description: "SEO keyword optimization tools"
        },
        {
          title: "Image Compression",
          description: "Automatic image optimization"
        },
        {
          title: "Lazy Loading",
          description: "Performance optimization with lazy loading"
        },
        {
          title: "CDN Integration",
          description: "Content delivery network integration"
        },
        {
          title: "Caching Optimization",
          description: "Advanced caching for better performance"
        }
      ]
    }
  ]

  const infrastructure = [
    {
      title: "Advanced Security Suite",
      description: "Bank-level security with comprehensive protection",
      items: [
        "Two-Factor Authentication",
        "SSL Certificate Management", 
        "DDoS Protection",
        "GDPR Compliance",
        "Security Audits"
      ]
    },
    {
      title: "Marketing Automation",
      description: "Intelligent marketing tools for growth",
      items: [
        "Email Campaigns",
        "Social Media Integration",
        "Landing Page Builder",
        "Referral System",
        "Review Management"
      ]
    },
    {
      title: "Infrastructure",
      description: "Enterprise-grade infrastructure and deployment",
      items: [
        "Docker Containers",
        "Kubernetes Orchestration",
        "AWS/Google Cloud",
        "CloudFlare CDN"
      ]
    }
  ]

  const technologies = [
    { name: "Next.js 14", description: "React framework for production" },
    { name: "TypeScript", description: "Type-safe JavaScript development" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "PostgreSQL", description: "Advanced open source database" },
    { name: "Redis", description: "In-memory data structure store" }
  ]

  return (
    <section id="features" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build, manage, and grow your online presence
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="space-y-20">
          {features.map((feature, featureIndex) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: featureIndex * 0.2 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {feature.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feature.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: featureIndex * 0.2 + itemIndex * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infrastructure Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Infrastructure
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with the latest technologies and security standards
            </p>
          </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {infrastructure.map((section) => (
               <div key={section.title} className="bg-gray-50 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h4>
                <p className="text-gray-600 mb-6">
                  {section.description}
                </p>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built with Modern Technologies
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge tech stack for optimal performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                         {technologies.map((tech) => (
               <motion.div
                 key={tech.name}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={inView ? { opacity: 1, scale: 1 } : {}}
                 transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {tech.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
