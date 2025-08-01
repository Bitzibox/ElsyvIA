// Créez ce nouveau fichier

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const cgvText = `
# Conditions Générales de Vente (CGV)

### Article 1 : Objet
Les présentes conditions générales de vente (CGV) s'appliquent à toutes les prestations de services proposées par ElsyvIA, incluant le conseil en stratégie IA, l'intégration de solutions sur-mesure et les actions de formation.

### Article 2 : Devis et Commandes
Toute prestation fait l'objet d'un devis préalable. La commande est validée par la signature du devis par le client, accompagnée de la mention "Bon pour accord".

### Article 3 : Prix et Modalités de paiement
Les prix des prestations sont indiqués en euros et hors taxes (HT). Ils sont majorés de la TVA au taux en vigueur. Le paiement s'effectue selon les modalités précisées sur le devis.

### Article 4 : Obligations des parties
ElsyvIA s'engage à une obligation de moyens. Le client s'engage à fournir toutes les informations nécessaires à la bonne exécution de la prestation.

### Article 5 : Propriété intellectuelle
Sauf disposition contraire, ElsyvIA conserve la propriété intellectuelle des solutions développées. Le client bénéficie d'un droit d'usage des livrables.

### Article 6 : Confidentialité
Chacune des parties s'engage à ne pas divulguer les informations confidentielles reçues de l'autre partie.

### Article 7 : Droit applicable et Juridiction compétente
Les présentes CGV sont soumises au droit français. En cas de litige, compétence exclusive est attribuée aux tribunaux compétents de [Ville de votre tribunal de commerce].
`;

const CgvPage: React.FC = () => {
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
          <ReactMarkdown>{cgvText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default CgvPage;
