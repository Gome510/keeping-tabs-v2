// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjWZ4sYtUQskYQ5_bDCWWGeM7F_sjiYwY",
  authDomain: "fir-react-chat-ef796.firebaseapp.com",
  projectId: "fir-react-chat-ef796",
  storageBucket: "fir-react-chat-ef796.appspot.com",
  messagingSenderId: "612773161577",
  appId: "1:612773161577:web:3dfc62c3d9469b823510f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(auth);
