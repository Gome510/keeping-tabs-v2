import React from "react";
import "./MainContent.css";
import { db } from "../../firebase/firebase-config";

function MainContent({currentRoom}) {
  if (currentRoom == "") {
     return <div className="main-content"> Select a chat room</div>;
  }

  //load messages
  
  
}

export default MainContent;
