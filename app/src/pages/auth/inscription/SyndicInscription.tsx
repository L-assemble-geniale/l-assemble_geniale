import { useState } from "react";
import "./auth.css"
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
    <main className="inscription-container flex column al-center">
      <h2 className="txt-center">Créer ma copro et mon compte syndic</h2>
      <form className="first-form flex column" onSubmit={onSubmit}>

        <div className="field-container flex">
          <section className="admin-form">
            {/* admin */}
            <h3>
              Vos informations (syndic)
            </h3>

            <label className="field">Nom
              <input {...bind("lastName")} />
            </label>

            <label className="field">Prénom
              <input {...bind("firstName")} />
            </label>

            <label className="field">Email
              <input
                {...bind("email")}
                type="email"
                required
              />
            </label>
            <label className="field">Mot de passe
              <input
                {...bind("password")}
                type="password"
                minLength={6}
                required
              />
            </label>
            <label className="field">Numéro de téléphone <span className="orange">(optionnel)</span>
              <input
                {...bind("phoneNumber")}
              />
            </label>
            <label className="field">Age <span className="orange">(optionnel)</span>
              <input
                {...bind("age")}
                type="number"
              />
            </label>
            <label className="field">Numéro d'appartement <span className="orange">(optionnel)</span>
              <input
                {...bind("appartmentNumber")}
              />
            </label>
          </section>

          <section className="residence-form">
            {/* Residence */}
            <h3>Résidence</h3>

            <label className="field">Nom de la residence
              <input
                {...bind("residenceName")}
                required
              />
            </label>

            <label className="field">Numero de rue
              <input
                {...bind("streetNumber")}
                required
              />
            </label>

            <label className="field">Nom de rue
              <input
                {...bind("streetName")}
                required
              />
            </label>

            <label className="field">Ville
              <input {...bind("city")}
                required
              />
            </label>

            <label className="field">Code postal
              <input
                {...bind("postalCode")}
                inputMode="numeric"
                required
              />
            </label>
          </section>
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="form-button"
          type="submit"
          disabled={submitting || !requiredOK}>
          {submitting ? "Création…" : "Créer mon compte"}
        </button>

      </form>
    </main>
  );
}
