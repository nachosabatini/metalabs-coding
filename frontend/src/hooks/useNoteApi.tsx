import axios from "axios";
import { useEffect, useState } from "react";
import { Note } from "../types";
import { useAuth } from "./useAuth";

const useNoteApi = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/notes/${user.id}`
        );

        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user.id]);

  const addNote = async (newNote: Note) => {
    try {
      const response = await axios.post("http://localhost:4000/api/notes", {
        ...newNote,
        id: user.id,
      });
      const newNoteData = response.data;
      setNotes((prevNotes) => [...prevNotes, newNoteData]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async (updatedNote: Note) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/notes/${updatedNote.id}`,
        updatedNote
      );
      const updatedNoteData = response.data;
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNoteData : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return { notes, loading, addNote, deleteNote, updateNote };
};

export default useNoteApi;
