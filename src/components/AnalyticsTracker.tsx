// Créez ce nouveau fichier : src/components/AnalyticsTracker.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Envoie une "pageview" à Google Analytics à chaque changement d'URL
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]); // Se déclenche à chaque fois que "location" change

  return null; // Ce composant n'affiche rien
};

export default AnalyticsTracker;
