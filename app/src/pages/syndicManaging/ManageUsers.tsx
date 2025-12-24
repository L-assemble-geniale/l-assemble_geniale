import { useState } from "react";
import InviteModal from "../../components/admin/InviteModal";

export default function ManageUsers() {
  const [open, setOpen] = useState(false);

  return (
    <main style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Gestion de résidents</h1>
        <button
          onClick={() => setOpen(true)}
          style={{
            marginLeft: 16,
            padding: "10px 14px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: "#f59e0b",
            color: "white",
            fontWeight: 700,
            boxShadow: "0 2px 0 #c2410c",
          }}
        >
          Créer un nouveau compte
        </button>
      </div>

      <InviteModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
