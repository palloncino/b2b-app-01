import React, { createContext, useContext, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const auth = useAuth();

  const providerValue = useMemo(() => ({
    ...auth
  }), [auth]);

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
