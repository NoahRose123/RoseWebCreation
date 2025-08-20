'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Phone, Mail, MapPin, Calendar, Clock, Car, DollarSign, Users } from 'lucide-react'
import { getBookings, updateBooking, Booking } from '../../../lib/firebase'

export default function MobileMountainAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
    revenue: 0
  })

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = async () => {
    try {
      const bookingsData = await getBookings('mobile-mountain-bookings')
      setBookings(bookingsData)
      
      // Calculate stats
      const total = bookingsData.length
      const pending = bookingsData.filter(b => b.status === 'Pending').length
      const completed = bookingsData.filter(b => b.status === 'Confirmed').length
      const cancelled = bookingsData.filter(b => b.status === 'Cancelled').length
      
      // Calculate revenue (basic calculation)
      const revenue = bookingsData
        .filter(b => b.status === 'Confirmed')
        .reduce((sum, booking) => {
          const price = booking.service.includes('$') 
            ? parseInt(booking.service.split('$')[1]) 
            : 0
          return sum + price
        }, 0)

      setStats({ total, pending, completed, cancelled, revenue })
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (bookingId: number, newStatus: string) => {
    try {
      await updateBooking(bookingId, newStatus, 'mobile-mountain-bookings')
      await loadBookings() // Reload to get updated data
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status.toLowerCase() === filter
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500'
      case 'completed': return 'bg-green-500'
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
        <div className="text-white text-xl">Loading...</div>
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
              <h1 className="text-3xl font-bold">Mobile Mountain Admin</h1>
              <p className="text-gray-300">Booking Management Dashboard</p>
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

      {/* Stats Section */}
      <section className="py-8 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-700 p-6 rounded-lg text-center"
            >
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-gray-400 text-sm">Total Bookings</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-700 p-6 rounded-lg text-center"
            >
              <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.pending}</div>
              <div className="text-gray-400 text-sm">Pending</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-700 p-6 rounded-lg text-center"
            >
              <Check className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.completed}</div>
              <div className="text-gray-400 text-sm">Completed</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-700 p-6 rounded-lg text-center"
            >
              <X className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.cancelled}</div>
              <div className="text-gray-400 text-sm">Cancelled</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-700 p-6 rounded-lg text-center"
            >
              <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">${stats.revenue}</div>
              <div className="text-gray-400 text-sm">Revenue</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {['all', 'pending', 'completed', 'cancelled'].map((filterOption) => (
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
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Car className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No bookings found</h3>
              <p className="text-gray-500">No bookings match the current filter.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-semibold">{booking.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-400" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          <span>{booking.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-400" />
                          <span>{formatDate(booking.selectedDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span>{formatTime(booking.selectedTime)}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-blue-400" />
                          <span className="font-medium">Service Address:</span>
                        </div>
                        <p className="text-gray-300 ml-6">{booking.address}</p>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Car className="h-4 w-4 text-blue-400" />
                          <span className="font-medium">Service:</span>
                        </div>
                        <p className="text-gray-300 ml-6">{booking.service}</p>
                      </div>
                      
                      {booking.message && (
                        <div className="mt-4">
                          <div className="font-medium mb-2">Additional Notes:</div>
                          <p className="text-gray-300">{booking.message}</p>
                        </div>
                      )}
                      
                      <div className="mt-4 text-sm text-gray-400">
                        Booked on: {formatDate(booking.createdAt)}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:ml-6">
                      {booking.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'Completed')}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Check className="h-4 w-4" />
                            Mark Complete
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'Cancelled')}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </button>
                        </>
                      )}
                      
                                             {booking.status === 'Confirmed' && (
                         <button
                           onClick={() => handleStatusUpdate(booking.id, 'Pending')}
                           className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
                         >
                           Mark Pending
                         </button>
                       )}
                      
                      {booking.status === 'Cancelled' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'Pending')}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
