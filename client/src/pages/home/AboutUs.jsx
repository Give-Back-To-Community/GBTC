import React from "react";
import "./AboutUs.css"; // Make sure to create this CSS file

const AboutUs = () => {
  return (
    <div className="about-us-section">
      <div className="about-us-content">
        <h2>About Us</h2>
        <p>
          We are a team of passionate programmers dedicated to building a
          platform that empowers developers across the globe to connect,
          collaborate, and create amazing technology together. Our mission is to
          foster an inclusive community that supports growth and innovation.
        </p>
        <p>
          Founded in [Year], our platform has grown to become a leading
          community where developers can share knowledge, build projects, and
          advance their careers.
        </p>
      </div>
      <div className="about-us-image">
        <img src="aboutus.jpg" alt="About Us" />
      </div>
    </div>
  );
};

export default AboutUs;
