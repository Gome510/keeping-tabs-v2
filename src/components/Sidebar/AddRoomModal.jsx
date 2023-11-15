import React, { useState } from "react";
import "./AddRoomModal.css";

function AddRoomModal({ setOpenModal }) {
  //TODO: "Room exists already" and "Room does not exist" warnings
  const [room, setRoom] = useState("");

  function handleJoin() {}

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
