# Firestore Setup Guide

## 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `rosewebcreation`
3. Navigate to **Firestore Database** in the left sidebar
4. Click **Create Database**
5. Choose **Start in test mode** (for development)
6. Select a location (choose closest to your users)

## 2. Update Firestore Rules

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace the current rules with the content from `firestore.rules`:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read and write access to bookings collection
    match /bookings/{document} {
      allow read, write: if true;
    }
    
    // Deny access to all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

## 3. Create Bookings Collection

1. In Firestore Database, click **Start collection**
2. Collection ID: `bookings`
3. Document ID: `auto-id` (let Firestore generate IDs)
4. Add a test document with these fields:
   - `name` (string): "Test User"
   - `email` (string): "test@example.com"
   - `phone` (string): "123-456-7890"
   - `service` (string): "Website Monthly - $22"
   - `date` (string): "2024-01-15"
   - `time` (string): "10:00"
   - `message` (string): "Test booking"
   - `status` (string): "Pending"
   - `createdAt` (string): "2024-01-15T10:00:00.000Z"
   - `id` (number): 1705315200000

## 4. Test the Integration

1. Start your development server: `npm run dev`
2. Submit a test booking from the main page
3. Check Firestore Database to see the new document
4. Go to `/bookings` and enter code `4242`
5. Verify the booking appears in the dashboard

## 5. Security Considerations

For production, consider implementing:
- Authentication for admin access
- More restrictive Firestore rules
- Input validation
- Rate limiting

## 6. Backup Strategy

- Enable Firestore backups in Firebase Console
- Set up automated exports
- Consider using Firebase Extensions for additional backup options

## 7. Monitoring

- Set up Firebase Analytics
- Monitor Firestore usage in Firebase Console
- Set up alerts for unusual activity

## Troubleshooting

If you encounter issues:
1. Check browser console for errors
2. Verify Firestore rules are published
3. Ensure Firebase config is correct
4. Check network connectivity
5. Verify collection name is exactly `bookings`
