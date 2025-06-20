import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
