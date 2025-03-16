import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import React, { useEffect, useState } from "react";
export const AuthContext = React.createContext();


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
    return unsubscribe
  },[])

  async function initializeUser(user){
    setLoading(true)
    if (user){
      setCurrentUser({...user});
      setIsLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false)
    }
    setLoading(false)
  }

  const value = {
    currentUser,
    isLoggedIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

