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

  //load messages
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

  return (
    <div className="message-container">
      {messages.map((message) => {
        return (
          <div className="message" key={message.messageId}>
            <img
              className="pfp"
              alt="profile picture"
              src={message.pfp ? message.pfp : "/assets/images/pfp.svg"}
              width={50}
              height={50}
            />
            <div>
              <h6>{message.user}</h6>
              <p>{message.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
