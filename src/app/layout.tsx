import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BRP Diagnostics - Premium Jet Ski Rental',
  description: 'Experience the thrill of premium jet ski rentals with BRP Diagnostics. $150/HR ALL-IN with FREE FUEL. No boat license required. Book your adventure today!',
  keywords: 'jet ski rental, BRP Diagnostics, water sports, Toronto, premium jet ski, no license required',
  authors: [{ name: 'BRP Diagnostics' }],
  openGraph: {
    title: 'BRP Diagnostics - Premium Jet Ski Rental',
    description: 'Experience the thrill of premium jet ski rentals with BRP Diagnostics. $150/HR ALL-IN with FREE FUEL.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BRP Diagnostics - Premium Jet Ski Rental',
    description: 'Experience the thrill of premium jet ski rentals with BRP Diagnostics.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1E293B',
              color: '#FFFFFF',
              border: '1px solid #32CD32',
            },
          }}
        />
      </body>
    </html>
  )
}
