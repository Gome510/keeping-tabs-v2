import { useState } from "react";
import SignIn from "./components/Auth/SignIn";
import { auth } from "./firebase/firebase-config";
import Cookies from "universal-cookie";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";

function App() {
  /* 
  App
    SignIn
    ----or-----
    Sidebar
    MainContent
      Messages
        Header
        Message
      EnterText
  
  */
  const [user, setUser] = useState(auth.currentUser);

  return (
    <>
      {user ? (
        <div className="app">
          <Sidebar />
          <MainContent />
        </div>
      ) : (
        <SignIn setUser={setUser} />
      )}
    </>
  );
}

export default App;
