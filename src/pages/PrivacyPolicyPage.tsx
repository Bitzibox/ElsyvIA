// Créez ce nouveau fichier

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const privacyText = `
# Politique de Confidentialité (RGPD)

### Article 1 : Préambule

Cette politique de confidentialité a pour but d'informer les utilisateurs du site :
- Sur la manière dont sont collectées leurs données personnelles. Sont considérées comme des données personnelles, toute information permettant d’identifier un utilisateur.
- Sur les droits dont ils disposent concernant ces données.
- Sur la personne responsable du traitement des données à caractère personnel collectées et traitées.
- Sur les destinataires de ces données.

### Article 2 : Données personnelles collectées et traitées

#### A. Données collectées via le formulaire de contact et la newsletter

Lorsque vous utilisez notre formulaire de contact ou que vous vous inscrivez à notre newsletter, nous collectons les données suivantes :
- Nom (facultatif pour la newsletter)
- Adresse e-mail
- Message (pour le formulaire de contact)

Ces données sont collectées dans le but de répondre à votre demande de contact et/ou de vous envoyer notre newsletter mensuelle. La base légale de ce traitement est votre consentement.

#### B. Durée de conservation des données

Vos données sont conservées pour une durée de 3 ans après notre dernier contact. Pour la newsletter, vos données sont conservées tant que vous ne vous désinscrivez pas.

### Article 3 : Responsable du traitement des données

Le responsable du traitement de vos données est :
- La société ElsyvIA
- Adresse e-mail : contact@elsyvia.com

### Article 4 : Droits de l'utilisateur

Conformément à la réglementation, l'utilisateur dispose des droits d'accès, de rectification, de suppression, de limitation du traitement et de portabilité de ses données. Pour exercer ces droits, veuillez contacter le responsable du traitement à l'adresse e-mail ci-dessus.

### Article 5 : Utilisation de services tiers

Nous utilisons le service EmailJS pour la gestion de l'envoi des e-mails depuis notre formulaire de contact. Nous vous invitons à consulter leur politique de confidentialité pour plus d'informations.
`;

const PrivacyPolicyPage: React.FC = () => {
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
          <ReactMarkdown>{privacyText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
