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
import "./AddRoomModal.css";

const messageRef = collection(db, "messages");
const userRef = collection(db, "users");

function RemoveRoomModal({ setRemoveRoom }) {
  return (
    <div className="room-modal-backdrop">
      <div className="room-modal">
        <button id="exit-modal-button" onClick={() => setOpenModal(false)}>
          X
        </button>
      </div>
    </div>
  );
}

export default RemoveRoomModal;
