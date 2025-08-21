import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import BookingSection from './BookingSection';
import Footer from './Footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <HeroSection />
      <ServicesSection />
      <BookingSection />
      <Footer />
    </div>
  );
}

export default HomePage;
