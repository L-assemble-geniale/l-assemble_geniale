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
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.45)",
        display: "grid", placeItems: "center", zIndex: 50
      }}
    >
      <div
        role="dialog" aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 600, maxWidth: "92vw", background: "white",
          borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,.18)",
          padding: 24
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Créer un nouveau compte</h2>
          <button onClick={onClose} aria-label="Fermer"
            style={{ marginLeft: "auto", border: "none", background: "transparent", fontSize: 22, cursor: "pointer" }}>
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontSize: 14, display: "block", marginBottom: 6 }}>Adresse mail :</label>
            <input type="email" value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required placeholder="prenom.nom@mail.com"
              style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }}
            />
          </div>

          <div>
            <label style={{ fontSize: 14, display: "block", marginBottom: 6 }}>Rôle de l’invité :</label>
            <select value={role} onChange={e => setRole(e.target.value as "resident" | "syndic")}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db" }}>
              <option value="resident">Résident</option>
              <option value="syndic">Syndic (admin)</option>
            </select>
          </div>

          {error && <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p>}

          <button type="submit" disabled={submitting}
            style={{
              padding: "10px 12px", borderRadius: 10, border: "none",
              background: submitting ? "#9ca3af" : "#f59e0b", color: "white",
              fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 0 #c2410c"
            }}>
            {submitting ? "Envoi…" : "Envoyer le formulaire de création de compte"}
          </button>
        </form>

        {result?.token && (
          <div style={{ marginTop: 14, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 14, marginBottom: 6 }}>Lien d’inscription généré :</div>
            <div style={{ wordBreak: "break-all", fontFamily: "monospace", fontSize: 13 }}>
              {inviteUrl}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={copy}
                style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", cursor: "pointer" }}>
                Copier le lien
              </button>
              <button onClick={sendEmail}
                style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #e5e7eb", cursor: "pointer" }}>
                Ouvrir dans l’e-mail
              </button>
            </div>
            {result.expireAt && (
              <div style={{ fontSize: 12, opacity: .8, marginTop: 6 }}>
                Expire le : {new Date(result.expireAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
