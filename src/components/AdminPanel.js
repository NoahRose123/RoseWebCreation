import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState('');
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
      let q = query(collection(db, 'mobile-mountain-bookings'), orderBy('createdAt', 'desc'));
      
      if (filterDate) {
        const startDate = new Date(filterDate);
        const endDate = new Date(filterDate);
        endDate.setDate(endDate.getDate() + 1);
        
        q = query(
          collection(db, 'mobile-mountain-bookings'),
          where('date', '>=', filterDate),
          where('date', '<', endDate.toISOString().split('T')[0]),
          orderBy('createdAt', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));

      setBookings(bookingsData);
      
      // Calculate total revenue
      const revenue = bookingsData.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
      setTotalRevenue(revenue);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const applyFilter = () => {
    fetchBookings();
  };

  const clearFilter = () => {
    setFilterDate('');
    fetchBookings();
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
      'suv': 'SUV (+$50)',
      'truck': 'Truck (+$50)'
    };
    return vehicleMap[vehicleType] || vehicleType;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Enter password to access admin panel</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Mobile Mountain Detail Booking Management</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {bookings.length}
              </div>
              <div className="text-gray-600">Total Bookings</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${totalRevenue.toFixed(2)}
              </div>
              <div className="text-gray-600">Total Revenue</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${bookings.length > 0 ? (totalRevenue / bookings.length).toFixed(2) : '0.00'}
              </div>
              <div className="text-gray-600">Average Booking Value</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Date
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={handleFilterChange}
                className="input-field"
              />
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={applyFilter}
                className="btn-primary"
                disabled={loading}
              >
                Apply Filter
              </button>
              <button
                onClick={clearFilter}
                className="btn-secondary"
                disabled={loading}
              >
                Clear Filter
              </button>
            </div>
            <button
              onClick={fetchBookings}
              className="btn-secondary"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Add-ons
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {booking.phone}
                        </div>
                        {booking.email && (
                          <div className="text-sm text-gray-500">
                            {booking.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatServiceType(booking.serviceType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatVehicleType(booking.vehicleType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {formatAddOns(booking.addOns)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {booking.date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-green-600">
                        ${booking.totalPrice?.toFixed(2) || '0.00'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                No bookings found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
