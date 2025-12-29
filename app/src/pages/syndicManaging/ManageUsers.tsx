import "./ManageUser.css";
import { useState } from "react";
import InviteModal from "../../components/admin/InviteModal";


export default function ManageUsers() {
  const [open, setOpen] = useState(false);

  return (
    <main>
        <button
          onClick={() => setOpen(true)}>
          Créer un nouveau compte
        </button>

      <InviteModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
