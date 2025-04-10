/**
 * Custom hook for handling authentication state and operations
 * Manages user session, account details, and authentication flow
 */
import { useState, useEffect } from 'react';
import { AuthRepository } from '../repositories/AuthRepository';
import type { Account } from '../types/movie';

export function useAuth() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const savedSessionId = localStorage.getItem('tmdb_session_id');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      AuthRepository.getAccount(savedSessionId)
        .then(setAccount)
        .catch(console.error);
    }
  }, []);

  /**
   * Initiates the login flow by creating a request token and redirecting to TMDB
   */
  const handleLogin = async () => {
    try {
      const { request_token } = await AuthRepository.createRequestToken();
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}`;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  /**
   * Handles user logout by clearing session data
   */
  const handleLogout = () => {
    setSessionId(null);
    setAccount(null);
    localStorage.removeItem('tmdb_session_id');
  };

  /**
   * Processes the authentication callback after TMDB redirect
   */
  const handleAuthCallback = async (requestToken: string) => {
    try {
      const { session_id } = await AuthRepository.createSession(requestToken);
      setSessionId(session_id);
      localStorage.setItem('tmdb_session_id', session_id);
      const accountData = await AuthRepository.getAccount(session_id);
      setAccount(accountData);
    } catch (error) {
      console.error('Auth callback failed:', error);
    }
  };

  return {
    sessionId,
    account,
    isAuthenticated: !!sessionId,
    handleLogin,
    handleLogout,
    handleAuthCallback,
  };
}