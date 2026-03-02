import React, { createContext, useContext } from "react";
import { authClient } from "../libs/auth/auth";

type AuthSession = ReturnType<typeof authClient.useSession>;

const AuthContext = createContext<AuthSession | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const session = authClient.useSession();

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = (): AuthSession => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthProvider must be used within an AuthProvider");
  }
  return context;
};
