import { openDB } from "idb";

const dbPromise = openDB("flashcard-app", 1, {
  upgrade(db) {
    db.createObjectStore("flashcards", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

export const addFlashcard = async (flashcard) => {
  const db = await dbPromise;
  await db.add("flashcards", flashcard);
};

export const getFlashcards = async () => {
  const db = await dbPromise;
  return await db.getAll("flashcards");
};

export const clearFlashcards = async () => {
  const db = await dbPromise;
  await db.clear("flashcards");
};
