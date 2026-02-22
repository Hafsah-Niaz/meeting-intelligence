import { useState } from "react";
import { extractTasks } from "../services/api";

export default function NotesInput({ setData, setLoading }) {
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    if (!notes.trim()) return;

    setLoading(true);
    try {
      const result = await extractTasks(notes);
      setData(result);
    } catch (error) {
      console.error("Error extracting tasks", error);
    }
    setLoading(false);
  };

  return (
    <>
      <textarea
        rows="5"
        placeholder="Paste meeting notes..."
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleSubmit}>Extract Tasks</button>
    </>
  );
}