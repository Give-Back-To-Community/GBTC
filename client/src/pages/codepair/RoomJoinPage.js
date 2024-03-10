import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RoomJoinPage() {
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const joinRoom = () => {
    // Navigate to the Codepair component, passing the room number
    navigate(`/codepair/${room}`);
  };

  return (
    <div>
      <h2>Join a Room</h2>
      <input
        type="text"
        placeholder="Enter room number"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}

export default RoomJoinPage;
