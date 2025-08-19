const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "rosewebcreation",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "firebase-adminsdk-xxxxx@rosewebcreation.iam.gserviceaccount.com",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40rosewebcreation.iam.gserviceaccount.com"
};

// Note: You'll need to replace the service account details above with your actual service account key
// You can download this from Firebase Console > Project Settings > Service Accounts > Generate New Private Key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function setupFirestore() {
  try {
    console.log('Setting up Firestore database...');
    
    // Create the bookings collection with a test document
    const testBooking = {
      name: "Test User",
      email: "test@example.com",
      phone: "123-456-7890",
      service: "Website Monthly - $22",
      date: "2024-01-15",
      time: "10:00",
      message: "Test booking from setup script",
      status: "Pending",
      createdAt: new Date().toISOString(),
      id: Date.now()
    };

    // Add the test document to the bookings collection
    const docRef = await db.collection('bookings').add(testBooking);
    console.log('✅ Test booking document created with ID:', docRef.id);
    
    console.log('✅ Firestore setup complete!');
    console.log('📋 Next steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Submit a test booking from your website');
    console.log('3. Check the bookings dashboard at /bookings');
    
  } catch (error) {
    console.error('❌ Error setting up Firestore:', error);
  } finally {
    process.exit(0);
  }
}

setupFirestore();
