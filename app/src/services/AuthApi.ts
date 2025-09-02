import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export function setToken(token: string | null) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  setToken(null);
  window.location.assign("/login");
}

api.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e?.response?.status === 401 && location.pathname !== "/login") {
      logout();
    }
    return Promise.reject(e);
  }
);

export type User = {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
};

export async function login(email: string, password: string) {
  const { data } = await api.post("/api/user/login", { email, password });

  const token =
    data?.accessToken ?? data?.token ?? data?.data?.token ?? null;
  const user: User | null =
    data?.user ?? data?.data?.user ?? null;

  if (!token || !user) {
    throw new Error("Réponse inattendue du /api/user/login");
  }
  return { token: String(token), user };
}

export type Address = {
  streetNumber: string;
  streetName: string;
  city: string;
  postalCode: string;
};

export type SyndicRegisterPayload = {
  residenceName: string;
  addresses: Address[];
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  age?: number;
  appartmentNumber?: string;
};

export async function registerSyndic(payload: SyndicRegisterPayload) {
  const { data } = await api.post("/api/user/syndicRegister", payload);
  return data;
}

export type RegisterByTokenPayload = {
  token: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  age?: number;
  appartmentNumber?: string;
};

export async function registerByToken(payload: RegisterByTokenPayload) {
  const { data } = await api.post("/api/user/auth/register-by-token", payload);
  return data;
}

export async function createInvitation(email: string, isAdmin: boolean) {
  const { data } = await api.post("/api/user/invite", { email, isAdmin });
  return data;
}
