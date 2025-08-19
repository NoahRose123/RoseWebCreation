'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  X,
  Download,
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  Car,
  Sparkles
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getBookings, updateBooking, deleteBooking } from '../../../lib/firebase'

interface Booking {
  id: number
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: 'Confirmed' | 'Pending' | 'Cancelled'
  createdAt: string
}

export default function MobileMountainBookingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Confirmed' | 'Pending' | 'Cancelled'>('all')

  // Load bookings from Firestore on component mount
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const firestoreBookings = await getBookings('mobile-mountain-bookings')
        setBookings(firestoreBookings)
      } catch (error) {
        console.error('Error loading bookings:', error)
      }
    }
    
    loadBookings()
  }, [])

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === '4242') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid code. Please try again.')
    }
  }

  const updateBookingStatus = async (id: number, status: 'Confirmed' | 'Pending' | 'Cancelled') => {
    try {
      await updateBooking(id, status, 'mobile-mountain-bookings')
      // Reload bookings from Firestore
      const firestoreBookings = await getBookings('mobile-mountain-bookings')
      setBookings(firestoreBookings)
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  const handleDeleteBooking = async (id: number) => {
    try {
      await deleteBooking(id, 'mobile-mountain-bookings')
      // Reload bookings from Firestore
      const firestoreBookings = await getBookings('mobile-mountain-bookings')
      setBookings(firestoreBookings)
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }

  const downloadBookings = (status?: 'Confirmed' | 'Pending' | 'Cancelled') => {
    const filteredBookings = status 
      ? bookings.filter(booking => booking.status === status)
      : bookings
    
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Message', 'Created At'],
      ...filteredBookings.map(booking => [
        booking.name,
        booking.email,
        booking.phone,
        booking.service,
        booking.date,
        booking.time,
        booking.status,
        booking.message || '',
        booking.createdAt
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mobile-mountain-bookings-${status || 'all'}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const getAnalytics = () => {
    const total = bookings.length
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length
    const pending = bookings.filter(b => b.status === 'Pending').length
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length
    
    // Calculate estimated revenue based on services - only from confirmed bookings
    const servicePrices: { [key: string]: number } = {
      'Basic Wash - $45': 45,
      'Premium Detail - $125': 125,
      'Ultimate Detail - $200': 200
    }
    
    const estimatedRevenue = bookings
      .filter(b => b.status === 'Confirmed') // Only confirmed bookings count towards revenue
      .reduce((total, booking) => {
        const price = servicePrices[booking.service] || 100 // Default price if service not found
        return total + price
      }, 0)
    
    return {
      total,
      confirmed,
      pending,
      cancelled,
      estimatedRevenue,
      confirmedPercentage: total > 0 ? (confirmed / total) * 100 : 0,
      pendingPercentage: total > 0 ? (pending / total) * 100 : 0,
      cancelledPercentage: total > 0 ? (cancelled / total) * 100 : 0
    }
  }

  const filteredBookings = selectedStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedStatus)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image
                src="/mobile-mountain-logo.jpg"
                alt="Mobile Mountain Detail"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-bold text-xl text-gray-900">Mobile Mountain Detail</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter the access code to view bookings</p>
          </div>

          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  placeholder="Enter code"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Access Bookings
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/mobile-mountain"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/mobile-mountain" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-2">
                <Image
                  src="/mobile-mountain-logo.jpg"
                  alt="Mobile Mountain Detail"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-bold text-lg text-gray-900">Mobile Mountain Detail - Bookings Dashboard</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {bookings.length} total bookings
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Analytics Section - Always Visible */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Analytics Overview
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Booking Status Distribution</h4>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray={`${getAnalytics().confirmedPercentage}, 100`}
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray={`${getAnalytics().pendingPercentage}, 100`}
                      strokeDashoffset={`-${getAnalytics().confirmedPercentage}`}
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      strokeDasharray={`${getAnalytics().cancelledPercentage}, 100`}
                      strokeDashoffset={`-${getAnalytics().confirmedPercentage + getAnalytics().pendingPercentage}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{getAnalytics().total}</div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Confirmed ({getAnalytics().confirmedPercentage.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Pending ({getAnalytics().pendingPercentage.toFixed(1)}%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Cancelled ({getAnalytics().cancelledPercentage.toFixed(1)}%)</span>
                  </div>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">Confirmed</p>
                      <p className="text-2xl font-bold text-green-900">{getAnalytics().confirmed}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Pending</p>
                      <p className="text-2xl font-bold text-yellow-900">{getAnalytics().pending}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-800">Cancelled</p>
                      <p className="text-2xl font-bold text-red-900">{getAnalytics().cancelled}</p>
                    </div>
                    <X className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Total</p>
                      <p className="text-2xl font-bold text-blue-900">{getAnalytics().total}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
              
              {/* Revenue Section */}
              <div className="mt-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-800">Estimated Revenue</p>
                      <p className="text-3xl font-bold text-emerald-900">
                        ${getAnalytics().estimatedRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs text-emerald-700 mt-1">From confirmed bookings only</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clickable Status Headers */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedStatus === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>All ({bookings.length})</span>
              </button>
              <button
                onClick={() => setSelectedStatus('Confirmed')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedStatus === 'Confirmed' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>Confirmed ({bookings.filter(b => b.status === 'Confirmed').length})</span>
              </button>
              <button
                onClick={() => setSelectedStatus('Pending')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedStatus === 'Pending' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>Pending ({bookings.filter(b => b.status === 'Pending').length})</span>
              </button>
              <button
                onClick={() => setSelectedStatus('Cancelled')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedStatus === 'Cancelled' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <X className="h-4 w-4" />
                <span>Cancelled ({bookings.filter(b => b.status === 'Cancelled').length})</span>
              </button>
            </div>
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            </div>
            
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center">
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {selectedStatus === 'all' ? 'No bookings yet' : `No ${selectedStatus.toLowerCase()} bookings`}
                </h3>
                <p className="text-gray-600">
                  {selectedStatus === 'all' 
                    ? 'Bookings will appear here once customers submit them.'
                    : `No ${selectedStatus.toLowerCase()} bookings found.`
                  }
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">{booking.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{booking.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{booking.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{formatDate(booking.date)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{formatTime(booking.time)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Sparkles className="h-4 w-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">Service:</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{booking.service}</p>
                        </div>
                        
                        {booking.message && (
                          <div className="mt-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <MessageSquare className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">Message:</span>
                            </div>
                            <p className="text-sm text-gray-600 ml-6">{booking.message}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <select
                          value={booking.status}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Download Section - Only show when there are bookings */}
            {filteredBookings.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Download className="h-5 w-5 mr-2" />
                  Download Data
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => downloadBookings()}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download All Bookings</span>
                  </button>
                  {selectedStatus === 'all' && (
                    <>
                      <button
                        onClick={() => downloadBookings('Confirmed')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Confirmed Only</span>
                      </button>
                      <button
                        onClick={() => downloadBookings('Pending')}
                        className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Pending Only</span>
                      </button>
                      <button
                        onClick={() => downloadBookings('Cancelled')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download Cancelled Only</span>
                      </button>
                    </>
                  )}
                  {selectedStatus !== 'all' && selectedStatus !== 'Confirmed' && (
                    <button
                      onClick={() => downloadBookings(selectedStatus)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download {selectedStatus} Bookings</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
