# Mobile Mountain Detail - Setup Guide

## Console Errors Fixed

The following console errors have been resolved:

1. **React Error #425, #418, #423**: Fixed by properly structuring React hooks and using `useCallback` for event handlers
2. **Firebase Permissions Error**: Fixed by adding demo mode support when Firebase is not configured
3. **404 Errors for Privacy/Terms**: Fixed by creating the missing pages

## Firebase Configuration

To enable full functionality (booking submissions, data persistence), you need to configure Firebase:

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firestore Database

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:your-app-id
```

### 3. Configure Firestore Security Rules
Update your Firestore security rules to allow read/write access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development - restrict in production
    }
  }
}
```

## Demo Mode

If Firebase is not configured, the website will run in demo mode:
- Booking submissions will be simulated
- No actual data will be saved
- Console warnings will indicate demo mode is active

## Features

- ✅ Professional mobile detailing website
- ✅ Booking system with form validation
- ✅ Responsive design for all devices
- ✅ Error boundary for graceful error handling
- ✅ Privacy Policy and Terms of Service pages
- ✅ Firebase integration (with demo mode fallback)

## File Structure

```
app/mobile-mountain/
├── page.tsx              # Main website page
├── layout.tsx            # Layout configuration
├── privacy/
│   └── page.tsx         # Privacy Policy
├── terms/
│   └── page.tsx         # Terms of Service
├── admin/
│   └── page.tsx         # Admin dashboard
└── bookings/
    └── page.tsx         # Booking management
```

## Troubleshooting

### If you still see console errors:
1. Clear browser cache and reload
2. Check that all environment variables are set correctly
3. Verify Firebase project is properly configured
4. Check browser console for specific error messages

### If bookings aren't saving:
1. Verify Firebase configuration in `.env.local`
2. Check Firestore security rules
3. Ensure Firestore is enabled in Firebase Console

## Development

The website is built with:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Firebase Firestore
