import "./ManageUser.css";
import { useEffect, useState } from "react";
import InviteModal from "../../components/admin/InviteModal";
import { useAuth } from "../../contexts/useAuth";
import { getResidenceMembers } from "../../services/MemberApi";
import type { Member } from "../../entitées/MemberEntity";

export default function ManageUsers() {
  const [open, setOpen] = useState(false);

  const { token, isAdmin } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setError(null);
        if (!token) throw new Error("Token manquant");
        const data = await getResidenceMembers(token);
        setMembers(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) fetchMembers();
    else setLoading(false);
  }, [token, isAdmin]);

  return (
    <main>
      <button onClick={() => setOpen(true)}>
        Créer un nouveau compte
      </button>

      <InviteModal open={open} onClose={() => setOpen(false)} />

      <h2>Membres de votre résidence</h2>

      {!isAdmin && <p>Accès réservé aux syndics.</p>}

      {isAdmin && loading && <p>Chargement…</p>}
      {isAdmin && error && <p>Erreur : {error}</p>}

      {isAdmin && !loading && !error && (
        members.length === 0 ? (
          <p>Aucun membre pour le moment.</p>
        ) : (
          <ul className="members-list flex">
            {members.map((m) => (
              <li key={m.id} className="member-card">
                <div className="member-main flex">                  
                  <strong>{m.firstName} {m.lastName}</strong>   
                  {m.isAdmin && <span className="badge-admin">Syndic</span>}               
                </div>                
              </li>
            ))}
          </ul>
        )
      )}
    </main>
  );
}
