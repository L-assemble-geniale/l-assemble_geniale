import "./InviteModal.css";
import "../modal/Modal.css";
import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { createInvitation } from "../../services/AuthApi";
import { isAxiosError } from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
};

type ApiError = { message?: string; error?: string };
type InviteResult = { id?: string; token?: string; expireAt?: string };

export default function InviteModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"resident" | "syndic">("resident");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InviteResult | null>(null);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isAdmin = role === "syndic";
  const inviteUrl = result?.token ? `${window.location.origin}/register/${result.token}` : "";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);
    try {
      const data = await createInvitation(email.trim(), isAdmin);
      const token = data?.token ?? data?.data?.token;
      const expireAt = data?.expireAt ?? data?.data?.expireAt;
      const id = data?.id ?? data?.data?.id;
      if (!token) throw new Error("Réponse invitation inattendue (pas de token).");
      setResult({ token, expireAt, id });
      setEmail("");
      setRole("resident");
    } catch (err: unknown) {
      let msg = "Échec de la création d'invitation.";
      if (isAxiosError<ApiError>(err)) {
        msg = err.response?.data?.message ?? err.response?.data?.error ?? msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      console.warn("createInvitation error:", err);
    } finally {
      setSubmitting(false);
    }
  }

  async function copy() {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      alert("Lien copié ✅");
    } catch {
      prompt("Copiez le lien :", inviteUrl);
    }
  }

  function sendEmail() {
    if (!inviteUrl) return;
    const subject = encodeURIComponent("Invitation à rejoindre la résidence");
    const roleTxt = isAdmin ? "syndic" : "résident";
    const body = encodeURIComponent(
      `Bonjour,\n\nVoici votre lien d'inscription en tant que ${roleTxt} :\n${inviteUrl}\n\nÀ bientôt !`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content column"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 className="txt-center">Créer un nouveau compte</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        <form className="form flex column" onSubmit={onSubmit}>

          <label className="field">
            Titre :
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </label>

          <label className="field">
            Rôle de l’invité :
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "resident" | "syndic")
              }
            >
              <option value="resident">Résident</option>
              <option value="syndic">Syndic</option>
            </select>
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={submitting}>
            {submitting
              ? "Envoi…"
              : "Envoyer le formulaire de création de compte"}
          </button>
        </form>

        {result?.token && (
          <div className="resultBox">
            <div className="resultLabel">Lien d'inscription généré </div>

            {result.expireAt && (
              <div className="expireDate">
                Expire le :{" "}
                {new Date(result.expireAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
