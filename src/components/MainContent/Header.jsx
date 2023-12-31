import React, { useState } from "react";

import RemoveRoomModal from "./RemoveRoomModal";

function Header({ currentRoom }) {
  const [removeRoom, setRemoveRoom] = useState(false);

  return (
    <section className="header">
      <h5>{currentRoom}</h5>
      <div>
        <button type="button" onClick={() => setRemoveRoom(true)}>
          Leave{" "}
          <img
            src="/assets/images/exit.png"
            width={20}
            height={20}
            alt="leave room"
          />
        </button>
      </div>
      {removeRoom && (
        <RemoveRoomModal
          currentRoom={currentRoom}
          setRemoveRoom={setRemoveRoom}
        />
      )}
    </section>
  );
}

export default Header;
