import React, { useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const logOut = useRef(null);

  useEffect(() => {
    if (logOut.current) {
      logOut.current.onclick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        window.location.reload();
      };
    }
  });
  return (
    <header class="navbar">
      <Link to="/">
        <img src="gbtc-logo.png" alt="logo" className="gbtc-logo" />
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
          <a href="#about">Chat</a>
        </li>
        <li>
          <a href="#careers">LiveStreams</a>
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
            <button className="navbar-login">Sign Up</button>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
