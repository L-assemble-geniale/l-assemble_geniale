import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../../services/AuthApi";
import { isAxiosError } from "axios";
import { useAuth } from "../../../contexts/useAuth";

type NavState = { from?: { pathname?: string } };

type ApiResidence = { id: number | string; name?: string };

type ApiLoginUser = {
  id: number | string;
  email: string;
  isAdmin?: boolean;
  is_admin?: boolean;
  residence?: ApiResidence | null;
};

export default function Connexion() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as NavState | null)?.from?.pathname ?? "/";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { token, user } = await apiLogin(email.trim(), password);

      const u = user as ApiLoginUser;

      const authUser = {
        id: Number(u.id),
        email: u.email,
        isAdmin: Boolean(u.isAdmin ?? u.is_admin ?? false),
        residence: u.residence
          ? { id: Number(u.residence.id), name: u.residence.name }
          : undefined,
      };

      login(token, authUser);
      navigate(from, { replace: true });

    } catch (err: unknown) {
      let msg = "Échec de connexion.";
      if (isAxiosError(err)) {
        msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          `${err.response?.status ?? ""} ${err.response?.statusText ?? ""}`.trim() ||
          msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      console.warn("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: 24 }}>
      <form onSubmit={onSubmit} style={{
        width: 360, maxWidth: "92vw",
        border: "1px solid #e5e7eb", borderRadius: 16, padding: 24,
        boxShadow: "0 6px 24px rgba(0,0,0,.06)", background: "white"
      }}>
        <h1 style={{ marginBottom: 16, fontSize: 22 }}>Connexion</h1>

        <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>Email</label>
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          required autoComplete="email" placeholder="prenom.nom@mail.com"
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db", marginBottom: 12 }}
        />

        <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>Mot de passe</label>
        <input
          type="password" value={password} onChange={e => setPassword(e.target.value)}
          required autoComplete="current-password" minLength={6}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }}
        />

        {error && <p style={{ color: "#b91c1c", marginTop: 12, marginBottom: 0 }}>{error}</p>}

        <button
          type="submit" disabled={submitting}
          style={{
            marginTop: 16, width: "100%", padding: "10px 12px",
            borderRadius: 10, border: "none", cursor: "pointer",
            background: submitting ? "#9ca3af" : "#111827", color: "white",
            fontWeight: 600
          }}
        >
          {submitting ? "Connexion…" : "Se connecter"}
        </button>

        <div style={{ marginTop: 12, fontSize: 14, opacity: .8 }}>
          <a href="/register/syndic" style={{ textDecoration: "underline" }}>Créer un compte syndic</a>
        </div>
      </form>
    </div>
  );
}
