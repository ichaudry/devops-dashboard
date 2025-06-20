import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (selectedRole) => {
    login(selectedRole);         // Set role: "admin" or "viewer"
    navigate("/dashboard");      // Then navigate
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-deepNavy text-white font-inter px-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Login as</h1>
      <div className="flex gap-6">
        <button
          className="bg-primaryBlue hover:bg-blue-800 text-white px-6 py-2 rounded shadow font-inter"
          onClick={() => handleLogin("admin")}
        >
          Admin
        </button>
        <button
          className="bg-accentOrange hover:bg-orange-600 text-white px-6 py-2 rounded shadow font-inter"
          onClick={() => handleLogin("viewer")}
        >
          Viewer
        </button>
      </div>
    </div>
  );
}
