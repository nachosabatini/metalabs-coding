import { FC, useState } from "react";
import Search from "../Search";
import useNoteApi from "../../hooks/useNoteApi";
import NoteCard from "../Note";

const NotesList: FC = () => {
  const { notes, addNote, updateNote, deleteNote, loading } = useNoteApi();
  const [searchText, setSearchText] = useState("");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Search handleSearch={setSearchText} />
      <div className="grid gap-4 grid-cols-auto-fit p-4">
        <NoteCard onSave={addNote} />
        {notes
          .filter(
            (note) =>
              note.title.toLowerCase().includes(searchText) ||
              note.content.toLowerCase().includes(searchText)
          )
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onSave={updateNote}
              onDelete={deleteNote}
            />
          ))}
      </div>
    </section>
  );
};

export default NotesList;
