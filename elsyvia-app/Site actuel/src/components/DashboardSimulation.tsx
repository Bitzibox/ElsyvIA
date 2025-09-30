import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Users, Target, DollarSign, AlertTriangle, Mail, Zap, Trophy, Star, Bell, Filter, Calendar, MapPin, User, Settings, Bot, Play, Pause, ChevronDown, ChevronRight, Eye, Brain, Lightbulb, Clock, Shield } from 'lucide-react';

const SalesDashboard = () => {
  const [userProfile, setUserProfile] = useState('CEO');
  const [activeFilters, setActiveFilters] = useState({
    segment: 'all',
    period: '3m',
    region: 'all',
    sales_rep: 'all'
  });
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [notifications, setNotifications] = useState([]);

  // CORRECTION: Ajout de l'état pour les statistiques de gamification
  const [gamificationStats, setGamificationStats] = useState({
    currentStreak: 12,
    monthlyGoal: 76,
    totalBadges: 23,
    teamRank: 2
  });

  // Options pour les filtres
  const filterOptions = {
    segment: [
      { value: 'all', label: 'Tous les segments' },
      { value: 'enterprise', label: 'Grandes Entreprises' },
      { value: 'smb', label: 'PME' },
      { value: 'startup', label: 'Startups' },
      { value: 'public', label: 'Secteur Public' }
    ],
    period: [
      { value: '1m', label: 'Ce mois' },
      { value: '3m', label: '3 derniers mois' },
      { value: '6m', label: '6 derniers mois' },
      { value: '12m', label: 'Cette année' },
      { value: 'ytd', label: 'Depuis début année' }
    ],
    region: [
      { value: 'all', label: 'Toutes les régions' },
      { value: 'paris', label: 'Île-de-France' },
      { value: 'lyon', label: 'Auvergne-Rhône-Alpes' },
      { value: 'marseille', label: 'PACA' },
      { value: 'lille', label: 'Hauts-de-France' },
      { value: 'toulouse', label: 'Occitanie' },
      { value: 'nantes', label: 'Pays de la Loire' }
    ],
    sales_rep: [
      { value: 'all', label: 'Tous les commerciaux' },
      { value: 'marie_dupont', label: 'Marie Dupont' },
      { value: 'julien_martin', label: 'Julien Martin' },
      { value: 'sophie_bernard', label: 'Sophie Bernard' },
      { value: 'thomas_petit', label: 'Thomas Petit' },
      { value: 'laura_moreau', label: 'Laura Moreau' }
    ]
  };

  const [aiSuggestions] = useState([
    {
      type: 'filter',
      title: 'Focus sur les PME Île-de-France',
      description: 'Les PME en Île-de-France montrent un taux de conversion 23% supérieur ce mois-ci.',
      action: () => setActiveFilters({ segment: 'smb', region: 'paris', period: '1m', sales_rep: 'all' }),
      impact: '+€85K revenus potentiels'
    },
    {
      type: 'commercial',
      title: 'Opportunité Marie Dupont',
      description: 'Marie a 3 deals chauds totalisant €240K. Recommandation: support manager.',
      action: () => setActiveFilters({ segment: 'all', region: 'all', period: '1m', sales_rep: 'marie_dupont' }),
      impact: 'Probabilité +15%'
    },
    {
      type: 'temporal',
      title: 'Tendance 6 mois',
      description: 'Pattern saisonnier détecté. Q4 historiquement +35% vs Q3.',
      action: () => setActiveFilters({ segment: 'all', region: 'all', period: '6m', sales_rep: 'all' }),
      impact: 'Prédiction ajustée'
    },
    {
      type: 'segment',
      title: 'Startups en croissance',
      description: 'Segment startup: +45% de deals signés vs mois dernier.',
      action: () => setActiveFilters({ segment: 'startup', region: 'all', period: '3m', sales_rep: 'all' }),
      impact: 'Nouveau segment prioritaire'
    }
  ]);

  // Données simulées pour la démo
  const [salesData] = useState([
    { month: 'Jan', actual: 45000, predicted: 47000, confidence: 85 },
    { month: 'Fév', actual: 52000, predicted: 54000, confidence: 88 },
    { month: 'Mar', actual: 48000, predicted: 51000, confidence: 82 },
    { month: 'Avr', actual: 61000, predicted: 58000, confidence: 90 },
    { month: 'Mai', actual: 55000, predicted: 59000, confidence: 87 },
    { month: 'Juin', actual: null, predicted: 65000, confidence: 91 }
  ]);

  const [opportunitiesData] = useState([
    { id: 1, company: 'TechCorp SA', value: 125000, probability: 85, stage: 'Négociation', risk: 'low', lastContact: '2j', aiScore: 92 },
    { id: 2, company: 'InnovSoft', value: 85000, probability: 65, stage: 'Proposition', risk: 'medium', lastContact: '5j', aiScore: 78 },
    { id: 3, company: 'DataTech Pro', value: 200000, probability: 40, stage: 'Découverte', risk: 'high', lastContact: '12j', aiScore: 45 }
  ]);

  const [kpiData] = useState({
    totalRevenue: 2850000,
    revenueGrowth: 12.5,
    conversionRate: 24.8,
    avgDealSize: 85000,
    pipelineValue: 1250000,
    churnRisk: 8.2
  });

  const [aiInsights] = useState([
    {
      type: 'opportunity',
      priority: 'high',
      title: 'Opportunité cachée détectée',
      description: 'TechCorp SA montre des signaux d\'achat forts. Recommandation: proposer une démo avancée.',
      action: 'Programmer démo',
      confidence: 89
    },
    {
      type: 'risk',
      priority: 'critical',
      title: 'Client à risque',
      description: 'InnovSoft n\'a pas ouvert les 3 derniers emails. Risque de désengagement élevé.',
      action: 'Appel urgent',
      confidence: 94
    },
    {
      type: 'forecast',
      priority: 'medium',
      title: 'Prévision ajustée',
      description: 'Objectif mensuel atteignable à 87% avec focus sur 5 deals prioritaires.',
      action: 'Voir détails',
      confidence: 91
    }
  ]);

  // Animation et effets
  useEffect(() => {
    const timer = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'success' : 'info',
        message: Math.random() > 0.5 ? '🎯 Nouvelle opportunité détectée' : '📈 Objectif mensuel à 78%'
      };
      setNotifications(prev => [newNotification, ...prev.slice(0, 2)]);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const getProfileKPIs = useCallback(() => {
    const kpis = {
      CEO: [
        { key: 'revenue', label: 'CA Total', value: kpiData.totalRevenue, format: 'currency', trend: 12.5 },
        { key: 'growth', label: 'Croissance', value: kpiData.revenueGrowth, format: 'percent', trend: 2.1 },
        { key: 'pipeline', label: 'Pipeline', value: kpiData.pipelineValue, format: 'currency', trend: 8.7 },
        { key: 'churn', label: 'Risque Churn', value: kpiData.churnRisk, format: 'percent', trend: -1.2 }
      ],
      Commercial: [
        { key: 'deals', label: 'Deals en cours', value: 24, format: 'number', trend: 4 },
        { key: 'conversion', label: 'Taux conversion', value: kpiData.conversionRate, format: 'percent', trend: 3.2 },
        { key: 'avgdeal', label: 'Deal moyen', value: kpiData.avgDealSize, format: 'currency', trend: 15.8 },
        { key: 'calls', label: 'Appels/jour', value: 32, format: 'number', trend: 8 }
      ],
      Manager: [
        { key: 'team', label: 'Performance équipe', value: 87, format: 'percent', trend: 5.3 },
        { key: 'targets', label: 'Objectifs atteints', value: 15, format: 'number', trend: 2 },
        { key: 'coaching', label: 'Sessions coaching', value: 8, format: 'number', trend: 1 },
        { key: 'satisfaction', label: 'Satisfaction client', value: 4.6, format: 'rating', trend: 0.3 }
      ]
    };
    return kpis[userProfile] || kpis.CEO;
  }, [userProfile, kpiData]);

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(value);
      case 'percent':
        return `${value}%`;
      case 'rating':
        return `${value}/5`;
      default:
        return value.toLocaleString('fr-FR');
    }
  };

  const KPICard = ({ kpi }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{kpi.label}</h3>
        <div className={`flex items-center text-sm ${kpi.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {kpi.trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="ml-1">{Math.abs(kpi.trend)}%</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-2">
        {formatValue(kpi.value, kpi.format)}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(100, (kpi.value / (kpi.value * 1.2)) * 100)}%` }}
        ></div>
      </div>
    </div>
  );

  const AIInsightCard = ({ insight }) => (
    <div className={`bg-white rounded-lg p-4 border-l-4 ${
      insight.priority === 'critical' ? 'border-red-500' :
      insight.priority === 'high' ? 'border-orange-500' : 'border-blue-500'
    } shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Brain size={16} className="text-purple-600 mr-2" />
            <h4 className="font-semibold text-gray-800">{insight.title}</h4>
            <span className="ml-2 px-2 py-1 bg-gray-100 text-xs rounded-full">
              {insight.confidence}% confiance
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
          <button className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
            <Lightbulb size={14} className="mr-1" />
            {insight.action}
          </button>
        </div>
      </div>
    </div>
  );

  const OpportunityRow = ({ opp }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{opp.company}</div>
        <div className="text-sm text-gray-500">Dernière interaction: {opp.lastContact}</div>
      </td>
      <td className="px-4 py-3 text-right font-semibold">
        {formatValue(opp.value, 'currency')}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${opp.probability}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{opp.probability}%</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          opp.risk === 'low' ? 'bg-green-100 text-green-800' :
          opp.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {opp.stage}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <Bot size={16} className="text-purple-600 mr-1" />
          <span className="font-medium">{opp.aiScore}</span>
        </div>
      </td>
    </tr>
  );

  // CORRECTION: Ajout des fonctions pour gérer le clic
  const handleAISuggestionClick = () => {
    setShowAISuggestions(prevShow => !prevShow);
  };

  const applySuggestion = (suggestion) => {
    suggestion.action();
    setShowAISuggestions(false); // Ferme le panneau après avoir cliqué
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center mr-8">
                <Target className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">SalesAI Pro</h1>
              </div>

              {/* Profil utilisateur */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {['CEO', 'Commercial', 'Manager'].map((profile) => (
                  <button
                    key={profile}
                    onClick={() => setUserProfile(profile)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      userProfile === profile
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </div>

              {/* Gamification */}
              <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">
                  Série: {gamificationStats.currentStreak}j
                </span>
              </div>

              <Settings className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications en temps réel */}
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`px-4 py-3 rounded-lg shadow-lg ${
                notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              } text-white animate-slide-in-right`}
            >
              {notif.message}
            </div>
          ))}
        </div>

        {/* Filtres intelligents */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <span className="font-medium text-gray-700">Filtres intelligents:</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">Segment</label>
                <select
                  value={activeFilters.segment}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, segment: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 min-w-[160px]"
                >
                  {filterOptions.segment.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">Période</label>
                <select
                  value={activeFilters.period}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, period: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 min-w-[140px]"
                >
                  {filterOptions.period.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">Région</label>
                <select
                  value={activeFilters.region}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, region: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 min-w-[180px]"
                >
                  {filterOptions.region.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 mb-1">Commercial</label>
                <select
                  value={activeFilters.sales_rep}
                  onChange={(e) => setActiveFilters(prev => ({ ...prev, sales_rep: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 min-w-[160px]"
                >
                  {filterOptions.sales_rep.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ml-auto relative">
              <button
                onClick={handleAISuggestionClick}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Bot className="h-4 w-4 mr-2" />
                Suggestions IA
                {showAISuggestions && <span className="ml-2 h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>}
              </button>

              {/* Modal des suggestions IA */}
              {showAISuggestions && (
                <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">🧠 Suggestions IA Personnalisées</h3>
                      <button
                        onClick={() => setShowAISuggestions(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Cliquez sur une suggestion pour l'appliquer automatiquement</p>
                  </div>

                  <div className="p-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => applySuggestion(suggestion)}
                        className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-transparent hover:border-purple-500 mb-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{suggestion.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                            <div className="flex items-center mt-2">
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {suggestion.impact}
                              </span>
                              <span className="ml-2 text-xs text-purple-600 font-medium">
                                Cliquer pour appliquer →
                              </span>
                            </div>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${
                            suggestion.type === 'filter' ? 'bg-blue-400' :
                            suggestion.type === 'commercial' ? 'bg-green-400' :
                            suggestion.type === 'temporal' ? 'bg-orange-400' :
                            'bg-purple-400'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t bg-gray-50 text-center">
                    <div className="text-xs text-gray-500">
                      🎯 Suggestions basées sur l'analyse de vos données en temps réel
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KPIs dynamiques selon profil */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getProfileKPIs().map((kpi) => (
            <KPICard key={kpi.key} kpi={kpi} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Graphique principal */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Prédictions vs Réalisé</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'revenue' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
                >
                  Revenus
                </button>
                <button
                  onClick={() => setSelectedMetric('deals')}
                  className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'deals' ? 'bg-blue-100 text-blue-800' : 'text-gray-600'}`}
                >
                  Deals
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value),
                    name === 'actual' ? 'Réalisé' : 'Prédit'
                  ]}
                />
                <Area type="monotone" dataKey="actual" stroke="#3B82F6" fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="predicted" stroke="#10B981" fillOpacity={1} fill="url(#colorPredicted)" strokeDasharray="5,5" />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Confiance moyenne</div>
                <div className="text-xl font-bold text-blue-800">87%</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-green-600 font-medium">Écart type</div>
                <div className="text-xl font-bold text-green-800">±12%</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-sm text-purple-600 font-medium">Tendance</div>
                <div className="text-xl font-bold text-purple-800">+15.2%</div>
              </div>
            </div>
          </div>

          {/* Panel IA */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">IA Proactive</h2>
              <button
                onClick={() => setShowAIPanel(!showAIPanel)}
                className="text-gray-600 hover:text-gray-900"
              >
                {showAIPanel ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>

            {showAIPanel && (
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <AIInsightCard key={index} insight={insight} />
                ))}

                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-800 mb-3">Scénarios "What If"</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="text-sm font-medium">+10% prix → +€285K revenus</div>
                      <div className="text-xs text-gray-600">Confiance: 76%</div>
                    </button>
                    <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="text-sm font-medium">+1 commercial → +€150K pipeline</div>
                      <div className="text-xs text-gray-600">Confiance: 82%</div>
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
                    <Zap className="h-4 w-4 mr-2" />
                    Actions automatisées
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tableau des opportunités */}
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Opportunités Prioritaires</h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 text-gray-600 mr-1" />
                  <span className="text-sm text-gray-600">Score IA</span>
                </div>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  Relances auto
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entreprise
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valeur
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Probabilité
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Étape
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score IA
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {opportunitiesData.map((opp) => (
                  <OpportunityRow key={opp.id} opp={opp} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gamification bottom bar */}
        <div className="mt-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Objectif Mensuel</h3>
              <div className="flex items-center mt-2">
                <div className="w-64 bg-white/30 rounded-full h-3 mr-4">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${gamificationStats.monthlyGoal}%` }}
                  ></div>
                </div>
                <span className="text-xl font-bold">{gamificationStats.monthlyGoal}%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 mr-2" />
                <span>{gamificationStats.totalBadges} badges</span>
              </div>
              <div className="text-sm opacity-90">
                Rang équipe: #{gamificationStats.teamRank}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SalesDashboard;
