import { UtensilsCrossed, Building, HeartPulse, Home, Briefcase, ShoppingCart, Factory } from 'lucide-react';

// --- CONFIGURATION CENTRALE DES SECTEURS ---
// Ce fichier sert de source unique de vérité pour les secteurs d'activité.
// Modifiez-le ici pour que les changements s'appliquent partout (Tableau de bord, Test Drive, etc.).

export const sectors = {
  'e-commerce': {
    id: 'e-commerce',
    name: 'E-commerce',
    icon: ShoppingCart,
    logoColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
    assistantName: 'Assistant E-commerce',
    welcomeMessage: "Bonjour ! Je suis l'assistant virtuel de 'ShopBoost'. Comment puis-je vous aider à optimiser votre boutique en ligne aujourd'hui ?",
  },
  services: {
    id: 'services',
    name: 'Services aux entreprises',
    icon: Building,
    logoColor: 'text-sky-500',
    bgColor: 'bg-sky-50',
    assistantName: 'Assistant Commercial',
    welcomeMessage: "Bonjour ! Je suis l'assistant virtuel de 'Service Pro'. Je peux vous aider à qualifier un prospect ou planifier une démo. Que souhaitez-vous faire ?",
  },
  sante: {
    id: 'sante',
    name: 'Santé & Bien-être',
    icon: HeartPulse,
    logoColor: 'text-red-500',
    bgColor: 'bg-red-50',
    assistantName: 'Assistant Médical',
    welcomeMessage: "Bonjour, bienvenue au cabinet du Dr. Martin. Je suis l'assistant virtuel. Comment puis-je vous assister ?",
  },
  restauration: {
    id: 'restauration',
    name: 'Restauration',
    icon: UtensilsCrossed,
    logoColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
    assistantName: 'Assistant Gastronomique',
    welcomeMessage: "Bonjour ! Je suis l'assistant virtuel du restaurant 'Le Délice'. Comment puis-je vous aider aujourd'hui ?",
  },
  immobilier: {
    id: 'immobilier',
    name: 'Immobilier',
    icon: Home,
    logoColor: 'text-green-500',
    bgColor: 'bg-green-50',
    assistantName: 'Assistant Immobilier',
    welcomeMessage: "Bonjour et bienvenue chez 'Immo-Invest' ! Je suis votre assistant IA. Cherchez-vous à vendre, acheter ou louer un bien ?",
  },
  autre: {
    id: 'autre',
    name: 'Autre secteur',
    icon: Factory,
    logoColor: 'text-gray-500',
    bgColor: 'bg-gray-50',
    assistantName: 'Assistant Polyvalent',
    welcomeMessage: "Bonjour ! Je suis un assistant IA sur mesure. Expliquez-moi votre besoin et voyons comment je peux vous aider.",
  }
};

// --- SCRIPTS DE CONVERSATION POUR LE TEST DRIVE ---
// Chaque script est lié à un 'id' de secteur défini ci-dessus.

export const chatScripts = {
  restauration: {
    start: {
      bot: sectors.restauration.welcomeMessage,
      userOptions: [
        { text: "Je voudrais réserver une table", nextStep: 'askHowMany' },
        { text: "Quels sont vos horaires ?", nextStep: 'showHours' },
        { text: "Avez-vous des options végétariennes ?", nextStep: 'showVeggie' },
      ],
    },
    askHowMany: {
      bot: "Bien sûr ! Pour combien de personnes souhaitez-vous réserver ?",
      userOptions: [
        { text: "2 personnes", nextStep: 'askDate' },
        { text: "4 personnes", nextStep: 'askDate' },
        { text: "Plus de 4", nextStep: 'handleLargeGroup' },
      ],
    },
    askDate: {
      bot: "Parfait. Pour quelle date et quelle heure ?",
      userOptions: [
        { text: "Ce soir, 20h00", nextStep: 'confirmBooking' },
        { text: "Demain, 12h30", nextStep: 'confirmBooking' },
        { text: "Autre date", nextStep: 'handleOtherDate' },
      ],
    },
    confirmBooking: {
      bot: "Excellent choix. Un instant, je vérifie nos disponibilités... C'est tout bon ! Votre table est réservée. Un SMS de confirmation vient de vous être envoyé. Puis-je faire autre chose ?",
      userOptions: [
        { text: "Non, c'est parfait merci !", nextStep: 'end' },
        { text: "Oui, j'ai une autre question", nextStep: 'start' },
      ],
    },
    handleLargeGroup: {
      bot: "Pour les groupes de plus de 4 personnes, nous vous invitons à nous appeler directement au 01 23 45 67 89 pour une organisation sur mesure. Merci de votre compréhension !",
      isEnd: true,
    },
    handleOtherDate: {
      bot: "Dans un cas réel, je vous proposerais un calendrier interactif pour choisir le créneau idéal. Cette démonstration s'arrête ici, mais les possibilités sont infinies !",
      isEnd: true,
    },
    showHours: {
      bot: "Nous sommes ouverts du Mardi au Samedi, de 12h00 à 14h30 et de 19h00 à 22h30. Le restaurant est fermé le Dimanche et le Lundi.",
      userOptions: [
        { text: "Super, je veux réserver", nextStep: 'askHowMany' },
        { text: "Merci pour l'info !", nextStep: 'end' },
      ],
    },
    showVeggie: {
      bot: "Absolument ! Notre chef propose un délicieux Risotto aux champignons de saison ainsi qu'un Curry de légumes bio. Toute notre carte est disponible sur notre site.",
      userOptions: [
        { text: "Génial, je réserve !", nextStep: 'askHowMany' },
        { text: "Merci !", nextStep: 'end' },
      ],
    },
    end: {
      bot: "Merci d'avoir testé notre assistant ! Imaginez ce que nous pourrions faire pour votre entreprise.",
      isEnd: true,
    },
  },
  // --- Les autres scripts sont à compléter sur ce modèle ---
  'e-commerce': { start: { bot: sectors['e-commerce'].welcomeMessage, isEnd: true } },
  services: { start: { bot: sectors.services.welcomeMessage, isEnd: true } },
  sante: { start: { bot: sectors.sante.welcomeMessage, isEnd: true } },
  immobilier: { start: { bot: sectors.immobilier.welcomeMessage, isEnd: true } },
  autre: { start: { bot: sectors.autre.welcomeMessage, isEnd: true } },
};
