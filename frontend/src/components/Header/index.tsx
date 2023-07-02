import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between mb-8 mt-4">
      <h1 className="font-bold text-2xl">Notes</h1>
      <button
        className="border-none rounded-xl px-2 py-2 bg-gray-200 hover:bg-gray-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
