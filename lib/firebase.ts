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
export const mobileMountainContentCollection = collection(db, "mobile-mountain-content");

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

// Website Content functions
export const getWebsiteContent = async () => {
  try {
    const q = query(mobileMountainContentCollection);
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Return default content if no content exists
      return {
        heroTitle: "Mobile Mountain Detail",
        heroSubtitle: "We bring the mountain of quality car detailing services right to your doorstep. Professional, convenient, and guaranteed satisfaction.",
        servicesTitle: "Our Detailing Services",
        servicesSubtitle: "Professional mobile car detailing services that bring the mountain of quality right to your location.",
        pricingTitle: "Pricing Plans",
        pricingSubtitle: "Choose the perfect detailing package for your vehicle. All prices include travel to your location.",
        testimonialsTitle: "What Our Customers Say",
        testimonialsSubtitle: "Don't just take our word for it. Here's what our satisfied customers have to say about our services.",
        contactTitle: "Get In Touch",
        contactSubtitle: "Ready to give your vehicle the attention it deserves? Contact us today to schedule your appointment.",
        footerDescription: "We bring the mountain of quality car detailing services right to your doorstep. Professional, convenient, and guaranteed satisfaction.",
        businessName: "Mobile Mountain Detail",
        phoneNumber: "(555) 123-4567",
        email: "info@mobilemountaindetail.com",
        serviceArea: "25-mile radius"
      };
    }
    
    // Return the first document (we'll only have one content document)
    const contentDoc = querySnapshot.docs[0];
    return contentDoc.data();
  } catch (error) {
    console.error("Error getting website content: ", error);
    throw error;
  }
};

export const updateWebsiteContent = async (updates: any) => {
  try {
    const q = query(mobileMountainContentCollection);
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Create new content document if none exists
      await addDoc(mobileMountainContentCollection, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } else {
      // Update existing content document
      const contentDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "mobile-mountain-content", contentDoc.id), {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error("Error updating website content: ", error);
    throw error;
  }
};
