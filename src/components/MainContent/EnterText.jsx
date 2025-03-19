import { useRef, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { sendMessage } from "../../firebase/messages";
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";

function EnterText({ currentRoom }) {
  const [newMessage, setNewMessage] = useState("");
  const textAreaRef = useRef(null)
  const { currentUser } = useAuth()
  
  useAutosizeTextArea(textAreaRef.current,newMessage)
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
        rows={1}
        placeholder="Say something nice!"
        defaultValue={newMessage}
        ref={textAreaRef}
      />
      <button type="submit" className="send-button" disabled={isSendDisabled}>
        Send
      </button>
    </form>
  );
}

export default EnterText;
