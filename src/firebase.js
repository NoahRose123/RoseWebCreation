import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYFVAMd2lzqNLKekuTE2Mt404tuOq2mnk",
  authDomain: "rosewebcreation.firebaseapp.com",
  projectId: "rosewebcreation",
  storageBucket: "rosewebcreation.firebasestorage.app",
  messagingSenderId: "901821617734",
  appId: "1:901821617734:web:2d2698126bde404f849c47",
  measurementId: "G-XX9ERZJ5W7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
