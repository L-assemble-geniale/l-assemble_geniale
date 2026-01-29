import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { getAllCategories } from "../../services/CategoryApi";
import type { Category } from "../../entitées/CategoryEntity";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const { token } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        if (!token) throw new Error("Token manquant");
        const data = await getAllCategories(token);
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  if (loading) return <p>Chargement des catégories…</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="category-page">
      <h2>Catégories</h2>

      {categories.length === 0 ? (
        <p>Aucune catégorie.</p>
      ) : (
        <ul className="category-list">
          {categories.map((c) => (
            <li key={c.id} className="category-item">
              <Link to={`/recommandations/category/${c.id}`}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
