import React from "react";
import { auth, provider } from "../../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";

function SignIn({ setUser }) {
  async function signInWithGoogle() {
    await signInWithPopup(auth, provider);
    setUser(auth.currentUser);
  }

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </div>
  );
}

export default SignIn;
