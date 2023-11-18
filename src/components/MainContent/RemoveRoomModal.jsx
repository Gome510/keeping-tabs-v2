import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import "../Sidebar/Modal.css";

const messageRef = collection(db, "messages");
const userRef = collection(db, "users");

function RemoveRoomModal({ setRemoveRoom, currentRoom }) {
  async function handleLeave() {
    //find user doc
    const queryUsers = query(
      userRef,
      where("userId", "==", auth.currentUser.uid)
    );
    const userSnapshot = await getDocs(queryUsers);

    //remove room from user doc
    userSnapshot.forEach((doc) => {
      const newRooms = doc.data().rooms;

      const index = newRooms.indexOf(currentRoom);
      newRooms.splice(index, 1);

      updateDoc(doc.ref, {
        rooms: newRooms,
      });
      console.log(newRooms);
    });
    setRemoveRoom(false);
  }

  return (
    <div className="room-modal-backdrop">
      <div className="room-modal">
        <button id="exit-modal-button" onClick={() => setRemoveRoom(false)}>
          X
        </button>
        <h1>Leave this room?</h1>
        <p>
          This does not delete the room or your messages. <br />
          You can always rejoin.
        </p>
        <div className="modal-options">
          <button id="cancel" onClick={() => setRemoveRoom(false)}>
            Cancel
          </button>
          <button id="leave" onClick={handleLeave}>
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveRoomModal;
