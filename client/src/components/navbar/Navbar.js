import React, { useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const logOut = useRef(null);

  useEffect(() => {
    if (logOut.current) {
      logOut.current.onclick = () => {
        localStorage.clear();
        window.location.reload();
      };
    }
  });
  return (
    <header class="navbar">
      <Link to="/">
        <img src="GBTC-logo.png" alt="logo" className="gbtc-logo" />
      </Link>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="menu">
        <li>
          <Link
            style={{ textDecoration: "none", border: "none", color: "black" }}
            to="/feed"
          >
            <div>Feed</div>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", border: "none", color: "black" }}
            to="/chat"
          >
            <div id="chat_link">Chat</div>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", border: "none", color: "black" }}
            to="/livestreams"
          >
            <div>LiveStreams</div>
          </Link>
        </li>
        {localStorage.getItem("token") != null ? (
          <>
            <li style={{ marginTop: "20px", marginRight: "12px" }}>
              {localStorage.getItem("name").toUpperCase()}
            </li>
            <li className="navbar-login" ref={logOut}>
              Log out
            </li>
          </>
        ) : (
          <>
            <Link
              style={{ textDecoration: "none", border: "none", color: "white" }}
              to="/login"
            >
              <button className="navbar-login">Login</button>
            </Link>
            <Link
              style={{ textDecoration: "none", border: "none", color: "white" }}
              to="/register"
            >
              <button className="navbar-login">Sign Up</button>
            </Link>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
