import axios from "axios";
import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./hooks/useAuth";

const LoginPage: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <LoginForm />
        <div className="mt-4">
          <p>Don't have an account? Sign up below.</p>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formInputs.email, formInputs.password);
      setFormInputs({
        email: "",
        password: "",
      });

      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/notes");
      }, 1000);
    } catch (error) {
      toast.error("Invalid credentials");
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={formInputs.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={formInputs.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </div>
    </form>
  );
};

const SignupForm: React.FC = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        formInputs
      );

      if (response.status === 201) {
        setFormInputs({
          username: "",
          email: "",
          password: "",
          role: "user",
        });
        toast.success("Signup successful! You can now log in.");
      }
    } catch (error) {
      toast.success("Something went wrong :(");
      console.error("Signup failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={formInputs.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={formInputs.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          value={formInputs.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <select
          name="role"
          id="role"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={formInputs.role}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
