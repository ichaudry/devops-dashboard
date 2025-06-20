// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-deepNavy text-white font-inter px-4">
      <h1 className="text-4xl font-bold mb-6 text-white">Login as</h1>
      <div className="flex gap-6">
        <button
          className="bg-primaryBlue hover:bg-blue-800 text-white px-6 py-2 rounded shadow font-inter"
          onClick={() => navigate("/dashboard")}
        >
          Admin
        </button>
        <button
          className="bg-accentOrange hover:bg-orange-600 text-white px-6 py-2 rounded shadow font-inter"
          onClick={() => navigate("/dashboard")}
        >
          Viewer
        </button>
      </div>
    </div>
  );
}
