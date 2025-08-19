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
  Sparkles,
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

interface Availability {
  day: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

export default function MobileMountainAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Confirmed' | 'Pending' | 'Cancelled'>('all')
  const [activeTab, setActiveTab] = useState<'bookings' | 'availability' | 'settings' | 'website'>('bookings')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [availability, setAvailability] = useState<Availability[]>([
    { day: 'Monday', startTime: '08:00', endTime: '18:00', isAvailable: true },
    { day: 'Tuesday', startTime: '08:00', endTime: '18:00', isAvailable: true },
    { day: 'Wednesday', startTime: '08:00', endTime: '18:00', isAvailable: true },
    { day: 'Thursday', startTime: '08:00', endTime: '18:00', isAvailable: true },
    { day: 'Friday', startTime: '08:00', endTime: '18:00', isAvailable: true },
    { day: 'Saturday', startTime: '09:00', endTime: '17:00', isAvailable: true },
    { day: 'Sunday', startTime: '10:00', endTime: '16:00', isAvailable: false }
  ])

  // Function to get the actual date for a day of the week
  const getDateForDay = (dayName: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const currentDay = today.getDay()
    const targetDay = days.indexOf(dayName)
    const daysToAdd = (targetDay - currentDay + 7) % 7
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + daysToAdd)
    return targetDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
  }

  // Load bookings from Firestore on component mount
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const firestoreBookings = await getBookings('mobile-mountain-bookings')
        setBookings(firestoreBookings)
      } catch (error) {
        console.error('Error loading bookings from Firestore:', error)
        
        // Fallback: Load from localStorage if Firestore fails
        try {
          const localBookings = JSON.parse(localStorage.getItem('mobile-mountain-bookings') || '[]')
          setBookings(localBookings)
        } catch (localError) {
          console.error('Error loading bookings from localStorage:', localError)
        }
      }
    }
    
    if (isAuthenticated) {
      loadBookings()
    }
  }, [isAuthenticated])

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code === '6741') {
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
    a.download = `noahs-dube-bookings-${status || 'all'}-${new Date().toISOString().split('T')[0]}.csv`
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
      estimatedRevenue
    }
  }

  const updateAvailability = (index: number, field: keyof Availability, value: any) => {
    const newAvailability = [...availability]
    newAvailability[index] = { ...newAvailability[index], [field]: value }
    setAvailability(newAvailability)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (currentPassword !== '6741') {
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

    // In a real app, you would update this in Firebase
    setPasswordSuccess('Password updated successfully!')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const filteredBookings = selectedStatus === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === selectedStatus)

  const analytics = getAnalytics()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                                 <Image
                   src="/mobile-mountain-logo.png"
                   alt="Mobile Mountain Detail"
                   width={64}
                   height={64}
                   className="rounded-lg"
                 />
                 <h1 className="text-2xl font-bold text-gray-900">Admin Access</h1>
              </div>
              <p className="text-gray-600">Enter the admin code to access the dashboard</p>
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
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Access Dashboard
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <Link href="/mobile-mountain" className="text-blue-600 hover:text-blue-700 text-sm">
                ← Back to Website
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
                             <Image
                 src="/mobile-mountain-logo.png"
                 alt="Mobile Mountain Detail"
                 width={48}
                 height={48}
                 className="rounded-lg"
               />
               <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Link 
              href="/mobile-mountain"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
                         <button
               onClick={() => setActiveTab('bookings')}
               className={`py-2 px-1 border-b-2 font-medium text-sm ${
                 activeTab === 'bookings'
                   ? 'border-blue-500 text-blue-600'
                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
               }`}
             >
               Dashboard
             </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'availability'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Availability
            </button>
                         <button
               onClick={() => setActiveTab('settings')}
               className={`py-2 px-1 border-b-2 font-medium text-sm ${
                 activeTab === 'settings'
                   ? 'border-blue-500 text-blue-600'
                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
               }`}
             >
               Settings
             </button>
             <button
               onClick={() => setActiveTab('website')}
               className={`py-2 px-1 border-b-2 font-medium text-sm ${
                 activeTab === 'website'
                   ? 'border-blue-500 text-blue-600'
                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
               }`}
             >
               Website
             </button>
          </nav>
        </div>

                 

        {/* Tab Content */}
                 {activeTab === 'bookings' && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="space-y-6"
           >
             {/* Analytics Cards */}
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {/* Pie Chart */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 className="md:col-span-2 bg-white rounded-lg shadow p-6"
               >
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Distribution</h3>
                 <div className="flex items-center justify-center">
                   <div className="relative w-32 h-32">
                     <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                       <path
                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                         fill="none"
                         stroke="#e5e7eb"
                         strokeWidth="3"
                       />
                       {analytics.total > 0 && (
                         <>
                           <path
                             d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                             fill="none"
                             stroke="#10b981"
                             strokeWidth="3"
                             strokeDasharray={`${(analytics.confirmed / analytics.total) * 100} ${100 - (analytics.confirmed / analytics.total) * 100}`}
                           />
                           <path
                             d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                             fill="none"
                             stroke="#f59e0b"
                             strokeWidth="3"
                             strokeDasharray={`${(analytics.pending / analytics.total) * 100} ${100 - (analytics.pending / analytics.total) * 100}`}
                             strokeDashoffset={`-${(analytics.confirmed / analytics.total) * 100}`}
                           />
                           <path
                             d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                             fill="none"
                             stroke="#ef4444"
                             strokeWidth="3"
                             strokeDasharray={`${(analytics.cancelled / analytics.total) * 100} ${100 - (analytics.cancelled / analytics.total) * 100}`}
                             strokeDashoffset={`-${((analytics.confirmed + analytics.pending) / analytics.total) * 100}`}
                           />
                         </>
                       )}
                     </svg>
                     <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-2xl font-bold text-gray-900">{analytics.total}</span>
                     </div>
                   </div>
                   <div className="ml-6 space-y-2">
                     <div className="flex items-center">
                       <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                       <span className="text-sm text-gray-600">Confirmed: {analytics.confirmed}</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                       <span className="text-sm text-gray-600">Pending: {analytics.pending}</span>
                     </div>
                     <div className="flex items-center">
                       <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                       <span className="text-sm text-gray-600">Cancelled: {analytics.cancelled}</span>
                     </div>
                   </div>
                 </div>
               </motion.div>
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white rounded-lg shadow p-6"
               >
                 <div className="flex items-center">
                   <div className="p-2 bg-blue-100 rounded-lg">
                     <Calendar className="h-6 w-6 text-blue-600" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                     <p className="text-2xl font-bold text-gray-900">{analytics.total}</p>
                   </div>
                 </div>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="bg-white rounded-lg shadow p-6"
               >
                 <div className="flex items-center">
                   <div className="p-2 bg-green-100 rounded-lg">
                     <CheckCircle className="h-6 w-6 text-green-600" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-gray-600">Confirmed</p>
                     <p className="text-2xl font-bold text-gray-900">{analytics.confirmed}</p>
                   </div>
                 </div>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="bg-white rounded-lg shadow p-6"
               >
                 <div className="flex items-center">
                   <div className="p-2 bg-yellow-100 rounded-lg">
                     <Clock className="h-6 w-6 text-yellow-600" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-gray-600">Pending</p>
                     <p className="text-2xl font-bold text-gray-900">{analytics.pending}</p>
                   </div>
                 </div>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="bg-white rounded-lg shadow p-6"
               >
                 <div className="flex items-center">
                   <div className="p-2 bg-green-100 rounded-lg">
                     <DollarSign className="h-6 w-6 text-green-600" />
                   </div>
                   <div className="ml-4">
                     <p className="text-sm font-medium text-gray-600">Revenue</p>
                     <p className="text-2xl font-bold text-gray-900">${analytics.estimatedRevenue}</p>
                   </div>
                 </div>
               </motion.div>
             </div>

             {/* Bookings Table */}
             <div className="bg-white rounded-lg shadow">
               {/* Bookings Header */}
               <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Bookings</h2>
                  <p className="text-sm text-gray-600">Manage customer appointments</p>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Bookings</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => downloadBookings()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Bookings List */}
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
                        {booking.message && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {booking.message}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.date}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
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
                            className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          </motion.div>
        )}

        {activeTab === 'availability' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Availability Settings</h2>
              <p className="text-sm text-gray-600">Set your working hours and availability</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {availability.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-24">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={day.isAvailable}
                          onChange={(e) => updateAvailability(index, 'isAvailable', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                                                 <span className="ml-2 text-sm font-medium text-gray-900">
                           {day.day} ({getDateForDay(day.day)})
                         </span>
                      </label>
                    </div>
                    
                    {day.isAvailable && (
                      <>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">From:</span>
                          <input
                            type="time"
                            value={day.startTime}
                            onChange={(e) => updateAvailability(index, 'startTime', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">To:</span>
                          <input
                            type="time"
                            value={day.endTime}
                            onChange={(e) => updateAvailability(index, 'endTime', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                  Save Availability
                </button>
              </div>
            </div>
          </motion.div>
        )}

                 {activeTab === 'settings' && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="bg-white rounded-lg shadow"
           >
             <div className="px-6 py-4 border-b border-gray-200">
               <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
               <p className="text-sm text-gray-600">Manage your business settings</p>
             </div>
             
             <div className="p-6">
               <div className="space-y-6">
                 
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                   <form onSubmit={handlePasswordChange} className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Current Password
                       </label>
                       <input
                         type="password"
                         value={currentPassword}
                         onChange={(e) => setCurrentPassword(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                       className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                     >
                       Update Password
                     </button>
                   </form>
                 </div>

                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Services & Pricing</h3>
                   <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                       <div>
                         <h4 className="font-medium text-gray-900">Basic Wash</h4>
                         <p className="text-sm text-gray-600">Exterior wash, tire cleaning, interior vacuum</p>
                       </div>
                       <div className="flex items-center space-x-2">
                         <span className="text-lg font-bold text-gray-900">$45</span>
                         <button className="text-blue-600 hover:text-blue-700">
                           <Edit className="h-4 w-4" />
                         </button>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                       <div>
                         <h4 className="font-medium text-gray-900">Premium Detail</h4>
                         <p className="text-sm text-gray-600">Complete interior and exterior detailing</p>
                       </div>
                       <div className="flex items-center space-x-2">
                         <span className="text-lg font-bold text-gray-900">$125</span>
                         <button className="text-blue-600 hover:text-blue-700">
                           <Edit className="h-4 w-4" />
                         </button>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                       <div>
                         <h4 className="font-medium text-gray-900">Ultimate Detail</h4>
                         <p className="text-sm text-gray-600">Premium service with paint correction</p>
                       </div>
                       <div className="flex items-center space-x-2">
                         <span className="text-lg font-bold text-gray-900">$200</span>
                         <button className="text-blue-600 hover:text-blue-700">
                           <Edit className="h-4 w-4" />
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="mt-6">
                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                   Save Settings
                 </button>
               </div>
             </div>
           </motion.div>
         )}

         {activeTab === 'website' && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="bg-white rounded-lg shadow"
           >
             <div className="px-6 py-4 border-b border-gray-200">
               <h2 className="text-lg font-semibold text-gray-900">Website Management</h2>
               <p className="text-sm text-gray-600">Customize your website content and settings</p>
             </div>
             
             <div className="p-6">
               <div className="space-y-6">
                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Business Name
                       </label>
                       <input
                         type="text"
                         defaultValue="Mobile Mountain Detail"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Phone Number
                       </label>
                       <input
                         type="tel"
                         defaultValue="(555) 123-4567"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Email
                       </label>
                       <input
                         type="email"
                         defaultValue="info@mobilemountaindetail.com"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Service Area
                       </label>
                       <input
                         type="text"
                         defaultValue="25-mile radius"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                   </div>
                 </div>

                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Section</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Main Headline
                       </label>
                       <input
                         type="text"
                         defaultValue="Mobile Mountain Detail"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Subtitle
                       </label>
                       <textarea
                         rows={3}
                         defaultValue="We bring the mountain of quality car detailing services right to your doorstep. Professional, convenient, and guaranteed satisfaction."
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                   </div>
                 </div>

                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Services & Pricing</h3>
                   <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                       <div>
                         <h4 className="font-medium text-gray-900">Basic Wash</h4>
                         <p className="text-sm text-gray-600">Exterior wash, tire cleaning, interior vacuum</p>
                       </div>
                       <div className="flex items-center space-x-2">
                         <span className="text-lg font-bold text-gray-900">$45</span>
                         <button className="text-blue-600 hover:text-blue-700">
                           <Edit className="h-4 w-4" />
                         </button>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                       <div>
                         <h4 className="font-medium text-gray-900">Premium Detail</h4>
                         <p className="text-sm text-gray-600">Complete interior and exterior detailing</p>
                       </div>
                       <div className="flex items-center space-x-2">
                         <span className="text-lg font-bold text-gray-900">$125</span>
                         <button className="text-blue-600 hover:text-blue-700">
                           <Edit className="h-4 w-4" />
                         </button>
                       </div>
                     </div>
                     
                     <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                       <div>
                         <h4 className="font-medium text-gray-900">Ultimate Detail</h4>
                         <p className="text-sm text-gray-600">Premium service with paint correction</p>
                       </div>
                       <div className="flex items-center space-x-2">
                         <span className="text-lg font-bold text-gray-900">$200</span>
                         <button className="text-blue-600 hover:text-blue-700">
                           <Edit className="h-4 w-4" />
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>

                 <div>
                   <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Footer Phone
                       </label>
                       <input
                         type="tel"
                         defaultValue="(555) 123-4567"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Footer Email
                       </label>
                       <input
                         type="email"
                         defaultValue="info@mobilemountaindetail.com"
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       />
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="mt-6">
                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                   Save Website Changes
                 </button>
               </div>
             </div>
           </motion.div>
         )}
       </div>
     </div>
   )
 }
