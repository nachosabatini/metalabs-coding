import NotesList from "./components/NotesList";
import Header from "./components/Header";
import { FC } from "react";
import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

const NotesPage: FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4">
      <Header />
      <NotesList />
    </div>
  );
};

export default NotesPage;
