import React, { useEffect, useState } from "react";
import "./MainContent.css";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const messageRef = collection(db, "messages");

function Messages({ currentRoom }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", currentRoom),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), messageId: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [currentRoom]);

  //load messages
  return (
    <div className="message-container">
      {messages.map((message) => {
        return (
          <div className="message" key={message.messageId}>
            {`${message.user}: ${message.text}`}
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
