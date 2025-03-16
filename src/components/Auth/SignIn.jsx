import { useEffect, useRef, useState } from "react";

import NET from 'vanta/dist/vanta.net.min'

import "./SignIn.css";
import { signInWithGoogle } from "../../firebase/auth";


function SignIn() {
  const [isSigningIn, setIsSigningIn] = useState(false);


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

  async function handleButtonClick(e) {
    e.preventDefault()

    if(!isSigningIn){
      setIsSigningIn(true);
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error(error);
      }
      setIsSigningIn(false)
    }
  }



  return (
    <div className="sign-in-container " ref={bgRef}>
      <div className="sign-in ">
        <div>
          <h1 className="brand">Keeping Tabs</h1>
          <h6>Sign In To Chat</h6>
        </div>

        <button className="button " onClick={handleButtonClick} disabled={isSigningIn}>
          <img width={30} height={30} src="/assets/images/search.png" />
          {"  "}Sign In With Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
