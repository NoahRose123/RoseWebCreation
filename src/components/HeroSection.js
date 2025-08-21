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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
              Mobile Mountain Detail
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-200">
              Professional mobile auto detailing services that come to you
            </p>
            <p className="text-lg mb-8 text-gray-300">
              Experience the convenience of premium car detailing at your doorstep. 
              We bring the mountain of expertise to your vehicle.
            </p>
            <button 
              onClick={scrollToBooking}
              className="btn-primary text-lg px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Book Now
            </button>
          </div>

          {/* Logo Images */}
          <div className="flex flex-col items-center lg:items-end space-y-8">
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

        {/* Contact Info */}
        <div className="mt-20 text-center">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>905-966-9491</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>mobilemountaindetail@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span>@mobilemountaindetail</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
