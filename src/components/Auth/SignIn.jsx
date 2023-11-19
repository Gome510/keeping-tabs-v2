import React from "react";
import { auth, provider, db } from "../../firebase/firebase-config";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import "./SignIn.css";

const cookie = new Cookies();
const userRef = collection(db, "users");

function SignIn({ setIsAuth }) {
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-token", result.user.refreshToken);

      //add new user document to database
      const { isNewUser } = getAdditionalUserInfo(result);
      if (isNewUser) {
        console.log("New user");
        await addDoc(userRef, {
          user: auth.currentUser.displayName,
          userId: auth.currentUser.uid,
          rooms: [],
        });
      } else {
        console.log("Returning user");
        // Handle returning user here
      }

      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
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
