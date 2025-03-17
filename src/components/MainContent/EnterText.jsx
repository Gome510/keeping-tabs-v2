import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { sendMessage } from "../../firebase/messages";

function EnterText({ currentRoom }) {
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useAuth()
  
  const isSendDisabled = newMessage === "";

  async function handleSubmit(e) {
    e.preventDefault();

    await sendMessage(currentUser,currentRoom,newMessage);
    setNewMessage("");
  }

  return (
    <form className="enter-text" onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setNewMessage(e.target.value)}
        className="enter-text-box"
        placeholder="Say something nice!"
        defaultValue={newMessage}
      />
      <button type="submit" className="send-button" disabled={isSendDisabled}>
        Send
      </button>
    </form>
  );
}

export default EnterText;
