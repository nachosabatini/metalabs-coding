import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext<{
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
}>({
  user: null,
  loading: true,
  login: async (email: string, password: string) => {},
  logout: () => {},
  isAuthenticated: () => false,
});

const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("jwt", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userResponse = await axios.get("http://localhost:4000/api/user");
      const user = {
        id: userResponse.data.id,
        username: userResponse.data.username,
        email: userResponse.data.email,
        role: userResponse.data.role,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    toast.success("Logout successful, see you soon!");
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
