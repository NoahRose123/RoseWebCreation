import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile Mountain Detail - Professional Mobile Car Detailing',
  description: 'Professional mobile car detailing services in the Denver Metro Area. We bring premium detailing to your doorstep with expert technicians and quality products.',
  keywords: 'mobile car detailing, car wash, auto detailing, Denver, Colorado, mobile detailing service',
  openGraph: {
    title: 'Mobile Mountain Detail - Professional Mobile Car Detailing',
    description: 'Professional mobile car detailing services in the Denver Metro Area. We bring premium detailing to your doorstep.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function MobileMountainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mobile-mountain-layout">
      {children}
    </div>
  )
}
