import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RoseWeb Creation - Professional Web Development Services',
  description: 'Transform your business with stunning, modern websites. Professional web development services with cutting-edge technology and beautiful user experiences.',
  keywords: 'web development, custom software, mobile apps, responsive design, modern websites',
  authors: [{ name: 'RoseWeb Creation' }],
  openGraph: {
    title: 'RoseWeb Creation - Professional Web Development Services',
    description: 'Transform your business with stunning, modern websites.',
    type: 'website',
  },
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
      </body>
    </html>
  )
}
