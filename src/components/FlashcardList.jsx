import React from "react";
import Flashcard from "./Flashcard";

function FlashcardList({ flashcards }) {
  console.log(flashcards);

  return (
    <div className="flashcard-list">
      {flashcards.map((flashcard, index) => (
        <Flashcard key={index} flashcard={flashcard} />
      ))}
    </div>
  );
}

export default FlashcardList;
