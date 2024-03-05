import React from "react";
import "./FeatureCard.css"; // Make sure to create this CSS file

const FeatureCard = ({ image, word, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-inner">
        <div className="feature-card-front">
          <img src={image} alt={word} className="feature-img" />
          <h2>{word}</h2>
        </div>
        <div className="feature-card-back">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
