// Créez ce nouveau fichier

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const legalText = `
# Mentions Légales

Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site ElsyvIA les présentes mentions légales.

### Éditeur du site

**ElsyvIA**
- Statut juridique : En cours de création
- Siège social : 
- Numéro SIRET : En cours d'attribution
- Responsable de la publication : M.GENDRON Christophe
- Adresse e-mail : contact@elsyvia.com

### Hébergeur du site

Le site elsyvia.com est hébergé par :
- SCALEWAY / DEDIBOX
- Siège social : 8 rue de la Ville l'Evêque 75008 Paris
- Site web : www.scaleway.com

### Accès au site

Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découler d’une nécessité de maintenance.

### Propriété intellectuelle

Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du site elsyvia.com, sans autorisation de l’Éditeur est prohibée et pourra entraîner des actions et poursuites judiciaires.
`;

const LegalNoticePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button 
          onClick={() => navigate('/')} 
          className="inline-flex items-center text-gray-600 hover:text-teal-600 font-medium transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </button>
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{legalText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
