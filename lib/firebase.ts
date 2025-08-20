import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXqXq",
  authDomain: "rosewebcreation.firebaseapp.com",
  projectId: "rosewebcreation",
  storageBucket: "rosewebcreation.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export interface Booking {
  id: number
  name: string
  email: string
  phone: string
  address: string
  service: string
  selectedDate: string
  selectedTime: string
  message: string
  status: 'Confirmed' | 'Pending' | 'Cancelled'
  createdAt: string
}

export interface Availability {
  date: string
  times: string[]
  isAvailable: boolean
}

export interface WebsiteContent {
  heroTitle: string
  heroSubtitle: string
  servicesTitle: string
  servicesSubtitle: string
  pricingTitle: string
  pricingSubtitle: string
  testimonialsTitle: string
  testimonialsSubtitle: string
  businessName: string
  phoneNumber: string
  email: string
  serviceArea: string
  footerDescription: string
}

// Booking functions
export const addBooking = async (bookingData: Omit<Booking, 'id'>, collectionName: string = 'bookings') => {
  try {
    console.log(`Adding booking to collection: ${collectionName}`)
    console.log('Booking data:', bookingData)
    
    const docRef = await addDoc(collection(db, collectionName), {
      ...bookingData,
      id: Date.now() // Generate a unique ID
    })
    
    console.log('Booking added successfully:', docRef.id)
    return docRef
  } catch (error) {
    console.error('Error adding booking:', error)
    throw error
  }
}

export const getBookings = async (collectionName: string = 'bookings'): Promise<Booking[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName))
    const bookings: Booking[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      bookings.push({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        service: data.service,
        selectedDate: data.selectedDate || data.date,
        selectedTime: data.selectedTime || data.time,
        message: data.message,
        status: data.status,
        createdAt: data.createdAt
      })
    })
    
    return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (error) {
    console.error('Error getting bookings:', error)
    throw error
  }
}

export const updateBooking = async (id: number, status: string, collectionName: string = 'bookings') => {
  try {
    const q = query(collection(db, collectionName), where('id', '==', id))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const docRef = doc(db, collectionName, querySnapshot.docs[0].id)
      await updateDoc(docRef, { status })
    }
  } catch (error) {
    console.error('Error updating booking:', error)
    throw error
  }
}

export const deleteBooking = async (id: number, collectionName: string = 'bookings') => {
  try {
    const q = query(collection(db, collectionName), where('id', '==', id))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const docRef = doc(db, collectionName, querySnapshot.docs[0].id)
      await deleteDoc(docRef)
    }
  } catch (error) {
    console.error('Error deleting booking:', error)
    throw error
  }
}

// Availability functions
export const saveAvailability = async (availability: Availability[]) => {
  try {
    // Clear existing availability
    const existingQuery = await getDocs(collection(db, 'availability'))
    const deletePromises = existingQuery.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
    
    // Save new availability
    const savePromises = availability.map(day => 
      addDoc(collection(db, 'availability'), day)
    )
    await Promise.all(savePromises)
    
    console.log('Availability saved successfully')
  } catch (error) {
    console.error('Error saving availability:', error)
    throw error
  }
}

export const getAvailability = async (): Promise<Availability[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'availability'))
    const availability: Availability[] = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      availability.push({
        date: data.date,
        times: data.times || [],
        isAvailable: data.isAvailable
      })
    })
    
    return availability.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  } catch (error) {
    console.error('Error getting availability:', error)
    throw error
  }
}

// Website content functions
export const saveWebsiteContent = async (content: WebsiteContent) => {
  try {
    // Clear existing content
    const existingQuery = await getDocs(collection(db, 'website-content'))
    const deletePromises = existingQuery.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
    
    // Save new content
    await addDoc(collection(db, 'website-content'), content)
    
    console.log('Website content saved successfully')
  } catch (error) {
    console.error('Error saving website content:', error)
    throw error
  }
}

export const getWebsiteContent = async (): Promise<WebsiteContent | null> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'website-content'))
    
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data()
      return {
        heroTitle: data.heroTitle || '',
        heroSubtitle: data.heroSubtitle || '',
        servicesTitle: data.servicesTitle || '',
        servicesSubtitle: data.servicesSubtitle || '',
        pricingTitle: data.pricingTitle || '',
        pricingSubtitle: data.pricingSubtitle || '',
        testimonialsTitle: data.testimonialsTitle || '',
        testimonialsSubtitle: data.testimonialsSubtitle || '',
        businessName: data.businessName || '',
        phoneNumber: data.phoneNumber || '',
        email: data.email || '',
        serviceArea: data.serviceArea || '',
        footerDescription: data.footerDescription || ''
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting website content:', error)
    throw error
  }
}
