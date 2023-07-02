import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NotesPage from "./Notes";
import LoginPage from "./Login";
import { FC } from "react";
import { ToastContainer } from "react-toastify";

const App: FC = () => {
  const checkAuthStatus = () => {
    const token = localStorage.getItem("jwt");

    return !!token;
  };

  const PrivateRoute: React.FC = () => {
    return checkAuthStatus() ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes" element={<PrivateRoute />}>
          <Route path="/notes" element={<NotesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
