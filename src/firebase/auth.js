import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "./firebase-config";
import Cookies from "universal-cookie";
import { addDoc, collection } from "firebase/firestore";

const userRef = collection(db, "users");

const cookies = new Cookies();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    cookies.set("auth-token", result.user.refreshToken);

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

    return result;
  } catch (error) {
    console.log(error);
  }
}

export function signOut() {
  auth.signOut();
  cookies.remove("auth-token");
}
