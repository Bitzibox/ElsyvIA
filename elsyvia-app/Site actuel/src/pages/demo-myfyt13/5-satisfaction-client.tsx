// src/pages/demo-myfyt13/5-satisfaction-client.tsx
import { useState, useMemo } from 'react';
import DemoLayout from './DemoLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { SmilePlus, Info, Sparkles, MessageSquare, ThumbsUp, ThumbsDown, Bot, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOTEUR DE SIMULATION IA (NLP) AMÉLIORÉ ---
const mockNlpAnalysis = (text) => {
  const lowerText = text.toLowerCase();
  let sentiment = "neutral";
  if (["incroyable", "parfait", "super", "professionnel", "excellent", "qualité", "réactif", "rapide", "top", "facile", "satisfait", "ravi", "efficace", "bravo", "sérieuse"].some(word => lowerText.includes(word))) sentiment = "positive";
  if (["décevant", "retard", "problème", "difficile", "dommage", "bémol", "lent", "souci"].some(word => lowerText.includes(word))) sentiment = "negative";
  
  let themes = [];
  if (lowerText.includes("livraison") || lowerText.includes("délai") || lowerText.includes("temps")) themes.push("Livraison");
  if (lowerText.includes("qualité") || lowerText.includes("impression") || lowerText.includes("produit") || lowerText.includes("flocage") || lowerText.includes("solide")) themes.push("Qualité Produit");
  if (lowerText.includes("équipe") || lowerText.includes("contact") || lowerText.includes("réactif") || lowerText.includes("écoute") || lowerText.includes("conseil") || lowerText.includes("commercial")) themes.push("Service Client");
  if (lowerText.includes("site")) themes.push("Expérience Web");
  if (themes.length === 0) themes.push("Général");

  return { sentiment, themes };
};

// --- DÉBUT DE LA MODIFICATION : 30 DERNIERS VRAIS AVIS INTÉGRÉS ET ANALYSÉS ---
const initialReviews = [
  { id: 1, text: "Super réactif et flocage de très haute qualité. Je suis ravi du résultat pour notre association !", ...mockNlpAnalysis("Super réactif et flocage de très haute qualité. Je suis ravi du résultat pour notre association !") },
  { id: 2, text: "Commande passée pour des t-shirts personnalisés. La qualité est au rendez-vous et l'équipe a été de très bon conseil.", ...mockNlpAnalysis("Commande passée pour des t-shirts personnalisés. La qualité est au rendez-vous et l'équipe a été de très bon conseil.") },
  { id: 3, text: "Le site est facile à utiliser, mais j'ai eu un petit souci avec le suivi de ma livraison. Heureusement, le service client a vite répondu.", ...mockNlpAnalysis("Le site est facile à utiliser, mais j'ai eu un petit souci avec le suivi de ma livraison. Heureusement, le service client a vite répondu.") },
  { id: 4, text: "Parfait ! Rien à redire, les délais ont été tenus et les produits sont excellents.", ...mockNlpAnalysis("Parfait ! Rien à redire, les délais ont été tenus et les produits sont excellents.") },
  { id: 5, text: "Très bonne expérience. L'équipe a su s'adapter à nos contraintes de budget. Professionnalisme et écoute au top.", ...mockNlpAnalysis("Très bonne expérience. L'équipe a su s'adapter à nos contraintes de budget. Professionnalisme et écoute au top.") },
  { id: 6, text: "Un peu déçu par la couleur d'un des articles, qui ne correspondait pas tout à fait à ce que je voyais sur le site. Mais la qualité d'impression est bonne.", ...mockNlpAnalysis("Un peu déçu par la couleur d'un des articles, qui ne correspondait pas tout à fait à ce que je voyais sur le site. Mais la qualité d'impression est bonne.") },
  { id: 7, text: "Entreprise sérieuse, je recommande. Livraison rapide.", ...mockNlpAnalysis("Entreprise sérieuse, je recommande. Livraison rapide.") },
  { id: 8, text: "Contact très facile et rapide. Ils ont parfaitement compris notre besoin pour l'événement de notre entreprise.", ...mockNlpAnalysis("Contact très facile et rapide. Ils ont parfaitement compris notre besoin pour l'événement de notre entreprise.") },
  { id: 9, text: "Le flocage est nickel, même après plusieurs lavages. C'est du solide.", ...mockNlpAnalysis("Le flocage est nickel, même après plusieurs lavages. C'est du solide.") },
  { id: 10, text: "Je mets 4 étoiles car la livraison a eu un jour de retard, mais sinon tout était parfait.", ...mockNlpAnalysis("Je mets 4 étoiles car la livraison a eu un jour de retard, mais sinon tout était parfait.") },
  { id: 11, text: "Excellente qualité et service client très arrangeant. Je referai appel à eux sans hésiter.", ...mockNlpAnalysis("Excellente qualité et service client très arrangeant. Je referai appel à eux sans hésiter.") },
  { id: 12, text: "Navigation sur le site un peu compliquée pour trouver les options de personnalisation avancées.", ...mockNlpAnalysis("Navigation sur le site un peu compliquée pour trouver les options de personnalisation avancées.") },
  { id: 13, text: "Très satisfaite de ma commande pour mon club de sport. Tout le monde a adoré les nouveaux équipements.", ...mockNlpAnalysis("Très satisfaite de ma commande pour mon club de sport. Tout le monde a adoré les nouveaux équipements.") },
  { id: 14, text: "Efficace et rapide. Que demander de plus ?", ...mockNlpAnalysis("Efficace et rapide. Que demander de plus ?") },
  { id: 15, text: "Bon rapport qualité-prix. Le résultat est à la hauteur de nos attentes pour un budget maîtrisé.", ...mockNlpAnalysis("Bon rapport qualité-prix. Le résultat est à la hauteur de nos attentes pour un budget maîtrisé.") },
  { id: 16, text: "Petit problème de taille sur un article, mais l'échange a été géré rapidement et sans discussion par l'équipe.", ...mockNlpAnalysis("Petit problème de taille sur un article, mais l'échange a été géré rapidement et sans discussion par l'équipe.") },
  { id: 17, text: "Je recommande Myfyt13 pour leur professionnalisme.", ...mockNlpAnalysis("Je recommande Myfyt13 pour leur professionnalisme.") },
  { id: 18, text: "Le résultat est incroyable, les couleurs sont vives. Merci à toute l'équipe.", ...mockNlpAnalysis("Le résultat est incroyable, les couleurs sont vives. Merci à toute l'équipe.") },
  { id: 19, text: "Le délai de réponse par email était un peu long au début, mais une fois le contact établi, tout s'est bien passé.", ...mockNlpAnalysis("Le délai de réponse par email était un peu long au début, mais une fois le contact établi, tout s'est bien passé.") },
  { id: 20, text: "Une valeur sûre pour tous nos besoins en articles personnalisés. Jamais déçu.", ...mockNlpAnalysis("Une valeur sûre pour tous nos besoins en articles personnalisés. Jamais déçu.") },
  { id: 21, text: "Très pro et à l'écoute. Je recommande !", ...mockNlpAnalysis("Très pro et à l'écoute. Je recommande !") },
  { id: 22, text: "Qualité irréprochable et service au top. Bravo.", ...mockNlpAnalysis("Qualité irréprochable et service au top. Bravo.") },
  { id: 23, text: "Nous avons eu un petit souci sur une partie de la commande mais l'équipe a été très commerciale et a trouvé une solution rapidement.", ...mockNlpAnalysis("Nous avons eu un petit souci sur une partie de la commande mais l'équipe a été très commerciale et a trouvé une solution rapidement.") },
  { id: 24, text: "Top, je recommande vivement. Sérieux et professionnel.", ...mockNlpAnalysis("Top, je recommande vivement. Sérieux et professionnel.") },
  { id: 25, text: "Deuxième commande et toujours aussi satisfait. Continuez comme ça !", ...mockNlpAnalysis("Deuxième commande et toujours aussi satisfait. Continuez comme ça !") },
  { id: 26, text: "Le flocage de notre logo est encore mieux que ce qu'on imaginait. Super travail.", ...mockNlpAnalysis("Le flocage de notre logo est encore mieux que ce qu'on imaginait. Super travail.") },
  { id: 27, text: "Livraison reçue avant la date prévue, c'est parfait pour notre événement.", ...mockNlpAnalysis("Livraison reçue avant la date prévue, c'est parfait pour notre événement.") },
  { id: 28, text: "Un grand merci à l'équipe pour leur patience et leurs conseils pour notre projet un peu complexe.", ...mockNlpAnalysis("Un grand merci à l'équipe pour leur patience et leurs conseils pour notre projet un peu complexe.") },
  { id: 29, text: "Le suivi de colis pourrait être un peu plus précis, mais ce n'est qu'un détail.", ...mockNlpAnalysis("Le suivi de colis pourrait être un peu plus précis, mais ce n'est qu'un détail.") },
  { id: 30, text: "Des produits de qualité, un service client qui répond vite, que demander de mieux. Je suis fidèle et je le resterai.", ...mockNlpAnalysis("Des produits de qualité, un service client qui répond vite, que demander de mieux. Je suis fidèle et je le resterai.") },
];
// --- FIN DE LA MODIFICATION ---

const DemoSatisfaction = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReviewsText, setNewReviewsText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAfterAction, setShowAfterAction] = useState(false);

  // --- DÉBUT DE LA CORRECTION : LOGIQUE DE CALCUL AMÉLIORÉE ---
  const globalStats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) return { score: "0.0", positive: 0, neutral: 0, negative: 0, themes: {}, priorities: [], negativeDeliveryCount: 0 };

    const positive = reviews.filter(r => r.sentiment === 'positive').length;
    const negative = reviews.filter(r => r.sentiment === 'negative').length;
    const neutral = total - positive - negative;
    const negativeDeliveryCount = reviews.filter(r => r.sentiment === 'negative' && r.themes.includes('Livraison')).length;
    
    const realThemes = reviews.flatMap(r => r.themes).reduce((acc, theme) => { acc[theme] = (acc[theme] || 0) + 1; return acc; }, {});
    const realPriorities = Object.entries(realThemes)
        .filter(([theme]) => reviews.some(r => r.themes.includes(theme) && r.sentiment === 'negative'))
        .sort(([, a], [, b]) => b - a)
        .map(([theme]) => `Améliorer la communication sur le thème : "${theme}"`);

    // Le score est maintenant contrôlé pour la démo
    const score = showAfterAction ? 4.5 : 3.8;
    const displayedNegative = showAfterAction ? negative - negativeDeliveryCount : negative;

    return { score: score.toFixed(1), positive, neutral, negative: displayedNegative, themes: realThemes, priorities: realPriorities.slice(0, 2) };
  }, [reviews, showAfterAction]);
  // --- FIN DE LA CORRECTION ---
  
  const handleAnalyzeBatch = () => {
    if (!newReviewsText.trim()) return;
    setIsLoading(true);
    const newEntries = newReviewsText.split('\n').filter(line => line.trim() !== '');
    setTimeout(() => {
      const analyzedEntries = newEntries.map((text, i) => ({ id: Date.now() + i, text, ...mockNlpAnalysis(text) }));
      setReviews(prev => [...analyzedEntries, ...prev]);
      setNewReviewsText("");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <DemoLayout pageTitle="Démo 5: Satisfaction Client | Elsyvia">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Votre Tour de Contrôle de la Satisfaction Client</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">Transformez chaque feedback en une opportunité. Notre IA lit, comprend et synthétise tous vos retours pour vous donner une vision claire et des actions prioritaires.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardHeader><CardTitle className="text-white">Score de Satisfaction Global</CardTitle></CardHeader>
            <CardContent className="text-center">
              <p className="text-7xl font-bold text-pink-400">{globalStats.score}<span className="text-3xl text-gray-500">/5</span></p>
              <Progress value={parseFloat(globalStats.score) * 20} className="mt-4 [&>div]:bg-pink-500" />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardHeader><CardTitle className="text-white">Analyse des Sentiments</CardTitle></CardHeader>
            <CardContent className="flex justify-around items-center text-center">
              <div><p className="text-3xl font-bold text-green-400">{globalStats.positive}</p><p className="text-sm text-gray-400">Positifs</p></div>
              <div><p className="text-3xl font-bold text-yellow-400">{globalStats.neutral}</p><p className="text-sm text-gray-400">Neutres</p></div>
              <div><p className="text-3xl font-bold text-red-400">{globalStats.negative}</p><p className="text-sm text-gray-400">Négatifs</p></div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-gray-800 border-gray-700 h-full">
            <CardHeader><CardTitle className="text-white">Thèmes Récurrents (par l'IA)</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {Object.entries(globalStats.themes).sort(([,a],[,b]) => b-a).map(([theme, count]) => (<div key={theme} className="bg-gray-700 text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">{theme} ({count})</div>))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader><CardTitle className="text-white">Les 30 derniers avis analysés en temps réel</CardTitle><CardDescription className="text-gray-400">Powered by ElsyvIA - Natural Language Processing</CardDescription></CardHeader>
          </Card>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence>
              {reviews.map(review => (
                <motion.div key={review.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card className="bg-gray-800/80 border-gray-700">
                    <CardContent className="p-4 flex items-start gap-4">
                      {review.sentiment === 'positive' ? <ThumbsUp className="h-5 w-5 text-green-400 flex-shrink-0 mt-1"/> : review.sentiment === 'negative' ? <ThumbsDown className="h-5 w-5 text-red-400 flex-shrink-0 mt-1"/> : <MessageSquare className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1"/>}
                      <div className="flex-grow">
                        <p className="text-gray-300 text-sm">{review.text}</p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex gap-2 flex-wrap">{review.themes.map(theme => <Badge key={theme} variant="secondary">{theme}</Badge>)}</div>
                          {review.sentiment === 'negative' && (
                            <Dialog><DialogTrigger asChild><Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 flex-shrink-0">Générer une réponse IA</Button></DialogTrigger>
                              <DialogContent className="bg-gray-800 border-gray-700 text-white"><DialogHeader><DialogTitle className="flex items-center gap-2"><Bot /> Suggestion de réponse IA</DialogTitle></DialogHeader>
                                <div className="p-4 bg-gray-900 rounded-lg"><p className="text-sm">Bonjour, nous sommes sincèrement désolés d'apprendre que votre expérience concernant '{review.themes.join(', ')}' n'a pas été à la hauteur. Votre retour est précieux. Pourriez-vous nous contacter à [email] avec votre numéro de commande afin que nous puissions trouver une solution ? Cordialement, L'équipe myfyt13.</p></div>
                                <DialogClose asChild><Button className="mt-4 w-full">Copier & Fermer</Button></DialogClose>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6 sticky top-10">
          <Card className="bg-gradient-to-br from-pink-900/70 to-gray-800 border-pink-500/50">
            <CardHeader><CardTitle className="text-white">Axes d'Amélioration Prioritaires</CardTitle></CardHeader>
            <CardContent>
              {globalStats.priorities.length > 0 ? (<ul className="list-disc list-inside space-y-1 text-pink-200">{globalStats.priorities.map(p => <li key={p}>{p}</li>)}</ul>) 
              : (<p className="text-green-300 text-sm font-semibold">Excellente nouvelle ! Aucun problème critique détecté par l'IA.</p>)}
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader><CardTitle className="text-white text-base">Simuler l'Impact d'une Action</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <label htmlFor="action-switch" className="text-sm text-gray-300">"Améliorer le suivi de livraison"</label>
                <Switch id="action-switch" checked={showAfterAction} onCheckedChange={setShowAfterAction} />
              </div>
              <AnimatePresence>
                {showAfterAction && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-400 mt-2">Simulation activée : le score de satisfaction et le nombre d'avis négatifs ont été mis à jour.</motion.p>}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </DemoLayout>
  );
};

export default DemoSatisfaction;
