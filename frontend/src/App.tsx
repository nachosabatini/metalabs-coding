import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NotesPage from "./Notes";
import LoginPage from "./Login";
import { FC } from "react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/AuthProvider";

const App: FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
