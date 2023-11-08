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
    <div className="sign-in-container ">
      <div className="sign-in ">
        <div>
          <h1 className="brand">Keeping Tabs</h1>
          <h6>Sign In To Chat</h6>
        </div>

        <button className="button " onClick={signInWithGoogle}>
          <img width={30} height={30} src="/assets/images/search.png" />
          {"  "}Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
