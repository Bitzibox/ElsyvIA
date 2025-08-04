import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Users, BarChart3, Shield, Heart, Briefcase, Building, MessageSquare, FileText } from 'lucide-react';

// --- Composant pour l'avatar animé ---
const ElsyAvatar = () => (
  <motion.div
    className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 shadow-2xl flex items-center justify-center"
    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.div
      className="absolute inset-0 rounded-full bg-white/10"
      animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    <Zap className="w-16 h-16 text-white" />
  </motion.div>
);

// --- Section 1 : Accueil Immersif ---
const AccueilImmersif = ({ onProfileSelect }: { onProfileSelect: (profile: string) => void }) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-white text-center overflow-hidden px-4 pt-24">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Et si votre entreprise avait déjà son expert IA ?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8"
        >
          Découvrez Elsy. Plus qu'un chatbot, une intelligence entraînée pour vos ambitions.
        </motion.p>
        
        <ElsyAvatar />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <p className="text-lg font-medium mb-4">Dites-moi qui vous êtes, et je vous montre ce que nous pouvons accomplir.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onProfileSelect('pme')}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg"
            >
              Dirigeant de PME
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onProfileSelect('public')}
              className="bg-transparent border-2 border-white py-3 px-8 rounded-lg font-bold"
            >
              Secteur Public
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Section 2 : Simulateur Interactif ---
const scenarios = {
  pme: {
    title: "Votre PME face à 3 défis. 3 solutions avec Elsy.",
    challenges: [
      { 
        id: 'admin', 
        icon: Briefcase, 
        title: "Automatiser les tâches administratives", 
        description: "Libérez vos équipes des tâches répétitives. Elsy peut prendre en charge le tri des e-mails, la génération de rapports et la saisie de données, leur permettant de se concentrer sur des missions à plus forte valeur ajoutée.",
        chatPrompt: "Je suis intéressé(e) par l'automatisation des tâches administratives. Pouvez-vous me donner des exemples concrets pour ma PME ?" 
      },
      { 
        id: 'support', 
        icon: Users, 
        title: "Améliorer le support client", 
        description: "Offrez une assistance instantanée et pertinente 24/7. Elsy peut répondre à 85% des questions fréquentes et transmettre intelligemment les demandes complexes, augmentant ainsi la satisfaction et la fidélisation de vos clients.",
        chatPrompt: "Comment puis-je améliorer concrètement mon support client grâce à l'IA ?" 
      },
      { 
        id: 'leads', 
        icon: BarChart3, 
        title: "Générer plus de prospects qualifiés", 
        description: "Ne laissez plus aucun prospect vous échapper. Elsy engage proactivement les visiteurs de votre site, qualifie leurs besoins en temps réel et planifie des rendez-vous pour vos équipes, transformant votre site web en une machine à leads.",
        chatPrompt: "J'aimerais savoir comment Elsy peut m'aider à générer plus de prospects qualifiés à partir de mon site web."
      },
    ]
  },
  public: {
    title: "Votre organisation face à 3 défis. 3 solutions avec Elsy.",
    challenges: [
        { 
          id: 'usagers', 
          icon: MessageSquare, 
          title: "Améliorer la réponse aux usagers", 
          description: "Fournissez des réponses claires et immédiates aux citoyens. Elsy peut guider les usagers à travers les démarches en ligne et répondre à leurs questions sur les services publics, désengorgeant ainsi vos services d'accueil.",
          chatPrompt: "Comment pouvons-nous améliorer la réponse aux usagers dans notre collectivité avec un assistant IA ?" 
        },
        { 
          id: 'procedures', 
          icon: FileText, 
          title: "Simplifier les procédures complexes", 
          description: "Rendez les démarches administratives plus accessibles. Elsy peut fonctionner comme un assistant personnel pour l'usager, l'aidant à remplir des formulaires et à vérifier la complétude de son dossier, réduisant ainsi le taux d'erreur.",
          chatPrompt: "Je souhaite simplifier nos procédures complexes. Comment l'IA peut-elle nous assister concrètement ?" 
        },
        { 
          id: 'data', 
          icon: BarChart3, 
          title: "Valoriser les données publiques", 
          description: "Transformez vos données ouvertes (Open Data) en un service utile pour tous. Elsy permet aux citoyens d'explorer vos données en posant des questions en langage naturel, rendant l'information plus transparente et exploitable.",
          chatPrompt: "Comment valoriser nos données publiques grâce à une interface de conversation simple ?" 
        },
    ]
  }
};

const SimulateurInteractif = ({ profile, startChatWithTopic }: { profile: string, startChatWithTopic: (topic: string) => void }) => {
  const scenario = scenarios[profile];
  const [activeChallenge, setActiveChallenge] = useState<string | null>(scenario.challenges[0].id);

  return (
    <div className="py-20 bg-gray-50 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">{scenario.title}</h2>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4 text-left">
            {scenario.challenges.map(challenge => (
              <motion.div
                key={challenge.id}
                onClick={() => setActiveChallenge(challenge.id)}
                className={`p-6 rounded-lg cursor-pointer border-2 ${activeChallenge === challenge.id ? 'bg-white border-teal-500 shadow-xl' : 'bg-gray-100 border-transparent'}`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4">
                  <challenge.icon className={`w-8 h-8 ${activeChallenge === challenge.id ? 'text-teal-600' : 'text-gray-500'}`} />
                  <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="relative min-h-[250px] bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {scenario.challenges.map(challenge =>
                activeChallenge === challenge.id && (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center flex flex-col items-center"
                  >
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">{challenge.description}</p>
                    <motion.button
                      onClick={() => startChatWithTopic(challenge.chatPrompt)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md"
                    >
                      Discuter de cette solution
                    </motion.button>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Page Principale de l'Assistant ---
interface AssistantIAPageProps {
  startChatWithTopic: (topic: string) => void;
}

const AssistantIAPage: React.FC<AssistantIAPageProps> = ({ startChatWithTopic }) => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileSelection = (profile: string) => {
    setSelectedProfile(profile);
    setTimeout(() => {
        const element = document.getElementById('simulateur');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>Assistant IA Elsy | L'IA qui vous comprend - ElsyvIA</title>
        <meta name="description" content="Découvrez une nouvelle expérience de l'IA. Testez notre assistant, simulez son impact et voyez comment Elsy peut transformer votre organisation." />
      </Helmet>
      
      <AccueilImmersif onProfileSelect={handleProfileSelection} />
      
      {selectedProfile && (
        <div id="simulateur">
          <SimulateurInteractif profile={selectedProfile} startChatWithTopic={startChatWithTopic} />
        </div>
      )}
      
       <section className="py-20 bg-white px-4">
            <div className="container mx-auto text-center">
                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Une intelligence de <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">confiance</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                    Votre sécurité et l'éthique sont au cœur de notre démarche.
                </p>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                    <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
                        <Shield className="w-10 h-10 text-teal-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Confidentialité & Sécurité</h3>
                            <p className="text-gray-600">Vos données sont chiffrées, sécurisées, et ne sont jamais utilisées pour entraîner d'autres modèles. Nos solutions sont conformes au RGPD.</p>
                        </div>
                    </div>
                     <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
                        <Heart className="w-10 h-10 text-teal-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Éthique par Conception</h3>
                            <p className="text-gray-600">Nous développons une IA responsable et transparente, conçue pour augmenter les capacités humaines, pas pour les remplacer.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 bg-gray-900 text-white px-4">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à rencontrer votre nouvel expert IA ?</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                    Réservez votre diagnostic stratégique gratuit. Repartez avec un plan d'action personnalisé et un audit PDF des 3 opportunités IA prioritaires pour votre activité.
                </p>
                <a
                    href="https://calendly.com/contact-elsyvia/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                    <span>Je réserve mon diagnostic gratuit</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                </a>
            </div>
        </section>
    </>
  );
};

export default AssistantIAPage;
