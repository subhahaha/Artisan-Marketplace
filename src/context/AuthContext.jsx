import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "kaarigar-seller-auth";

// Mock credentials — there's no real backend, this just gates the dashboard
// for demo purposes.
const DEMO_EMAIL = "seller@kaarigar.com";
const DEMO_PASSWORD = "password123";

export function AuthProvider({ children }) {
  const [seller, setSeller] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (seller) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seller));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [seller]);

  const login = (email, password) => {
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setSeller({ email, name: "Bhaktapur Clay Works" });
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => setSeller(null);

  return (
    <AuthContext.Provider value={{ seller, login, logout, isAuthenticated: !!seller }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}