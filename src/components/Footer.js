import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Business Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/mmd 1.jpg" 
                alt="Mobile Mountain Detail Logo" 
                className="h-12 w-12 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-bold">Mobile Mountain Detail</h3>
                <p className="text-sm text-gray-400">Professional Auto Detailing</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Professional mobile auto detailing services that come to your doorstep. 
              Experience the convenience of premium car care.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-300">905-966-9491</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-300">mobilemountaindetail@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">@mobilemountaindetail</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button 
                onClick={() => document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => document.querySelector('.section-padding').scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                Our Services
              </button>
              <Link 
                to="/admin" 
                className="block text-gray-300 hover:text-white transition-colors duration-200"
                style={{ fontSize: '0.75rem', opacity: 0.3 }}
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mobile Mountain Detail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
