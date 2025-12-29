import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../contexts/useAuth";
import { useEffect, useState } from "react";

function Header() {
  const { isAdmin, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) setMenuOpen(false);
  }, [isAuthenticated]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-top">
        {isAuthenticated && (
          <button
            type="button"
            className={`menu-btn ${menuOpen ? "open" : ""}`}
            aria-expanded={menuOpen}
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        )}

        <h1 className="site-title">
          <Link to="/" className="title-link" onClick={closeMenu}>
            L'assemblée géniale
          </Link>
        </h1>
      </div>

      {isAuthenticated && (
        <>
          <nav className="nav-desktop" aria-label="Navigation principale">
            <Link to="/forum" className="nav-link">Forum</Link>
            <Link to="/chats" className="nav-link">Chats privés</Link>
            <Link to="/events" className="nav-link">Evènements</Link>
            <Link to="/news" className="nav-link">Actualités</Link>
            <Link to="/recommendations-category" className="nav-link">Recommandations</Link>
            <Link to="/polls" className="nav-link">Sondages</Link>
            <Link to="/profile" className="nav-link">Mon profil</Link>
            {isAdmin && <Link to="/manage-users" className="nav-link">Gestion de profil</Link>}
          </nav>

          <nav
            id="mobile-nav"
            className={`nav-mobile ${menuOpen ? "open" : ""}`}
            aria-label="Navigation mobile"
          >
            <Link to="/forum" className="nav-link" onClick={closeMenu}>Forum</Link>
            <Link to="/chats" className="nav-link" onClick={closeMenu}>Chats privés</Link>
            <Link to="/events" className="nav-link" onClick={closeMenu}>Evènements</Link>
            <Link to="/news" className="nav-link" onClick={closeMenu}>Actualités</Link>
            <Link to="/recommendations-category" className="nav-link" onClick={closeMenu}>Recommandations</Link>
            <Link to="/polls" className="nav-link" onClick={closeMenu}>Sondages</Link>
            <Link to="/profile" className="nav-link" onClick={closeMenu}>Mon profil</Link>
            {isAdmin && (
              <Link to="/manage-users" className="nav-link" onClick={closeMenu}>
                Gestion de profil
              </Link>
            )}
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;
