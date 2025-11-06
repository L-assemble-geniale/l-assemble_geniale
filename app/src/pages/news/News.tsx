import { useEffect, useState } from "react";
import { getAllNews } from "../../services/NewsApi";
import "./News.css";

interface Residence {
  id: number;
  name: string;
}

interface News {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  residence: Residence;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) throw new Error("Token manquant");
        const data = await getAllNews(token);
        setNewsList(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inconnue est survenue");
        }
      } finally {
        setLoading(false);
      }

    };
    fetchNews();
  }, []);

  if (loading) return <p>Chargement des actualités...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="news-container">
      <h1>Fil d’actualité</h1>
      {newsList.length === 0 ? (
        <p>Aucune actualité pour le moment.</p>
      ) : (
        <ul className="news-list">
          {newsList.map((news) => (
            <li key={news.id} className="news-card">
              <h2>{news.title}</h2>
              <p>{news.text}</p>
              <div className="news-meta">
                <span>
                  Résidence : <strong>{news.residence?.name}</strong>
                </span>
                <span>
                  Publiée le {new Date(news.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
