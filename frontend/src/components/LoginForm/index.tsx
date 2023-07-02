import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });

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
      const response = await axios.post("http://localhost:4000/auth/login", {
        password: formInputs.password,
        email: formInputs.email,
      });
      const { token } = response.data;
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("jwt", token);

        setFormInputs({
          email: "",
          password: "",
        });

        console.log("Login successful!");
        navigate("/notes");
      } else {
        console.log("Credentials are incorrect");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formInputs.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={formInputs.password}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        disabled={!formInputs.password || !formInputs.email}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
