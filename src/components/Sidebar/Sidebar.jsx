import React, { useEffect, useState } from "react";
import "../Styles/Sidebar.css";
import { db, auth } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AddRoomModal from "./AddRoomModal";
import Profile from "./Profile";

const usersRef = collection(db, "users");

function Sidebar({ setCurrentRoom, currentRoom }) {
  const [rooms, setRooms] = useState([]);
  const [addRoom, setAddRoom] = useState(false);

  useEffect(() => {
    if (!rooms.includes(currentRoom)) {
      setCurrentRoom("");
    }
  }, [rooms,currentRoom, setCurrentRoom]);

  //update sidebar rooms
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      //create query
      const queryUsers = query(
        usersRef,
        where("userId", "==", auth.currentUser.uid)
      );

      //recieve query data
      const unsubscribeSnapshot = onSnapshot(queryUsers, (snapshot) => {
        let newRooms = [];
        snapshot.forEach((doc) => {
          newRooms = doc.data().rooms;
          setRooms(newRooms);
        });
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  function handleRoomChange(room) {
    setCurrentRoom(room);
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Rooms</h3>
        <div className="sidebar-options">
          <button onClick={() => setAddRoom(true)}>
            +{" "}
            <img
              src="/assets/images/room.png"
              width={15}
              height={15}
              alt="add a channel"
            />
          </button>
        </div>
      </div>

      <div className="sidebar-content">
        {rooms.map((room) => (
          <button
            key={room}
            className="room"
            onClick={(e) => handleRoomChange(e.target.value)}
            value={room}
          >
            {room}
          </button>
        ))}
      </div>
      <Profile />
      {addRoom && <AddRoomModal setAddRoom={setAddRoom} currentRooms={rooms} />}
    </div>
  );
}

export default Sidebar;
