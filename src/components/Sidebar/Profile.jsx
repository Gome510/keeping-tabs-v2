import React from "react";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Profile({ setIsAuth }) {
  async function handleLogout() {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  }

  return (
    <div className="profile">
      <div>
        <img
          src={auth.currentUser.photoURL}
          width={50}
          height={50}
          alt="Your Profile Picture"
        />
      </div>
      <div>{auth.currentUser.displayName}</div>
      <div>
        <button onClick={handleLogout}>
          <img
            src="/assets/images/logout.png"
            width={30}
            height={30}
            alt="Log Out Button"
          />
        </button>
      </div>
    </div>
  );
}

export default Profile;
