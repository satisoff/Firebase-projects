// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtb03q3loKg5LIU1ul7F2RTdyP1_6_SdA",
  authDomain: "fir-project-eb230.firebaseapp.com",
  projectId: "fir-project-eb230",
  storageBucket: "fir-project-eb230.firebasestorage.app",
  messagingSenderId: "897561909574",
  appId: "1:897561909574:web:4128e7449e8f1b0f37ed47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);