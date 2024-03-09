import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:5000");

function Codepair() {
  const [code, setCode] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("codeUpdate", (data) => {
      setCode(data);
    });
  }, []);

  const handleCodeChange = (e) => {
    const updatedCode = e.target.value;
    setCode(updatedCode);
    if (room) {
      socket.emit("codeChange", updatedCode, room);
    }
  };

  const compileCode = () => {
    console.log("HIT");
    axios
      .post("/compile", { code })
      .then((response) => {
        const output = response.data.output;
        console.log(output);
      })
      .catch((error) => {
        console.error("Failed to compile code:", error);
      });
  };
  const joinRoom = () => {
    socket.emit("joinRoom", room);
    console.log(`Joined room ${room}`);
  };

  return (
    <div>
      <h1>Code Editor</h1>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Enter room ID"
      />
      <button onClick={joinRoom}>Join Room</button>
      <textarea value={code} onChange={handleCodeChange}></textarea>
      <button onClick={compileCode}>Compile</button>
    </div>
  );
}

export default Codepair;
