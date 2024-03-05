import React, { useState, useEffect } from "react";
import "./ImageSlider.css"; // Make sure to create this CSS file

const totalImages = [
  "slider-image-1.jpg",
  "slider-image-2.png ",
  "slider-image-3.png",
  "slider-image-4.png",
  "slider-image-5.png",
  "slider-image-7.jpeg",

  "slider-image-6.jpg",
];

const ImageSlider = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % totalImages.length);
    }, 3000); // Scroll images every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate the images to display
  const currentImages = [];
  for (let i = 0; i < 7; i++) {
    currentImages.push(totalImages[(startIndex + i) % totalImages.length]);
  }

  return (
    <div className="slider">
      {currentImages.map((src, index) => (
        <div className="slide" key={index}>
          <img src={src} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
