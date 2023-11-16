import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase-config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import "./AddRoomModal.css";

const messageRef = collection(db, "messages");
const userRef = collection(db, "users");

function AddRoomModal({ setOpenModal }) {
  //TODO:Join and Create Room
  const [room, setRoom] = useState("");
  const [roomErr, setRoomErr] = useState("");

  async function handleJoin() {
    const queryRoom = query(messageRef, where("room", "==", room));

    const roomSnapshot = await getDocs(queryRoom);
    if (roomSnapshot.empty) {
      setRoomErr("join-dne");
    } else {
      setRoomErr("");
      //find user's document in db
      const queryUser = query(
        userRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const userSnapshot = await getDocs(queryUser);

      //update rooms field of their document
      userSnapshot.docs.forEach((doc) => {
        updateDoc(doc.ref, {
          rooms: [...doc.data().rooms, room],
        });
      });
    }
  }

  function handleCreate() {}

  return (
    <div className="room-modal-backdrop">
      <div className="room-modal">
        <button id="exit-modal-button" onClick={() => setOpenModal(false)}>
          X
        </button>
        <h1>Create or Join a Room</h1>
        <input
          placeholder="Enter Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        {roomErr == "join-dne" && <p>This room does not exist.</p>}
        {roomErr == "create-exists" && <p>This room already exists.</p>}
        <div className="d-flex justify-content-around ">
          <button className="room-modal-option" onClick={handleCreate}>
            Create
          </button>
          <button className="room-modal-option" onClick={handleJoin}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRoomModal;
