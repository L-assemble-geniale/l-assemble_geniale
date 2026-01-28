import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { getMyProfile, deleteMyAccount, updateMyProfile } from "../../services/ProfileApi";
import "./Profile.css";
import type { Member } from "../../entitées/MemberEntity";
import ProfileEditModal from "../../components/profile/ProfileEditModal";

export default function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null);
        if (!token) throw new Error("Token manquant");
        const data = await getMyProfile(token);
        setProfile(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleDeleteAccount = async () => {
    if (!token) return;
    const ok = window.confirm(
      "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible."
    );
    if (!ok) return;

    try {
      await deleteMyAccount(token);
      logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer votre compte.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <main className="profile-page">
        <h1>Mon profil</h1>
        <p>Chargement…</p>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="profile-page">
        <h1>Mon profil</h1>
        <p>Erreur : {error ?? "Profil introuvable"}</p>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="title">
        <button type="button" className="btn-primary" onClick={() => setShowEdit(true)}>
          Modifier mon profil
        </button>
        <h2>Mon profil</h2>
      </div>

      <section className="profile-card flex" aria-label="Informations du profil">

        <div className="profile-row flex column center">
          <div className="flex">
            <p className="strong decale">Nom : </p>
            <p>{profile.firstName}</p>
          </div>
          <div className="flex">
            <p className="strong decale">Prénom : </p>
            <p>{profile.lastName}</p>
          </div>
          {typeof profile.age === "number" && (
            <div className="flex decale">
              <p className="strong decale">Age : </p>
              <p>{profile.age}</p>
            </div>
          )}
          <div className="flex">
            <p className="strong decale">Rôle : </p>
            <p>{profile.isAdmin ? "Syndic" : "Résident"}</p>
          </div>
        </div>

        <div className="right-section flex column">
          <div className="profile-row flex">
            <p className="strong decale">Residence : </p>
            <p>{profile.email}</p>
          </div>
          {profile.phoneNumber && (
            <div className="profile-row flex">
              <p className="strong decale">Téléphone : </p>
              <p>{profile.phoneNumber}</p>
            </div>
          )}
          <div className="profile-row flex">
            <p className="strong decale">Email : </p>
            <p>{profile.residence?.name ?? `Résidence #${profile.residence?.id ?? "?"}`}</p>
          </div>
          {profile.appartmentNumber && (
            <div className="profile-row flex">
              <p className="strong decale">Appartement : </p>
              <p>{profile.appartmentNumber}</p>
            </div>
          )}
        </div>
      </section>

      <section className="profile-action flex space-between" aria-label="Actions du compte">
        <button type="button" className="btn-secondary" onClick={handleLogout}>
          Déconnexion
        </button>


        <button type="button" className="btn-danger" onClick={handleDeleteAccount}>
          Supprimer mon compte
        </button>
      </section>

      <ProfileEditModal
        open={showEdit}
        profile={profile}
        onClose={() => setShowEdit(false)}
        onSave={(updated) => setProfile(updated)}
        onSubmit={(data) => updateMyProfile(token!, data)}
      />
    </main>
  );
}
