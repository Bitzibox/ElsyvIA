// src/pages/demo-myfyt13/4-besoins-saisonniers.tsx
import { useState, useEffect } from 'react';
import DemoLayout from './DemoLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Sparkles, Loader2, DollarSign, Package, Users, ShieldCheck, Clock, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DONNÉES DE DÉMO STRATÉGIQUES CORRIGÉES ET ENRICHIES ---
const seasonalData = {
  "Mars": {
    base: { ca: 28, stock: 350, effectif: 3, risqueRupture: 15 },
    promo: { ca: 32, stock: 400, effectif: 3, risqueRupture: 20 },
    retard: { ca: 25, stock: 300, effectif: 3, risqueRupture: 35 },
    iaReco: "Activité modérée post-hiver. L'IA suggère de préparer les collections de printemps et de liquider les stocks d'hiver restants.",
    iaWhy: "L'analyse historique montre une transition des demandes. L'IA recommande une promotion ciblée sur les produits de fin de saison."
  },
  "Juin": {
    base: { ca: 31, stock: 400, effectif: 3, risqueRupture: 10 },
    promo: { ca: 35, stock: 450, effectif: 4, risqueRupture: 15 },
    retard: { ca: 25, stock: 300, effectif: 3, risqueRupture: 40 },
    iaReco: "Activité estivale stable. Concentrez-vous sur les produits liés aux événements en extérieur.",
    iaWhy: "Basé sur les ventes des 2 dernières années et une faible tendance sur les réseaux sociaux, le risque de pic inattendu est faible."
  },
  "Sept.": {
    base: { ca: 55, stock: 800, effectif: 5, risqueRupture: 35 },
    promo: { ca: 68, stock: 1000, effectif: 6, risqueRupture: 50 },
    retard: { ca: 22, stock: 350, effectif: 5, risqueRupture: 95 },
    iaReco: "PIC MAJEUR de la rentrée sportive. Augmentation critique des stocks de maillots et sacs requise DÈS MI-AOÛT.",
    iaWhy: "Le modèle combine l'historique des ventes (+70%), les tendances de recherche Google pour 'équipement club' (+20%) et les calendriers sportifs (+10%)."
  },
  "Déc.": {
    base: { ca: 45, stock: 600, effectif: 4, risqueRupture: 25 },
    promo: { ca: 52, stock: 700, effectif: 5, risqueRupture: 30 },
    retard: { ca: 38, stock: 500, effectif: 4, risqueRupture: 55 },
    iaReco: "Forte demande pour les cadeaux de fin d'année. Préparez des coffrets cadeaux et assurez les stocks dès Novembre.",
    iaWhy: "L'analyse des commentaires clients de l'année N-1 montre une forte demande pour des 'idées cadeaux'."
  }
};
const months = ["Mars", "Juin", "Sept.", "Déc."];

// --- SOUS-COMPOSANT KPI CARD AMÉLIORÉ ---
const KpiCard = ({ icon: Icon, value, baseValue, label, tooltip, colorClass, unit = "" }) => {
  const change = baseValue && value !== baseValue ? ((value / baseValue - 1) * 100).toFixed(0) : 0;
  const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';
  
  return (
    <TooltipProvider delayDuration={100}> <Tooltip> <TooltipTrigger asChild>
      <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-center">
        <div className="flex justify-center items-center gap-2">
          <Icon className={`h-5 w-5 ${colorClass}`} />
          <p className="text-2xl font-bold text-white">{value}{unit}</p>
          <AnimatePresence>
            {change !== 0 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`flex items-center text-sm font-bold ${changeColor}`}>
                ({change > 0 ? '+' : ''}{change}%)
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-sm text-gray-400 mt-1">{label}</p>
      </div>
    </TooltipTrigger> <TooltipContent><p>{tooltip}</p></TooltipContent> </Tooltip> </TooltipProvider>
  );
};

const DemoSeasonal = () => {
  const [selectedMonth, setSelectedMonth] = useState("Sept.");
  const [activeScenario, setActiveScenario] = useState("base");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  
  const currentData = seasonalData[selectedMonth];
  const scenarioData = currentData[activeScenario] || currentData.base;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const data = seasonalData[selectedMonth];
      if (data) {
        setChartData([
          { name: 'CA Potentiel (€k)', base: data.base.ca, scenario: data[activeScenario]?.ca ?? data.base.ca },
          { name: 'Stock Requis (unités)', base: data.base.stock, scenario: data[activeScenario]?.stock ?? data.base.stock },
          { name: 'Risque de Rupture (%)', base: data.base.risqueRupture, scenario: data[activeScenario]?.risqueRupture ?? data.base.risqueRupture },
        ]);
      }
      setIsLoading(false);
    }, 1200);
  }, [selectedMonth, activeScenario]);

  const handleMonthSelect = (month) => {
    if (month === selectedMonth) return;
    setIsLoading(true);
    setActiveScenario('base');
    setSelectedMonth(month);
  };
  const handleSimulate = (scenario) => {
    setIsLoading(true);
    setActiveScenario(prev => prev === scenario ? 'base' : scenario);
  };

  return (
    <DemoLayout pageTitle="Démo 4: Besoins Saisonniers | Elsyvia">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Votre Planificateur Stratégique IA</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">Anticipez l'imprévu et saisissez chaque opportunité. Naviguez dans le temps, simulez des scénarios et laissez notre IA transformer vos risques saisonniers en profits planifiés.</p>
      </div>
      <Card className="bg-gray-800/50 border-gray-700 mb-8">
        <CardContent className="p-4 flex justify-around">
          {months.map(month => (<button key={month} onClick={() => handleMonthSelect(month)} className={`px-4 py-2 text-sm md:text-base md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-300 ${selectedMonth === month ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>{month} 2025</button>))}
        </CardContent>
      </Card>
      <div className="relative">
        <AnimatePresence>
          {isLoading && (<motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg"><Loader2 className="h-12 w-12 text-purple-400 animate-spin" /><p className="mt-4 text-lg font-semibold">L'IA met à jour le planning...</p></motion.div>)}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div key={selectedMonth} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader><CardTitle className="text-white">Prévisions Stratégiques pour <span className="text-purple-400">{selectedMonth}</span></CardTitle><CardDescription className="text-gray-400">Powered by ElsyvIA</CardDescription></CardHeader>
                  <CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={chartData} layout="vertical" barCategoryGap="20%"><XAxis type="number" hide /><YAxis type="category" dataKey="name" width={150} tick={{ fill: '#d1d5db' }} stroke="#4b5563" /><RechartsTooltip cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} /><Legend wrapperStyle={{color: '#f9fafb', bottom: -10}} /><Bar dataKey="base" fill="#6b7280" name="Prévision Standard" radius={[0, 4, 4, 0]} /><Bar dataKey="scenario" fill="#a855f7" name="Prévision Scénario" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></CardContent>
                </Card>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader><CardTitle className="text-white">Simulateur d'Événements</CardTitle><CardDescription className="text-gray-400">Quel est l'impact d'un imprévu ?</CardDescription></CardHeader>
                  <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => handleSimulate('promo')} variant={activeScenario === 'promo' ? 'default' : 'outline'} className={`w-full ${activeScenario === 'promo' ? 'bg-green-600 hover:bg-green-700' : ''}`}>Promo Ciblée (-15%)</Button>
                    <Button onClick={() => handleSimulate('retard')} variant={activeScenario === 'retard' ? 'destructive' : 'outline'} className="w-full">Retard Fournisseur (-2 sem.)</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                 <Card className="bg-gradient-to-br from-purple-900/70 to-gray-800 border-purple-500/50 sticky top-10">
                   <CardHeader><CardTitle className="flex items-center gap-3 text-white"><Sparkles className="h-6 w-6 text-purple-300"/>Préconisation de l'IA</CardTitle></CardHeader>
                   <CardContent><p className="text-purple-200 text-sm">{currentData.iaReco}</p></CardContent>
                 </Card>
                 <Card className="bg-gray-800 border-gray-700">
                    <CardHeader><CardTitle className="text-white text-base">Pourquoi cette recommandation ?</CardTitle></CardHeader>
                    <CardContent className="text-sm text-gray-400">{currentData.iaWhy}</CardContent>
                 </Card>
                 <Card className="bg-gray-800 border-gray-700">
                    <CardHeader><CardTitle className="text-white text-base">Tableau de Bord d'Impact</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <KpiCard icon={DollarSign} value={scenarioData.ca} baseValue={currentData.base.ca} unit="k€" label="Gain de CA" colorClass="text-green-400" tooltip="Gain de chiffre d'affaires estimé par l'IA pour ce mois." />
                      <KpiCard icon={Package} value={scenarioData.risqueRupture} baseValue={currentData.base.risqueRupture} unit="%" label="Risque de Rupture" colorClass={scenarioData.risqueRupture > 50 ? "text-red-400" : "text-green-400"} tooltip="Probabilité de rupture de stock sur les produits clés." />
                      <KpiCard icon={Users} value={scenarioData.effectif} baseValue={currentData.base.effectif} label="Équipe Préconisée" colorClass="text-blue-400" tooltip="Nombre de personnes recommandées à l'atelier." />
                      <KpiCard icon={ShieldCheck} value={currentData.iaConfidence} unit="%" label="Confiance IA" colorClass="text-blue-400" tooltip="Niveau de confiance de l'IA dans ses prévisions." />
                    </CardContent>
                 </Card>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </DemoLayout>
  );
};

export default DemoSeasonal;
