import Cookies from "universal-cookie";
import { signOut } from "../../firebase/auth";
import { useAuth } from "../../hooks/useAuth";

const cookies = new Cookies();

function Profile() {
  const { currentUser } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <div className="profile">
      <div>
        <img
          src={currentUser.photoURL}
          width={50}
          height={50}
          alt="Your Profile Picture"
        />
      </div>
      <div>{currentUser.displayName}</div>
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
