"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signIn: (method: "google" | "phone" | "email") => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useCallback(async (_method: "google" | "phone" | "email"): Promise<void> => {
    setIsLoading(true);
    // Stub: simulate sign-in delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      id: "stub-user-1",
      name: "Demo User",
      email: "demo@misswellnessworld.com",
    });
    setIsLoading(false);
  }, []);

  const signOut = useCallback((): void => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
