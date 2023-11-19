import { useEffect, useState } from "react";
import SignIn from "./components/Auth/SignIn";
import { auth } from "./firebase/firebase-config";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

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
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [currentRoom, setCurrentRoom] = useState("");

  return (
    <>
      {isAuth ? (
        <div className="app">
          <Sidebar
            setIsAuth={setIsAuth}
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
          />
          <MainContent currentRoom={currentRoom} />
        </div>
      ) : (
        <SignIn setIsAuth={setIsAuth} />
      )}
    </>
  );
}

export default App;
