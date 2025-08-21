'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Phone, Mail, MapPin, Calendar, Clock, Car, Filter } from 'lucide-react'
import { getBookings, Booking } from '../../../lib/firebase'

export default function MobileMountainBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const bookingsData = await getBookings('mobile-mountain-bookings')
      setBookings(bookingsData)
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status.toLowerCase() === filter
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500'
      case 'confirmed': return 'bg-green-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return timeString || 'Not specified'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Mobile Mountain Bookings</h1>
              <p className="text-gray-300">View and manage all booking requests</p>
            </div>
            <button
              onClick={loadBookings}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <section className="py-6 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {['all', 'pending', 'confirmed', 'cancelled'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === filterOption
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'No bookings match your search criteria.' : 'No bookings match the current filter.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-semibold">{booking.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span>{booking.email || 'No email provided'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span>{formatDate(booking.selectedDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span>{formatTime(booking.selectedTime)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-300">Service Address:</span>
                            <p className="text-gray-400">{booking.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <Car className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-300">Service:</span>
                            <p className="text-gray-400">{booking.service}</p>
                          </div>
                        </div>
                        
                        {booking.message && (
                          <div className="flex items-start gap-2">
                            <div className="h-4 w-4 flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-300">Additional Notes:</span>
                              <p className="text-gray-400">{booking.message}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">
                        Booking submitted: {formatDate(booking.createdAt)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:ml-6">
                      <div className="text-right text-sm text-gray-400">
                        ID: {booking.id}
                      </div>
                      
                      {booking.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
                          >
                            <Check className="h-3 w-3" />
                            Confirm
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
                          >
                            <X className="h-3 w-3" />
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Summary */}
      <section className="py-8 bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </h3>
            <p className="text-gray-400">
              {filter !== 'all' && `Filtered by: ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
              {searchTerm && ` • Searching for: "${searchTerm}"`}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

