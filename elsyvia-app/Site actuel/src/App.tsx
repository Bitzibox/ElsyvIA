// src/App.tsx

import React, { useEffect, useState } from 'react';
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
import AssistantIAPage from './pages/AssistantIAPage';
import ProspectDemoPage from './components/ProspectDemoPage';
import PmeSalesDashboard from './components/DashboardSimulation';

// Imports pour la section de démonstration
import DemoHomePage from './pages/demo-myfyt13/index';
import DemoClientAnalysis from './pages/demo-myfyt13/1-analyse-clients';
import DemoSalesPrediction from './pages/demo-myfyt13/2-prediction-ventes';
import DemoMarketing from './pages/demo-myfyt13/3-marketing-automation';
import DemoSeasonal from './pages/demo-myfyt13/4-besoins-saisonniers';
import DemoSatisfaction from './pages/demo-myfyt13/5-satisfaction-client';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState<string | null>(null);

  // Détecte si l'URL actuelle est dans la section de la démo
  const isDemoSection = location.pathname.startsWith('/demo-myfyt13');

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  const handleNavigation = (path: string) => {
    if (path.startsWith('#') && location.pathname === '/') {
      const id = path.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (path.startsWith('#')) {
      navigate(`/${path}`);
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const handleStartChatWithTopic = (topic: string) => {
    setInitialChatMessage(topic);
    setIsChatOpen(true);
  };

  const isHomePage = location.pathname === '/';
  const isAssistantUIPage = location.pathname === '/assistant-ia';

  return (
    <div className="min-h-screen font-sans relative">
      <AnalyticsTracker />
      
      {isHomePage && (
        <>
          <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-[-1]">
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[-1]"></div>
        </>
      )}

      {/* Le Header ne s'affiche QUE si nous ne sommes PAS dans la section démo */}
      {!isDemoSection && <Header onNavigate={handleNavigation} />}
      
      <main>
        <Routes>
          {/* Routes du site principal */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<PostDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/assistant-ia" element={<AssistantIAPage startChatWithTopic={handleStartChatWithTopic} />} />
          <Route path="/tdb-ia" element={<ProspectDemoPage />} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicyPage />} />
          <Route path="/cgv" element={<CgvPage />} />
          <Route path="/dashboard-ia" element={<PmeSalesDashboard />} />

          {/* Routes de la section Démo */}
          <Route path="/demo-myfyt13" element={<DemoHomePage />} />
          <Route path="/demo-myfyt13/1-analyse-clients" element={<DemoClientAnalysis />} />
          <Route path="/demo-myfyt13/2-prediction-ventes" element={<DemoSalesPrediction />} />
          <Route path="/demo-myfyt13/3-marketing-automation" element={<DemoMarketing />} />
          <Route path="/demo-myfyt13/4-besoins-saisonniers" element={<DemoSeasonal />} />
          <Route path="/demo-myfyt13/5-satisfaction-client" element={<DemoSatisfaction />} />
        </Routes>
      </main>
      
      {/* Le Footer ne s'affiche QUE si nous ne sommes PAS dans la section démo */}
      {!isDemoSection && !isAssistantUIPage && <Footer onNavigate={handleNavigation} />}
      
      <CookieConsent />
      <Chatbot 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen}
        initialMessage={initialChatMessage}
        clearInitialMessage={() => setInitialChatMessage(null)}
      />
    </div>
  );
};

export default App;
