import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function BookingSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    message: '',
    serviceType: '',
    addOns: [],
    vehicleType: '',
    date: '',
    time: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceTypes = [
    { value: 'exterior', label: 'Exterior Detail', price: 100 },
    { value: 'interior', label: 'Interior Detail', price: 125 },
    { value: 'full', label: 'Full Detail', price: 200 }
  ];

  const addOnOptions = [
    { value: 'clay-wax', label: 'Clay Bar + Wax', price: 40 },
    { value: 'clay-ceramic', label: 'Clay Bar + Ceramic Sealant', price: 70 },
    { value: 'interior-ceramic', label: 'Interior Ceramic Seat Sealant', price: 30 },
    { value: 'pet-hair', label: 'Pet Hair Removal', price: 15 }
  ];

  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan', surcharge: 0 },
    { value: 'midsize', label: 'Midsize (+$25)', surcharge: 25 },
    { value: 'suv-truck', label: 'SUV/Truck (+$50)', surcharge: 50 }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        addOns: checked 
          ? [...prev.addOns, value]
          : prev.addOns.filter(addon => addon !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateTotal = () => {
    const selectedService = serviceTypes.find(s => s.value === formData.serviceType);
    const selectedVehicle = vehicleTypes.find(v => v.value === formData.vehicleType);
    const selectedAddOns = addOnOptions.filter(a => formData.addOns.includes(a.value));
    
    const servicePrice = selectedService ? selectedService.price : 0;
    const vehicleSurcharge = selectedVehicle ? selectedVehicle.surcharge : 0;
    const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    
    return servicePrice + vehicleSurcharge + addOnsTotal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.phone || !formData.address || !formData.serviceType || !formData.vehicleType || !formData.date || !formData.time) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const bookingData = {
        ...formData,
        totalPrice: calculateTotal(),
        createdAt: serverTimestamp(),
        status: 'pending'
      };

      await addDoc(collection(db, 'mobile-mountain-bookings'), bookingData);
      
      setSubmitStatus({ type: 'success', message: 'Booking submitted successfully! We will contact you soon to confirm your appointment.' });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        message: '',
        serviceType: '',
        addOns: [],
        vehicleType: '',
        date: '',
        time: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus({ type: 'error', message: 'There was an error submitting your booking. Please try again or contact us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-section" className="section-padding bg-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Book Your Appointment
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Schedule your professional auto detailing service today. 
            We'll come to your location and transform your vehicle.
          </p>
        </div>

        {/* Booking Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Service Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Full address where service will be performed"
                  required
                />
              </div>
            </div>

            {/* Service Selection */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Service Type *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label} - ${service.price}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Vehicle Type *
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map(vehicle => (
                    <option key={vehicle.value} value={vehicle.value}>
                      {vehicle.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add-ons */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">
                Add-on Services
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {addOnOptions.map(addon => (
                  <label key={addon.value} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      name="addOns"
                      value={addon.value}
                      checked={formData.addOns.includes(addon.value)}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600 border-gray-600 rounded focus:ring-blue-500 bg-gray-700"
                    />
                    <span className="text-gray-300">
                      {addon.label} ({addon.price > 0 ? `+$${addon.price}` : 'Free'})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="input-field"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="input-field"
                placeholder="Any special requests or additional information..."
              />
            </div>

            {/* Total Price Display */}
            {formData.serviceType && (
              <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-white">Estimated Total:</span>
                  <span className="text-3xl font-bold text-blue-400">${calculateTotal()}</span>
                </div>
              </div>
            )}

            {/* Submit Status */}
            {submitStatus && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-900/50 text-green-300 border border-green-700' 
                  : 'bg-red-900/50 text-red-300 border border-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary text-lg py-5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;
