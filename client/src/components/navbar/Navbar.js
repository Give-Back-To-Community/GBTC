import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header class="navbar">
      <img src="gbtc-logo.png" alt="logo" className="gbtc-logo" />
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="menu">
        <li>
          <Link to="/feed">
            <div>Feed</div>
          </Link>
        </li>
        <li>
          <a href="#about">Chat</a>
        </li>
        <li>
          <a href="#careers">LiveStreams</a>
        </li>
        <button className="navbar-login">Login</button>
        <button className="navbar-login">Sign Up</button>
      </ul>
    </header>
  );
};

export default Navbar;
