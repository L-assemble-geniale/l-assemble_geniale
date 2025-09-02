import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { registerSyndic } from "../../../services/AuthApi";

type Form = {
  residenceName: string;
  streetNumber: string;
  streetName: string;
  city: string;
  postalCode: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phoneNumber: string;
  age: string;
  appartmentNumber: string;
};

type ApiError = { message?: string; error?: string };

export default function SyndicInscription() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    residenceName: "",
    streetNumber: "",
    streetName: "",
    city: "",
    postalCode: "",
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
      await registerSyndic({
        residenceName: form.residenceName,
        addresses: [
          {
            streetNumber: form.streetNumber,
            streetName: form.streetName,
            city: form.city,
            postalCode: form.postalCode,
          },
        ],
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
      let msg = "Échec de l'inscription.";
      if (isAxiosError<ApiError>(err)) {
        msg = err.response?.data?.message ?? err.response?.data?.error ?? msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      console.warn("registerSyndic error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  const requiredOK =
    form.residenceName &&
    form.streetNumber &&
    form.streetName &&
    form.city &&
    form.postalCode &&
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
        <h1 style={{ marginBottom: 12 }}>Créer ma copro (Syndic)</h1>

        <h3 style={{ marginTop: 10, marginBottom: 8 }}>Résidence</h3>
        <input {...bind("residenceName")} placeholder="Nom de la résidence *"
          required style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db", marginBottom: 8 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
          <input {...bind("streetNumber")} placeholder="N° *"
            required style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
          <input {...bind("streetName")} placeholder="Rue *"
            required style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8, marginTop: 8 }}>
          <input {...bind("city")} placeholder="Ville *"
            required style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
          <input {...bind("postalCode")} placeholder="Code postal *" inputMode="numeric"
            required style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
        </div>

        <h3 style={{ marginTop: 16, marginBottom: 8 }}>Vos informations (syndic)</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <input {...bind("lastName")} placeholder="Nom *"
            required style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
          <input {...bind("firstName")} placeholder="Prénom *"
            required style={{ padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
        </div>
        <input {...bind("email")} type="email" placeholder="Email *"
          required style={{ width: "100%", marginTop: 8, padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
        <input {...bind("password")} type="password" placeholder="Mot de passe *" minLength={6}
          required style={{ width: "100%", marginTop: 8, padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }} />
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
