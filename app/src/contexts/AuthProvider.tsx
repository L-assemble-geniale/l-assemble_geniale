import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth.context";
import type { AuthUser, AuthContextValue } from "./auth.types";

function readAuthFromStorage() {
  const token = localStorage.getItem("auth_token");
  const rawUser = localStorage.getItem("auth_user");
  let user: AuthUser | null = null;

  try {
    user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  } catch {
    user = null;
  }

  return { token, user };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ token, user }, setAuth] = useState(() => readAuthFromStorage());

  const refreshFromStorage = () => setAuth(readAuthFromStorage());

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setAuth({ token: null, user: null });
  };

  useEffect(() => {
    const handler = () => refreshFromStorage();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const isAuthenticated = !!token && !!user;
    const isAdmin = !!user?.isAdmin;
    const residenceId = user?.residence?.id ?? null;

    return {
      token,
      user,
      isAuthenticated,
      isAdmin,
      residenceId,
      refreshFromStorage,
      logout,
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
