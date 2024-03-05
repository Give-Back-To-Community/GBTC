import React from "react";
import "./Home.css";
function Home() {
  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1>
          Social Network <br />
          <span>for Programmers and Developers</span>
        </h1>
        <p>
          GBTC is more than just a platform; it's a vibrant ecosystem where
          knowledge meets opportunity. Join a Thriving Community to connect,
          share your expertise, and learn from the best in the industry. GBTC
          brings together students, professionals, and industry leaders in a
          collaborative environment where ideas flourish and networks thrive.
        </p>
      </div>
      <img src="hero-sec.png" alt="Hero Section" className="hero-sec-img" />
    </div>
  );
}

export default Home;
