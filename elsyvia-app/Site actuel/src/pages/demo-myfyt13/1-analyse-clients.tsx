// src/pages/demo-myfyt13/1-analyse-clients.tsx
import { useState, useEffect } from 'react';
import DemoLayout from './DemoLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { Lightbulb, Star, Clock, Flame, Info, Sparkles, Send, Loader2, CheckCircle, TrendingUp, UserCheck, BarChartHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DONNÉES DE DÉMO ---
const customerSegments = [
  { name: "Clients Fidèles", value: 45, description: "Achats récurrents et panier élevé.", icon: <Star className="h-6 w-6 text-yellow-400" />, color: "#facc15" },
  { name: "Clients à Relancer", value: 23, description: "N'ont pas commandé depuis plus de 90 jours.", icon: <Clock className="h-6 w-6 text-orange-400" />, color: "#fb923c" },
  { name: "Nouveaux Clients", value: 32, description: "Ont passé leur première commande récemment.", icon: <Flame className="h-6 w-6 text-blue-400" />, color: "#60a5fa" },
];
const fakeClientData = {
  "Clients Fidèles": [ { id: "cf1", name: "Club Sportif de Lyon", lastPurchase: "Il y a 2 semaines", avgBasket: "180€" }, { id: "cf2", name: "Entreprise Tech Solutions", lastPurchase: "Il y a 1 mois", avgBasket: "250€" }, { id: "cf3", name: "Association des Coureurs", lastPurchase: "Il y a 3 semaines", avgBasket: "120€" }, ],
  "Clients à Relancer": [ { id: "cr1", name: "BDE Ingénieurs 2023", lastPurchase: "Il y a 4 mois", avgBasket: "90€" }, { id: "cr2", name: "Ancien Comité d'Entreprise", lastPurchase: "Il y a 6 mois", avgBasket: "75€" }, { id: "cr3", name: "Tournoi de Basket Local", lastPurchase: "Il y a 1 an", avgBasket: "110€" }, ],
  "Nouveaux Clients": [ { id: "cn1", name: "Startup Innovatech", lastPurchase: "La semaine dernière", avgBasket: "300€" }, { id: "cn2", name: "Collège Jean Moulin", lastPurchase: "Il y a 2 jours", avgBasket: "150€" }, ]
};
const getAiRecommendation = (segments) => {
  const prioritySegment = segments.filter(s => s.name !== "Clients Fidèles").reduce((max, segment) => (segment.value > max.value ? segment : max), {name: '', value: 0});
  switch (prioritySegment.name) {
    case "Clients à Relancer": return { title: "Lancez une campagne de réactivation !", text: "Un nombre significatif de vos clients n'a pas commandé récemment. Ciblez-les avec une offre de bienvenue personnalisée pour raviver leur intérêt." };
    case "Nouveaux Clients": return { title: "Concentrez-vous sur la fidélisation.", text: "Vous avez beaucoup de nouveaux clients. C'est une excellente opportunité ! Mettez en place un programme de parrainage pour les transformer en clients fidèles." };
    default: return { title: "Capitalisez sur vos ambassadeurs.", text: "Vos clients fidèles sont votre plus grand atout. Proposez-leur un accès en avant-première à vos nouveautés pour renforcer leur statut privilégié." };
  }
};
const grayCustomerSegments = customerSegments.map(segment => ({ ...segment, color: '#4b5563' }));
const kpiData = [
  { value: "+15%", label: "Conversion Nouveaux > Fidèles", tooltip: "Augmentation du taux de clients passant de 'Nouveau' à 'Fidèle' en 6 mois grâce aux recommandations IA." },
  { value: "-8%", label: "Taux d'attrition (Churn)", tooltip: "Réduction du nombre de clients perdus grâce aux campagnes de relance proactives de l'IA." },
  { value: "98%", label: "Détection Automatique", tooltip: "Pourcentage de la base clients segmentée automatiquement par l'IA, sans aucune intervention manuelle." },
  { value: "+12%", label: "Panier Moyen (Fidèles)", tooltip: "Augmentation du panier moyen des clients fidèles grâce à des offres ciblées et pertinentes." },
];

const DemoClientAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [chartData, setChartData] = useState(grayCustomerSegments);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const aiRecommendation = getAiRecommendation(customerSegments);

  useEffect(() => {
    const timer = setTimeout(() => {
      setChartData(customerSegments);
      setIsAnalyzing(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleModalOpen = (segment) => { setSelectedSegment(segment); setSelectedClients([]); };
  const handleModalClose = () => { setTimeout(() => { setIsSent(false); }, 500); };
  const handleSendEmails = () => { setIsSending(true); setTimeout(() => { setIsSending(false); setIsSent(true); }, 1500); };
  const handleSelectClient = (clientId) => { setSelectedClients(prev => prev.includes(clientId) ? prev.filter(id => id !== clientId) : [...prev, clientId]); };
  const handleSelectAll = (isChecked) => {
    if (isChecked) { setSelectedClients((fakeClientData[selectedSegment?.name] || []).map(c => c.id)); } 
    else { setSelectedClients([]); }
  };

  const currentClientList = fakeClientData[selectedSegment?.name] || [];
  const allSelected = selectedClients.length === currentClientList.length && currentClientList.length > 0;
  const someSelected = selectedClients.length > 0 && !allSelected;

  return (
    <DemoLayout pageTitle="Démo 1: Analyse Clients | Elsyvia">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Qui sont vraiment vos clients ?</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">L'IA vous le révèle instantanément. Visualisez où agir et qui choyer dans votre portefeuille client, sans effort ni connaissance technique.</p>
      </div>
      
      <AnimatePresence>
        {!isAnalyzing && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="mb-8 bg-gray-800/50 border-gray-700">
              <CardHeader><CardTitle className="text-white text-center text-xl">✨ L'Impact de l'IA en Chiffres ✨</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map(kpi => (
                  <TooltipProvider key={kpi.label}><Tooltip><TooltipTrigger asChild>
                    <div className="p-4 bg-gray-900/50 rounded-lg text-center border border-gray-700 hover:border-blue-500/50 transition-colors cursor-help">
                      <p className="text-3xl font-bold text-green-400">{kpi.value}</p>
                      <p className="text-sm text-gray-400">{kpi.label}</p>
                    </div>
                  </TooltipTrigger><TooltipContent><p>{kpi.tooltip}</p></TooltipContent></Tooltip></TooltipProvider>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <Card className="bg-gray-800 border-gray-700 text-white h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChartHorizontal className={`h-6 w-6 ${isAnalyzing ? 'animate-pulse' : 'text-yellow-400'}`} />{isAnalyzing ? "L'IA analyse vos données..." : "Vos profils clients révélés !"}</CardTitle>
              <CardDescription className="text-gray-400">{isAnalyzing ? "Veuillez patienter..." : "Cliquez sur un segment ci-dessous pour voir la liste des clients et agir."}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart><Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} isAnimationActive={true} animationDuration={800}>{chartData.map((entry) => (<Cell key={entry.name} fill={entry.color} stroke={"#1f2937"} />))}</Pie><RechartsTooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} /></PieChart>
              </ResponsiveContainer>
              <AnimatePresence>
                {!isAnalyzing &&
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <div className="mt-4 space-y-3">
                      {customerSegments.map((segment) => (
                        <Dialog key={segment.name} onOpenChange={handleModalClose}>
                          <DialogTrigger asChild><button onClick={() => handleModalOpen(segment)} className="w-full text-left flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer"><div className="flex-shrink-0 pt-1">{segment.icon}</div><div><h4 className="font-semibold text-white">{segment.name} ({segment.value}%)</h4><p className="text-sm text-gray-400">{segment.description}</p></div></button></DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
                            <DialogHeader><DialogTitle className="flex items-center gap-2 text-xl">{selectedSegment?.icon} Liste des {selectedSegment?.name}</DialogTitle></DialogHeader>
                            <AnimatePresence mode="wait">
                              {isSent ? (<motion.div key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 flex flex-col items-center justify-center"><CheckCircle className="h-16 w-16 text-green-500 mb-4" /><h3 className="text-xl font-semibold text-white">Campagne de relance simulée !</h3><p className="text-gray-400">Les emails personnalisés ont été envoyés avec succès.</p></motion.div>) 
                              : (<motion.div key="table"><p className="text-sm text-gray-400 mb-4">Sélectionnez les clients que vous souhaitez contacter. L'IA rédigera un email personnalisé pour chacun.</p><div className="border border-gray-700 rounded-lg max-h-64 overflow-y-auto"><Table><TableHeader><TableRow className="hover:bg-gray-700/80 border-b-gray-700"><TableHead className="w-12"><Checkbox checked={allSelected || (someSelected ? "indeterminate" : false)} onCheckedChange={handleSelectAll} /></TableHead><TableHead className="text-white">Nom du Client</TableHead><TableHead className="text-white">Dernier Achat</TableHead><TableHead className="text-white">Panier Moyen</TableHead></TableRow></TableHeader><TableBody>{currentClientList.map(client => (<TableRow key={client.id} className="hover:bg-gray-700/80 border-b-gray-700"><TableCell><Checkbox checked={selectedClients.includes(client.id)} onCheckedChange={() => handleSelectClient(client.id)} /></TableCell><TableCell>{client.name}</TableCell><TableCell>{client.lastPurchase}</TableCell><TableCell>{client.avgBasket}</TableCell></TableRow>))}</TableBody></Table></div><DialogFooter className="mt-6"><Button onClick={handleSendEmails} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto" disabled={isSending || selectedClients.length === 0}>{isSending ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Send className="h-4 w-4 mr-2"/>}{isSending ? 'Envoi en cours...' : `Relancer les ${selectedClients.length} client(s)`}</Button></DialogFooter></motion.div>)}
                            </AnimatePresence>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence>
            {!isAnalyzing && (
              <>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  <Card className="bg-gradient-to-br from-blue-900/70 to-gray-800 border-blue-500/50">
                    <CardHeader><CardTitle className="flex items-center gap-3 text-white"><Lightbulb className="h-6 w-6 text-blue-400"/> Recommandation de l'IA</CardTitle></CardHeader>
                    <CardContent className="space-y-2"><h3 className="font-semibold text-lg text-white">{aiRecommendation.title}</h3><p className="text-blue-200">{aiRecommendation.text}</p></CardContent>
                  </Card>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
                   <Card className="bg-gray-800 border-gray-700">
                    <CardHeader><CardTitle className="text-white text-base">Vos Bénéfices Directs</CardTitle></CardHeader>
                    <CardContent className="text-sm space-y-3">
                      <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-green-400"/><div><h4 className="font-semibold text-white">Gain de Temps : ~2h / mois</h4><p className="text-xs text-gray-400">Finies les analyses manuelles, l'IA travaille pour vous.</p></div></div>
                      <div className="flex items-center gap-3"><UserCheck className="h-5 w-5 text-green-400"/><div><h4 className="font-semibold text-white">Décisions Fiables</h4><p className="text-xs text-gray-400">Actions basées sur des données objectives, pas sur l'intuition.</p></div></div>
                    </CardContent>
                  </Card>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DemoLayout>
  );
};

export default DemoClientAnalysis;
