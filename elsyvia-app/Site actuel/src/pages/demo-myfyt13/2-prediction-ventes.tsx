// src/pages/demo-myfyt13/2-prediction-ventes.tsx
import { useState, useEffect } from 'react';
import DemoLayout from './DemoLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceArea } from 'recharts';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DÉBUT DE LA CORRECTION : LOGIQUE DE SIMULATION AMÉLIORÉE ---
const fullYearData2025 = [
  { m: 'Jan', VentesRéelles: 220 }, { m: 'Fév', VentesRéelles: 200 }, { m: 'Mar', VentesRéelles: 280 }, { m: 'Avr', VentesRéelles: 320 }, { m: 'Mai', VentesRéelles: 350 }, { m: 'Juin', VentesRéelles: 310 }, { m: 'Juil', VentesRéelles: 290 }, { m: 'Août', VentesRéelles: 380 },
  { m: 'Sep', PrévisionIA: 550, PrévisionAvecPromo: 680, PrévisionAvecRupture: 220, PrévisionAvecCrise: 275 },
  { m: 'Oct', PrévisionIA: 480, PrévisionAvecPromo: 490, PrévisionAvecRupture: 240, PrévisionAvecCrise: 260 },
  // La promo a un effet positif durable, même s'il est moins fort après le pic
  { m: 'Nov', PrévisionIA: 510, PrévisionAvecPromo: 515, PrévisionAvecRupture: 350, PrévisionAvecCrise: 380 },
  { m: 'Déc', PrévisionIA: 450, PrévisionAvecPromo: 455, PrévisionAvecRupture: 400, PrévisionAvecCrise: 400 },
];
// --- FIN DE LA CORRECTION ---

const kpiData = { accuracy: "97%", stockReduction: "-25%", revenueGain: "+18%" };

const promoResults = { gainPotentiel: "+12,500€", stockOptimise: "-5k€", decisionPlusTot: "4 semaines", fiabiliteScenario: "Élevée" };
const ruptureResults = { manqueAGagnerEvite: "-45,000€", stockOptimise: "+12k€ (surstock évité)", decisionPlusTot: "6 semaines", fiabiliteScenario: "Critique" };
const crisisResults = { manqueAGagnerEvite: "-28,000€", stockOptimise: "N/A", decisionPlusTot: "6 semaines", fiabiliteScenario: "Exceptionnel" };

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-gray-950 border border-gray-700 rounded-lg text-sm shadow-xl">
        <p className="label text-white font-bold mb-2">{`${label} 2025`}</p>
        <div className="space-y-1">
          {payload.find(p => p.dataKey === 'VentesRéelles') && <p style={{ color: payload.find(p => p.dataKey === 'VentesRéelles').color }}>Ventes Réelles : <strong>{payload.find(p => p.dataKey === 'VentesRéelles').value}</strong></p>}
          {payload.find(p => p.dataKey === 'PrévisionIA') && <p style={{ color: payload.find(p => p.dataKey === 'PrévisionIA').color }}>Prévision IA : <strong>{payload.find(p => p.dataKey === 'PrévisionIA').value}</strong></p>}
          {payload.find(p => p.dataKey === 'PrévisionSimulée') && <p style={{ color: payload.find(p => p.dataKey === 'PrévisionSimulée').color }}>Scénario Simulé : <strong>{payload.find(p => p.dataKey === 'PrévisionSimulée').value}</strong></p>}
        </div>
      </div>
    );
  }
  return null;
};

const RiskHeatmap = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white text-base">Carte de Chaleur des Prévisions</CardTitle>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-800/80"/>Risque Élevé</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-gray-700/50"/>Activité Normale</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-600/80"/>Forte Activité</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex justify-between text-xs text-center rounded-lg overflow-hidden p-0">
          {data.map(d => {
            const value = d.PrévisionSimulée ?? d.PrévisionIA ?? d.VentesRéelles;
            let bgColor = 'bg-gray-700/50';
            if (value > 500) bgColor = 'bg-green-800/80';
            if (value > 600) bgColor = 'bg-green-600/80';
            if (d.PrévisionSimulée && d.PrévisionSimulée < 300) bgColor = 'bg-red-800/80';
            return (
              <TooltipProvider key={d.m} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex-1 p-2 border-t border-gray-700 ${bgColor} transition-colors duration-500`}><p>{d.m}</p></div>
                  </TooltipTrigger>
                  <TooltipContent><p>Prévision : ~{Math.round(value)} commandes</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ImpactDashboard = ({ results, interpretation }) => {
  if (!results) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gray-800 border-gray-700"><CardHeader><CardTitle className="text-white text-base flex items-center gap-2"><Zap className="text-green-400"/>Interprétation de l'IA</CardTitle></CardHeader><CardContent className="text-sm text-gray-300"><h4 className="font-semibold text-white mb-1">{interpretation.title}</h4><p>{interpretation.text}</p></CardContent></Card>
      </motion.div>
    );
  }
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className={`bg-gray-800 border-${interpretation.type === 'danger' ? 'red' : 'green'}-500/50`}>
        <CardHeader><CardTitle className="text-white text-base flex items-center gap-2">{interpretation.type === 'danger' ? <AlertTriangle className="text-red-400"/> : <Zap className="text-green-400"/>}Impact Stratégique du Scénario</CardTitle></CardHeader>
        <CardContent>
          <h4 className="font-semibold text-white mb-2">{interpretation.title}</h4>
          <p className="text-sm text-gray-300 mb-6">{interpretation.text}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {results.gainPotentiel && <div className="p-3 bg-gray-900/50 rounded-lg"><p className="font-bold text-lg text-green-400">{results.gainPotentiel}</p><p className="text-gray-400 text-xs">Gain Supplémentaire Estimé</p></div>}
            {results.manqueAGagnerEvite && <div className="p-3 bg-gray-900/50 rounded-lg"><p className="font-bold text-lg text-red-400">{results.manqueAGagnerEvite}</p><p className="text-gray-400 text-xs">Manque à Gagner Évité</p></div>}
            <div className="p-3 bg-gray-900/50 rounded-lg"><p className="font-bold text-lg text-blue-400">{results.decisionPlusTot}</p><p className="text-gray-400 text-xs">Décision Prise Plus Tôt</p></div>
            <div className="p-3 bg-gray-900/50 rounded-lg"><p className="font-bold text-lg text-white">{results.stockOptimise}</p><p className="text-gray-400 text-xs">Valeur Stock Optimisé</p></div>
            <div className="p-3 bg-gray-900/50 rounded-lg"><p className={`font-bold text-lg ${results.fiabiliteScenario === 'Élevée' ? 'text-green-400' : 'text-red-400'}`}>{results.fiabiliteScenario}</p><p className="text-gray-400 text-xs">Fiabilité du Scénario</p></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DemoSalesPrediction = () => {
  const [scenarios, setScenarios] = useState({ promo: false, rupture: false });
  const [chartData, setChartData] = useState([]);
  const [aiInterpretation, setAiInterpretation] = useState(null);
  const [simulationResults, setSimulationResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setSimulationResults(null);
    const timer = setTimeout(() => {
      let data = [...fullYearData2025];
      let interpretation = { title: "Prévision Annuelle Standard", text: "L'IA a identifié les deux pics majeurs de l'année. Le tableau de bord d'impact apparaîtra lorsque vous simulerez un scénario.", type: 'info' };
      let results = null;
      
      const hasSimulation = scenarios.promo || scenarios.rupture;
      data = data.map(d => {
        if (!d.PrévisionIA) return { ...d, PrévisionSimulée: null };
        let simulatedValue = d.PrévisionIA;
        if(scenarios.promo && scenarios.rupture) simulatedValue = d.PrévisionAvecCrise;
        else if (scenarios.promo) simulatedValue = d.PrévisionAvecPromo;
        else if (scenarios.rupture) simulatedValue = d.PrévisionAvecRupture;
        return { ...d, PrévisionSimulée: hasSimulation ? simulatedValue : null };
      });
      
      if (scenarios.promo && scenarios.rupture) { 
        interpretation = { title: "Scénario de Crise", text: "Même avec une promotion, l'impact de la rupture est dévastateur. Le pic de Septembre est fortement réduit et la reprise est lente.", type: 'danger' };
        results = crisisResults;
      } else if (scenarios.promo) {
        interpretation = { title: "Impact de la Promotion", text: "La promotion crée un pic de ventes massif en Septembre. L'effet s'estompe ensuite mais reste positif, consolidant une base de ventes plus élevée.", type: 'success' };
        results = promoResults;
      } else if (scenarios.rupture) {
        interpretation = { title: "ALERTE : Rupture Fournisseur", text: "La rupture ampute les ventes de 60% en Septembre. La reprise est progressive mais le manque à gagner est considérable.", type: 'danger' };
        results = ruptureResults;
      }
      
      setChartData(data);
      setAiInterpretation(interpretation);
      setSimulationResults(results);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [scenarios]);

  const toggleScenario = (scenario) => {
    setScenarios(prev => ({ ...prev, [scenario]: !prev[scenario] }));
  };

  return (
    <DemoLayout pageTitle="Démo 2: Prédiction des Ventes | Elsyvia">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">Votre futur commercial, en temps réel.</h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">Notre IA n'est pas une boule de cristal, c'est un moteur stratégique. Simulez des événements sur l'année 2025 et observez l'impact direct sur vos revenus et votre stock.</p>
      </div>
      
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader><CardTitle className="text-white text-center text-xl">✨ Performance de notre IA Prédictive ✨</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-900/50 rounded-lg text-center"><p className="text-4xl font-bold text-green-400">{kpiData.accuracy}</p><p className="text-sm text-gray-400">Fiabilité des prévisions</p></div>
            <div className="p-4 bg-gray-900/50 rounded-lg text-center"><p className="text-4xl font-bold text-green-400">{kpiData.stockReduction}</p><p className="text-sm text-gray-400">Réduction du surstock</p></div>
            <div className="p-4 bg-gray-900/50 rounded-lg text-center"><p className="text-4xl font-bold text-green-400">{kpiData.revenueGain}</p><p className="text-sm text-gray-400">Gain de CA estimé</p></div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-gray-800 border-gray-700 text-white h-full relative">
            <AnimatePresence>
            {isLoading &&
              <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-green-400 animate-spin" />
                <p className="mt-4 text-lg font-semibold">L'IA ajuste les prévisions pour 2025...</p>
              </motion.div>
            }
            </AnimatePresence>
            <CardHeader><CardTitle>Prédiction des Volumes de Commandes - 2025</CardTitle><CardDescription className="text-gray-400">Powered by ElsyvIA Intelligence Artificielle</CardDescription></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="m" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <YAxis domain={[0, 800]} stroke="#9ca3af" tick={{ fill: '#9ca3af' }} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{color: '#f9fafb', bottom: -10}} />
                  <Line isAnimationActive={false} type="monotone" dataKey="VentesRéelles" stroke="#60a5fa" strokeWidth={3} dot={{ r: 5 }} name="Ventes Réelles"/>
                  <Line isAnimationActive={false} type="monotone" dataKey="PrévisionIA" stroke="#a3a3a3" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 4 }} name="Prévision IA Standard" />
                  <AnimatePresence>{ (scenarios.promo || scenarios.rupture) && <Line isAnimationActive={false} type="monotone" dataKey="PrévisionSimulée" stroke={scenarios.rupture ? "#ef4444" : "#22c55e"} strokeWidth={3} dot={{ r: 5 }} name="Prévision du Scénario" /> }</AnimatePresence>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <RiskHeatmap data={chartData} />
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader><CardTitle className="text-white">Pilotez l'IA</CardTitle><CardDescription className="text-gray-400">Simulez des événements sur la rentrée.</CardDescription></CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button onClick={() => toggleScenario('promo')} variant={scenarios.promo ? 'default' : 'outline'} className={scenarios.promo ? 'bg-green-600 hover:bg-green-700' : ''}>Promotion -25%</Button>
              <Button onClick={() => toggleScenario('rupture')} variant={scenarios.rupture ? 'destructive' : 'outline'}>Rupture Fournisseur</Button>
            </CardContent>
          </Card>
          <AnimatePresence>
            {!isLoading && <ImpactDashboard results={simulationResults} interpretation={aiInterpretation} />}
          </AnimatePresence>
        </div>
      </div>
    </DemoLayout>
  );
};

export default DemoSalesPrediction;
