// Contenu modifié pour : src/App.tsx

import React, { useEffect } from 'react'; // On importe useEffect
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminPage from './components/AdminPage';
import LegalNoticePage from './pages/LegalNoticePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CgvPage from './pages/CgvPage';
import CookieConsent from './components/CookieConsent';
import AnalyticsTracker from './components/AnalyticsTracker';
import Chatbot from './components/Chatbot';
import ElsyAssistantPage from './pages/ElsyAssistantPage';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ce hook gère le défilement vers une ancre (ex: #newsletter)
  // à chaque fois que l'URL change.
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // On attend un court instant pour s'assurer que la page a eu le temps de se dessiner
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]); // Se redéclenche à chaque changement de l'URL

  // La fonction de navigation a été simplifiée. Elle n'a plus besoin
  // de gérer le défilement, le hook useEffect s'en occupe.
  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      // On navigue vers la page d'accueil tout en ajoutant l'ancre à l'URL
      navigate(`/${path}`);
    } else {
      navigate(path);
      // On s'assure de remonter en haut de la page pour les nouvelles pages
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen font-sans relative">
      <AnalyticsTracker />
      
      {location.pathname === '/' && (
        <>
          <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-[-1]">
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[-1]"></div>
        </>
      )}

      <Header onNavigate={handleNavigation} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<PostDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/assistant-ia" element={<ElsyAssistantPage />} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicyPage />} />
          <Route path="/cgv" element={<CgvPage />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigation} />
      <CookieConsent />
      
      {/* On affiche le chatbot flottant PARTOUT SAUF sur la page de l'assistant */}
      {location.pathname !== '/assistant-ia' && <Chatbot />}
    </div>
  );
};

export default App;
