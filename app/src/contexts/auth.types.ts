export type AuthUser = {
  id: number;
  email: string;
  isAdmin: boolean;
  residence?: { id: number; name?: string };
};

export type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  residenceId: number | null;
  refreshFromStorage: () => void;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};
