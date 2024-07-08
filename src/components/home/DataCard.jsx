import React, { useState } from 'react';
import '../styles/styles.css'; // Import CSS file for DataCard styling

const DataCard = ({ icon, title, frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!('ontouchstart' in window)) { // Check if touch event is supported
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!('ontouchstart' in window)) { // Check if touch event is supported
      setIsFlipped(false);
    }
  };

  return (
    <div className={`flip-container ${isFlipped ? 'flip' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleCardFlip}>
      <div className="flipper">
        <div className="front">
          <div className="icon">{icon}</div>
          <h3>{title}</h3>
          <p>{frontContent}</p>
        </div>
        <div className="back">
          <h3>{backContent}</h3>
        </div>
      </div>
    </div>
  );
}

export default DataCard;
