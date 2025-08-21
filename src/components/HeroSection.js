import React from 'react';

function HeroSection() {
  const scrollToBooking = () => {
    document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Mobile Mountain Detail
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-200">
              Professional mobile auto detailing services that come to you
            </p>
            <button 
              onClick={scrollToBooking}
              className="btn-primary text-lg px-8 py-4 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Book Now
            </button>
          </div>

          {/* Logo Images - Side by side on mobile, stacked on desktop */}
          <div className="flex flex-col items-center">
            {/* Mobile Layout - Images side by side */}
            <div className="flex flex-row items-center justify-center space-x-4 md:hidden mb-6">
              <div className="relative group">
                <img 
                  src="/mmd 1.jpg" 
                  alt="Mobile Mountain Detail Logo 1" 
                  className="w-32 h-32 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-2xl group-hover:bg-blue-600/10 transition-colors duration-300"></div>
              </div>
              <div className="relative group">
                <img 
                  src="/mmd2.jpg" 
                  alt="Mobile Mountain Detail Logo 2" 
                  className="w-32 h-32 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-2xl group-hover:bg-blue-600/10 transition-colors duration-300"></div>
              </div>
            </div>

            {/* Desktop Layout - Images stacked */}
            <div className="hidden md:flex flex-col items-center lg:items-end space-y-6 lg:space-y-8">
              <div className="relative group">
                <img 
                  src="/mmd 1.jpg" 
                  alt="Mobile Mountain Detail Logo 1" 
                  className="w-80 h-80 object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl group-hover:bg-blue-600/10 transition-colors duration-300"></div>
              </div>
              <div className="relative group">
                <img 
                  src="/mmd2.jpg" 
                  alt="Mobile Mountain Detail Logo 2" 
                  className="w-64 h-64 object-cover rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl group-hover:bg-blue-600/10 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm md:text-base">905-966-9491</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm md:text-base">mobilemountaindetail@gmail.com</span>
            </div>
            <a 
              href="https://instagram.com/mobilemountaindetail" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span className="text-sm md:text-base">@mobilemountaindetail</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
