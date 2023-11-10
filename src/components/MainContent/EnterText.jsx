import React from "react";

function EnterText() {
  return (
    <div className="enter-text">
      <textarea className="enter-text-box" placeholder="Say something nice!" />
      <button className="send-button">Send</button>
    </div>
  );
}

export default EnterText;
