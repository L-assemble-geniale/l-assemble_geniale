import React, { useState, useEffect } from "react";
import { createNews, updateNews } from "../../services/NewsApi";
import "./NewsModalForm.css";
import type { News } from "../../entitées/NewEntity";
import Modal from "../modal/Modal";

type NewsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (news: News) => void;
  newsToEdit?: News | null;
};

const NewsModalForm: React.FC<NewsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  newsToEdit,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (newsToEdit) {
      setFormData({
        title: newsToEdit.title,
        text: newsToEdit.text,
      });
    } else {
      setFormData({ title: "", text: "" });
    }
  }, [newsToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    let result: News;

    if (newsToEdit) {
      await updateNews(newsToEdit.id, formData);
      result = {
        ...newsToEdit,
        title: formData.title,
        text: formData.text,
      };
    } else {
      result = await createNews(formData);
    }
    onSave(result);
    onClose();
  } catch (err) {
    console.error("Erreur création/modification actu :", err);
    alert("Impossible d’enregistrer l’actualité");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="formContent">
        <h2>{newsToEdit ? "Modifier l’actualité" : "Créer une actualité"}</h2>

        <label>
          Titre :
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Contenu :
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
};

export default NewsModalForm;
