import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, ArrowLeft, Send, Sparkles, MessageCircle } from 'lucide-react';

// Configuration des secteurs
const sectors = {
  'e-commerce': {
    id: 'e-commerce',
    name: 'E-commerce',
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    logoColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
    assistantName: 'Assistant E-commerce ShopBoost',
    welcomeMessage: "👋 Bonjour ! Je suis l'assistant virtuel de ShopBoost. Je peux vous aider avec vos commandes, le suivi de livraison, les retours, ou vous conseiller sur nos produits. Comment puis-je vous assister aujourd'hui ?",
  },
  services: {
    id: 'services',
    name: 'Services aux entreprises',
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect x="2" y="20" width="20" height="2"/><path d="M10 12H8"/><path d="M16 12h-2"/><path d="M12 12v-1"/></svg>,
    logoColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    assistantName: 'Assistant Commercial ServicePro',
    welcomeMessage: "🤝 Bonjour ! Je suis l'assistant de ServicePro. Je peux qualifier vos besoins, planifier une démonstration, vous fournir un devis personnalisé ou répondre à vos questions sur nos services. Par quoi commençons-nous ?",
  },
  sante: {
    id: 'sante',
    name: 'Santé & Bien-être',
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.7-1.44.7 1.44H15"/></svg>,
    logoColor: 'text-red-500',
    bgColor: 'bg-red-50',
    assistantName: 'Assistant Médical Dr. Martin',
    welcomeMessage: "🏥 Bonjour ! Bienvenue au cabinet du Dr. Martin. Je peux vous aider à prendre rendez-vous, vous renseigner sur nos services, gérer vos prescriptions ou répondre à vos questions administratives. Comment puis-je vous aider ?",
  },
  restauration: {
    id: 'restauration',
    name: 'Restauration',
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/></svg>,
    logoColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
    assistantName: 'Assistant Gastronomique Le Délice',
    welcomeMessage: "🍽️ Bonjour ! Je suis l'assistant du restaurant Le Délice. Je peux vous aider à réserver une table, vous présenter notre carte, nos menus du jour, gérer vos allergies alimentaires ou organiser vos événements. Que puis-je faire pour vous ?",
  },
  immobilier: {
    id: 'immobilier',
    name: 'Immobilier',
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    logoColor: 'text-green-500',
    bgColor: 'bg-green-50',
    assistantName: 'Assistant Immobilier Immo-Invest',
    welcomeMessage: "🏡 Bonjour ! Je suis l'assistant d'Immo-Invest. Que vous cherchiez à acheter, vendre ou louer, je peux estimer votre bien, planifier des visites, vous expliquer le processus ou vous mettre en contact avec nos experts. Comment puis-je vous accompagner ?",
  },
  autre: {
    id: 'autre',
    name: 'Autre secteur',
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>,
    logoColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    assistantName: 'Assistant Polyvalent ElsyvIA',
    welcomeMessage: "🤖 Bonjour ! Je suis votre assistant IA personnalisé. Je m'adapte à votre secteur d'activité et peux gérer vos demandes clients, qualifier vos prospects, prendre des rendez-vous et bien plus. Parlez-moi de votre besoin !",
  }
};

// Réponses intelligentes par secteur avec boutons de suivi
const sectorResponses = {
  'e-commerce': {
    keywords: { 'commande': { response: "Je vais vérifier le statut de votre commande. Pouvez-vous me donner votre numéro de commande ou votre email ?", buttons: ["CMD123456", "Mon email est...", "Commande d'hier", "Autre problème"] }, 'livraison': { response: "Nos délais de livraison sont de 24-48h en France métropolitaine. Voulez-vous suivre une commande spécifique ?", buttons: ["Oui, suivre ma commande", "Délais à l'étranger", "Livraison express", "Changer l'adresse"] }, 'retour': { response: "Vous avez 30 jours pour retourner vos articles. Je peux générer une étiquette de retour gratuitement.", buttons: ["Générer l'étiquette", "Conditions de retour", "Remboursement", "Échange produit"] }, 'produit': { response: "Je peux vous conseiller sur nos produits ! Quel type d'article recherchez-vous ?", buttons: ["Vêtements", "Électronique", "Maison & Déco", "Comparer des produits"] }, 'promo': { response: "🎉 Nous avons actuellement -20% sur toute la collection automne ! Code: AUTOMNE20", buttons: ["Voir la collection", "Autres promotions", "Code ne marche pas", "Conditions d'usage"] } },
    followUp: { "CMD123456": { response: "Votre commande CMD123456 a été expédiée hier et arrivera demain avant 18h. Voici le lien de suivi : tracking.shop/CMD123456", buttons: ["Parfait merci !", "Modifier la livraison", "Autre commande", "Contacter le transporteur"] }, "Voir la collection": { response: "Voici notre collection automne avec -20% : pulls, manteaux, bottes... Plus de 500 articles en promotion !", buttons: ["Voir les pulls", "Voir les manteaux", "Filtrer par taille", "Aide au choix"] } },
    default: "Je peux vous aider avec vos commandes, la livraison, les retours, ou vous conseiller sur nos produits. Précisez votre demande !", defaultButtons: ["Suivre ma commande", "Politique de retour", "Promotions actuelles", "Conseil produit"]
  },
  services: {
    keywords: { 'devis': { response: "Je vais préparer un devis personnalisé pour vous. Pouvez-vous me décrire votre projet et vos besoins spécifiques ?", buttons: ["Site web", "Application mobile", "Consulting", "Formation équipe"] }, 'demo': { response: "Parfait ! Je peux planifier une démonstration personnalisée. Êtes-vous disponible cette semaine ?", buttons: ["Oui, cette semaine", "Semaine prochaine", "Démo en ligne", "Démo sur site"] }, 'prix': { response: "Nos tarifs dépendent de vos besoins. Puis-je vous poser quelques questions pour personnaliser l'offre ?", buttons: ["Oui, posez vos questions", "Grille tarifaire", "Forfait ou sur mesure", "Modes de paiement"] } },
    followUp: { "Site web": { response: "Excellent choix ! Site vitrine, e-commerce ou sur mesure ? Notre équipe crée des sites performants et optimisés SEO.", buttons: ["Site vitrine", "E-commerce", "Sur mesure", "Voir des exemples"] }, "Oui, cette semaine": { response: "Parfait ! J'ai des créneaux disponibles mardi 14h, mercredi 10h ou jeudi 16h. Quelle heure vous convient ?", buttons: ["Mardi 14h", "Mercredi 10h", "Jeudi 16h", "Autre créneau"] } },
    default: "Je peux qualifier votre projet, planifier une demo ou vous fournir un devis. Dites-moi ce qui vous intéresse !", defaultButtons: ["Demander un devis", "Planifier une démo", "Voir nos services", "Nos références"]
  },
  sante: {
    keywords: { 'rendez-vous': { response: "Je peux vérifier les créneaux disponibles. Préférez-vous la matinée ou l'après-midi ? Quelle spécialité ?", buttons: ["Matinée", "Après-midi", "Médecine générale", "Cardiologie"] }, 'urgence': { response: "Pour les urgences, appelez le 15. Pour les consultations rapides, nous avons des créneaux d'urgence.", buttons: ["Créneaux d'urgence", "Téléconsultation", "Garde de nuit", "Numéros utiles"] } },
    followUp: { "Matinée": { response: "J'ai des créneaux libres : demain 9h30, vendredi 8h45 ou lundi prochain 10h15. Lequel vous convient ?", buttons: ["Demain 9h30", "Vendredi 8h45", "Lundi 10h15", "Autres créneaux"] } },
    default: "Je peux prendre votre rendez-vous, vous renseigner sur nos services ou gérer vos prescriptions. Comment vous aider ?", defaultButtons: ["Prendre rendez-vous", "Renouveler ordonnance", "Horaires d'ouverture", "Urgences"]
  },
  restauration: {
    keywords: { 'reservation': { response: "Avec plaisir ! Pour combien de personnes et à quelle date souhaitez-vous réserver ?", buttons: ["2 personnes", "4 personnes", "Plus de 6", "Ce soir"] }, 'menu': { response: "Notre menu change selon la saison. Aujourd'hui nous proposons notre fameux bœuf bourguignon et notre tarte tatin maison !", buttons: ["Voir la carte complète", "Menus du jour", "Desserts", "Vins et boissons"] } },
    followUp: { "2 personnes": { response: "Parfait pour 2 ! Avez-vous une préférence pour la date et l'heure ? Nous avons de la place ce soir, demain midi ou ce weekend.", buttons: ["Ce soir 20h", "Demain midi", "Samedi soir", "Dimanche midi"] }, "Ce soir 20h": { response: "Excellente idée ! Table pour 2 à 20h ce soir, c'est noté ! Puis-je avoir un nom pour la réservation ?", buttons: ["Martin", "Dupont", "Autre nom", "Demandes spéciales"] } },
    default: "Je peux prendre votre réservation, vous présenter notre carte ou organiser votre événement. Que souhaitez-vous ?", defaultButtons: ["Réserver une table", "Voir le menu", "Options végétariennes", "Privatisation"]
  },
  immobilier: {
    keywords: { 'achat': { response: "Excellent choix ! Quel type de bien recherchez-vous et dans quelle zone ? Quel est votre budget ?", buttons: ["Appartement", "Maison", "Investissement", "Budget 200-400k"] }, 'vente': { response: "Je peux estimer votre bien gratuitement. Quelle est l'adresse de votre propriété ?", buttons: ["Paris", "Banlieue", "Province", "Estimation en ligne"] } },
    followUp: { "Appartement": { response: "Parfait ! Combien de pièces recherchez-vous ? Et dans quel arrondissement ou quelle ville ?", buttons: ["2-3 pièces", "4-5 pièces", "Paris centre", "Première couronne"] }, "2-3 pièces": { response: "J'ai plusieurs appartements 2-3 pièces disponibles ! Voulez-vous voir nos dernières offres ou planifier des visites ?", buttons: ["Voir les offres", "Planifier visites", "Critères détaillés", "Financement"] } },
    default: "Achat, vente, location, estimation... Je suis là pour tous vos projets immobiliers ! Précisez votre besoin.", defaultButtons: ["Estimer mon bien", "Rechercher un logement", "Organiser une visite", "Conseils investissement"]
  },
  autre: {
    keywords: { 'aide': { response: "Je suis là pour vous aider ! Décrivez-moi votre besoin et je m'adapterai à votre secteur.", buttons: ["Mon secteur d'activité", "Automatiser mon business", "Améliorer mon service client", "Voir des exemples"] } },
    followUp: { "Mon secteur d'activité": { response: "Parfait ! Dans quel domaine travaillez-vous ? Je peux créer un assistant sur mesure pour n'importe quel secteur.", buttons: ["Commerce", "Services", "Industrie", "Artisanat"] } },
    default: "Je m'adapte à votre secteur ! Décrivez-moi votre besoin et je vous aiderai du mieux possible.", defaultButtons: ["Découvrir vos services", "Demander un devis", "Planifier une démonstration", "Cas d'usage"]
  }
};

const ChatSimulator = ({ sectorId, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [currentButtons, setCurrentButtons] = useState([]);
  
  const chatContainerRef = useRef(null);
  const userIsAtBottomRef = useRef(true);

  const sector = sectors[sectorId];
  const responses = sectorResponses[sectorId];

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 50;
      userIsAtBottomRef.current = isAtBottom;
    }
  };
  
  useEffect(() => {
    userIsAtBottomRef.current = true;
    setMessages([{ type: 'bot', text: sector.welcomeMessage, timestamp: new Date() }]);
    setCurrentButtons(responses.defaultButtons || []);
  }, [sectorId]);

  useEffect(() => {
    if (messages.length <= 1) {
        // Positionnement instantané au début, sans animation
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        return;
    }

    if (userIsAtBottomRef.current) {
        const container = chatContainerRef.current;
        if (container) {
            // *** CORRECTION DÉFINITIVE ***
            // On utilise scrollTo() sur le conteneur pour ne cibler que son ascenseur interne.
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
  }, [messages]);

  const addBotMessage = (text) => {
    setIsBotTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text, timestamp: new Date() }]);
      setIsBotTyping(false);
    }, 800 + Math.random() * 700);
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (responses.followUp && responses.followUp[userMessage]) {
      const followUpData = responses.followUp[userMessage];
      setCurrentButtons(followUpData.buttons || []);
      return followUpData.response;
    }
    for (const [keyword, responseData] of Object.entries(responses.keywords)) {
      if (message.includes(keyword)) {
        if (typeof responseData === 'object') {
          setCurrentButtons(responseData.buttons || []);
          return responseData.response;
        } else {
          setCurrentButtons([]);
          return responseData;
        }
      }
    }
    if (message.includes('bonjour') || message.includes('salut')) {
      setCurrentButtons(responses.defaultButtons || []);
      return `Bonjour ! Je suis ravi de vous parler. ${responses.default}`;
    }
    if (message.includes('merci')) {
      setCurrentButtons(["Autre question", "Prendre rendez-vous", "Contacter un expert", "Terminer"]);
      return "Avec plaisir ! Y a-t-il autre chose dont vous avez besoin ?";
    }
    if (message.includes('au revoir') || message.includes('bye') || message.includes('terminer')) {
      setCurrentButtons([]);
      return "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions. Excellente journée ! 👋";
    }
    if (message.includes('comment') && message.includes('marche')) {
      setCurrentButtons(["Voir d'autres exemples", "Demander une démo", "En savoir plus", "Autre question"]);
      return "Je suis un assistant IA conversationnel. Je comprends vos questions et y réponds de manière naturelle, 24h/24. C'est une démonstration de ce qu'ElsyvIA peut créer pour votre entreprise !";
    }
    setCurrentButtons(responses.defaultButtons || []);
    return responses.default;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isBotTyping) return;
    const message = userInput.trim();
    setMessages(prev => [...prev, { type: 'user', text: message, timestamp: new Date() }]);
    setUserInput('');
    const response = generateResponse(message);
    addBotMessage(response);
  };

  const handleQuickReply = (text, event = null) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
    const response = generateResponse(text);
    addBotMessage(response);
  };

  const getQuickReplies = () => {
    return currentButtons;
  };

  const Icon = sector.icon;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[85vh] max-h-[800px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <button onClick={onBack} className="p-3 rounded-full hover:bg-gray-200 transition-all duration-200 hover:scale-105">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center ml-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${sector.bgColor} shadow-lg`}>
            <Icon className={`w-8 h-8 ${sector.logoColor}`} />
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-xl text-gray-800">{sector.assistantName}</h3>
            <div className="flex items-center text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              En ligne • Répond en quelques secondes
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center text-sm text-gray-500">
          <Sparkles className="w-4 h-4 mr-1" />
          Démonstration interactive
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white" 
        // Le `scroll-behavior` est maintenant géré par la fonction `scrollTo` en JS
        style={{ contain: 'layout style' }}
      >
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'bot' && (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${sector.bgColor} shadow-md`}>
                  <Bot className={`w-5 h-5 ${sector.logoColor}`} />
                </div>
              )}
              <div className={`max-w-lg px-5 py-3 rounded-2xl shadow-md ${
                msg.type === 'user' 
                ? 'bg-blue-600 text-white rounded-br-md' 
                : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
              }`}>
                <p className="leading-relaxed">{msg.text}</p>
                <div className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {msg.timestamp?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              {msg.type === 'user' && (
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isBotTyping && (
            <div className="flex items-end gap-3 justify-start">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${sector.bgColor} shadow-md`}>
                <Bot className={`w-5 h-5 ${sector.logoColor}`} />
              </div>
              <div className="px-5 py-3 rounded-2xl bg-white rounded-bl-md shadow-md border border-gray-200">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* On retire la ref de ce div, elle n'est plus utile ici */}
        <div></div>
      </div>

      <div className="p-6 border-t border-gray-200 bg-white">
        {currentButtons.length > 0 && !isBotTyping && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Réponses rapides :</p>
            <div className="flex flex-wrap gap-2">
              {getQuickReplies().map((reply, index) => (
                <button 
                  key={index}
                  onClick={(e) => handleQuickReply(reply, e)}
                  className={`px-4 py-2 bg-white border-2 font-medium rounded-full hover:scale-105 transition-all duration-200 text-sm shadow-sm ${sector.logoColor} border-current hover:bg-current hover:text-white`}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <form onSubmit={handleFormSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Tapez votre message ici..."
              className="w-full px-5 py-4 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 placeholder-gray-500"
              disabled={isBotTyping}
            />
            <MessageCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button 
            type="submit" 
            className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105" 
            disabled={isBotTyping || !userInput.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            💡 Ceci est une démonstration interactive • 
            <a
              href="https://calendly.com/contact-elsyvia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1 font-medium"
            >
              Planifiez votre démo personnalisée
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const TestDrivePage = () => {
  const [selectedSector, setSelectedSector] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>
      <div className="w-full max-w-6xl text-center pt-8 pb-12 relative z-10">
        <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Démonstration Interactive</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Testez l'Assistant IA 
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> ElsyvIA</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          {selectedSector 
            ? "Conversez librement avec votre assistant IA ! Posez vos questions, testez ses capacités et découvrez comment il peut transformer l'expérience de vos clients." 
            : "Découvrez en direct comment notre IA révolutionne l'interaction client. Choisissez votre secteur et commencez une conversation naturelle avec votre futur assistant virtuel."
          }
        </p>
      </div>
      <div className="w-full relative z-10">
        {selectedSector ? (
          <ChatSimulator sectorId={selectedSector} onBack={() => setSelectedSector(null)} />
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(sectors).map((sector) => {
                const Icon = sector.icon;
                return (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector.id)}
                    className="group flex flex-col items-center text-center p-8 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl hover:scale-105 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${sector.bgColor} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className={`w-10 h-10 ${sector.logoColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {sector.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      Découvrez comment {sector.assistantName} peut révolutionner votre relation client
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Démarrer la conversation
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-center mt-12 p-8 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Prêt à transformer votre entreprise ?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Ces démonstrations ne sont qu'un aperçu de ce qu'ElsyvIA peut créer sur mesure pour votre activité. 
                Chaque assistant s'adapte parfaitement à vos processus et à votre image de marque.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://calendly.com/contact-elsyvia/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Planifier ma démo personnalisée
                </a>
                <div className="flex items-center text-gray-500 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Créneaux disponibles cette semaine
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!selectedSector && (
        <div className="w-full max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <p className="text-gray-600">Disponibilité continue</p>
          </div>
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">-70%</div>
            <p className="text-gray-600">Réduction du temps de réponse</p>
          </div>
          <div className="p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">+150%</div>
            <p className="text-gray-600">Satisfaction client</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDrivePage;
