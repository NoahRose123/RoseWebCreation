'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
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
        console.warn('Error loading bookings:', error)
        setBookings([]) // Set empty array if there's an error
      }
    }
    
    loadBookings()
  }, [])

  // Load pricing from Firebase
  useEffect(() => {
    const loadPricing = async () => {
      try {
        // Check if db is properly initialized
        if (!db || typeof db.doc !== 'function') {
          console.log('Firebase not properly initialized, using default pricing')
          return
        }

        const pricingDoc = await getDoc(doc(db, 'roseweb-settings', 'pricing'))
        if (pricingDoc.exists()) {
          const data = pricingDoc.data()
          setPricing({
            websiteMonthly: data.websiteMonthly || 40,
            websiteYearly: data.websiteYearly || 200,
            customSoftware: data.customSoftware || 'Contact'
          })
        }
      } catch (error) {
        console.warn('Error loading pricing, using defaults:', error)
        // Keep default pricing if there's an error
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
      console.warn('Error updating booking status:', error)
    }
  }

  const handleDeleteBooking = async (id: number) => {
    try {
      await deleteBooking(id, 'roseweb-bookings')
      // Reload bookings from Firestore
      const firestoreBookings = await getBookings('roseweb-bookings')
      setBookings(firestoreBookings)
    } catch (error) {
      console.warn('Error deleting booking:', error)
    }
  }

  const updatePricing = async () => {
    setIsUpdatingPricing(true)
    try {
      if (!db || typeof db.doc !== 'function') {
        console.warn('Firebase not available for pricing update')
        return
      }
      await updateDoc(doc(db, 'roseweb-settings', 'pricing'), pricing)
      setIsUpdatingPricing(false)
    } catch (error) {
      console.warn('Error updating pricing:', error)
      setIsUpdatingPricing(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')
    setIsUpdatingPassword(true)

    try {
      if (currentPassword !== '4242') {
        setPasswordError('Current password is incorrect')
        return
      }

      if (newPassword.length < 4) {
        setPasswordError('New password must be at least 4 characters')
        return
      }

      if (newPassword !== confirmPassword) {
        setPasswordError('New passwords do not match')
        return
      }

      // Update password in Firebase
      if (!db || typeof db.doc !== 'function') {
        setPasswordError('Firebase not available for password update')
        return
      }
      
      await updateDoc(doc(db, 'admin-settings', 'password'), {
        password: newPassword,
        updatedAt: new Date().toISOString()
      })

      setPasswordSuccess('Password updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setPasswordError('Error updating password')
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Analytics calculation
  const analytics = useMemo(() => {
    const total = bookings.length
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length
    const pending = bookings.filter(b => b.status === 'Pending').length
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length
    const estimatedRevenue = confirmed * 200 // Assuming $200 per confirmed booking

    return {
      total,
      confirmed,
      pending,
      cancelled,
      estimatedRevenue
    }
  }, [bookings])

  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    if (bookingTab === 'all') return bookings
    return bookings.filter(booking => booking.status.toLowerCase() === bookingTab)
  }, [bookings, bookingTab])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 mt-2">Enter the admin code to continue</p>
          </div>
          
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Code
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin code"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
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

        {/* Content based on active tab */}
        {activeTab === 'bookings' && (
          <div>
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

            {/* Booking Tabs */}
            <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
              <button
                onClick={() => setBookingTab('all')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  bookingTab === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All ({analytics.total})
              </button>
              <button
                onClick={() => setBookingTab('pending')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  bookingTab === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pending ({analytics.pending})
              </button>
              <button
                onClick={() => setBookingTab('confirmed')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  bookingTab === 'confirmed'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Confirmed ({analytics.confirmed})
              </button>
              <button
                onClick={() => setBookingTab('cancelled')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  bookingTab === 'cancelled'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cancelled ({analytics.cancelled})
              </button>
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {filteredBookings.length === 0 ? (
                <div className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                  <p className="text-gray-600">There are no bookings in this category.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                              <div className="text-sm text-gray-500">{booking.email}</div>
                              <div className="text-sm text-gray-500">{booking.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.service}</div>
                            <div className="text-sm text-gray-500">{booking.address}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.selectedDate}</div>
                            <div className="text-sm text-gray-500">{booking.selectedTime}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <select
                                value={booking.status}
                                onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
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
                      required
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
                      required
                    />
                  </div>
                  
                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                      {passwordError}
                    </div>
                  )}
                  
                  {passwordSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                      {passwordSuccess}
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
