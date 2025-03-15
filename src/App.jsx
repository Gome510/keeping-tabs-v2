import { useEffect, useRef, useState } from "react";
import SignIn from "./components/Auth/SignIn";
import { auth } from "./firebase/firebase-config";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";
import NET from 'vanta/dist/vanta.net.min'
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

  const [vantaEffect, setVantaEffect] = useState(null);
  const bgRef = useRef(null)
  useEffect(()=>{
    if(!vantaEffect){
      setVantaEffect(
        NET({
          el: bgRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xc53e6d,
          backgroundColor: 0x0,
          points: 12.00,
          maxDistance: 26.00,
          spacing: 20.00
        })
      );
    }

    return () => {
      if(vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect])

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
        <div className="app" ref={bgRef} ><SignIn setIsAuth={setIsAuth} /></div>
      )}
    </>
  );
}

export default App;
