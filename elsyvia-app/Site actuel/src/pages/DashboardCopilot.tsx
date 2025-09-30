import React, { useState, useEffect, useMemo, FC } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  Users, Target, DollarSign, Zap, BrainCircuit, Lightbulb, AlertTriangle, Mail, Map, 
  Filter, Calendar, Award, TrendingUp, ChevronDown, ChevronsRight, Bot, SlidersHorizontal,
  Briefcase, Building, Sun, Moon, UserCheck, Star, Trophy, KeyRound, Loader, Check
} from 'lucide-react';

// --- TYPES & INTERFACES ---
type UserProfile = 'ceo' | 'manager' | 'sales';
type Theme = 'light' | 'dark';

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: 'Prospect' | 'Qualified' | 'Demo' | 'Proposal' | 'Closed';
  closeDate: string;
  probability: number;
  salesRep: string;
  source: 'Web' | 'Referral' | 'Partner';
  region: 'North' | 'South' | 'East' | 'West';
  lastActivity: string;
}

interface Kpi {
  title: string;
  value: number;
  previousValue: number;
  format: 'currency' | 'percent' | 'number';
  icon: FC<any>;
}

interface AiRecommendation {
  id: string;
  type: 'opportunity' | 'risk' | 'upsell';
  text: string;
  dealId: string;
  priority: 'high' | 'medium' | 'low';
}

interface Filters {
    salesRep: string;
    source: string;
    region: string;
}

// --- MOCK DATA & SIMULATION HOOKS ---
const MOCK_DEALS: Deal[] = [
  { id: 'd1', name: 'Project Titan', company: 'Innovate Corp', value: 150000, stage: 'Proposal', closeDate: '2025-09-15', probability: 0.7, salesRep: 'Alice', source: 'Web', region: 'North', lastActivity: '2025-08-05' },
  { id: 'd2', name: 'Project Phoenix', company: 'Future Systems', value: 75000, stage: 'Qualified', closeDate: '2025-10-20', probability: 0.4, salesRep: 'Bob', source: 'Referral', region: 'West', lastActivity: '2025-08-01' },
  { id: 'd3', name: 'Data Migration', company: 'Global Tech', value: 250000, stage: 'Closed', closeDate: '2025-07-30', probability: 1, salesRep: 'Alice', source: 'Partner', region: 'East', lastActivity: '2025-07-28' },
  { id: 'd4', name: 'Cloud Solution', company: 'StartupX', value: 50000, stage: 'Demo', closeDate: '2025-09-25', probability: 0.5, salesRep: 'Charlie', source: 'Web', region: 'South', lastActivity: '2025-08-07' },
  { id: 'd5', name: 'CRM Integration', company: 'Innovate Corp', value: 45000, stage: 'Prospect', closeDate: '2025-11-10', probability: 0.1, salesRep: 'Bob', source: 'Web', region: 'North', lastActivity: '2025-07-15' },
  { id: 'd6', name: 'AI Analytics Platform', company: 'DataDriven Inc.', value: 320000, stage: 'Qualified', closeDate: '2025-10-05', probability: 0.6, salesRep: 'Alice', source: 'Partner', region: 'West', lastActivity: '2025-08-06' },
  { id: 'd7', name: 'E-commerce Overhaul', company: 'Retail Giant', value: 450000, stage: 'Prospect', closeDate: '2025-12-01', probability: 0.2, salesRep: 'Charlie', source: 'Web', region: 'East', lastActivity: '2025-06-20' },
];

const useCrmData = (filters: Filters) => {
  return useMemo(() => {
    return MOCK_DEALS.filter(deal => {
      const { salesRep, source, region } = filters;
      if (salesRep && deal.salesRep !== salesRep) return false;
      if (source && deal.source !== source) return false;
      if (region && deal.region !== region) return false;
      return true;
    });
  }, [filters]);
};

// --- HOOK IA AVEC GEMINI (FINAL) ---
const useAiEngine = (deals: Deal[], apiKey: string): { recommendations: AiRecommendation[], alerts: AiRecommendation[], loading: boolean, error: string | null } => {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
  const [alerts, setAlerts] = useState<AiRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey || deals.length === 0) {
      setRecommendations([]);
      setAlerts([]);
      return;
    }

    const generateAnalysis = async () => {
      setLoading(true);
      setError(null);
      
      const prompt = `
        Analyze the following B2B sales deals and provide actionable insights.
        Today's date is ${new Date().toISOString().split('T')[0]}.

        Deals data:
        ${JSON.stringify(deals, null, 2)}

        Based on this data, identify:
        1.  Risks: Deals that are stalled (lastActivity > 14 days ago) or have low probability but high value.
        2.  Opportunities: High-value deals in late stages, or potential for upsell.

        Return ONLY a valid JSON object with two keys: "recommendations" and "alerts".
        Each item in the arrays must follow this TypeScript interface:
        interface AiRecommendation {
          id: string; // deal.id
          type: 'opportunity' | 'risk' | 'upsell';
          text: string; // The analysis text in French.
          dealId: string;
          priority: 'high' | 'medium' | 'low';
        }
        Provide at least one risk and one opportunity if applicable. Do not wrap the JSON in markdown.
      `;

      try {
        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          },
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorBody = await response.json();
          console.error("API Error Response:", errorBody);
          throw new Error(`API error: ${response.status} ${response.statusText}. ${errorBody?.error?.message || ''}`);
        }

        const result = await response.json();
        const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!textResponse) {
            throw new Error("Empty response from AI.");
        }
        
        const parsedData = JSON.parse(textResponse);
        setRecommendations(parsedData.recommendations || []);
        setAlerts(parsedData.alerts || []);

      } catch (e: any) {
        console.error("Gemini API call failed:", e);
        setError(`Erreur IA : ${e.message}. Vérifiez la console pour plus de détails.`);
        setRecommendations([]);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
        generateAnalysis();
    }, 1000); // Debounce to avoid too many API calls while filtering

    return () => clearTimeout(debounceTimer);

  }, [deals, apiKey]);

  return { recommendations, alerts, loading, error };
};


// --- UI COMPONENTS ---

const Header: FC<{ userProfile: UserProfile; onProfileChange: (p: UserProfile) => void; theme: Theme; onThemeChange: () => void }> = ({ userProfile, onProfileChange, theme, onThemeChange }) => {
  const profileText = { ceo: "Vue d'Ensemble (CEO)", manager: "Performance Équipe (Manager)", sales: "Mon Portefeuille (Commercial)" };
  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
          <BrainCircuit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{profileText[userProfile]}</h1>
      </div>
      <div className="flex items-center gap-4">
        <select value={userProfile} onChange={e => onProfileChange(e.target.value as UserProfile)} className="bg-transparent text-sm font-medium p-2 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:bg-slate-800">
          <option value="ceo">CEO</option>
          <option value="manager">Manager</option>
          <option value="sales">Commercial</option>
        </select>
        <button onClick={onThemeChange} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

const FilterBar: FC<{ filters: Filters, onFilterChange: (f: Filters) => void }> = ({ filters, onFilterChange }) => {
    const salesReps = [...new Set(MOCK_DEALS.map(d => d.salesRep))];
    const sources = [...new Set(MOCK_DEALS.map(d => d.source))];
    const regions = [...new Set(MOCK_DEALS.map(d => d.region))];

    const handleFilter = (key: keyof Filters, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 mb-8 flex flex-wrap items-center gap-4">
            <Filter className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold text-md mr-4">Filtres</h3>
            <select value={filters.salesRep} onChange={e => handleFilter('salesRep', e.target.value)} className="flex-1 bg-transparent text-sm p-2 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 min-w-[150px]">
                <option value="">Tous les commerciaux</option>
                {salesReps.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={filters.source} onChange={e => handleFilter('source', e.target.value)} className="flex-1 bg-transparent text-sm p-2 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 min-w-[150px]">
                <option value="">Toutes les sources</option>
                {sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filters.region} onChange={e => handleFilter('region', e.target.value)} className="flex-1 bg-transparent text-sm p-2 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 min-w-[150px]">
                <option value="">Toutes les régions</option>
                {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
        </div>
    )
}

const KpiScorecard: FC<{ kpi: Kpi }> = ({ kpi }) => {
  const isUp = kpi.value >= kpi.previousValue;
  const change = kpi.previousValue ? ((kpi.value - kpi.previousValue) / kpi.previousValue) * 100 : 0;
  
  return (
    <motion.div layout className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-start">
        <div className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <kpi.icon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        </div>
        <div className={`flex items-center text-sm font-semibold ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
          <TrendingUp className={`h-4 w-4 mr-1 ${!isUp ? 'rotate-180' : ''}`} />
          {change.toFixed(1)}%
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">{kpi.title}</p>
        <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          <CountUp 
            end={kpi.value} 
            duration={1.5} 
            separator=" "
            prefix={kpi.format === 'currency' ? '€' : ''}
            suffix={kpi.format === 'percent' ? '%' : ''}
          />
        </p>
      </div>
    </motion.div>
  );
};

const SalesFunnel: FC<{ data: Deal[] }> = ({ data }) => {
  const stages = ['Prospect', 'Qualified', 'Demo', 'Proposal', 'Closed'];
  const funnelData = stages.map(stage => {
    const dealsInStage = data.filter(d => d.stage === stage);
    return {
      name: stage,
      value: dealsInStage.reduce((sum, d) => sum + d.value, 0),
      count: dealsInStage.length,
    };
  });
  const maxVal = Math.max(...funnelData.map(d => d.value));

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-bold mb-4">Tunnel de Vente</h3>
      <div className="space-y-4">
        {funnelData.map((item, index) => (
          <div key={item.name} className="group">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="font-semibold text-slate-600 dark:text-slate-300">{item.name} ({item.count})</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">€{item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
              <motion.div
                className="bg-blue-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${maxVal > 0 ? (item.value / maxVal) * 100 : 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OpportunityHeatmap: FC<{ data: Deal[] }> = ({ data }) => {
    const regions = ['North', 'South', 'East', 'West'];
    const heatmapData = regions.map(region => ({
        name: region,
        value: data.filter(d => d.region === region).reduce((sum, d) => sum + d.value, 0)
    }));
    const maxValue = Math.max(...heatmapData.map(d => d.value));

    const getColor = (value: number) => {
        const intensity = maxValue > 0 ? value / maxValue : 0;
        if (intensity > 0.75) return 'bg-red-600';
        if (intensity > 0.5) return 'bg-orange-500';
        if (intensity > 0.25) return 'bg-yellow-400';
        return 'bg-emerald-400';
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4">Heatmap des Opportunités</h3>
            <div className="grid grid-cols-2 gap-4 h-48">
                {heatmapData.map(item => (
                    <motion.div
                        key={item.name}
                        className={`rounded-lg flex flex-col justify-end p-3 text-white font-bold relative overflow-hidden ${getColor(item.value)}`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="relative z-10">
                            <div>{item.name}</div>
                            <div className="text-lg">€{item.value.toLocaleString()}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const AiCopilot: FC<{ recommendations: AiRecommendation[], alerts: AiRecommendation[], loading: boolean, error: string | null, apiKey: string, setApiKey: (k: string) => void }> = ({ recommendations, alerts, loading, error, apiKey, setApiKey }) => {
    const [tab, setTab] = useState('reco');
    const [tempApiKey, setTempApiKey] = useState('');

    const handleSaveKey = () => {
        if (tempApiKey.trim()) {
            setApiKey(tempApiKey.trim());
        }
    };

    const renderItem = (item: AiRecommendation) => (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            key={item.id} 
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
        >
            <div className={`p-2 rounded-full ${item.type === 'risk' || item.priority === 'high' ? 'bg-red-100 dark:bg-red-900/50' : 'bg-blue-100 dark:bg-blue-900/50'}`}>
                {item.type === 'risk' ? <AlertTriangle className="h-5 w-5 text-red-500" /> : <Lightbulb className="h-5 w-5 text-blue-500" />}
            </div>
            <div>
                <p className="text-sm text-slate-700 dark:text-slate-200">{item.text}</p>
                <div className="flex gap-2 mt-2">
                    <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">Voir le deal</button>
                    <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"><Mail className="h-3 w-3" /> Générer Email</button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
                <Bot className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold">Copilote IA</h3>
            </div>
            {!apiKey ? (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-center">
                    <KeyRound className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300">Clé API Gemini requise</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400 mb-3">Veuillez entrer votre clé pour activer le copilote.</p>
                    <div className="flex items-center gap-2">
                        <input 
                            type="password" 
                            placeholder="Entrez votre clé API Gemini..." 
                            value={tempApiKey}
                            onChange={e => setTempApiKey(e.target.value)} 
                            className="w-full p-2 text-sm border-yellow-300 rounded-md dark:bg-slate-700 dark:border-slate-500" 
                        />
                        <button 
                            onClick={handleSaveKey}
                            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Check className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex border-b border-slate-200 dark:border-slate-700 mb-2">
                        <button onClick={() => setTab('reco')} className={`px-4 py-2 text-sm font-semibold ${tab === 'reco' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Recommandations ({recommendations.length})</button>
                        <button onClick={() => setTab('alerts')} className={`px-4 py-2 text-sm font-semibold ${tab === 'alerts' ? 'text-red-600 border-b-2 border-red-600' : 'text-slate-500'}`}>Alertes ({alerts.length})</button>
                    </div>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {loading && <div className="flex justify-center items-center p-8"><Loader className="h-8 w-8 animate-spin text-blue-500" /> <p className="ml-2">Analyse en cours...</p></div>}
                        {error && <div className="p-4 text-center text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg">{error}</div>}
                        {!loading && !error && (
                            <AnimatePresence>
                                {(tab === 'reco' ? recommendations : alerts).map(renderItem)}
                            </AnimatePresence>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
const B2BAnalyticsDashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>('manager');
  const [theme, setTheme] = useState<Theme>('light');
  const [filters, setFilters] = useState<Filters>({ salesRep: '', source: '', region: '' });
  const [apiKey, setApiKey] = useState('');

  const filteredDeals = useCrmData(filters);
  const { recommendations, alerts, loading, error } = useAiEngine(filteredDeals, apiKey);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const kpis = useMemo((): Kpi[] => {
    const totalRevenue = filteredDeals.filter(d => d.stage === 'Closed').reduce((sum, d) => sum + d.value, 0);
    const pipelineValue = filteredDeals.filter(d => d.stage !== 'Closed').reduce((sum, d) => sum + d.value, 0);
    const conversionRate = filteredDeals.length > 0 ? (filteredDeals.filter(d => d.stage === 'Closed').length / filteredDeals.length) * 100 : 0;

    // Mock previous values for trend calculation
    const prevTotalRevenue = totalRevenue * 0.9;
    const prevPipelineValue = pipelineValue * 1.1;
    const prevConversionRate = conversionRate * 0.95;

    const baseKpis = [
      { title: "Chiffre d'Affaires (Clos)", value: totalRevenue, previousValue: prevTotalRevenue, format: 'currency', icon: DollarSign },
      { title: "Pipeline Actif", value: pipelineValue, previousValue: prevPipelineValue, format: 'currency', icon: Briefcase },
      { title: "Taux de Conversion", value: conversionRate, previousValue: prevConversionRate, format: 'percent', icon: Target },
    ];
    
    if (userProfile === 'ceo') {
      return [
        ...baseKpis,
        { title: "Nouveaux Clients", value: new Set(filteredDeals.map(d => d.company)).size, previousValue: 18, format: 'number', icon: Building }
      ];
    }
    if (userProfile === 'manager') {
      return [
        ...baseKpis,
        { title: "Objectif Trimestriel", value: (totalRevenue / 1000000) * 100, previousValue: 70, format: 'percent', icon: Trophy }
      ];
    }
    // Sales profile
    return baseKpis.filter(k => k.title !== 'Taux de Conversion').concat([
        { title: "Mes Deals Actifs", value: filteredDeals.filter(d => d.salesRep === 'Bob' && d.stage !== 'Closed').length, previousValue: 5, format: 'number', icon: UserCheck }
    ]);

  }, [filteredDeals, userProfile]);

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans`}>
      <Header userProfile={userProfile} onProfileChange={setUserProfile} theme={theme} onThemeChange={toggleTheme} />
      
      <main className="p-4 sm:p-6 lg:p-8">
        <FilterBar filters={filters} onFilterChange={setFilters} />

        {/* KPI Section */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatePresence>
            {kpis.map(kpi => <KpiScorecard key={kpi.title} kpi={kpi} />)}
          </AnimatePresence>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <AiCopilot recommendations={recommendations} alerts={alerts} loading={loading} error={error} apiKey={apiKey} setApiKey={setApiKey} />
            {/* Add other components like DealFlowTimeline here */}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <SalesFunnel data={filteredDeals} />
            <OpportunityHeatmap data={filteredDeals} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default B2BAnalyticsDashboard;
