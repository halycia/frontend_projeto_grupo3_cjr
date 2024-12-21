"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Recupera o token e userId do localStorage ao inicializar
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    }
  }, []);

  function login(userToken: string, userId: string) {
    setToken(userToken);
    setUserId(userId);
    setIsAuthenticated(true);

    localStorage.setItem("token", userToken);
    localStorage.setItem("userId", userId);
  }

  function logout() {
    setToken(null);
    setUserId(null);
    setIsAuthenticated(false);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, token, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
