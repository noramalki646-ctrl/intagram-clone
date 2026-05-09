import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6w3pJpblRnZ9G6PtSwwiDF5eC34mqN_o",
  authDomain: "instagram-clone-app-37e95.firebaseapp.com",
  projectId: "instagram-clone-app-37e95",
  storageBucket: "instagram-clone-app-37e95.firebasestorage.app",
  messagingSenderId: "826458309440",
  appId: "1:826458309440:web:e307a800ac0c176b9d70a5",
  measurementId: "G-BKPKHS0108"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
