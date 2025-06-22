import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
    }
    setLoading(false);
  }, []);

  const login = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
