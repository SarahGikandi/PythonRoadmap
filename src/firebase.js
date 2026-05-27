import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCf5hmfQtM3sW_zcGZoj_kFWL3ik-Rn7u4",
    authDomain: "python-tracker-99e52.firebaseapp.com",
    projectId: "python-tracker-99e52",
    storageBucket: "python-tracker-99e52.firebasestorage.app",
    messagingSenderId: "440301934022",
    appId: "1:440301934022:web:497ec14c9f9e4093d68ec7",
    measurementId: "G-8VE94MLTW0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
