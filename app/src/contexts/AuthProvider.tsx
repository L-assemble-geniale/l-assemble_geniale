import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth.context";
import type { AuthUser, AuthContextValue } from "./auth.types";
import { setToken } from "../services/AuthApi";

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

    useEffect(() => {
    setToken(token);
  }, [token]);

  const refreshFromStorage = () => setAuth(readAuthFromStorage());

  const login = (token: string, user: AuthUser) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
  setAuth({ token, user });
};

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
      login,
      logout,
    };
  }, [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
