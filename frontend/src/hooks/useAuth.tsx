import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useAuth = () => {
  const AuthCtx = useContext(AuthContext);
  if (AuthCtx === undefined) {
    throw new Error("useAuth must be used within AuthContext");
  }
  return AuthCtx;
};
