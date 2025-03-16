import React, { useState } from "react";
import { db } from "../../firebase/firebase-config";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";

function EnterText({ currentRoom }) {
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useAuth()
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
        user: currentUser.displayName,
        userId: currentUser.uid,
        pfp: currentUser.photoURL,
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
