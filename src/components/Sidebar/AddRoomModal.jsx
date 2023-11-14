import React from "react";
import "./AddRoomModal.css";

function AddRoomModal({ setOpenModal }) {
  return (
    <div className="room-modal-backdrop">
      <div className="room-modal">
        <button id="exit-modal-button" onClick={() => setOpenModal(false)}>
          X
        </button>
        <button className="room-modal-header">Create a Room</button>
        <button className="room-modal-header">Join a Room</button>
      </div>
    </div>
  );
}

export default AddRoomModal;
