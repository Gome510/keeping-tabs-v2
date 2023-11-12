import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase-config";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function EnterText({ currentRoom }) {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");

  async function handleSubmit(e) {
    e.preventDefault();

    if (newMessage == "") {
      return;
    }

    try {
      await addDoc(messageRef, {
        text: newMessage,
        room: currentRoom,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        pfp: auth.currentUser.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
    setNewMessage("");
  }

  return (
    <form className="enter-text" onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setNewMessage(e.target.value)}
        className="enter-text-box"
        placeholder="Say something nice!"
        value={newMessage}
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
}

export default EnterText;
