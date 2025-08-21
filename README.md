# Mobile Mountain Detail - Professional Auto Detailing Website

A professional mobile auto detailing website built with React, Firebase, and Tailwind CSS. Features a complete booking system with admin panel for managing appointments and revenue tracking.

## Features

### 🚗 Main Website
- **Hero Section**: Business branding with logo images and call-to-action
- **Services Section**: Detailed pricing for all detailing packages and add-ons
- **Booking System**: Comprehensive form with Firebase integration
- **Responsive Design**: Mobile-first approach with modern UI

### 📋 Booking System
- Full customer information collection
- Service type selection (Exterior, Interior, Full Detail)
- Vehicle type with automatic surcharge calculation
- Add-on services selection
- Date and time picker
- Real-time price calculation
- Firebase Firestore integration

### 🔐 Admin Panel
- Password-protected access (password: 4242)
- Complete booking management dashboard
- Revenue tracking and analytics
- Date filtering capabilities
- Booking status management

## Tech Stack

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Firebase Firestore
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom components
- **Date Handling**: date-fns

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project (already configured)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mobile-mountain-detail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Firebase Setup

The Firebase configuration is already set up in `src/firebase.js` with the following project:
- **Project ID**: rosewebcreation
- **Database**: Firestore
- **Collection**: mobile-mountain-bookings

### Firestore Rules

The Firestore security rules are configured in `firestore.rules` and allow:
- Read/write access to bookings collections
- Read/write access to website content
- Restricted access to other collections

## Project Structure

```
src/
├── components/
│   ├── HomePage.js          # Main page component
│   ├── Header.js            # Navigation header
│   ├── HeroSection.js       # Hero section with branding
│   ├── ServicesSection.js   # Services and pricing
│   ├── BookingSection.js    # Booking form
│   ├── Footer.js            # Footer with contact info
│   └── AdminPanel.js        # Admin dashboard
├── firebase.js              # Firebase configuration
├── App.js                   # Main app component
├── index.js                 # React entry point
└── index.css                # Global styles and Tailwind
```

## Booking System Details

### Service Types
- **Exterior Detail**: $75
- **Interior Detail**: $75  
- **Full Detail**: $140

### Vehicle Surcharges
- **Sedan**: Base price
- **Midsize**: +$25
- **SUV**: +$50
- **Truck**: +$50

### Add-on Services
- **Clay Bar + Wax**: +$25
- **Clay Bar + Ceramic Sealant**: +$50
- **Interior Ceramic Seat Sealant**: +$30
- **Pet Hair Removal**: +$15

## Admin Panel Access

1. Navigate to the footer and click "Admin Login" (subtle link)
2. Enter password: `4242`
3. Access the dashboard with:
   - Total bookings count
   - Revenue tracking
   - Average booking value
   - Date filtering
   - Complete booking details

## Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Other Platforms
The built files in the `build/` directory can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Contact Information

- **Phone**: 905-966-9491
- **Email**: mobilemountaindetail@gmail.com
- **Instagram**: @mobilemountaindetail

## License

This project is proprietary and confidential. All rights reserved.
