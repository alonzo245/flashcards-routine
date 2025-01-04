import React, { useState, useEffect } from "react";

function Flashcard({ flashcard }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isEvaporate, setEvaporate] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setTimeout(() => {
        setIsFading(true);
      }, 700); // Delay before triggering the evaporation
    }
  };

  useEffect(() => {
    if (isFading) {
      const fadeTimeout = setTimeout(() => {
        setEvaporate(true); // Stop fading animation
        setIsFading(false);
      }, 700); // Duration of the fade-out animation

      return () => clearTimeout(fadeTimeout); // Cleanup on unmount
    }
  }, [isFading]);

  return (
    <>
      {!isEvaporate ? (
        <div
          className={`flashcard ${isFading ? "fade-out" : ""}`}
          onClick={handleClick}
        >
          {isVisible ? (
            <img
              src={flashcard.front}
              alt="Flashcard Front"
              className="flashcard-image"
            />
          ) : (
            <div className="hidden-image">Click to Reveal</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Flashcard;
