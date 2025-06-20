import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCog, Eye, Lock } from "lucide-react";
import logo from "../assets/icon.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD; // Set in .env file

  const handleAdminClick = () => {
    setShowPasswordField(true);
    setError("");
  };

  const handleAdminLogin = () => {
    if (adminPassword === correctPassword) {
      login("admin");
      navigate("/dashboard");
    } else {
      setError("Incorrect password");
    }
  };

  const handleViewerLogin = () => {
    login("viewer");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="InfraSight Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">InfraSight</h1>
          <p className="text-sm text-gray-300">Infrastructure monitoring made simple.</p>
        </div>

        {/* Login UI */}
        <div className="space-y-4">
          {showPasswordField ? (
            <>
              <input
                type="password"
                placeholder="Enter admin password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleAdminLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primaryBlue hover:bg-blue-700 rounded-xl shadow transition-all"
              >
                <UserCog className="w-5 h-5" />
                <span className="font-semibold text-white">Login as Admin</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleAdminClick}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primaryBlue hover:bg-blue-700 rounded-xl shadow transition-all"
            >
              <UserCog className="w-5 h-5" />
              <span className="font-semibold text-white">Login as Admin</span>
            </button>
          )}

          <button
            onClick={handleViewerLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-accentOrange hover:bg-orange-600 rounded-xl shadow transition-all"
          >
            <Eye className="w-5 h-5" />
            <span className="font-semibold text-white">Login as Viewer</span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          <Lock className="inline w-4 h-4 mr-1" />
          Secure access required. Admin login requires password.
        </div>
      </div>
    </div>
  );
}
