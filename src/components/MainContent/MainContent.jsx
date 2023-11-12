import React, { useEffect, useState } from "react";
import "./MainContent.css";
import Messages from "./Messages";
import EnterText from "./EnterText";

function MainContent({ currentRoom }) {
  if (currentRoom == "") {
    return <div className="main-content"> Select a chat room</div>;
  }

  //load messages
  return (
    <div className="main-content">
      <Messages currentRoom={currentRoom} />
      <EnterText currentRoom={currentRoom} />
    </div>
  );
}

export default MainContent;
