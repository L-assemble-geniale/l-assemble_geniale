import axios from "axios";
import type { Member } from "../entitées/MemberEntity";

const API_URL = import.meta.env.VITE_API_URL + "/api/members/me";

export async function getMyProfile(token: string): Promise<Member> {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
}

export async function updateMyProfile(
  token: string,
  data: Partial<Member>
): Promise<void> {
  await axios.patch(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteMyAccount(token: string): Promise<void> {
  await axios.delete(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
