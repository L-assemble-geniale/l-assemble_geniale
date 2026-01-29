import axios from "axios";
import type { Category } from "../entitées/CategoryEntity";

const API_URL = import.meta.env.VITE_API_URL + "/api/categories";

export async function getAllCategories(token: string): Promise<Category[]> {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data.data)
  return res.data.data;
}
