// src/pages/demo-myfyt13/3-marketing-automation.tsx
import { useState, useEffect } from 'react';
import DemoLayout from './DemoLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wand2, RefreshCw, Loader2, Info, ThumbsUp, Star, Clock, Flame, History, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DONNÉES DE DÉMO ULTRA-ENRICHIES ---
const profiles = {
  "club-fidele": { 
    name: "Club de foot fidèle",
    icon: Star,
    color: "text-yellow-400",
    description: "Achats réguliers, forte saisonnalité à la rentrée.",
    kpis: { "Panier moyen": "180€", "Fréquence": "8/an" },
    tip: "Pensez à inclure le nom du club dans l'objet pour +17% d'ouverture en moyenne.",
    history: [{ campaign: "Rentrée 2024", perf: "45% ouv. / 12% clic" }, { campaign: "Fin de saison 2024", perf: "42% ouv. / 10% clic" }]
  },
  "client-risque": {
    name: "Client à risque (inactif)",
    icon: Clock,
    color: "text-orange-400",
    description: "N'a pas commandé depuis plus de 6 mois.",
    kpis: { "Dernier achat": "Il y a 8 mois", "Panier moyen": "75€" },
    tip: "Une offre promotionnelle agressive (-15% ou plus) est souvent nécessaire pour réactiver ce type de profil.",
    history: [{ campaign: "Relance T1 2025", perf: "22% ouv. / 3% clic" }]
  },
  "nouveau-client": {
    name: "Nouveau client (1er achat)",
    icon: Flame,
    color: "text-blue-400",
    description: "Vient de passer sa première commande.",
    kpis: { "Premier achat": "Il y a 7 jours", "Montant": "300€" },
    tip: "Un message de bienvenue avec une offre sur la 2ème commande est la meilleure stratégie pour fidéliser.",
    history: []
  },
};
const mockGeminiResponses = {
  "club-fidele": {
    pertinence: 92, performance: { openRate: "+15%", orders: "+5" },
    email: { A: "Bonjour l'équipe du FC La Victoire,\n\nVos nouveaux maillots sont en route et nous avons hâte de vous voir briller avec ! Pour que votre préparation soit parfaite, nous avons pensé à vous. Un bon maillot mérite un bon ballon.\n\nC'est pourquoi nous vous offrons -20% sur notre gamme de ballons de match personnalisables avec votre logo. C'est l'occasion idéale de compléter votre équipement pour la saison à venir.", B: "Prêts à dominer la saison, FC La Victoire ?\n\nAvec vos nouveaux maillots, vous avez déjà le style des champions. Et si on s'occupait de l'essentiel pour marquer : le ballon ?\n\nPour des entraînements efficaces et des buts mémorables, découvrez nos ballons conçus pour la performance. En tant que client fidèle, bénéficiez d'une offre exclusive de -20%." },
    sms: "FC La Victoire, pour compléter vos maillots, profitez de -20% sur les ballons personnalisés ! Préparez la saison des champions. Cliquez ici : [lien]", social: "Le FC La Victoire est paré pour la victoire avec ses nouvelles tenues ! La saison s'annonce explosive. #myfyt13 #PartenaireDesClubs", recommendation: "La variante B est recommandée. Elle utilise une question ouverte pour engager le lecteur et crée un lien direct entre le produit et leur objectif ('des buts mémorables').", genericEmail: "Bonjour, découvrez nos nouvelles promotions sur les équipements sportifs."
  },
  "client-risque": {
    pertinence: 85, performance: { openRate: "+8%", orders: "+2" },
    email: { A: "Bonjour l'équipe,\n\nOn ne vous a pas vus depuis la saison dernière et vos trophées nous manquent ! Nous espérons que tout va bien de votre côté.\n\nPour célébrer vos futurs succès et vous aider à préparer votre grand retour, nous aimerions vous offrir un petit coup de pouce : profitez de -15% de réduction sur l'ensemble de notre catalogue. C'est notre façon de vous dire que vous nous manquez.", B: "Prêts pour une nouvelle saison de victoires ?\n\nCela fait un moment, et nous savons que la préparation d'une nouvelle saison est un moment clé. Pour vous aider à repartir du bon pied, nous avons activé une offre spéciale de -15% sur votre compte, valable sur tous nos produits.\n\nNouveaux maillots, équipements, trophées... C'est le moment idéal." },
    sms: "FC Ancien, ça fait longtemps ! Pour fêter votre retour, profitez de -15% sur TOUT le site. C'est le moment de se rééquiper : [lien]", social: "Prêt à faire votre grand retour sur les terrains ? Nos nouvelles collections sont là pour vous motiver ! #Comeback #SportMotivation", recommendation: "La variante A est recommandée. L'approche émotionnelle ('vos trophées nous manquent') est plus efficace pour réactiver un client inactif.", genericEmail: "Bonjour, découvrez nos nouvelles promotions sur les équipements sportifs."
  },
  "nouveau-client": {
    pertinence: 88, performance: { openRate: "+11%", orders: "+3" },
    email: { A: "Bienvenue dans la famille myfyt13, Startup Innovatech !\n\nNous sommes ravis de vous compter parmi nos clients et nous vous remercions pour votre première commande. Nous sommes convaincus que vous allez adorer la qualité de nos produits.\n\nPour que notre collaboration démarre sur les chapeaux de roue, nous vous offrons -10% sur votre prochaine commande avec le code BIENVENUE10.", B: "Merci pour votre confiance, Startup Innovatech !\n\nVotre première commande n'est que le début d'une grande aventure. Chez myfyt13, nous nous engageons à accompagner tous nos clients vers le succès.\n\nPour vous aider à aller plus loin, votre prochaine commande bénéficiera automatiquement d'une réduction de 10%. C'est le moment idéal pour compléter votre équipement." },
    sms: "Bienvenue chez myfyt13, Startup Innovatech ! Merci pour votre 1ère commande. Profitez de -10% sur la prochaine avec le code BIENVENUE10.", social: "Un grand bienvenue à Startup Innovatech dans la famille #myfyt13 ! Hâte de voir vos équipes briller avec nos couleurs. #NouveauPartenaire", recommendation: "La variante A est recommandée. Le mot 'famille' et le ton direct créent un sentiment d'appartenance fort.", genericEmail: "Bonjour, découvrez nos nouvelles promotions sur les équipements sportifs."
  }
};

const AiLoadingAnimation = () => (
  <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
    <div className="relative h-20 w-20">
      {[...Array(4)].map((_, i) => ( <motion.div key={i} className="absolute inset-0 border-2 border-orange-500 rounded-full" initial={{ scale: 0, opacity: 1 }} animate={{ scale: [0.2, 1, 0.2], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }} /> ))}
      <Wand2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-orange-400" />
    </div>
    <p className="mt-4 text-lg font-semibold text-white">L'IA génère votre campagne...</p>
  </motion.div>
);

const ProfileSelectorCard = ({ profile, setProfile }) => {
  const selectedProfile = profiles[profile];
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader><CardTitle className="text-white">1. Pilotez le Cerveau de l'IA</CardTitle><CardDescription className="text-gray-400">Choisissez un profil pour générer une campagne sur-mesure.</CardDescription></CardHeader>
      <CardContent>
        <Select value={profile} onValueChange={setProfile}><SelectTrigger><SelectValue/></SelectTrigger>
          <SelectContent>{Object.entries(profiles).map(([key, value]) => <SelectItem key={key} value={key}>{value.name}</SelectItem>)}</SelectContent>
        </Select>
        <AnimatePresence mode="wait">
          <motion.div key={profile} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-2 overflow-hidden">
            <div className="flex items-center gap-2"><selectedProfile.icon className={`h-5 w-5 ${selectedProfile.color}`}/><p className="font-semibold text-white">{selectedProfile.description}</p></div>
            <div className="flex justify-around text-center text-xs pt-2">{Object.entries(selectedProfile.kpis).map(([key, value]) => <div key={key}><p className="font-bold text-gray-300">{value}</p><p className="text-gray-500">{key}</p></div>)}</div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

const HowItWorksCard = () => (
  <Card className="bg-gray-800/50 border-gray-700">
    <CardHeader><CardTitle className="text-white text-base flex items-center gap-2"><Info className="h-5 w-5 text-gray-400"/>Comment ça marche ?</CardTitle></CardHeader>
    <CardContent className="text-sm text-gray-400 space-y-3">
      <div className="flex gap-3"><div className="font-bold text-blue-400">1.</div><div>Analyse du profil et de son historique.</div></div>
      <div className="flex gap-3"><div className="font-bold text-blue-400">2.</div><div>Sélection du meilleur canal et de l'objectif.</div></div>
      <div className="flex gap-3"><div className="font-bold text-blue-400">3.</div><div>Génération de plusieurs variantes créatives.</div></div>
      <div className="flex gap-3"><div className="font-bold text-blue-400">4.</div><div>Recommandation de l'option la plus performante.</div></div>
    </CardContent>
  </Card>
);

const AiTipCard = ({ profile }) => (
  <AnimatePresence mode="wait">
    <motion.div key={profile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Card className="bg-gradient-to-r from-blue-900/50 to-gray-800 border-blue-700/50">
        <CardContent className="p-4 flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5"/>
          <div><h4 className="font-semibold text-white">Astuce de l'IA</h4><p className="text-xs text-blue-200">{profiles[profile].tip}</p></div>
        </CardContent>
      </Card>
    </motion.div>
  </AnimatePresence>
);

const DemoMarketing = () => {
  const [profile, setProfile] = useState("club-fidele");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAB, setShowAB] = useState(true);
  const [showGeneric, setShowGeneric] = useState(false);

  useEffect(() => { generateCampaign(); }, [profile]);
  const generateCampaign = () => { setLoading(true); setTimeout(() => { setContent(mockGeminiResponses[profile]); setLoading(false); }, 1800); };

  return (
    <DemoLayout pageTitle="Démo 3: Marketing IA | Elsyvia">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Votre Co-pilote Marketing IA</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">Ne partez plus d'une page blanche. Choisissez un profil, et laissez notre IA générer une campagne multi-canal complète, optimisée pour la conversion.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6 sticky top-10">
          <ProfileSelectorCard profile={profile} setProfile={setProfile} />
          <AiTipCard profile={profile} />
          <HowItWorksCard />
          <Card className="bg-gray-800 border-gray-700">
             <CardHeader><CardTitle className="text-white text-base flex items-center gap-2"><History className="h-5 w-5 text-gray-400"/>Historique (pour ce profil)</CardTitle></CardHeader>
             <CardContent className="text-sm space-y-2">
                {profiles[profile].history.length > 0 ? profiles[profile].history.map(h => (
                    <div key={h.campaign} className="flex justify-between items-center text-gray-400"><span>{h.campaign}</span><span className="font-mono text-xs bg-gray-900 px-2 py-0.5 rounded">{h.perf}</span></div>
                )) : <p className="text-xs text-gray-500">Aucun historique pour ce nouveau client.</p>}
             </CardContent>
          </Card>
          <div className="text-center text-xs text-gray-600 font-semibold tracking-wider">POWERED BY ELSYVIA IA GÉNÉRATIVE</div>
        </div>
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700 text-white relative min-h-[600px]">
            <AnimatePresence>{loading && <AiLoadingAnimation />}</AnimatePresence>
            <AnimatePresence>
            {!loading && content && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Résultat de la Génération IA</CardTitle>
                      <CardDescription className="text-gray-400">Profil ciblé : <span className="font-semibold text-white">{profiles[profile].name}</span></CardDescription>
                    </div>
                    <TooltipProvider><Tooltip><TooltipTrigger asChild><div className="text-center cursor-help"><p className="text-3xl font-bold text-orange-400">{content.pertinence}%</p><p className="text-xs text-gray-400">Score de Pertinence IA</p></div></TooltipTrigger><TooltipContent><p>Note la qualité de l'alignement entre le profil, le message et l'objectif.</p></TooltipContent></Tooltip></TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-gray-900/50 mb-6">
                      <div className="flex items-center gap-4 text-sm font-medium text-gray-300"><label htmlFor="ab-switch">A/B Test par l'IA</label><Switch id="ab-switch" checked={showAB} onCheckedChange={setShowAB} /></div>
                      <div className="flex items-center gap-4 text-sm font-medium text-gray-300"><label htmlFor="generic-switch">Comparer au générique</label><Switch id="generic-switch" checked={showGeneric} onCheckedChange={setShowGeneric} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div className="p-3 bg-gray-900/50 rounded-lg"><p className="font-bold text-lg text-green-400">{content.performance.openRate}</p><p className="text-xs text-gray-400">Taux d'ouverture/clic potentiel</p></div>
                    <div className="p-3 bg-gray-900/50 rounded-lg"><p className="font-bold text-lg text-green-400">{content.performance.orders}</p><p className="text-xs text-gray-400">Commandes supplémentaires estimées</p></div>
                  </div>
                  <Tabs defaultValue="email">
                    <TabsList className="grid w-full grid-cols-3"><TabsTrigger value="email">Email</TabsTrigger><TabsTrigger value="sms">SMS</TabsTrigger><TabsTrigger value="social">Réseau Social</TabsTrigger></TabsList>
                    <TabsContent value="email" className="mt-4">
                      <div className={`grid gap-4 ${showGeneric ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {showGeneric && <div className="p-4 bg-gray-900/50 rounded-lg border border-dashed border-gray-600"><h4 className="font-semibold text-gray-400 mb-2">Message Générique (Avant IA)</h4><p className="text-sm text-gray-500 whitespace-pre-line">{content.genericEmail}</p></div>}
                        <div className={`p-4 rounded-lg bg-gray-900/50 border border-orange-500/50 ${showGeneric ? '' : 'col-span-1'}`}>
                          <h4 className="font-semibold text-white mb-2">Message Personnalisé (Avec IA)</h4>
                          {showAB && (<div className="space-y-4">
                            <div className="text-sm p-3 bg-gray-800 rounded"><p className="font-semibold mb-1">Variante A :</p><p className="text-orange-300 whitespace-pre-line">{content.email.A}</p></div>
                            <div className="text-sm p-3 bg-gray-800 rounded"><p className="font-semibold mb-1">Variante B :</p><p className="text-orange-300 whitespace-pre-line">{content.email.B}</p></div>
                            <div className="p-3 bg-green-900/50 border border-green-700 rounded-lg text-sm"><p className="font-semibold text-green-300 flex items-center gap-2"><ThumbsUp className="h-4 w-4"/> Recommandation IA</p><p className="text-green-400 mt-1">{content.recommendation}</p></div>
                          </div>)}
                          {!showAB && <p className="text-sm text-orange-300 whitespace-pre-line">{content.email.B}</p>}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="sms" className="mt-4 p-4 rounded-lg bg-gray-900/50"><p className="text-sm text-orange-300 whitespace-pre-line">{content.sms}</p></TabsContent>
                    <TabsContent value="social" className="mt-4 p-4 rounded-lg bg-gray-900/50"><p className="text-sm text-orange-300 whitespace-pre-line">{content.social}</p></TabsContent>
                  </Tabs>
                </CardContent>
              </motion.div>
            )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </DemoLayout>
  );
};

export default DemoMarketing;
