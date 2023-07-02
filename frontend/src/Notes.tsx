import NotesList from "./components/NotesList";
import Header from "./components/Header";

const Notes = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Header />
      <NotesList />
    </div>
  );
};

export default Notes;
