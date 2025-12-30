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
    <main className="inscription-container">
      <h2 className="txt-center">Compléter mon inscription</h2>
      <form onSubmit={onSubmit} className="flex column">

        <section>
          <label className="field">Nom
            <input
              {...bind("lastName")}
              required
            />
          </label>
          <label className="field">Prénom
            <input
              {...bind("firstName")}
              required
            />
          </label>
          <label className="field">Email
            <input
              {...bind("email")}
              type="email"
              required
            /></label>
          <label className="field">Mot de passe
            <input
              {...bind("password")}
              type="password"
              required
              minLength={6}
            />
          </label>
          <label className="field">Numéro de téléphone <span className="orange">(optionnel)</span>
            <input
              {...bind("phoneNumber")}
            />
          </label>
          <label className="field">Âge <span className="orange">(optionnel)</span>
            <input
              {...bind("age")}
              type="number"
            />
          </label>
          <label className="field">N° d'appartement <span className="orange">(optionnel)</span>
            <input
              {...bind("appartmentNumber")}
            />
          </label>
        </section>

        {error && <p className="error">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !requiredOK}
        >
          {submitting ? "Création…" : "Créer mon compte"}
        </button>
      </form>
    </main>
  );
}
