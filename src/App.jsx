import React, { useState, useEffect } from "react";
import FlashcardList from "./components/FlashcardList";
import Upload from "./components/Upload";
import { getFlashcards, clearFlashcards } from "./db";
import "./App.css";

function App() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const loadFlashcards = async () => {
      const storedFlashcards = await getFlashcards();

      // Sort flashcards by the name property (assuming the name is stored in the flashcard data)
      const sortedFlashcards = storedFlashcards.sort((a, b) => {
        const nameA = a.name.split("/").pop(); // Extract the file name from the URL
        const nameB = b.name.split("/").pop();
        return nameA.localeCompare(nameB);
      });

      setFlashcards(sortedFlashcards);
    };

    loadFlashcards();
  }, []);

  const handleUpload = (newFlashcards) => {
    const sortedFlashcards = [...flashcards, ...newFlashcards].sort((a, b) => {
      const nameA = a.front.split("/").pop();
      const nameB = b.front.split("/").pop();
      return nameA.localeCompare(nameB);
    });
    setFlashcards(sortedFlashcards);
  };

  const handleClear = async () => {
    await clearFlashcards();
    setFlashcards([]); // Clear the UI as well
  };

  return (
    <div className="App">
      <h1>Flashcard App</h1>
      <Upload onUpload={handleUpload} />
      <button onClick={handleClear} className="clear-button">
        Clear All Flashcards
      </button>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App;
