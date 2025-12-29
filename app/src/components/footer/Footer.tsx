import { Link } from "react-router-dom";
import "./Footer.css";
import { useAuth } from "../../contexts/useAuth";

function Footer() {
  const { isAdmin, isAuthenticated } = useAuth();

  return (
    <>
      <footer className="flex">
        <div className="footer-presentation flex column">
          <h2>L'assemblée géniale</h2>
          <p>Parce que la vie en copropriété ne veut pas dire vivre isolé</p>
          <Link to="/contact" className="footer-link">Nous contacter</Link>
        </div>

        {isAuthenticated && (
          <section className="footer-nav-section flex center">
            <div className="footer-nav">
              <h3>Se tenir informé</h3>
              <nav className="flex column">
                <Link to="/news" className="footer-link">Actualités</Link>
                <Link to="/events" className="footer-link">Evènements</Link>
                <Link to="/polls" className="footer-link">Sondages</Link>
              </nav>
            </div>
            <div className="footer-nav">
              <h3>Converser</h3>
              <nav className="flex column">
                <Link to="/forum" className="footer-link">Forum</Link>
                <Link to="/recommendations-category" className="footer-link">Recommandations</Link>
                <Link to="/chats" className="footer-link">Chats privés</Link>
              </nav>
            </div>
            <div className="footer-nav">
              <h3>Mes infos</h3>
              <nav className="flex column">
                <Link to="/profile" className="footer-link">Mon profil</Link>
                {isAdmin && <Link to="/manage-users" className="footer-link">Gestion de profil</Link>}
              </nav>
            </div>

          </section>
        )}
      </footer>
      <p className="credits">L’assemblé géniale 2026</p>
    </>
  );
}

export default Footer;
