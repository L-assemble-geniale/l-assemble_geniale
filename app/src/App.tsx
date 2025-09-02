import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import NotFound from './pages/404/notFound';
import News from './pages/news/News';
import Polls from './pages/polls/Polls';
import Events from './pages/events/Events';
import Profile from './pages/profile/Profile';
import ManageUsers from './pages/syndicManaging/ManageUsers';
import Connexion from './pages/auth/connexion/Connexion';
import Recommandations from './pages/recommandations/Recommandation';
import Category from './pages/recommandations/Category';
import SyndicInscription from './pages/auth/inscription/SyndicInscription';
import InviteInscription from './pages/auth/inscription/InviteInscription';
import { useEffect } from 'react';
import { setToken } from './services/AuthApi';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  useEffect(() => {
    setToken(localStorage.getItem("auth_token"));
  }, []);

  return (
    <Router>
      <Routes>
        {/* publiques */}
        <Route path="/login" element={<Connexion />} />
        <Route path="/register/syndic" element={<SyndicInscription />} />
        <Route path="/register/:token" element={<InviteInscription />} />

        {/* protégées */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<News />} />
          <Route path="/news" element={<News />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/events" element={<Events />} />
          <Route path="/recommendations" element={<Category />} />
          <Route path="/recommendations" element={<Recommandations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/manage-users" element={<ManageUsers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}