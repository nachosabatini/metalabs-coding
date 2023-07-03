import { FC } from "react";
import { useAuth } from "../../hooks/useAuth";

const Header: FC = () => {
  const { logout } = useAuth();

  return (
    <div className="flex items-center justify-between mb-8 mt-4">
      <h1 className="font-bold text-2xl">Notes</h1>
      <button
        className="border-none rounded-xl px-2 py-2 bg-gray-200 hover:bg-gray-300"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
