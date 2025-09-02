import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export function setToken(token: string | null) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

api.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e?.response?.status === 401 && location.pathname !== "/login") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      setToken(null);
      window.location.replace("/login");
    }
    return Promise.reject(e);
  }
);

export async function login(email: string, password: string) {
  const { data } = await api.post("/api/user/login", { email, password });

  const token = data?.accessToken ?? data?.token ?? data?.data?.token ?? null;
  const user  = data?.user        ?? data?.data?.user        ?? null;

  if (!token || !user) {
    throw new Error("Réponse inattendue du /api/user/login");
  }
  return { token: String(token), user };
}
