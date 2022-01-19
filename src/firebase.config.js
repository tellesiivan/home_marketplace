import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSiCMk9vT9wKVeoSdivoXZe43VG4hapDM",
  authDomain: "home-marketplace.firebaseapp.com",
  projectId: "home-marketplace",
  storageBucket: "home-marketplace.appspot.com",
  messagingSenderId: "379119940376",
  appId: "1:379119940376:web:f07fd89a62b06e73f2646d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
