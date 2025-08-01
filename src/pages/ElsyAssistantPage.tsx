// Créez ce nouveau fichier : src/pages/ElsyAssistantPage.tsx

import React from 'react';
import { Helmet } from 'react-helmet-async';
import EmbeddedChat from '../components/EmbeddedChat';
import { useNavigate } from 'react-router-dom';

const ElsyAssistantPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Assistant IA Elsy | Démonstration ElsyvIA</title>
        <meta name="description" content="Discutez avec Elsy, notre agent IA personnalisé. Découvrez comment ElsyvIA peut créer un chatbot intelligent entraîné sur vos propres données d'entreprise." />
      </Helmet>

      <div className="pt-28 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Colonne de gauche : Présentation */}
            <div className="text-left animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Faites connaissance avec <span className="gradient-text">Elsy</span>
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Elsy est une démonstration de notre savoir-faire. C'est un agent conversationnel basé sur l'IA, que nous avons "entraîné" pour répondre à vos questions sur ElsyvIA et ses services.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Posez-lui une question sur nos cas d'usage, nos formations, ou même sur le contenu de nos articles de blog pour tester ses capacités en direct.
              </p>
              <a
                href="https://calendly.com/contact-elsyvia/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Créez votre propre assistant
              </a>
            </div>

            {/* Colonne de droite : Chatbot intégré */}
            <div className="h-[40rem] rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
              <EmbeddedChat initialMessage="Bonjour ! Je suis Elsy, l'assistant IA d'ElsyvIA. Posez-moi une question pour commencer notre discussion."/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElsyAssistantPage;
