import axios from "axios";
import type { Member } from "../entitées/MemberEntity";

const API_URL = import.meta.env.VITE_API_URL + "/api/members";

export async function getResidenceMembers(token: string): Promise<Member[]> {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}
