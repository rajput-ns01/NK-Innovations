import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "meeraai-e2817.firebaseapp.com",
  projectId: "meeraai-e2817",
  storageBucket: "meeraai-e2817.appspot.com",
  messagingSenderId: "236127726493",
  appId: "1:236127726493:web:b3a2f777ff5e2622dc5d74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);