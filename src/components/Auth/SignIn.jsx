import React from "react";
import { auth, provider } from "../../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "./SignIn.css";

const cookie = new Cookies();

function SignIn({ setIsAuth }) {
  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, provider);
    cookie.set("auth-token", result.user.refreshToken);
    setIsAuth(true);
  }

  return (
    <div className="d-flex justify-content-center text-center align-items-center h-full">
      <div className="sign-in rounded ">
        <h1>Sign In</h1>
        <button className="rounded border-0" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
