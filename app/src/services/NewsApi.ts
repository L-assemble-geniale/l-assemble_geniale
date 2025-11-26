import axios from "axios";
import type { News } from "../entitées/NewEntity";


const API_URL = import.meta.env.VITE_API_URL + "/api/news";

// Récupérer les actus de la copro
export const getAllNews = async (token: string) => {
  try {
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    console.error("Erreur lors du chargement des actualités :", err);
    throw err;
  }
};

// Créer une actu
export const createNews = async (data: { title: string; text: string }): Promise<News> => {
  const token = localStorage.getItem("auth_token");
  const rawUser = localStorage.getItem("auth_user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const residenceId = user?.residence?.id;

  if (!token) throw new Error("Token manquant");
  if (!residenceId) throw new Error("Résidence introuvable");

  const payload = {
    ...data,
    residence: residenceId,
  };

  console.log("▶️ Payload envoyé à /api/news :", payload);

  const res = await axios.post(API_URL, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

// Modifier une actu
export const updateNews = async (id: number, data: Partial<News>) => {
  const token = localStorage.getItem("auth_token");
  if (!token) throw new Error("Token manquant");

  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
