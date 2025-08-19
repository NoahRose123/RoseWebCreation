import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";

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

// Initialize Firestore
export const db = getFirestore(app);

// Collection references
export const bookingsCollection = collection(db, "bookings");
export const mobileMountainBookingsCollection = collection(db, "mobile-mountain-bookings");

// Booking functions
export const addBooking = async (bookingData: any, collectionName: string = "bookings") => {
  try {
    console.log("Adding booking to collection:", collectionName);
    console.log("Booking data:", bookingData);
    
    const targetCollection = collectionName === "mobile-mountain-bookings" 
      ? mobileMountainBookingsCollection 
      : bookingsCollection;
      
    const docRef = await addDoc(targetCollection, {
      ...bookingData,
      createdAt: new Date().toISOString(),
      id: Date.now() // Generate unique ID
    });
    
    console.log("Booking added successfully:", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding booking: ", error);
    console.error("Error details:", {
      code: (error as any)?.code,
      message: (error as any)?.message,
      stack: (error as any)?.stack
    });
    throw error;
  }
};

export const getBookings = async (collectionName: string = "bookings") => {
  try {
    const targetCollection = collectionName === "mobile-mountain-bookings" 
      ? mobileMountainBookingsCollection 
      : bookingsCollection;
      
    const q = query(targetCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        date: data.date,
        time: data.time,
        message: data.message,
        status: data.status,
        createdAt: data.createdAt
      };
    });
    return bookings;
  } catch (error) {
    console.error("Error getting bookings: ", error);
    throw error;
  }
};

export const updateBooking = async (id: number, status: string, collectionName: string = "bookings") => {
  try {
    const targetCollection = collectionName === "mobile-mountain-bookings" 
      ? mobileMountainBookingsCollection 
      : bookingsCollection;
      
    const q = query(targetCollection);
    const querySnapshot = await getDocs(q);
    const bookingDoc = querySnapshot.docs.find(doc => doc.data().id === id);
    
    if (bookingDoc) {
      await updateDoc(doc(db, collectionName, bookingDoc.id), {
        status: status
      });
    }
  } catch (error) {
    console.error("Error updating booking: ", error);
    throw error;
  }
};

export const deleteBooking = async (id: number, collectionName: string = "bookings") => {
  try {
    const targetCollection = collectionName === "mobile-mountain-bookings" 
      ? mobileMountainBookingsCollection 
      : bookingsCollection;
      
    const q = query(targetCollection);
    const querySnapshot = await getDocs(q);
    const bookingDoc = querySnapshot.docs.find(doc => doc.data().id === id);
    
    if (bookingDoc) {
      await deleteDoc(doc(db, collectionName, bookingDoc.id));
    }
  } catch (error) {
    console.error("Error deleting booking: ", error);
    throw error;
  }
};
