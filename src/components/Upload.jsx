import React from "react";
import { addFlashcard } from "../db";

function Upload({ onUpload }) {
  const handleFileUpload = async (event) => {
    let files = Array.from(event.target.files);

    // Sort files by their names in ascending order
    files = files.sort((a, b) => a.name.localeCompare(b.name));

    // Create a function that returns a Promise to read a file
    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const flashcard = { front: reader.result, back: "", name: file.name };
          addFlashcard(flashcard).then(() => resolve(flashcard)); // Add flashcard to db
        };

        reader.onerror = () => reject(new Error("File reading failed"));

        reader.readAsDataURL(file); // Read the file as a data URL
      });
    };

    // Map the files to promises and use Promise.all to ensure they are processed in order
    try {
      const newFlashcards = await Promise.all(files.map(readFile));
      onUpload(newFlashcards); // Call the onUpload callback with the flashcards in the correct order
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="upload">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default Upload;
