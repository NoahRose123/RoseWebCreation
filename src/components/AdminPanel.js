import React, { useState } from 'react';
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [totalRevenue, setTotalRevenue] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '4242') {
      setIsAuthenticated(true);
      fetchBookings();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'mobile-mountain-bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate() : new Date()
      }));

      setBookings(bookingsData);
      
      // Calculate total revenue from confirmed bookings only
      const confirmedBookings = bookingsData.filter(booking => booking.status === 'confirmed');
      const revenue = confirmedBookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
      setTotalRevenue(revenue);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (bookingId) => {
    try {
      await updateDoc(doc(db, 'mobile-mountain-bookings', bookingId), {
        status: 'confirmed'
      });
      fetchBookings(); // Refresh the data
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Error confirming booking');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'mobile-mountain-bookings', bookingId));
        fetchBookings(); // Refresh the data
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Error deleting booking');
      }
    }
  };

  const getFilteredBookings = () => {
    if (activeTab === 'pending') {
      return bookings.filter(booking => booking.status === 'pending');
    } else if (activeTab === 'confirmed') {
      return bookings.filter(booking => booking.status === 'confirmed');
    }
    return bookings;
  };

  const formatAddOns = (addOns) => {
    if (!addOns || addOns.length === 0) return 'None';
    return addOns.join(', ');
  };

  const formatServiceType = (serviceType) => {
    const serviceMap = {
      'exterior': 'Exterior Detail',
      'interior': 'Interior Detail',
      'full': 'Full Detail'
    };
    return serviceMap[serviceType] || serviceType;
  };

  const formatVehicleType = (vehicleType) => {
    const vehicleMap = {
      'sedan': 'Sedan',
      'midsize': 'Midsize (+$25)',
      'suv-truck': 'SUV/Truck (+$50)'
    };
    return vehicleMap[vehicleType] || vehicleType;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
              <p className="text-gray-300">Enter password to access admin panel</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  autoComplete="new-password"
                  required
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Mobile Mountain Detail Booking Management</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="btn-secondary">
              Back to Website
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {pendingBookings.length}
              </div>
              <div className="text-gray-300">Pending Bookings</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-gray-300">Total Revenue (Confirmed)</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {confirmedBookings.length}
              </div>
              <div className="text-gray-300">Confirmed Bookings</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'pending'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Pending ({pendingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('confirmed')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'confirmed'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Confirmed ({confirmedBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              All ({bookings.length})
            </button>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mb-6">
          <button
            onClick={fetchBookings}
            className="btn-secondary"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {/* Bookings Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Add-ons
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {getFilteredBookings().map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {booking.fullName}
                        </div>
                        <div className="text-sm text-gray-300">
                          {booking.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-white">
                          {booking.phone}
                        </div>
                        {booking.email && (
                          <div className="text-sm text-gray-300">
                            {booking.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">
                        {formatServiceType(booking.serviceType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">
                        {formatVehicleType(booking.vehicleType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">
                        {formatAddOns(booking.addOns)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-white">
                          {booking.date}
                        </div>
                        <div className="text-sm text-gray-300">
                          {booking.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-green-400">
                        ${booking.totalPrice?.toFixed(2) || '0.00'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => confirmBooking(booking.id)}
                            className="text-green-400 hover:text-green-300 text-sm font-medium"
                          >
                            Confirm
                          </button>
                        )}
                        <button
                          onClick={() => deleteBooking(booking.id)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {getFilteredBookings().length === 0 && !loading && (
              <div className="text-center py-8 text-gray-400">
                No {activeTab} bookings found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
