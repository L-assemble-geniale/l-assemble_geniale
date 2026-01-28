import { useEffect, useState } from "react";
import "./ProfileEditModal.css";
import type { Member } from "../../entitées/MemberEntity";
import Modal from "../modal/Modal";

type Props = {
  open: boolean;
  profile: Member;
  onClose: () => void;
  onSave: (updated: Member) => void;
  onSubmit: (data: Partial<Member>) => Promise<void>;
};

export default function ProfileEditModal({ open, profile, onClose, onSave, onSubmit }: Props) {
  const [firstName, setFirstName] = useState(profile.firstName ?? "");
  const [lastName, setLastName] = useState(profile.lastName ?? "");
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber ?? "");
  const [appartmentNumber, setAppartmentNumber] = useState(profile.appartmentNumber ?? "");
  const [age, setAge] = useState(profile.age ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFirstName(profile.firstName ?? "");
    setLastName(profile.lastName ?? "");
    setPhoneNumber(profile.phoneNumber ?? "");
    setAppartmentNumber(profile.appartmentNumber ?? "");
    setAge(profile.age ?? "");
    setError(null);
  }, [profile, open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: Partial<Member> = {
        firstName,
        lastName,
        phoneNumber: phoneNumber || undefined,
        appartmentNumber: appartmentNumber || undefined,
        age: age === "" ? undefined : Number(age),
      };

      await onSubmit(payload);

      onSave({ ...profile, ...payload });
      onClose();
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

 return (
  <Modal
    isOpen={open}
    onClose={onClose}
  >
    <form onSubmit={handleSubmit} className="formContent">
       <h2>Modifier son profil</h2>
      <label className="field">
        Prénom
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>

      <label className="field">
        Nom
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>

      <label className="field">
        Téléphone
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </label>

      <label className="field">
        Appartement
        <input
          value={appartmentNumber}
          onChange={(e) => setAppartmentNumber(e.target.value)}
        />
      </label>

      <label className="field">
        Âge
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </label>

      {error && <p className="modal-error">Erreur : {error}</p>}

      <button type="submit" disabled={saving} className="modal-submit">
        {saving ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  </Modal>
);

}
