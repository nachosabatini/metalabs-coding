import NotesList from "./components/NotesList";
import Header from "./components/Header";
import { FC } from "react";

const NotesPage: FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Header />
      <NotesList />
    </div>
  );
};

export default NotesPage;
