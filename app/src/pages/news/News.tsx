import { useEffect, useState } from "react";
import { getAllNews } from "../../services/NewsApi";
import "./News.css";
import type { News } from "../../entitées/NewEntity";
import NewsModalForm from "../../components/newsModal/NewsModalForm";


export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsToEdit, setNewsToEdit] = useState<News | null>(null);

  const openCreateModal = () => {
    setNewsToEdit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = (savedNews: News) => {
    setNewsList((prev) => {
      const exists = prev.some((n) => n.id === savedNews.id);

      if (exists) {
        return prev.map((n) => (n.id === savedNews.id ? savedNews : n));
      } else {
        return [savedNews, ...prev];
      }
    });
  };

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

      <button onClick={openCreateModal}>+</button>
      {newsList.length === 0 ? (
        <p>Aucune actualité pour le moment.</p>
      ) : (
        <ul className="news-list">
          {newsList.map((n) => (
            <li key={n.id} className="news-card">
              <div>
                <h2>{n.title}</h2>
                <button
                  className="btn-edit-news"
                  onClick={() => {
                    setNewsToEdit(n);
                    setIsModalOpen(true);
                  }}
                >
                  Modifier
                </button>
              </div>
              <p>{n.text}</p>
              <div className="news-meta">
                <span>
                  Publiée le {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <NewsModalForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        newsToEdit={newsToEdit}
      />
    </div>
  );
}
