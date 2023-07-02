import { useEffect, useState } from "react";
import Search from "../Search";
import axios from "axios";
import Note, { NoteData } from "../Note";

type Props = {};

const NotesList = (props: Props) => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const jwtToken = localStorage.getItem("jwt");
      const response = await axios.get(
        `http://localhost:4000/api/notes/${jwtToken}`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (noteId: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/notes/${noteId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const createNote = async (newNote: NoteData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/notes", {
        ...newNote,
        token: localStorage.getItem("jwt"),
      });

      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const editNote = async (updatedNote: NoteData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/notes/${updatedNote.id}`,
        updatedNote
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? response.data : note
        )
      );
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <section>
      <Search handleSearch={setSearchText} />
      <div className="grid gap-4 grid-cols-auto-fit p-4">
        <Note onSave={createNote} />
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(searchText) ||
              note.content.toLowerCase().includes(searchText)
          )
          .map((note) => (
            <Note
              key={note.id}
              note={note}
              onSave={editNote}
              onDelete={deleteNote}
            />
          ))}
      </div>
    </section>
  );
};

export default NotesList;
