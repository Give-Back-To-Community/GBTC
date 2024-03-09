import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "./Codepair.css";
const socket = io.connect("http://localhost:5000");

function Codepair() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [room, setRoom] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("material");

  useEffect(() => {
    socket.on("codeUpdate", (data) => {
      setCode(data);
    });
  }, []);

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
    if (room) {
      socket.emit("codeChange", value, room); // Emit changes to the room
    }
  };

  const compileCode = () => {
    axios
      .post("/compile", { code, language }) // Send both code and language
      .then((response) => {
        const output = response.data.output; // Assuming this is how the compilation API returns the output
        setOutput(output); // Display the output in the UI
      })
      .catch((error) => {
        console.error("Failed to compile code:", error);
      });
  };

  const joinRoom = () => {
    socket.emit("joinRoom", room);
    console.log(`Joined room ${room}`);
  };

  const getMode = (language) => {
    switch (language) {
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "cpp":
        return "text/x-c++src"; // Mode for C++
      case "java":
        return "text/x-java"; // Mode for Java
      default:
        return "";
    }
  };

  const getTheme = (theme) => {
    switch (theme) {
      case "material":
        return "material";
      case "twilight":
        return "twilight";
      case "midnight":
        return "midnight";
      case "yeti":
        return "yeti";
      case "eclipse":
        return "eclipse";
      case "duotone-dark":
        return "duotone-dark";
      case "darcula":
        return "darcula";
      case "dracula":
        return "dracula";
      default:
        return "material";
    }
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
      <ControlledEditor
        value={code}
        options={{
          mode: getMode(language),
          theme: getTheme(theme),
          lineNumbers: true,
        }}
        onBeforeChange={handleCodeChange}
      />

      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">CPP</option>
        <option value="java">Java</option>{" "}
      </select>

      <select onChange={(e) => setTheme(e.target.value)} value={theme}>
        <option value="material">material</option>
        <option value="twilight">twilight</option>
        <option value="dracula">dracula</option>
        <option value="darcula">darcula</option>
        <option value="one-dark">one-dark</option>
        <option value="eclipse">eclipse</option>
        <option value="yeti">yeti</option>
        <option value="midnight">midnight</option>
      </select>

      <button onClick={compileCode}>Compile</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default Codepair;
