import { useState } from "react";
import SignIn from "./components/Auth/SignIn";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import "./App.css";
import { useAuth } from "./hooks/useAuth";

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
  const [currentRoom, setCurrentRoom] = useState("");
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <div className="app">
          <Sidebar
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
          />
          <MainContent currentRoom={currentRoom} />
        </div>
      ) : (
      <SignIn />
      )}
    </>
  );
}

export default App;
