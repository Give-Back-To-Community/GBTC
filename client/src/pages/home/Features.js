import React from "react";
import FeatureCard from "../../components/cards/FeatureCard";
import "./Features.css";

const Features = () => {
  return (
    <div className="features">
      <div className="features-header">
        <h1>Our Features</h1>
        <p>Explore the wide range of features our platform offers.</p>
      </div>
      <div className="features-container">
        <FeatureCard
          image="feed.png"
          word="Feed"
          description="Stay updated with the latest in tech."
        />
        <FeatureCard
          image="livestreams.png"
          word="Livestreams"
          description="Watch live tech events and streams."
        />
        <FeatureCard
          image="chat.webp"
          word="Chat"
          description="Communicate in real-time with other developers."
        />
        <FeatureCard
          image="jobs.webp"
          word="Jobs"
          description="Find tech jobs and career opportunities."
        />
        <FeatureCard
          image="codepair.webp"
          word="CodePair"
          description="Collaboratively code with peers online."
        />
        <FeatureCard
          image="doubts.webp"
          word="Q&A"
          description="Get answers to your technical questions."
        />
      </div>
    </div>
  );
};

export default Features;
