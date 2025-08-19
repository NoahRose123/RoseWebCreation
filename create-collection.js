// Simple script to create the bookings collection using Firebase client SDK
// This will be run in the browser environment

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAYFVAMd2lzqNLKekuTE2Mt404tuOq2mnk",
  authDomain: "rosewebcreation.firebaseapp.com",
  projectId: "rosewebcreation",
  storageBucket: "rosewebcreation.firebasestorage.app",
  messagingSenderId: "901821617734",
  appId: "1:901821617734:web:2d2698126bde404f849c47",
  measurementId: "G-XX9ERZJ5W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createTestBooking() {
  try {
    console.log('Creating test booking...');
    
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

    const docRef = await addDoc(collection(db, "bookings"), testBooking);
    console.log('✅ Test booking created with ID:', docRef.id);
    
  } catch (error) {
    console.error('❌ Error creating test booking:', error);
  }
}

// Run the function
createTestBooking();
