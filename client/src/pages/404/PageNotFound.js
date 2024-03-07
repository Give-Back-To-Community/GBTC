import React from "react";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <div className="pageNotFound-main">
      <div className="pageNotFound-left-content">
        <img src="404.png" alt="404" className="not-found-image" />
      </div>

      <div className="pageNotFound-right-content">
        <h1 className="error">
          LOOKS LIKE YOU <br /> YOU HAVE LOST
        </h1>
        <h3>Page Not Found</h3>
        <h2>Let's get you back to the right place.</h2>
        <a href="/" className="back-to-home">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
