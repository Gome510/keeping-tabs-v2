// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSdvRvbjkJqZ_RY--GhYzlFlvluEI2uUc",
  authDomain: "keeping-tabs-ae022.firebaseapp.com",
  projectId: "keeping-tabs-ae022",
  storageBucket: "keeping-tabs-ae022.firebasestorage.app",
  messagingSenderId: "602721521653",
  appId: "1:602721521653:web:ffdc9b25045affe2a75abc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(auth);
export const db = getFirestore(app);
