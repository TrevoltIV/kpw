// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCMAEAaM4zcmSih780XOFOq9rzAaFIcqzI",
  authDomain: "learnex-746a5.firebaseapp.com",
  projectId: "learnex-746a5",
  storageBucket: "learnex-746a5.appspot.com",
  messagingSenderId: "320921117327",
  appId: "1:320921117327:web:aed4670ce30fe9e594c6fa",
  measurementId: "G-J78VRMY09K"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const user = auth.currentUser