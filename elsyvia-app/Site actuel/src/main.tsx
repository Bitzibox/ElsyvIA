import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importe le routeur
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from "react-ga4";
import App from './App.tsx';
import './index.css';

// 2. Initialiser Google Analytics avec votre ID de mesure
ReactGA.initialize("G-QWQ9FH5Y0S");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* On enveloppe toute l'application dans le routeur */}
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
