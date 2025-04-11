import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthRepository } from "../repositories/AuthRepository";
import type { Account } from "../types/movie";

interface AuthContextProps {
  sessionId: string | null;
  account: Account | null;
  isAuthenticated: boolean;
  handleLogin: () => Promise<void>;
  handleLogout: () => void;
  handleAuthCallback: (requestToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const savedSessionId = localStorage.getItem("tmdb_session_id");
    if (savedSessionId) {
      setSessionId(savedSessionId);
      AuthRepository.getAccount(savedSessionId)
        .then(setAccount)
        .catch(console.error);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const { request_token } = await AuthRepository.createRequestToken();
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}`;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    setSessionId(null);
    setAccount(null);
    localStorage.removeItem("tmdb_session_id");
    window.location.reload();
  };

  const handleAuthCallback = async (requestToken: string) => {
    try {
      const { session_id } = await AuthRepository.createSession(requestToken);
      setSessionId(session_id);
      localStorage.setItem("tmdb_session_id", session_id);
      window.location.reload();

      const accountData = await AuthRepository.getAccount(session_id);
      setAccount(accountData);
    } catch (error) {
      console.error("Auth callback failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        sessionId,
        account,
        isAuthenticated: !!sessionId,
        handleLogin,
        handleLogout,
        handleAuthCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
