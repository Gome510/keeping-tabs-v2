import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase-config";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import "./AddRoomModal.css";

const messageRef = collection(db, "messages");
const userRef = collection(db, "users");

function AddRoomModal({ setOpenModal }) {
  //TODO: "Room exists already" and "Room does not exist" warnings
  const [room, setRoom] = useState("");
  const [roomErr, setRoomErr] = useState("");

  async function handleJoin() {
    const queryRooms = query(messageRef, where("room", "==", room));

    const querySnapshot = await getDocs(queryRooms);
    if (querySnapshot.empty) {
      setRoom("join-dne");
    } else {
      setRoom("");
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
