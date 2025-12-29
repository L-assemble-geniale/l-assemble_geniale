import "./Connexion.css"
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
    <main className="connexion">
      <form className="login-form" onSubmit={onSubmit}>
        <h2>Connexion</h2>

        <label className="field">Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>


        <label className="field">Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            minLength={6}
          />
        </label>


        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Connexion…" : "Se connecter"}
        </button>

        <br />
        <a href="/register/syndic" className="register-link">Créer un compte et sa residence</a>
      </form>
    </main>
  );
}
