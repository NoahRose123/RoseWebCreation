# Mobile Mountain Detailing App

A professional mobile car detailing service website built with Next.js, TypeScript, and Firebase.

## Features

### 🚗 **Professional Car Detailing Services**
- **Basic Wash** - $45 per vehicle
- **Premium Detail** - $125 per vehicle  
- **Ultimate Detail** - $200 per vehicle

### 📱 **Mobile-First Design**
- Responsive design that works on all devices
- Modern UI with smooth animations using Framer Motion
- Professional color scheme with blue and gray gradients

### 🔥 **Firebase Integration**
- **Separate Collection**: Uses `mobile-mountain-bookings` collection in Firestore
- **Real-time Booking System**: Customers can book appointments directly from the website
- **Admin Dashboard**: Manage bookings with authentication (code: 4242)
- **Data Export**: Download bookings as CSV files

### 📋 **Booking Management**
- **Customer Booking Form**: Easy-to-use form with service selection, date/time picker
- **Admin Dashboard**: View, update, and delete bookings
- **Status Management**: Track booking status (Pending, Confirmed, Cancelled)
- **Analytics**: View booking statistics and revenue estimates

### 🎨 **User Experience**
- **Smooth Animations**: Framer Motion animations throughout the site
- **Loading States**: Visual feedback during form submission
- **Success Notifications**: Toast notifications for successful bookings
- **Service Areas**: Information about coverage areas and hours
- **Testimonials**: Customer reviews and ratings

## Pages

### Main Website (`/mobile-mountain`)
- **Hero Section**: Eye-catching introduction with call-to-action
- **Services Section**: Detailed service descriptions with features
- **Pricing Section**: Three-tier pricing with popular plan highlighting
- **Service Areas**: Coverage information and business hours
- **Testimonials**: Customer reviews and ratings
- **Call-to-Action**: Final conversion section

### Admin Dashboard (`/mobile-mountain/bookings`)
- **Authentication**: Simple code-based login (4242)
- **Booking Management**: View all bookings with filtering options
- **Status Updates**: Change booking status with one click
- **Data Export**: Download bookings as CSV files
- **Analytics**: Revenue estimates and booking statistics

## Technical Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Firebase Firestore
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Firebase Collections

### `mobile-mountain-bookings`
Each booking document contains:
```typescript
{
  id: number
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
  status: 'Pending' | 'Confirmed' | 'Cancelled'
  createdAt: string
}
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Firebase Setup**
   - Ensure Firebase project is configured
   - Firestore rules are set up for the `mobile-mountain-bookings` collection

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the App**
   - Main site: `http://localhost:3000/mobile-mountain`
   - Admin dashboard: `http://localhost:3000/mobile-mountain/bookings`

## Admin Access

- **URL**: `/mobile-mountain/bookings`
- **Access Code**: `4242`
- **Features**: View bookings, update status, export data, view analytics

## Customization

### Colors
The app uses a blue and gray color scheme. To customize:
- Update Tailwind classes in components
- Modify the gradient classes in `globals.css`

### Services & Pricing
Update the `services` and `pricingPlans` arrays in `app/mobile-mountain/page.tsx`

### Contact Information
Update contact details in:
- `app/components/MobileMountainHeader.tsx`
- `app/components/MobileMountainFooter.tsx`

## Deployment

The app is ready for deployment on Vercel:
1. Connect your GitHub repository
2. Deploy automatically on push
3. Environment variables are already configured

## Support

For technical support or customization requests, contact the development team.

---

**Mobile Mountain Detailing** - Professional mobile car detailing services that come to you!
