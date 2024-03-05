import React from "react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src="GBTC-logo.png" alt="Logo" className="gbtc-logo" />
        </a>
        <div className="navbar-search">
          <input type="search" placeholder="Search..." />
        </div>
        <button className="navbar-login">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
