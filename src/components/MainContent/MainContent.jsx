import React, { useEffect, useState } from "react";
import "./MainContent.css";
import Messages from "./Messages";
import EnterText from "./EnterText";
import Header from "./Header";

function MainContent({ currentRoom }) {
  if (currentRoom == "") {
    return <div className="main-content"> Select a chat room</div>;
  }

  //load messages
  return (
    <div className="main-content">
      <Header currentRoom={currentRoom} />
      <Messages currentRoom={currentRoom} />
      <EnterText currentRoom={currentRoom} />
    </div>
  );
}

export default MainContent;
