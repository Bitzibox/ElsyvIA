import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, Users, Target, TrendingUp, CheckCircle, AlertTriangle, 
  Zap, Calculator, FileText, Search, Download, ChevronRight, 
  ArrowRight, Star, Clock, Euro, BarChart3, Lightbulb, Brain,
  PieChart, Settings, Rocket, Shield, Award, Calendar, LogOut
} from 'lucide-react';

const CORRECT_TOKEN = 'Elsyv1Acgenial2025!';

// Interface pour le profil entreprise
interface CompanyProfile {
  sector: string;
  size: string;
  mainChallenges: string[];
  currentTools: string[];
  budget: string;
  timeline: string;
}

// Interface pour les résultats d'éligibilité
interface EligibilityResult {
  score: number;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  recommendations: string[];
  quickWins: string[];
  longTerm: string[];
}

const ProspectDemoPage: React.FC = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<CompanyProfile>({
    sector: '',
    size: '',
    mainChallenges: [],
    currentTools: [],
    budget: '',
    timeline: ''
  });
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('elsyvia_demo_token');
    if (storedToken === CORRECT_TOKEN) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (token === CORRECT_TOKEN) {
      sessionStorage.setItem('elsyvia_demo_token', token);
      setIsLoggedIn(true);
    } else {
      setLoginError('Jeton d\'accès incorrect.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('elsyvia_demo_token');
    setIsLoggedIn(false);
    setToken('');
    // Reset dashboard state
    setCurrentStep(0);
    setProfile({
      sector: '',
      size: '',
      mainChallenges: [],
      currentTools: [],
      budget: '',
      timeline: ''
    });
    setEligibility(null);
    setRecommendations([]);
    setSelectedRecommendation(null);
  };

  // Fonction pour télécharger le rapport PDF
  const downloadReport = () => {
    if (!eligibility || !profile.sector) return;

    const sectorData = sectors[profile.sector];
    const sizeData = companySizes.find(s => s.id === profile.size);
    
    // Créer le contenu HTML du rapport
    const reportContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport d'Éligibilité IA - ElsyvIA</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #3b82f6;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1e40af;
            font-size: 2.5em;
            margin: 0;
            font-weight: 700;
        }
        .header p {
            color: #6b7280;
            font-size: 1.1em;
            margin: 10px 0 0 0;
        }
        .section {
            margin: 30px 0;
            padding: 20px;
            border-left: 4px solid #e5e7eb;
            background-color: #f9fafb;
            border-radius: 0 8px 8px 0;
        }
        .section h2 {
            color: #1f2937;
            font-size: 1.5em;
            margin-top: 0;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .score-circle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #10b981);
            color: white;
            font-size: 1.8em;
            font-weight: bold;
            margin: 0 auto 20px;
        }
        .profile-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .profile-item {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .profile-item strong {
            color: #374151;
            display: block;
            margin-bottom: 5px;
        }
        .recommendations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .recommendation-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #e5e7eb;
            transition: all 0.3s ease;
        }
        .recommendation-card:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .recommendation-card h4 {
            color: #1f2937;
            margin-top: 0;
            margin-bottom: 10px;
            font-size: 1.2em;
        }
        .recommendation-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 15px;
            font-size: 0.9em;
        }
        .recommendation-details > div {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
        }
        .phase {
            background: white;
            margin: 15px 0;
            padding: 20px;
            border-radius: 10px;
            border-left: 6px solid #10b981;
        }
        .phase.phase-2 {
            border-left-color: #3b82f6;
        }
        .phase.phase-3 {
            border-left-color: #8b5cf6;
        }
        .phase h4 {
            color: #1f2937;
            margin-top: 0;
            font-size: 1.2em;
        }
        .phase ul {
            margin: 10px 0 0 20px;
        }
        .phase ul li {
            margin: 5px 0;
        }
        .roi-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 20px 0;
        }
        .roi-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #e5e7eb;
        }
        .roi-value {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .roi-value.green { color: #10b981; }
        .roi-value.blue { color: #3b82f6; }
        .roi-value.purple { color: #8b5cf6; }
        .next-steps {
            background: linear-gradient(135deg, #eff6ff, #f0f9ff);
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #3b82f6;
            margin: 30px 0;
        }
        .next-steps h3 {
            color: #1e40af;
            margin-top: 0;
        }
        .step-item {
            background: white;
            margin: 10px 0;
            padding: 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .step-icon {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #10b981;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f3f4f6;
            border-radius: 8px;
            color: #6b7280;
            font-size: 0.9em;
        }
        .contact-link {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 24px;
            background: #10b981;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
        }
        .contact-link:hover {
            background: #059669;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin: 8px 0;
        }
        @media print {
            body { background-color: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧠 RAPPORT D'ÉLIGIBILITÉ IA</h1>
            <p>Analyse personnalisée par ElsyvIA</p>
            <p>Généré le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <div class="section">
            <h2>📊 Score d'Éligibilité</h2>
            <div style="text-align: center;">
                <div class="score-circle">${eligibility.score}%</div>
                <h3 style="color: #1f2937; margin: 0;">Niveau : ${eligibility.level}</h3>
                <p style="color: #6b7280;">Votre entreprise présente un ${eligibility.level === 'Avancé' ? 'excellent' : eligibility.level === 'Intermédiaire' ? 'bon' : 'correct'} potentiel pour l'intégration de solutions IA.</p>
            </div>
        </div>

        <div class="section">
            <h2>🏢 Profil Entreprise</h2>
            <div class="profile-grid">
                <div class="profile-item">
                    <strong>Secteur d'activité</strong>
                    ${sectorData?.icon} ${sectorData?.name || 'Non spécifié'}
                </div>
                <div class="profile-item">
                    <strong>Taille d'entreprise</strong>
                    ${sizeData?.name || 'Non spécifiée'}
                </div>
                <div class="profile-item">
                    <strong>Budget envisagé</strong>
                    ${profile.budget === 'moins-5k' ? 'Moins de 5 000€' :
                      profile.budget === '5k-15k' ? '5 000€ - 15 000€' :
                      profile.budget === '15k-50k' ? '15 000€ - 50 000€' :
                      profile.budget === 'plus-50k' ? 'Plus de 50 000€' : 'Non spécifié'}
                </div>
                <div class="profile-item">
                    <strong>Timeline souhaitée</strong>
                    ${profile.timeline === 'immediat' ? 'Immédiatement' :
                      profile.timeline === '3-mois' ? 'Dans 3 mois' :
                      profile.timeline === '6-mois' ? 'Dans 6 mois' :
                      profile.timeline === 'plus-6-mois' ? 'Plus de 6 mois' : 'Non spécifié'}
                </div>
            </div>
            <div style="margin-top: 20px;">
                <strong>Défis identifiés :</strong>
                <ul>
                    ${profile.mainChallenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
            </div>
        </div>

        <div class="section">
            <h2>⚡ Points Forts & Opportunités</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div style="background: white; padding: 20px; border-radius: 10px; border: 2px solid #10b981;">
                    <h4 style="color: #065f46; margin-top: 0;">✅ Points forts identifiés</h4>
                    <ul>
                        ${eligibility.quickWins.map(win => `<li>${win}</li>`).join('')}
                    </ul>
                </div>
                <div style="background: white; padding: 20px; border-radius: 10px; border: 2px solid #3b82f6;">
                    <h4 style="color: #1e40af; margin-top: 0;">🚀 Vision long terme</h4>
                    <ul>
                        ${eligibility.longTerm.map(term => `<li>${term}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>💡 Solutions Personnalisées Recommandées</h2>
            <div class="recommendations-grid">
                ${recommendations.map((rec, index) => `
                    <div class="recommendation-card">
                        <h4>${rec.title}</h4>
                        <p style="color: #6b7280; margin-bottom: 15px;">${rec.description}</p>
                        <div class="recommendation-details">
                            <div>
                                <span style="color: #6b7280;">Impact:</span>
                                <span style="font-weight: 600; color: ${rec.impact === 'Élevé' ? '#10b981' : '#f59e0b'};">${rec.impact}</span>
                            </div>
                            <div>
                                <span style="color: #6b7280;">Complexité:</span>
                                <span style="font-weight: 600; color: ${
                                  rec.complexity === 'Très faible' ? '#10b981' :
                                  rec.complexity === 'Faible' ? '#3b82f6' : '#f59e0b'
                                };">${rec.complexity}</span>
                            </div>
                            <div>
                                <span style="color: #6b7280;">Délai:</span>
                                <span style="font-weight: 600;">${rec.timeline}</span>
                            </div>
                            <div>
                                <span style="color: #6b7280;">ROI estimé:</span>
                                <span style="font-weight: 600; color: #10b981;">${rec.roi}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>🗓️ Plan d'Action Recommandé</h2>
            
            <div class="phase">
                <h4>Phase 1 : Audit & Stratégie (Semaine 1-2)</h4>
                <p style="color: #6b7280; margin-bottom: 10px;">Analyse approfondie de vos processus et définition de la stratégie IA</p>
                <ul>
                    <li>Audit complet gratuit de vos processus</li>
                    <li>Identification des quick wins</li>
                    <li>Définition des objectifs mesurables</li>
                </ul>
            </div>

            <div class="phase phase-2">
                <h4>Phase 2 : Développement & Test (Semaine 3-6)</h4>
                <p style="color: #6b7280; margin-bottom: 10px;">Création et test de votre première solution IA</p>
                <ul>
                    <li>Développement de la solution prioritaire</li>
                    <li>Tests en environnement contrôlé</li>
                    <li>Formation de votre équipe</li>
                </ul>
            </div>

            <div class="phase phase-3">
                <h4>Phase 3 : Déploiement & Optimisation (Semaine 7-8)</h4>
                <p style="color: #6b7280; margin-bottom: 10px;">Mise en production et optimisation continue</p>
                <ul>
                    <li>Déploiement en production</li>
                    <li>Monitoring et ajustements</li>
                    <li>Mesure du ROI et optimisation</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h2>💰 ROI Prévisionnel</h2>
            <div class="roi-grid">
                <div class="roi-card">
                    <div class="roi-value green">
                        ${eligibility.level === 'Avancé' ? '25-40%' : eligibility.level === 'Intermédiaire' ? '15-30%' : '10-20%'}
                    </div>
                    <div style="color: #6b7280; font-size: 0.9em;">ROI attendu</div>
                </div>
                <div class="roi-card">
                    <div class="roi-value blue">
                        ${eligibility.level === 'Avancé' ? '3-6' : eligibility.level === 'Intermédiaire' ? '6-9' : '9-12'} mois
                    </div>
                    <div style="color: #6b7280; font-size: 0.9em;">Délai ROI positif</div>
                </div>
                <div class="roi-card">
                    <div class="roi-value purple">
                        ${profile.mainChallenges.length * 15}%
                    </div>
                    <div style="color: #6b7280; font-size: 0.9em;">Gain de productivité</div>
                </div>
            </div>
        </div>

        <div class="next-steps">
            <h3>🚀 Prochaines Étapes Recommandées</h3>
            <div class="step-item">
                <div class="step-icon">✓</div>
                <div>
                    <strong>Audit gratuit personnalisé (30 minutes)</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 0.9em;">Analyse approfondie de vos besoins spécifiques</p>
                </div>
            </div>
            <div class="step-item">
                <div class="step-icon">✓</div>
                <div>
                    <strong>Proposition commerciale détaillée</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 0.9em;">Devis personnalisé avec timeline précise</p>
                </div>
            </div>
            <div class="step-item">
                <div class="step-icon">✓</div>
                <div>
                    <strong>Démonstration sur votre cas d'usage</strong>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 0.9em;">POC adapté à votre secteur d'activité</p>
                </div>
            </div>
            
            <div style="text-align: center;">
                <a href="https://calendly.com/contact-elsyvia/30min" class="contact-link" target="_blank">
                    📅 Planifier un rendez-vous gratuit
                </a>
            </div>
        </div>

        <div class="footer">
            <p><strong>📞 Contact ElsyvIA</strong></p>
            <p>🌐 Site web : <a href="https://calendly.com/contact-elsyvia/30min" target="_blank">https://calendly.com/contact-elsyvia/30min</a></p>
            <p style="margin-top: 20px; font-size: 0.8em;">
                🔒 <strong>Confidentialité :</strong> Ce rapport contient des informations confidentielles. 
                Merci de ne pas le diffuser sans autorisation.<br>
                Rapport généré automatiquement par l'outil d'analyse ElsyvIA.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    // Créer et télécharger le fichier HTML
    const blob = new Blob([reportContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rapport_IA_ElsyvIA_${sectorData?.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Données des secteurs avec leurs défis typiques
  const sectors = {
    'e-commerce': {
      name: 'E-commerce',
      icon: '🛒',
      challenges: ['Abandon de panier', 'Service client 24/7', 'Recommandations produits', 'Gestion des retours'],
      opportunities: ['Chatbot commercial', 'IA de recommandation', 'Automatisation logistique']
    },
    'services': {
      name: 'Services aux entreprises',
      icon: '🏢',
      challenges: ['Qualification des leads', 'Génération de devis', 'Planification rendez-vous', 'Suivi client'],
      opportunities: ['Assistant commercial IA', 'Automatisation CRM', 'Workflows intelligents']
    },
    'sante': {
      name: 'Santé & Bien-être',
      icon: '🏥',
      challenges: ['Prise de rendez-vous', 'Gestion dossiers patients', 'Rappels automatiques', 'Téléconsultation'],
      opportunities: ['Assistant médical IA', 'Planification intelligente', 'Suivi patient automatisé']
    },
    'restauration': {
      name: 'Restauration',
      icon: '🍽️',
      challenges: ['Commandes en ligne', 'Gestion réservations', 'Optimisation menu', 'Avis clients'],
      opportunities: ['Chatbot de commande', 'Système de réservation IA', 'Analyse des préférences']
    },
    'immobilier': {
      name: 'Immobilier',
      icon: '🏠',
      challenges: ['Qualification acheteurs', 'Visites virtuelles', 'Estimation bien', 'Suivi prospects'],
      opportunities: ['Assistant immobilier IA', 'Estimation automatisée', 'Matching intelligent']
    },
    'autre': {
      name: 'Autre secteur',
      icon: '🏭',
      challenges: ['Processus manuels', 'Communication client', 'Gestion données', 'Optimisation temps'],
      opportunities: ['Solutions sur-mesure', 'Automatisation métier', 'IA conversationnelle']
    }
  };

  const companySizes = [
    { id: 'tpe', name: 'TPE (1-9 employés)', multiplier: 1 },
    { id: 'pme', name: 'PME (10-49 employés)', multiplier: 1.5 },
    { id: 'eti', name: 'ETI (50-249 employés)', multiplier: 2 },
    { id: 'ge', name: 'Grande entreprise (250+ employés)', multiplier: 3 }
  ];

  // Calcul du score d'éligibilité
  const calculateEligibilityScore = () => {
    let score = 0;
    let factors = [];

    // Score basé sur le secteur
    if (profile.sector && sectors[profile.sector]) {
      score += 20;
      factors.push("Secteur adapté à l'IA");
    }

    // Score basé sur la taille
    const sizeData = companySizes.find(s => s.id === profile.size);
    if (sizeData) {
      score += Math.min(25, sizeData.multiplier * 10);
      factors.push(`Taille d'entreprise: ${sizeData.multiplier}x potential`);
    }

    // Score basé sur les défis
    score += Math.min(30, profile.mainChallenges.length * 7);
    if (profile.mainChallenges.length > 0) {
      factors.push(`${profile.mainChallenges.length} défis identifiés`);
    }

    // Score basé sur le budget
    const budgetScores = {
      'moins-5k': 5,
      '5k-15k': 15,
      '15k-50k': 25,
      'plus-50k': 25
    };
    score += budgetScores[profile.budget] || 0;

    // Score basé sur la timeline
    const timelineScores = {
      'immediat': 20,
      '3-mois': 15,
      '6-mois': 10,
      'plus-6-mois': 5
    };
    score += timelineScores[profile.timeline] || 0;

    // Déterminer le niveau
    let level: 'Débutant' | 'Intermédiaire' | 'Avancé';
    let recommendations: string[] = [];
    let quickWins: string[] = [];
    let longTerm: string[] = [];

    if (score >= 80) {
      level = 'Avancé';
      recommendations = [
        'Plateforme IA complète avec chatbots avancés',
        'Automatisation multi-processus',
        'Analytics et IA prédictive',
        'Intégration écosystème complet'
      ];
      quickWins = ['Audit complet gratuit', 'POC sur mesure', 'Formation équipe'];
      longTerm = ['Transformation digitale complète', 'ROI mesurable sous 6 mois'];
    } else if (score >= 50) {
      level = 'Intermédiaire';
      recommendations = [
        'Chatbot intelligent personnalisé',
        'Automatisation processus clés',
        'Intégrations CRM/ERP',
        'Formation et accompagnement'
      ];
      quickWins = ['Chatbot pilote', 'Automatisation 1 processus', 'Formation initiale'];
      longTerm = ['Extension progressive', 'Optimisation continue'];
    } else {
      level = 'Débutant';
      recommendations = [
        'Chatbot simple et intuitif',
        'Automatisation basique',
        'Formation approfondie',
        'Accompagnement renforcé'
      ];
      quickWins = ['Chatbot FAQ', 'Formation équipe', 'Support dédié'];
      longTerm = ['Évolution progressive', 'Montée en compétences'];
    }

    return {
      score: Math.min(100, score),
      level,
      recommendations,
      quickWins,
      longTerm,
      factors
    };
  };

  // Génération des recommandations personnalisées
  const generateRecommendations = (eligibilityResult: EligibilityResult) => {
    const sectorData = sectors[profile.sector];
    if (!sectorData) return [];

    return sectorData.opportunities.map((opportunity, index) => ({
      id: index,
      title: opportunity,
      description: `Solution ${opportunity.toLowerCase()} adaptée à votre secteur ${sectorData.name}`,
      impact: 'Élevé',
      complexity: eligibilityResult.level === 'Avancé' ? 'Moyenne' : eligibilityResult.level === 'Intermédiaire' ? 'Faible' : 'Très faible',
      timeline: eligibilityResult.level === 'Avancé' ? '2-4 semaines' : '4-8 semaines',
      roi: eligibilityResult.level === 'Avancé' ? '15-35%' : '10-25%'
    }));
  };

  const steps = [
    {
      title: 'Profil Entreprise',
      subtitle: 'Parlez-nous de votre activité',
      icon: Building2
    },
    {
      title: 'Analyse d\'Éligibilité',
      subtitle: 'Évaluation de votre potentiel IA',
      icon: Brain
    },
    {
      title: 'Recommandations',
      subtitle: 'Solutions personnalisées',
      icon: Lightbulb
    },
    {
      title: 'Plan d\'Action',
      subtitle: 'Votre feuille de route',
      icon: Rocket
    }
  ];

  const handleProfileSubmit = () => {
    const result = calculateEligibilityScore();
    setEligibility(result);
    setRecommendations(generateRecommendations(result));
    setCurrentStep(1);
  };

  const ProfileStep = () => (
    <div className="space-y-8">
      {/* Secteur d'activité */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Dans quel secteur évoluez-vous ?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(sectors).map(([key, sector]) => (
            <button
              key={key}
              onClick={() => setProfile(p => ({ ...p, sector: key }))}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                profile.sector === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{sector.icon}</div>
              <div className="font-medium text-sm">{sector.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Taille d'entreprise */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          Quelle est la taille de votre entreprise ?
        </h3>
        <div className="space-y-2">
          {companySizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setProfile(p => ({ ...p, size: size.id }))}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                profile.size === size.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Défis principaux */}
      {profile.sector && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-600" />
            Quels sont vos principaux défis ? (Sélection multiple)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sectors[profile.sector].challenges.map((challenge) => (
              <button
                key={challenge}
                onClick={() => {
                  setProfile(p => ({
                    ...p,
                    mainChallenges: p.mainChallenges.includes(challenge)
                      ? p.mainChallenges.filter(c => c !== challenge)
                      : [...p.mainChallenges, challenge]
                  }));
                }}
                className={`p-3 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                  profile.mainChallenges.includes(challenge)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{challenge}</span>
                  {profile.mainChallenges.includes(challenge) && (
                    <CheckCircle className="w-4 h-4 text-orange-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Budget */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Euro className="w-5 h-5 text-purple-600" />
          Quel est votre budget envisagé pour une solution IA ?
        </h3>
        <div className="space-y-2">
          {[
            { id: 'moins-5k', name: 'Moins de 5 000€', desc: 'Solutions d\'entrée de gamme' },
            { id: '5k-15k', name: '5 000€ - 15 000€', desc: 'Solutions intermédiaires' },
            { id: '15k-50k', name: '15 000€ - 50 000€', desc: 'Solutions avancées' },
            { id: 'plus-50k', name: 'Plus de 50 000€', desc: 'Solutions enterprise' }
          ].map((budget) => (
            <button
              key={budget.id}
              onClick={() => setProfile(p => ({ ...p, budget: budget.id }))}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                profile.budget === budget.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{budget.name}</div>
              <div className="text-sm text-gray-600">{budget.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-red-600" />
          Dans quel délai souhaitez-vous mettre en place une solution ?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'immediat', name: 'Immédiatement', icon: '⚡' },
            { id: '3-mois', name: 'Dans 3 mois', icon: '📅' },
            { id: '6-mois', name: 'Dans 6 mois', icon: '🗓️' },
            { id: 'plus-6-mois', name: 'Plus de 6 mois', icon: '⏰' }
          ].map((timeline) => (
            <button
              key={timeline.id}
              onClick={() => setProfile(p => ({ ...p, timeline: timeline.id }))}
              className={`p-4 rounded-lg border-2 transition-all text-center hover:shadow-md ${
                profile.timeline === timeline.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{timeline.icon}</div>
              <div className="text-sm font-medium">{timeline.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleProfileSubmit}
          disabled={!profile.sector || !profile.size || profile.mainChallenges.length === 0}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Analyser mon éligibilité IA
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const EligibilityStep = () => (
    <div className="space-y-8">
      {/* Score principal */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{eligibility?.score}%</div>
            <div className="text-sm">Score IA</div>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">
          Niveau : {eligibility?.level}
        </h3>
        <p className="text-gray-600 max-w-lg mx-auto">
          Votre entreprise présente un {eligibility?.level === 'Avancé' ? 'excellent' : eligibility?.level === 'Intermédiaire' ? 'bon' : 'correct'} potentiel pour l'intégration de solutions IA.
        </p>
      </div>

      {/* Détails du profil */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Points forts identifiés
          </h4>
          <ul className="text-sm space-y-2">
            {eligibility?.quickWins.map((win, index) => (
              <li key={index} className="flex items-start gap-2">
                <Star className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                {win}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Opportunités immédiates
          </h4>
          <ul className="text-sm space-y-2">
            {eligibility?.recommendations.slice(0, 3).map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Vision long terme
          </h4>
          <ul className="text-sm space-y-2">
            {eligibility?.longTerm.map((term, index) => (
              <li key={index} className="flex items-start gap-2">
                <Award className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                {term}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={() => setCurrentStep(2)}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          Voir mes recommandations personnalisées
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const RecommendationsStep = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Solutions recommandées pour vous</h3>
        <p className="text-gray-600">
          Basées sur votre profil {sectors[profile.sector]?.name} et votre niveau {eligibility?.level}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-white p-6 rounded-lg border-2 hover:border-blue-300 transition-all cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedRecommendation(rec)}
          >
            <h4 className="font-semibold mb-3">{rec.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Impact:</span>
                <span className={`font-medium ${rec.impact === 'Élevé' ? 'text-green-600' : 'text-orange-600'}`}>
                  {rec.impact}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Complexité:</span>
                <span className={`font-medium ${
                  rec.complexity === 'Très faible' ? 'text-green-600' :
                  rec.complexity === 'Faible' ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  {rec.complexity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Délai:</span>
                <span className="font-medium">{rec.timeline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ROI estimé:</span>
                <span className="font-medium text-green-600">{rec.roi}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecommendation && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">
            Solution sélectionnée : {selectedRecommendation.title}
          </h4>
          <p className="text-blue-800 mb-4">{selectedRecommendation.description}</p>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Avantages attendus :</strong>
              <ul className="mt-2 space-y-1">
                <li>• Gain de temps significatif</li>
                <li>• Amélioration expérience client</li>
                <li>• ROI mesurable en {selectedRecommendation.timeline}</li>
              </ul>
            </div>
            <div>
              <strong>Prochaines étapes :</strong>
              <ul className="mt-2 space-y-1">
                <li>• Audit approfondi gratuit</li>
                <li>• Proposition personnalisée</li>
                <li>• Démo sur votre cas d'usage</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="pt-6">
        <button
          onClick={() => setCurrentStep(3)}
          className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          Créer mon plan d'action personnalisé
          <Rocket className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const ActionPlanStep = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Votre Plan d'Action Personnalisé</h3>
        <p className="text-gray-600">
          Feuille de route pour intégrer l'IA dans votre entreprise {sectors[profile.sector]?.name}
        </p>
      </div>

      {/* Résumé du profil */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold mb-4">📋 Résumé de votre profil</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Secteur:</span> {sectors[profile.sector]?.name}
          </div>
          <div>
            <span className="font-medium">Taille:</span> {companySizes.find(s => s.id === profile.size)?.name}
          </div>
          <div>
            <span className="font-medium">Score IA:</span> {eligibility?.score}% ({eligibility?.level})
          </div>
          <div>
            <span className="font-medium">Défis identifiés:</span> {profile.mainChallenges.length}
          </div>
        </div>
      </div>

      {/* Timeline avec phases */}
      <div className="space-y-6">
        <h4 className="font-semibold text-lg">🗓️ Timeline recommandée</h4>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div className="flex-1">
              <h5 className="font-semibold text-green-900">Phase 1 : Audit & Stratégie (Semaine 1-2)</h5>
              <p className="text-sm text-green-800 mt-1">Analyse approfondie de vos processus et définition de la stratégie IA</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Audit complet gratuit de vos processus</li>
                <li>• Identification des quick wins</li>
                <li>• Définition des objectifs mesurables</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div className="flex-1">
              <h5 className="font-semibold text-blue-900">Phase 2 : Développement & Test (Semaine 3-6)</h5>
              <p className="text-sm text-blue-800 mt-1">Création et test de votre première solution IA</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Développement de la solution prioritaire</li>
                <li>• Tests en environnement contrôlé</li>
                <li>• Formation de votre équipe</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div className="flex-1">
              <h5 className="font-semibold text-purple-900">Phase 3 : Déploiement & Optimisation (Semaine 7-8)</h5>
              <p className="text-sm text-purple-800 mt-1">Mise en production et optimisation continue</p>
              <ul className="text-sm mt-2 space-y-1">
                <li>• Déploiement en production</li>
                <li>• Monitoring et ajustements</li>
                <li>• Mesure du ROI et optimisation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ROI Prévisionnel */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-green-600" />
          💰 ROI Prévisionnel
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {eligibility?.level === 'Avancé' ? '25-40%' : eligibility?.level === 'Intermédiaire' ? '15-30%' : '10-20%'}
            </div>
            <div className="text-sm text-gray-600">ROI attendu</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {eligibility?.level === 'Avancé' ? '3-6' : eligibility?.level === 'Intermédiaire' ? '6-9' : '9-12'}
            </div>
            <div className="text-sm text-gray-600">Mois pour ROI positif</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {profile.mainChallenges.length * 15}%
            </div>
            <div className="text-sm text-gray-600">Gain de productivité</div>
          </div>
        </div>
      </div>

      {/* Prochaines étapes */}
      <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-blue-600" />
          🚀 Prochaines étapes recommandées
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Audit gratuit personnalisé (30 minutes)</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium">Proposition commerciale détaillée</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Démonstration sur votre cas d'usage</span>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="grid md:grid-cols-2 gap-4 pt-6">
        <button 
          onClick={downloadReport}
          className="bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Télécharger mon rapport
        </button>
        <button 
          onClick={() => window.open('https://calendly.com/contact-elsyvia/30min', '_blank')}
          className="bg-green-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Planifier un audit gratuit
        </button>
      </div>
    </div>
  );

  // Login Screen
  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Accès Démo | ElsyvIA</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Accès Démonstration</h1>
              <p className="text-gray-600">Entrez votre jeton d'accès pour continuer</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
                  Jeton d'Accès
                </label>
                <input
                  type="password"
                  id="token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Entrez votre jeton..."
                  required
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  {loginError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Accéder à la démonstration
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Démonstration | ElsyvIA</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8 pt-28">
        <div className="container mx-auto px-4">
          {/* Header avec bouton de déconnexion */}
          <div className="relative mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-gray-900">
                  Tableau de Bord IA ElsyvIA
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez en quelques minutes le potentiel de l'Intelligence Artificielle pour votre entreprise
              </p>
            </div>
            <button 
              onClick={handleLogout} 
              className="absolute top-0 right-0 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    {/* MODIFICATION START: Clickable wrapper added */}
                    <div
                      onClick={() => {
                        if (index < currentStep) {
                          setCurrentStep(index);
                        }
                      }}
                      className={`flex items-center transition-opacity ${
                        index < currentStep ? 'cursor-pointer hover:opacity-75' : ''
                      }`}
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                        currentStep >= index
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="ml-4 hidden md:block">
                        <div className={`font-medium ${currentStep >= index ? 'text-blue-600' : 'text-gray-400'}`}>
                          {step.title}
                        </div>
                        <div className="text-sm text-gray-500">{step.subtitle}</div>
                      </div>
                    </div>
                    {/* MODIFICATION END */}
                    
                    {index < steps.length - 1 && (
                      <div className={`hidden md:block w-24 h-0.5 mx-8 ${
                        currentStep > index ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {currentStep === 0 && <ProfileStep />}
              {currentStep === 1 && eligibility && <EligibilityStep />}
              {currentStep === 2 && <RecommendationsStep />}
              {currentStep === 3 && <ActionPlanStep />}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500">
            <p>Vos données restent confidentielles et ne sont pas stockées</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProspectDemoPage;
