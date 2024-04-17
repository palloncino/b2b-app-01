// context/AuthContext.js
import React, { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth"; // Corrected import to match the hook's name

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const {
    user,
    token,
    login,
    loginIsLoading,
    loginError,
    signup,
    signupIsLoading,
    signupError,
  } = useAuth();

  const state = {
    user,
    token,
    login,
    loginIsLoading,
    loginError,
    signup,
    signupIsLoading,
    signupError,
  };

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};
