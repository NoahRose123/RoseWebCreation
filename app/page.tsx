import { Hero } from '@/components/marketing/hero'
import { Features } from '@/components/marketing/features'
import { Pricing } from '@/components/marketing/pricing'
import { Testimonials } from '@/components/marketing/testimonials'
import { CTA } from '@/components/marketing/cta'
import { Stats } from '@/components/marketing/stats'
import { Header } from '@/components/marketing/header'
import { Footer } from '@/components/marketing/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50">
      <Header />
      
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      
      <Footer />
    </div>
  )
}
