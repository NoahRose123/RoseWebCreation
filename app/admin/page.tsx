'use client'

import React, { useState, useEffect } from 'react'
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
  Code,
  Monitor,
  Smartphone,
  Settings,
  CalendarDays,
  Plus,
  Trash2,
  Edit,
  Save,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getBookings, updateBooking, deleteBooking, Booking } from '../../lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

export default function RoseWebAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bookingTab, setBookingTab] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [activeTab, setActiveTab] = useState<'bookings' | 'pricing' | 'settings'>('bookings')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [pricing, setPricing] = useState({
    websiteMonthly: 40,
    websiteYearly: 200,
    customSoftware: 'Contact'
  })
  const [isUpdatingPricing, setIsUpdatingPricing] = useState(false)

  // Load bookings from Firestore on component mount
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const firestoreBookings = await getBookings('roseweb-bookings')
        setBookings(firestoreBookings)
      } catch (error) {
        console.error('Error loading bookings:', error)
      }
    }
    
    loadBookings()
  }, [])

  // Load pricing from Firestore
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricingDoc = await getDoc(doc(db, 'roseweb-settings', 'pricing'))
        if (pricingDoc.exists()) {
          setPricing(pricingDoc.data())
        }
      } catch (error) {
        console.error('Error loading pricing:', error)
      }
    }
    
    loadPricing()
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
      await updateBooking(id, status, 'roseweb-bookings')
      // Reload bookings from Firestore
      const firestoreBookings = await getBookings('roseweb-bookings')
      setBookings(firestoreBookings)
    } catch (error) {
      console.error('Error updating booking status:', error)
    }
  }

  const handleDeleteBooking = async (id: number) => {
    try {
      await deleteBooking(id, 'roseweb-bookings')
      // Reload bookings from Firestore
      const firestoreBookings = await getBookings('roseweb-bookings')
      setBookings(firestoreBookings)
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }

  const updatePricing = async () => {
    setIsUpdatingPricing(true)
    try {
      await updateDoc(doc(db, 'roseweb-settings', 'pricing'), pricing)
      setIsUpdatingPricing(false)
    } catch (error) {
      console.error('Error updating pricing:', error)
      setIsUpdatingPricing(false)
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
        booking.selectedDate,
        booking.selectedTime,
        booking.status,
        booking.message || '',
        booking.createdAt
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `roseweb-bookings-${status || 'all'}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Filtered bookings
  const filteredBookings = React.useMemo(() => {
    return bookingTab === 'all' 
      ? bookings 
      : bookingTab === 'pending'
      ? bookings.filter(booking => booking.status === 'Pending')
      : bookingTab === 'confirmed'
      ? bookings.filter(booking => booking.status === 'Confirmed')
      : bookings.filter(booking => booking.status === 'Cancelled')
  }, [bookings, bookingTab])

  // Analytics calculation
  const analytics = React.useMemo(() => {
    const total = bookings.length
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length
    const pending = bookings.filter(b => b.status === 'Pending').length
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length
    
    const servicePrices: { [key: string]: number } = {
      'Website Monthly': pricing.websiteMonthly,
      'Website Yearly': pricing.websiteYearly,
      'Custom Software/App': 0 // Contact for quote
    }
    
    const estimatedRevenue = bookings
      .filter(b => b.status === 'Confirmed')
      .reduce((total, booking) => {
        const price = servicePrices[booking.service] || 0
        return total + price
      }, 0)
    
    return {
      total,
      confirmed,
      pending,
      cancelled,
      estimatedRevenue
    }
  }, [bookings, pricing])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Rose Web Creation Admin</h2>
            <p className="text-gray-600 mt-2">Enter your admin code to continue</p>
          </div>
          
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin code"
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
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">Back to Website</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Rose Web Creation Admin</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'bookings'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'pricing'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.confirmed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Est. Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.estimatedRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm">
            {/* Booking Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setBookingTab('all')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    bookingTab === 'all'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All ({analytics.total})
                </button>
                <button
                  onClick={() => setBookingTab('pending')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    bookingTab === 'pending'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Pending ({analytics.pending})
                </button>
                <button
                  onClick={() => setBookingTab('confirmed')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    bookingTab === 'confirmed'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Confirmed ({analytics.confirmed})
                </button>
                <button
                  onClick={() => setBookingTab('cancelled')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    bookingTab === 'cancelled'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Cancelled ({analytics.cancelled})
                </button>
              </nav>
            </div>

            {/* Bookings List */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Bookings</h3>
                <button
                  onClick={() => downloadBookings()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Download CSV
                </button>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No bookings found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-medium text-gray-900">{booking.name}</h4>
                              <p className="text-sm text-gray-600">{booking.email}</p>
                              <p className="text-sm text-gray-600">{booking.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{booking.service}</p>
                              <p className="text-sm text-gray-600">{booking.selectedDate} at {booking.selectedTime}</p>
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                          {booking.message && (
                            <p className="text-sm text-gray-600 mt-2">{booking.message}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {booking.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                className="text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Update Pricing</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Monthly Price ($)
                </label>
                <input
                  type="number"
                  value={pricing.websiteMonthly}
                  onChange={(e) => setPricing({...pricing, websiteMonthly: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website Yearly Price ($)
                </label>
                <input
                  type="number"
                  value={pricing.websiteYearly}
                  onChange={(e) => setPricing({...pricing, websiteYearly: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Software/App (Text)
                </label>
                <input
                  type="text"
                  value={pricing.customSoftware}
                  onChange={(e) => setPricing({...pricing, customSoftware: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Contact for quote"
                />
              </div>
              
              <button
                onClick={updatePricing}
                disabled={isUpdatingPricing}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isUpdatingPricing ? 'Updating...' : 'Update Pricing'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Admin Settings</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Change Admin Password</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
