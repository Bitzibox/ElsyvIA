// Créez ce nouveau fichier : src/components/CookieConsent.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  // L'état pour savoir si le bandeau doit être visible ou non
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Au chargement de la page, on vérifie si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      // S'il n'a pas consenti, on affiche le bandeau
      setIsVisible(true);
    }
  }, []);

  // Fonction appelée quand l'utilisateur clique sur "Accepter"
  const handleAccept = () => {
    // On sauvegarde le consentement dans le localStorage
    localStorage.setItem('cookie_consent', 'true');
    // On masque le bandeau
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Si on ne doit pas l'afficher, on ne retourne rien
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 animate-slide-up">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 text-center sm:text-left">
          Nous utilisons des cookies pour améliorer votre expérience sur notre site. En continuant, vous acceptez notre utilisation des cookies. 
          <Link to="/politique-confidentialite" className="underline hover:text-white ml-2">
            En savoir plus
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-teal-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-teal-700 transition-colors flex-shrink-0"
        >
          J'accepte
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
