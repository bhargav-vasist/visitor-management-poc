import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Optionally import the services that you want to use
// import { auth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAEQid7h_ozLvKQKebHN0oYxM3EwXTB96w",
    authDomain: "visitor-mgmt-cd05d.firebaseapp.com",
    projectId: "visitor-mgmt-cd05d",
    storageBucket: "visitor-mgmt-cd05d.appspot.com",
    messagingSenderId: "856551223071",
    appId: "1:856551223071:web:47666d2820ad03f1ea4a2a",
    measurementId: "G-8CS9ZDZ7H5"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const firestoreDB = getFirestore(app);
