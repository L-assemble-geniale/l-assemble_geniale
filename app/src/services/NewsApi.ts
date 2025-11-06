import axios from "axios";

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