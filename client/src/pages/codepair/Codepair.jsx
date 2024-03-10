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
import { Link } from "react-router-dom";
const socket = io.connect("http://localhost:5000");
axios.defaults.baseURL = "http://localhost:5000";
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
      socket.emit("codeChange", value, room);
    }
  };

  const compileCode = () => {
    setOutput("compiling");
    // console.log("HIT");
    if (!code) {
      setOutput("No code provided");
      return;
    }
    // console.log(code, language);
    axios
      .post("/compile", { code, language })
      .then((response) => {
        const output = response.data.output;
        // console.log("Output:", output);
        setOutput(output);
      })
      .catch((error) => {
        // console.error("Failed to compile code:", error);
      });
  };

  const joinRoom = () => {
    socket.emit("joinRoom", room);
    // console.log(`Joined room ${room}`);
  };

  const getMode = (language) => {
    switch (language) {
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "cpp":
        return "text/x-c++src";
      case "java":
        return "text/x-java";
      default:
        return "javascript";
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
    <>
      {localStorage.getItem("token") ? (
        <div>
          <h1>Code Editor</h1>
          <input
            className="join-room"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room ID"
          />
          <button className="join-room" onClick={joinRoom}>
            Join Room
          </button>

          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="nodejs">JavaScript</option>
            <option value="python3">Python</option>
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
          <ControlledEditor
            value={code}
            options={{
              mode: getMode(language),
              theme: getTheme(theme),
              lineNumbers: true,
            }}
            onBeforeChange={handleCodeChange}
          />

          <button className="compile-btn" onClick={compileCode}>
            Compile
          </button>
          <div>
            <h2>Output:</h2>
            <pre>{output}</pre>
          </div>
        </div>
      ) : (
        <div
          style={{
            fontSize: "x-large",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          {" "}
          Please <Link to="/login">Login</Link> first
        </div>
      )}
    </>
  );
}

export default Codepair;
