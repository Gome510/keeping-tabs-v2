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
import "../Styles/Modal.css";

const messageRef = collection(db, "messages");
const userRef = collection(db, "users");

function AddRoomModal({ setAddRoom, currentRooms }) {
  const [room, setRoom] = useState("");
  const [roomErr, setRoomErr] = useState("");

  async function handleJoin() {
    const queryRoom = query(messageRef, where("room", "==", room));

    const roomSnapshot = await getDocs(queryRoom);
    if (roomSnapshot.empty) {
      setRoomErr("This room does not exist.");
      return;
    } else {
      setRoomErr("");
      //find user's document in db
      const queryUser = query(
        userRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const userSnapshot = await getDocs(queryUser);

      //check if user is already in that room
      if (currentRooms.includes(room)) {
        setRoomErr("You have already joined that room.");
        return;
      }

      //update rooms field of their document
      userSnapshot.docs.forEach((doc) => {
        updateDoc(doc.ref, {
          rooms: [...doc.data().rooms, room],
        });
      });
    }
  }

  async function handleCreate() {
    //check if room already exists
    const queryRooms = query(messageRef, where("room", "==", room));
    const roomSnapshot = await getDocs(queryRooms);

    if (!roomSnapshot.empty) {
      setRoomErr("This room already exists.");
      return;
    } else {
      setRoomErr("");
      //add inital message
      addDoc(messageRef, {
        text: `${auth.currentUser.displayName} created this "${room}" room`,
        room: room,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        pfp: auth.currentUser.photoURL,
      });

      //find user's document in db
      const queryUser = query(
        userRef,
        where("userId", "==", auth.currentUser.uid)
      );
      const userSnapshot = await getDocs(queryUser);

      //add room to user
      userSnapshot.docs.forEach((doc) => {
        updateDoc(doc.ref, {
          rooms: [...doc.data().rooms, room],
        });
      });
    }
  }

  return (
    <div className="room-modal-backdrop">
      <div className="room-modal">
        <button id="exit-modal-button" onClick={() => setAddRoom(false)}>
          X
        </button>
        <h1>Create or Join a Room</h1>
        <input
          placeholder="Enter Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        {roomErr && <p>{roomErr}</p>}
        <div className="modal-options ">
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
