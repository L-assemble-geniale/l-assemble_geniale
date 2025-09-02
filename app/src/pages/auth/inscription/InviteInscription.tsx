import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAxiosError } from "axios";
import { registerByToken } from "../../../services/AuthApi";

type Form = {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  age: string;
  appartmentNumber: string;
};

type ApiError = { message?: string; error?: string };

export default function InviteInscription() {
  const { token = "" } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    appartmentNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bind = (k: keyof Form) => ({
    value: form[k],
    onChange: (e: ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value })),
  });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (!token) throw new Error("Lien d'invitation invalide.");
      await registerByToken({
        token,
        lastName: form.lastName,
        firstName: form.firstName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber || undefined,
        age: form.age ? Number(form.age) : undefined,
        appartmentNumber: form.appartmentNumber || undefined,
      });
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      let msg = "Inscription impossible.";
      if (isAxiosError<ApiError>(err)) {
        msg = err.response?.data?.message ?? err.response?.data?.error ?? msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      console.warn("registerByToken error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  const requiredOK =
    !!token &&
    form.lastName &&
    form.firstName &&
    form.email &&
    form.password;

  return (
    <div style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: 24 }}>
      <form onSubmit={onSubmit} style={{
        width: 460, maxWidth: "92vw",
        border: "1px solid #e5e7eb", borderRadius: 16, padding: 24,
        boxShadow: "0 6px 24px rgba(0,0,0,.06)", background: "white"
      }}>
        <h1 style={{ marginBottom: 12 }}>Compléter mon inscription</h1>
        <p style={{ fontSize: 14, opacity: .8, marginTop: -6 }}>
          Votre compte sera rattaché à la résidence et au rôle définis par le syndic.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
          <input {...bind("lastName")} placeholder="Nom *" required
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
          <input {...bind("firstName")} placeholder="Prénom *" required
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
        </div>

        <input {...bind("email")} type="email" placeholder="Email *" required
          style={{ width: "100%", marginTop: 8, padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />

        <input {...bind("password")} type="password" placeholder="Mot de passe *" required minLength={6}
          style={{ width: "100%", marginTop: 8, padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
          <input {...bind("phoneNumber")} placeholder="Téléphone (optionnel)"
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
          <input {...bind("age")} type="number" placeholder="Âge (optionnel)"
            style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
        </div>

        <input {...bind("appartmentNumber")} placeholder="N° d'appartement (optionnel)"
          style={{ width: "100%", marginTop: 8, padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />

        {error && <p style={{ color: "#b91c1c", marginTop: 12 }}>{error}</p>}

        <button type="submit" disabled={submitting || !requiredOK}
          style={{
            marginTop: 16, width: "100%", padding: "10px 12px",
            borderRadius: 10, border: "none", cursor: "pointer",
            background: submitting || !requiredOK ? "#9ca3af" : "#111827",
            color: "white", fontWeight: 600
          }}>
          {submitting ? "Création…" : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}
