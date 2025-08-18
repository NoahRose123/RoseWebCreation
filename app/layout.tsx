import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Elite Web Solutions - Enterprise Web Development Suite',
    template: '%s | Elite Web Solutions'
  },
  description: 'A cutting-edge, scalable web application suite designed to generate $1M+ in revenue through premium web development services, SaaS offerings, and enterprise solutions.',
  keywords: [
    'web development',
    'enterprise solutions',
    'SaaS platform',
    'digital agency',
    'custom software',
    'e-commerce',
    'web applications',
    'AI-powered',
    'white label',
    'enterprise software'
  ],
  authors: [{ name: 'Elite Web Solutions' }],
  creator: 'Elite Web Solutions',
  publisher: 'Elite Web Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elitewebsolutions.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://elitewebsolutions.com',
    title: 'Elite Web Solutions - Enterprise Web Development Suite',
    description: 'A cutting-edge, scalable web application suite designed to generate $1M+ in revenue through premium web development services, SaaS offerings, and enterprise solutions.',
    siteName: 'Elite Web Solutions',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elite Web Solutions - Enterprise Web Development Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Web Solutions - Enterprise Web Development Suite',
    description: 'A cutting-edge, scalable web application suite designed to generate $1M+ in revenue through premium web development services, SaaS offerings, and enterprise solutions.',
    images: ['/og-image.jpg'],
    creator: '@elitewebsolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0066FF" />
        <meta name="msapplication-TileColor" content="#0066FF" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.stripe.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.stripe.com" />
        <link rel="dns-prefetch" href="//js.stripe.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Elite Web Solutions",
              "url": "https://elitewebsolutions.com",
              "logo": "https://elitewebsolutions.com/logo.png",
              "description": "Enterprise Web Development Suite - Premium web development services, SaaS offerings, and enterprise solutions",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "1-800-WEB-ELITE",
                "contactType": "customer service",
                "email": "enterprise@elitewebsolutions.com"
              },
              "sameAs": [
                "https://twitter.com/elitewebsolutions",
                "https://linkedin.com/company/elite-web-solutions",
                "https://facebook.com/elitewebsolutions"
              ],
              "foundingDate": "2024",
              "numberOfEmployees": "50-100",
              "serviceType": [
                "Web Development",
                "E-commerce Solutions",
                "Custom Software Development",
                "SaaS Platform Development",
                "Enterprise Solutions",
                "AI-Powered Applications"
              ]
            })
          }}
        />
      </body>
    </html>
  )
}
