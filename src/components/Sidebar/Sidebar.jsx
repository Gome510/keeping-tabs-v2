import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { db, auth } from "../../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const usersRef = collection(db, "users");

function Sidebar({ setCurrentRoom }) {
  const [rooms, setRooms] = useState([]);

  //update sidebar rooms
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log(auth.currentUser);

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
      <h3 className="sidebar-title">Rooms</h3>
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
    </div>
  );
}

export default Sidebar;

function SidebarItem() {
  return <div>Sidebar</div>;
}
