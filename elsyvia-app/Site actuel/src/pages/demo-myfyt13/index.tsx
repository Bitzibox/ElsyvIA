// src/pages/demo-myfyt13/index.tsx
import DemoLayout from './DemoLayout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChartBig, 
  BrainCircuit, 
  TrendingUp, 
  CalendarCheck, 
  SmilePlus, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- DÉBUT DE LA CORRECTION : OBJET MODULES COMPLET RESTAURÉ ---
const modules = [
  {
    id: 1,
    title: "Analyse des Données Clients",
    accroche: "Découvrez qui sont vraiment vos clients.",
    description: "Notre IA segmente automatiquement votre base de données en profils clairs : les fidèles à choyer, les nouveaux à convertir et ceux à risque à réactiver. Prenez des décisions basées sur des faits, pas sur des intuitions.",
    kpis: ["+15% de conversion Nouveaux > Fidèles", "-8% de Churn"],
    techIA: "Clustering (K-Means), Scoring RFM",
    useCase: "Idéal pour relancer les associations inactives avant la nouvelle saison.",
    href: "/demo-myfyt13/1-analyse-clients",
    icon: <BarChartBig />,
    color: "blue"
  },
  {
    id: 2,
    title: "Prédiction des Ventes & Stock",
    accroche: "Anticipez l'avenir de vos commandes.",
    description: "Ne soyez plus jamais en rupture ou en surstock. Notre moteur prédictif analyse vos cycles de vente et les tendances du marché pour vous donner des prévisions fiables. Simulez l'impact d'une promotion ou d'un risque fournisseur en un clic.",
    kpis: ["97% de fiabilité", "-25% de surstock"],
    techIA: "Time Series Forecasting (LSTM)",
    useCase: "Planifiez parfaitement vos stocks pour le pic de la rentrée sportive.",
    href: "/demo-myfyt13/2-prediction-ventes",
    icon: <TrendingUp />,
    color: "green"
  },
  {
    id: 3,
    title: "Marketing Personnalisé",
    accroche: "Parlez à chaque client, personnellement.",
    description: "Arrêtez les emails génériques. Notre IA générative rédige des messages (email, SMS, social) uniques pour chaque profil client. Augmentez votre engagement et vos conversions en envoyant toujours le bon message, au bon moment.",
    kpis: ["+15% de taux de clic potentiel", "Génération multi-canal instantanée"],
    techIA: "IA Générative (LLM), A/B Testing",
    useCase: "Envoyez automatiquement une offre de bienvenue personnalisée à chaque nouveau club.",
    href: "/demo-myfyt13/3-marketing-automation",
    icon: <BrainCircuit />,
    color: "orange"
  },
  {
    id: 4,
    title: "Anticipation des Besoins Saisonniers",
    accroche: "Planifiez vos pics d'activité sereinement.",
    description: "Transformez les hautes saisons d'un défi logistique en une opportunité planifiée. L'IA vous recommande les effectifs, les niveaux de stock et les produits à mettre en avant pour chaque période clé de l'année.",
    kpis: ["7j de rupture évités en moyenne", "2h / mois économisées en planification"],
    techIA: "Analyse Cyclique, Planification par IA",
    useCase: "Sachez exactement combien de personnel prévoir à l'atelier pour les fêtes de fin d'année.",
    href: "/demo-myfyt13/4-besoins-saisonniers",
    icon: <CalendarCheck />,
    color: "purple"
  },
  {
    id: 5,
    title: "Analyse de la Satisfaction",
    accroche: "Écoutez ce que vos clients disent vraiment.",
    description: "Notre IA lit et comprend tous les retours clients (avis, emails...) pour vous. Elle détecte automatiquement les sujets de satisfaction et d'insatisfaction, vous alertant en temps réel sur les problèmes récurrents avant qu'ils ne prennent de l'ampleur.",
    kpis: ["Score de satisfaction : 4.7/5", "100% des avis traités"],
    techIA: "Analyse de sentiment (NLP)",
    useCase: "Détectez automatiquement si les retards de livraison deviennent un problème récurrent.",
    href: "/demo-myfyt13/5-satisfaction-client",
    icon: <SmilePlus />,
    color: "pink"
  }
];
// --- FIN DE LA CORRECTION ---

const DemoHubPage = () => {
  const colorClasses = {
    blue: { border: 'border-blue-500/50', hoverBorder: 'hover:border-blue-500', text: 'text-blue-400', bg: 'bg-blue-500', shadow: 'hover:shadow-blue-500/10' },
    green: { border: 'border-green-500/50', hoverBorder: 'hover:border-green-500', text: 'text-green-400', bg: 'bg-green-500', shadow: 'hover:shadow-green-500/10' },
    orange: { border: 'border-orange-500/50', hoverBorder: 'hover:border-orange-500', text: 'text-orange-400', bg: 'bg-orange-500', shadow: 'hover:shadow-orange-500/10' },
    purple: { border: 'border-purple-500/50', hoverBorder: 'hover:border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500', shadow: 'hover:shadow-purple-500/10' },
    pink: { border: 'border-pink-500/50', hoverBorder: 'hover:border-pink-500', text: 'text-pink-400', bg: 'bg-pink-500', shadow: 'hover:shadow-pink-500/10' },
  };

  return (
    <DemoLayout pageTitle="Hub de Démonstration IA | Elsyvia pour myfyt13.com">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Hub de Démonstration IA</h1>
        <p className="mt-4 text-lg text-gray-400">Une exploration interactive de nos solutions pour <span className="font-semibold text-blue-400">myfyt13.com</span></p>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {modules.map((module) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: module.id * 0.1 }}
          >
          <Link to={module.href} className="block h-full">
            <Card className={`group flex flex-col h-full bg-gray-800 rounded-xl ${colorClasses[module.color].border} ${colorClasses[module.color].hoverBorder} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${colorClasses[module.color].shadow}`}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white">{module.title}</CardTitle>
                  <CardDescription className={`font-semibold ${colorClasses[module.color].text}`}>{module.accroche}</CardDescription>
                </div>
                <div className={`p-3 rounded-lg bg-gray-900/50 ${colorClasses[module.color].text}`}>{module.icon}</div>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                <div className="space-y-2 text-xs mb-4">
                  {module.kpis.map(kpi => (<div key={kpi} className="flex items-center gap-2 text-green-300"><CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" /><span>{kpi}</span></div>))}
                </div>
                <div className="mt-auto pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Focus IA</p>
                  <div className="text-xs text-gray-400">
                    <p><span className="font-semibold text-gray-300">Technologie :</span> {module.techIA}</p>
                    <p><span className="font-semibold text-gray-300">Cas d'usage :</span> {module.useCase}</p>
                  </div>
                </div>
              </CardContent>
              <div className={`w-full text-center p-4 font-semibold text-white rounded-b-xl transition-colors ${colorClasses[module.color].bg} group-hover:brightness-110`}>
                <div className="flex items-center justify-center">Explorer cette solution <ArrowRight className="w-4 h-4 ml-2" /></div>
              </div>
            </Card>
          </Link>
          </motion.div>
        ))}
      </div>
    </DemoLayout>
  );
};

export default DemoHubPage;
