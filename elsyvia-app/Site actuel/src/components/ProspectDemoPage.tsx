import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Building2, Users, Target, TrendingUp, CheckCircle, AlertTriangle, 
  Zap, Calculator, FileText, Search, Download, ChevronRight, 
  ArrowRight, Star, Clock, Euro, BarChart3, Lightbulb, Brain,
  PieChart, Settings, Rocket, Shield, Award, Calendar, LogOut
} from 'lucide-react';

const CORRECT_TOKEN = 'Elsyv1Acgenial2025!';

// Interface for company profile
interface CompanyProfile {
  sector: string;
  size: string;
  mainChallenges: string[];
  currentTools: string[];
  budget: string;
  timeline: string;
}

// Interface for eligibility results
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

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

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

  // Function to download the PDF report
  const downloadReport = () => {
    if (!eligibility || !profile.sector) return;

    const sectorData = sectors[profile.sector];
    const sizeData = companySizes.find(s => s.id === profile.size);
    
    // Create the HTML content for the report
    const reportContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rapport d'Éligibilité IA - ElsyvIA</title>
        <style>
            body {
                font-family: 'Inter', sans-serif;
                line-height: 1.6;
                color: #374151;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8fafc;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #1e3a8a;
                font-size: 2.5em;
                margin: 0;
                font-weight: 800;
            }
            .header p {
                color: #4b5563;
                font-size: 1.1em;
                margin: 10px 0 0 0;
            }
            .section {
                margin: 30px 0;
                padding: 20px;
                border-left: 4px solid #dbeafe;
                background-color: #f9fafb;
                border-radius: 0 12px 12px 0;
            }
            .section h2 {
                color: #111827;
                font-size: 1.5em;
                margin-top: 0;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 700;
            }
            .score-circle {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: linear-gradient(135deg, #2563eb, #10b981);
                color: white;
                font-size: 2.2em;
                font-weight: bold;
                margin: 0 auto 20px;
                box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
            }
            .profile-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            .profile-item {
                background: #f9fafb;
                padding: 15px;
                border-radius: 12px;
                border: 1px solid #e5e7eb;
            }
            .profile-item strong {
                color: #1f2937;
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
                border-radius: 12px;
                border: 1px solid #e5e7eb;
                transition: all 0.3s ease;
            }
            .recommendation-card:hover {
                border-color: #60a5fa;
                transform: translateY(-3px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            .recommendation-card h4 {
                color: #111827;
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 1.2em;
                font-weight: 600;
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
                border-radius: 12px;
                border-left: 6px solid #10b981;
            }
            .phase.phase-2 {
                border-left-color: #2563eb;
            }
            .phase.phase-3 {
                border-left-color: #7c3aed;
            }
            .phase h4 {
                color: #111827;
                margin-top: 0;
                font-size: 1.2em;
                font-weight: 600;
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
                border-radius: 12px;
                text-align: center;
                border: 1px solid #e5e7eb;
            }
            .roi-value {
                font-size: 2.2em;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .roi-value.green { color: #10b981; }
            .roi-value.blue { color: #2563eb; }
            .roi-value.purple { color: #7c3aed; }
            .next-steps {
                background: linear-gradient(135deg, #eff6ff, #f0fdfa);
                padding: 25px;
                border-radius: 16px;
                border: 1px solid #93c5fd;
                margin: 30px 0;
            }
            .next-steps h3 {
                color: #1e3a8a;
                margin-top: 0;
                font-weight: 700;
            }
            .step-item {
                background: white;
                margin: 10px 0;
                padding: 15px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
                background: #f1f5f9;
                border-radius: 12px;
                color: #64748b;
                font-size: 0.9em;
            }
            .contact-link {
                display: inline-block;
                margin: 20px 0;
                padding: 12px 24px;
                background: linear-gradient(to right, #10b981, #2563eb);
                color: white;
                text-decoration: none;
                border-radius: 9999px;
                font-weight: 600;
                transition: transform 0.2s;
            }
            .contact-link:hover {
                transform: scale(1.05);
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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
                    <h3 style="color: #1f2937; margin: 0; font-weight: 700;">Niveau : ${eligibility.level}</h3>
                    <p style="color: #4b5563;">Votre entreprise présente un ${eligibility.level === 'Avancé' ? 'excellent' : eligibility.level === 'Intermédiaire' ? 'bon' : 'correct'} potentiel pour l'intégration de solutions IA.</p>
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
                    <div style="background: #f0fdfa; padding: 20px; border-radius: 12px; border: 1px solid #a7f3d0;">
                        <h4 style="color: #047857; margin-top: 0; font-weight: 600;">✅ Points forts identifiés</h4>
                        <ul>
                            ${eligibility.quickWins.map(win => `<li>${win}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border: 1px solid #bfdbfe;">
                        <h4 style="color: #1e40af; margin-top: 0; font-weight: 600;">🚀 Vision long terme</h4>
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
                                    <span style="font-weight: 600; color: ${rec.impact === 'Élevé' ? '#10b981' : rec.impact === 'Moyen' ? '#f59e0b' : '#ef4444'};">${rec.impact}</span>
                                </div>
                                <div>
                                    <span style="color: #6b7280;">Complexité:</span>
                                    <span style="font-weight: 600; color: ${
                                      rec.complexity === 'Très faible' ? '#10b981' :
                                      rec.complexity === 'Faible' ? '#2563eb' :
                                      rec.complexity === 'Moyenne' ? '#f59e0b' : '#ef4444'
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
                        <p style="margin: 5px 0 0 0; color: #4b5563; font-size: 0.9em;">Analyse approfondie de vos besoins spécifiques</p>
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-icon">✓</div>
                    <div>
                        <strong>Proposition commerciale détaillée</strong>
                        <p style="margin: 5px 0 0 0; color: #4b5563; font-size: 0.9em;">Devis personnalisé avec timeline précise</p>
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-icon">✓</div>
                    <div>
                        <strong>Démonstration sur votre cas d'usage</strong>
                        <p style="margin: 5px 0 0 0; color: #4b5563; font-size: 0.9em;">POC adapté à votre secteur d'activité</p>
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

    // Create and download the HTML file
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

  // Data for sectors with their typical challenges and opportunities
  const sectors = {
'e-commerce': {
      name: 'E-commerce',
      icon: '🛒', // Correction ici
      challenges: ['Abandon de panier', 'Service client 24/7', 'Recommandations produits', 'Gestion des retours', 'Optimisation des stocks'],
      opportunities: [
        {
          title: 'Chatbot Commercial & Support',
          description: 'Un agent IA pour qualifier les leads, répondre aux FAQ et assister les clients 24/7.',
          baseImpact: 'Élevé',
          baseComplexity: 'Faible',
          baseTimeline: { min: 2, max: 4 }, // in weeks
          baseRoi: { min: 20, max: 40 } // in percent
        },
        {
          title: 'Moteur de Recommandation',
          description: 'Augmentez le panier moyen en proposant des produits pertinents basés sur le comportement des utilisateurs.',
          baseImpact: 'Élevé',
          baseComplexity: 'Moyenne',
          baseTimeline: { min: 4, max: 8 },
          baseRoi: { min: 15, max: 35 }
        },
        {
          title: 'Automatisation Logistique',
          description: 'Optimisez la gestion des retours et des stocks grâce à des prévisions et des workflows intelligents.',
          baseImpact: 'Moyen',
          baseComplexity: 'Élevée',
          baseTimeline: { min: 8, max: 12 },
          baseRoi: { min: 25, max: 50 }
        }
      ]
    },
    'services': {
      name: 'Services aux entreprises',
      icon: '🏢',
      challenges: ['Qualification des leads', 'Génération de devis', 'Planification rendez-vous', 'Suivi client', 'Reporting manuel'],
      opportunities: [
        {
          title: 'Assistant Commercial IA',
          description: 'Automatisez la qualification des leads et la prise de rendez-vous pour vos équipes commerciales.',
          baseImpact: 'Élevé',
          baseComplexity: 'Faible',
          baseTimeline: { min: 3, max: 5 },
          baseRoi: { min: 25, max: 45 }
        },
        {
          title: 'Génération de Devis Intelligente',
          description: 'Créez des devis précis et personnalisés en quelques secondes en répondant à quelques questions.',
          baseImpact: 'Moyen',
          baseComplexity: 'Moyenne',
          baseTimeline: { min: 5, max: 9 },
          baseRoi: { min: 15, max: 30 }
        },
        {
          title: 'Automatisation du CRM',
          description: 'Synchronisez les informations, mettez à jour les fiches clients et générez des rapports automatiquement.',
          baseImpact: 'Élevé',
          baseComplexity: 'Moyenne',
          baseTimeline: { min: 4, max: 7 },
          baseRoi: { min: 20, max: 40 }
        }
      ]
    },
    'sante': {
      name: 'Santé & Bien-être',
      icon: '🏥',
      challenges: ['Prise de rendez-vous', 'Gestion dossiers patients', 'Rappels automatiques', 'Surcharge du secrétariat'],
      opportunities: [
        {
          title: 'Assistant Médical IA',
          description: 'Gérez la prise de rendez-vous, les rappels et répondez aux questions fréquentes des patients.',
          baseImpact: 'Élevé',
          baseComplexity: 'Faible',
          baseTimeline: { min: 2, max: 4 },
          baseRoi: { min: 30, max: 50 }
        },
        {
          title: 'Planification Intelligente',
          description: 'Optimisez les plannings des praticiens et des salles pour réduire les temps morts.',
          baseImpact: 'Moyen',
          baseComplexity: 'Moyenne',
          baseTimeline: { min: 6, max: 10 },
          baseRoi: { min: 15, max: 25 }
        },
        {
          title: 'Suivi Patient Automatisé',
          description: 'Envoyez des consignes pré-opératoires ou des suivis post-consultation de manière automatique.',
          baseImpact: 'Moyen',
          baseComplexity: 'Faible',
          baseTimeline: { min: 3, max: 6 },
          baseRoi: { min: 20, max: 35 }
        }
      ]
    },
    'restauration': {
        name: 'Restauration',
        icon: '🍽️',
        challenges: ['Prise de commandes (téléphone/sur place)', 'Gestion des réservations', 'Gestion des avis clients', 'Optimisation du menu'],
        opportunities: [
            {
                title: 'Chatbot de Commande & Réservation',
                description: 'Permettez à vos clients de commander et réserver 24/7 directement via un chatbot, sans commission.',
                baseImpact: 'Élevé',
                baseComplexity: 'Faible',
                baseTimeline: { min: 2, max: 3 },
                baseRoi: { min: 25, max: 50 },
            },
            {
                title: 'Analyse des Préférences Clients',
                description: 'Analysez les ventes et les avis pour optimiser votre menu et identifier les tendances.',
                baseImpact: 'Moyen',
                baseComplexity: 'Moyenne',
                baseTimeline: { min: 4, max: 6 },
                baseRoi: { min: 10, max: 20 },
            },
            {
                title: 'Gestion Intelligente des Stocks',
                description: 'Prévoyez les besoins en ingrédients en fonction des ventes, de la météo et des événements.',
                baseImpact: 'Moyen',
                baseComplexity: 'Élevée',
                baseTimeline: { min: 8, max: 12 },
                baseRoi: { min: 15, max: 30 },
            }
        ]
    },
    'immobilier': {
        name: 'Immobilier',
        icon: '🏠',
        challenges: ['Qualification des acheteurs/locataires', 'Planification des visites', 'Réponse aux demandes récurrentes', 'Estimation de biens'],
        opportunities: [
            {
                title: 'Assistant Immobilier IA',
                description: 'Qualifiez les prospects, répondez aux questions sur les biens et planifiez les visites automatiquement.',
                baseImpact: 'Élevé',
                baseComplexity: 'Faible',
                baseTimeline: { min: 3, max: 5 },
                baseRoi: { min: 20, max: 40 },
            },
            {
                title: 'Matching Intelligent Prospect-Bien',
                description: 'Proposez automatiquement les biens les plus pertinents à vos prospects en fonction de leurs critères.',
                baseImpact: 'Élevé',
                baseComplexity: 'Moyenne',
                baseTimeline: { min: 5, max: 8 },
                baseRoi: { min: 15, max: 35 },
            },
            {
                title: 'Pré-estimation Automatisée',
                description: 'Offrez une première estimation de bien en ligne pour générer de nouveaux mandats.',
                baseImpact: 'Moyen',
                baseComplexity: 'Moyenne',
                baseTimeline: { min: 4, max: 7 },
                baseRoi: { min: 10, max: 25 },
            }
        ]
    },
    'autre': {
      name: 'Autre secteur',
      icon: '🏭',
      challenges: ['Processus manuels chronophages', 'Communication client', 'Gestion des données', 'Optimisation du temps'],
      opportunities: [
        {
            title: 'Automatisation des Tâches Répétitives',
            description: 'Identifions ensemble un processus manuel à faible valeur ajoutée et automatisons-le avec une IA.',
            baseImpact: 'Élevé',
            baseComplexity: 'Faible',
            baseTimeline: { min: 2, max: 5 },
            baseRoi: { min: 20, max: 50 },
        },
        {
            title: 'Agent Conversationnel Interne',
            description: 'Un chatbot pour répondre aux questions de vos collaborateurs (RH, IT, etc.) et libérer du temps.',
            baseImpact: 'Moyen',
            baseComplexity: 'Faible',
            baseTimeline: { min: 3, max: 6 },
            baseRoi: { min: 15, max: 30 },
        },
        {
            title: 'Analyse de Données Intelligente',
            description: 'Extrayez des informations clés de vos documents (factures, contrats, rapports) automatiquement.',
            baseImpact: 'Moyen',
            baseComplexity: 'Moyenne',
            baseTimeline: { min: 6, max: 10 },
            baseRoi: { min: 15, max: 35 },
        }
      ]
    }
  };

  const companySizes = [
    { id: 'tpe', name: 'TPE (1-9 employés)', multiplier: 1 },
    { id: 'pme', name: 'PME (10-49 employés)', multiplier: 1.5 },
    { id: 'eti', name: 'ETI (50-249 employés)', multiplier: 2 },
    { id: 'ge', name: 'Grande entreprise (250+ employés)', multiplier: 3 }
  ];

  // Calculate eligibility score
  const calculateEligibilityScore = () => {
    let score = 0;
    let factors = [];

    // Score based on sector
    if (profile.sector && sectors[profile.sector]) {
      score += 20;
      factors.push("Secteur adapté à l'IA");
    }

    // Score based on size
    const sizeData = companySizes.find(s => s.id === profile.size);
    if (sizeData) {
      score += Math.min(25, sizeData.multiplier * 10);
      factors.push(`Taille d'entreprise: ${sizeData.multiplier}x potential`);
    }

    // Score based on challenges
    score += Math.min(30, profile.mainChallenges.length * 7);
    if (profile.mainChallenges.length > 0) {
      factors.push(`${profile.mainChallenges.length} défis identifiés`);
    }

    // Score based on budget
    const budgetScores = {
      'moins-5k': 5,
      '5k-15k': 15,
      '15k-50k': 25,
      'plus-50k': 25
    };
    score += budgetScores[profile.budget] || 0;

    // Score based on timeline
    const timelineScores = {
      'immediat': 20,
      '3-mois': 15,
      '6-mois': 10,
      'plus-6-mois': 5
    };
    score += timelineScores[profile.timeline] || 0;

    // Determine level
    let level: 'Débutant' | 'Intermédiaire' | 'Avancé';
    
    score = Math.min(100, score);

    if (score >= 75) {
      level = 'Avancé';
    } else if (score >= 45) {
      level = 'Intermédiaire';
    } else {
      level = 'Débutant';
    }

    // DYNAMICALLY GENERATE quickWins, recommendations, and longTerm
    let quickWins: string[] = [];
    if (profile.timeline === 'immediat') {
        quickWins.push("Réactivité et volonté d'agir vite");
    }
    if (['15k-50k', 'plus-50k'].includes(profile.budget)) {
        quickWins.push("Budget confortable pour un projet à fort impact");
    }
    if (profile.mainChallenges.length >= 3) {
        quickWins.push("Identification claire des points de douleur");
    }
    if (quickWins.length === 0) {
        quickWins.push("Ouverture à l'innovation et nouvelles technologies");
    }
     if (quickWins.length < 3) {
        quickWins.push("Potentiel d'automatisation des tâches répétitives");
    }


    const sectorData = sectors[profile.sector];
    let recommendations: string[] = sectorData?.opportunities.map(opp => opp.title) || [];
    
    let longTerm: string[] = [];
    if (['eti', 'ge'].includes(profile.size)) {
        longTerm.push("Déploiement à grande échelle dans l'entreprise");
    }
    if (level === 'Avancé') {
        longTerm.push("Positionnement comme leader innovant du secteur");
    } else {
        longTerm.push("Optimisation continue des processus clés");
    }
    longTerm.push("Développement d'une culture de la donnée");


    return {
      score,
      level,
      recommendations,
      quickWins,
      longTerm,
      factors
    };
  };

  // Generate personalized recommendations
  const generateRecommendations = (eligibilityResult: EligibilityResult) => {
    const sectorData = sectors[profile.sector];
    if (!sectorData || !sectorData.opportunities) return [];

    // Define multipliers based on user profile
    const budgetMultipliers = { 'moins-5k': 1.2, '5k-15k': 1, '15k-50k': 0.8, 'plus-50k': 0.6 };
    const levelMultipliers = { 'Débutant': 1.2, 'Intermédiaire': 1, 'Avancé': 0.8 };

    const timelineMultiplier = budgetMultipliers[profile.budget] || 1;
    const complexityMultiplier = levelMultipliers[eligibilityResult.level] || 1;
    const roiMultiplier = 1 / timelineMultiplier; // Shorter timeline (from bigger budget) implies faster/higher ROI

    return sectorData.opportunities.map((opp, index) => {
        // Adjust timeline
        const timelineMin = Math.round(opp.baseTimeline.min * timelineMultiplier);
        const timelineMax = Math.round(opp.baseTimeline.max * timelineMultiplier);

        // Adjust ROI
        const roiMin = Math.round(opp.baseRoi.min * roiMultiplier);
        const roiMax = Math.round(opp.baseRoi.max * roiMultiplier);
        
        // Determine complexity string based on multiplier
        const complexityLevels = ['Très faible', 'Faible', 'Moyenne', 'Élevée'];
        const baseComplexityIndex = complexityLevels.indexOf(opp.baseComplexity);
        const adjustedComplexityIndex = Math.round(baseComplexityIndex * complexityMultiplier);
        const finalComplexityIndex = Math.min(complexityLevels.length - 1, Math.max(0, adjustedComplexityIndex));
        const complexity = complexityLevels[finalComplexityIndex];

        return {
            id: index,
            title: opp.title,
            description: opp.description,
            impact: opp.baseImpact, // Keep impact as defined in the data
            complexity: complexity,
            timeline: `${timelineMin}-${timelineMax} semaines`,
            roi: `${roiMin}-${roiMax}%`
        };
    });
  };

  const steps = [
    {
      title: 'Profil Entreprise',
      subtitle: 'Parlez-nous de vous',
      icon: Building2
    },
    {
      title: 'Analyse d\'Éligibilité',
      subtitle: 'Votre potentiel IA',
      icon: Brain
    },
    {
      title: 'Recommandations',
      subtitle: 'Solutions sur-mesure',
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
    <div className="space-y-10">
      {/* Sector */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
          <Building2 className="w-6 h-6 text-blue-600" />
          Dans quel secteur évoluez-vous ?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(sectors).map(([key, sector]) => (
            <button
              key={key}
              onClick={() => setProfile(p => ({ ...p, sector: key }))}
              className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-lg hover:-translate-y-1 ${
                profile.sector === key
                  ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-300'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="text-3xl mb-2">{sector.icon}</div>
              <div className="font-semibold text-gray-800">{sector.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Company Size */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
          <Users className="w-6 h-6 text-green-600" />
          Quelle est la taille de votre entreprise ?
        </h3>
        <div className="space-y-3">
          {companySizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setProfile(p => ({ ...p, size: size.id }))}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 ${
                profile.size === size.id
                  ? 'border-green-500 bg-green-50/50 ring-2 ring-green-300'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <CheckCircle className={`w-5 h-5 transition-opacity ${profile.size === size.id ? 'opacity-100 text-green-600' : 'opacity-0'}`} />
              <span className="font-semibold text-gray-800">{size.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Challenges */}
      {profile.sector && (
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
            <Target className="w-6 h-6 text-orange-600" />
            Quels sont vos principaux défis ? (Plusieurs choix possibles)
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
                className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-lg hover:-translate-y-1 ${
                  profile.mainChallenges.includes(challenge)
                    ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-300'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{challenge}</span>
                  {profile.mainChallenges.includes(challenge) && (
                    <CheckCircle className="w-5 h-5 text-orange-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Budget */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
          <Euro className="w-6 h-6 text-purple-600" />
          Quel est votre budget envisagé pour une solution IA ?
        </h3>
        <div className="space-y-3">
          {[
            { id: 'moins-5k', name: 'Moins de 5 000€', desc: 'Solutions d\'entrée de gamme' },
            { id: '5k-15k', name: '5 000€ - 15 000€', desc: 'Solutions intermédiaires' },
            { id: '15k-50k', name: '15 000€ - 50 000€', desc: 'Solutions avancées' },
            { id: 'plus-50k', name: 'Plus de 50 000€', desc: 'Solutions sur-mesure' }
          ].map((budget) => (
            <button
              key={budget.id}
              onClick={() => setProfile(p => ({ ...p, budget: budget.id }))}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-lg hover:-translate-y-1 ${
                profile.budget === budget.id
                  ? 'border-purple-500 bg-purple-50/50 ring-2 ring-purple-300'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="font-semibold text-gray-800">{budget.name}</div>
              <div className="text-sm text-gray-600">{budget.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-gray-800">
          <Clock className="w-6 h-6 text-red-600" />
          Dans quel délai souhaitez-vous mettre en place une solution ?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'immediat', name: 'Immédiat', icon: '⚡' },
            { id: '3-mois', name: 'Dans 3 mois', icon: '📅' },
            { id: '6-mois', name: 'Dans 6 mois', icon: '🗓️' },
            { id: 'plus-6-mois', name: 'Plus de 6 mois', icon: '⏰' }
          ].map((timeline) => (
            <button
              key={timeline.id}
              onClick={() => setProfile(p => ({ ...p, timeline: timeline.id }))}
              className={`p-4 rounded-xl border-2 transition-all text-center hover:shadow-lg hover:-translate-y-1 ${
                profile.timeline === timeline.id
                  ? 'border-red-500 bg-red-50/50 ring-2 ring-red-300'
                  : 'border-gray-200 bg-white hover:border-red-300'
              }`}
            >
              <div className="text-3xl mb-2">{timeline.icon}</div>
              <div className="text-sm font-semibold text-gray-800">{timeline.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={handleProfileSubmit}
          disabled={!profile.sector || !profile.size || profile.mainChallenges.length === 0 || !profile.budget || !profile.timeline}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
        >
          Analyser mon éligibilité IA
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const EligibilityStep = () => (
    <div className="space-y-10">
      {/* Main Score */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-green-400 text-white mb-6 shadow-2xl shadow-blue-500/30">
          <div className="text-center">
            <div className="text-5xl font-bold">{eligibility?.score}%</div>
            <div className="text-lg font-medium">Score IA</div>
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-2 text-gray-900">
          Votre niveau : <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">{eligibility?.level}</span>
        </h3>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Votre entreprise présente un {eligibility?.level === 'Avancé' ? 'excellent' : eligibility?.level === 'Intermédiaire' ? 'bon' : 'certain'} potentiel pour l'intégration de solutions IA.
        </p>
      </div>

      {/* Profile Details */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-3 text-lg">
            <CheckCircle className="w-6 h-6" />
            Points forts
          </h4>
          <ul className="text-gray-700 space-y-2">
            {eligibility?.quickWins.slice(0, 3).map((win, index) => (
              <li key={index} className="flex items-start gap-3">
                <Star className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>{win}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h4 className="font-bold text-green-900 mb-4 flex items-center gap-3 text-lg">
            <TrendingUp className="w-6 h-6" />
            Opportunités
          </h4>
          <ul className="text-gray-700 space-y-2">
            {eligibility?.recommendations.slice(0, 3).map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <h4 className="font-bold text-purple-900 mb-4 flex items-center gap-3 text-lg">
            <Rocket className="w-6 h-6" />
            Vision Long Terme
          </h4>
          <ul className="text-gray-700 space-y-2">
            {eligibility?.longTerm.slice(0, 3).map((term, index) => (
              <li key={index} className="flex items-start gap-3">
                <Award className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={() => setCurrentStep(2)}
          className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
        >
          Voir mes recommandations personnalisées
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const RecommendationsStep = () => (
    <div className="space-y-10">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2 text-gray-900">Solutions recommandées pour vous</h3>
        <p className="text-gray-600 text-lg">
          Basées sur votre profil <span className="font-semibold text-blue-600">{sectors[profile.sector]?.name}</span> et votre niveau <span className="font-semibold text-blue-600">{eligibility?.level}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`bg-white p-6 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${selectedRecommendation?.id === rec.id ? 'border-blue-500 ring-4 ring-blue-200' : 'hover:border-blue-300'}`}
            onClick={() => setSelectedRecommendation(rec)}
          >
            <h4 className="font-bold text-lg text-gray-800 mb-3 h-14">{rec.title}</h4>
            <p className="text-sm text-gray-600 mb-4 h-24">{rec.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Impact:</span>
                <span className={`font-semibold px-2 py-0.5 rounded-full ${
                    rec.impact === 'Élevé' ? 'text-green-700 bg-green-100' : 
                    rec.impact === 'Moyen' ? 'text-yellow-700 bg-yellow-100' : 'text-red-700 bg-red-100'}`}>
                  {rec.impact}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Complexité:</span>
                <span className={`font-semibold px-2 py-0.5 rounded-full ${
                  rec.complexity === 'Très faible' ? 'text-green-700 bg-green-100' :
                  rec.complexity === 'Faible' ? 'text-blue-700 bg-blue-100' : 
                  rec.complexity === 'Moyenne' ? 'text-yellow-700 bg-yellow-100' : 'text-red-700 bg-red-100'
                }`}>
                  {rec.complexity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Délai:</span>
                <span className="font-semibold">{rec.timeline}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">ROI estimé:</span>
                <span className="font-semibold text-green-600">{rec.roi}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRecommendation && (
        <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200 transition-all duration-500">
          <h4 className="font-bold text-blue-900 mb-3 text-xl">
            Solution sélectionnée : {selectedRecommendation.title}
          </h4>
          <p className="text-blue-800 mb-4">{selectedRecommendation.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <strong className="text-blue-900">Avantages attendus :</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside text-blue-700">
                <li>Gain de temps significatif</li>
                <li>Amélioration de l'expérience client</li>
                <li>ROI mesurable en {selectedRecommendation.timeline}</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-900">Prochaines étapes :</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside text-blue-700">
                <li>Audit approfondi gratuit</li>
                <li>Proposition personnalisée</li>
                <li>Démonstration sur votre cas d'usage</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="pt-6">
        <button
          onClick={() => setCurrentStep(3)}
          disabled={!selectedRecommendation}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
        >
          Créer mon plan d'action personnalisé
          <Rocket className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const ActionPlanStep = () => (
    <div className="space-y-10">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2 text-gray-900">Votre Plan d'Action Personnalisé</h3>
        <p className="text-gray-600 text-lg">
          Votre feuille de route pour intégrer l'IA dans votre entreprise <span className="font-semibold text-blue-600">{sectors[profile.sector]?.name}</span>
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
        <h4 className="font-bold mb-4 text-xl text-gray-800">📋 Résumé de votre profil</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-md">
          <div className="bg-white p-4 rounded-lg"><span className="font-semibold text-gray-800">Secteur:</span> {sectors[profile.sector]?.name}</div>
          <div className="bg-white p-4 rounded-lg"><span className="font-semibold text-gray-800">Taille:</span> {companySizes.find(s => s.id === profile.size)?.name}</div>
          <div className="bg-white p-4 rounded-lg"><span className="font-semibold text-gray-800">Score IA:</span> <span className="font-bold text-blue-600">{eligibility?.score}%</span> ({eligibility?.level})</div>
          <div className="bg-white p-4 rounded-lg"><span className="font-semibold text-gray-800">Défis:</span> {profile.mainChallenges.length}</div>
        </div>
      </div>

      {/* Timeline with phases */}
      <div className="space-y-6">
        <h4 className="font-bold text-xl text-gray-800">🗓️ Timeline recommandée</h4>
        
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:h-full before:w-0.5 before:bg-gray-200">
          <div className="relative flex gap-6 p-4 bg-green-50 rounded-2xl border-l-4 border-green-500">
            <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl ring-8 ring-white">1</div>
            <div>
              <h5 className="font-bold text-green-900 text-lg">Phase 1 : Audit & Stratégie (Semaine 1-2)</h5>
              <p className="text-green-800 mt-1">Analyse approfondie de vos processus et définition de la stratégie IA.</p>
            </div>
          </div>

          <div className="relative flex gap-6 p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl ring-8 ring-white">2</div>
            <div>
              <h5 className="font-bold text-blue-900 text-lg">Phase 2 : Développement & Test (Semaine 3-6)</h5>
              <p className="text-blue-800 mt-1">Création et test de votre première solution IA.</p>
            </div>
          </div>

          <div className="relative flex gap-6 p-4 bg-purple-50 rounded-2xl border-l-4 border-purple-500">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl ring-8 ring-white">3</div>
            <div>
              <h5 className="font-bold text-purple-900 text-lg">Phase 3 : Déploiement & Optimisation (Semaine 7+)</h5>
              <p className="text-purple-800 mt-1">Mise en production et optimisation continue.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ROI */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
        <h4 className="font-bold mb-4 flex items-center gap-3 text-xl text-gray-800">
          <BarChart3 className="w-6 h-6 text-green-600" />
          💰 ROI Prévisionnel
        </h4>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-3xl font-extrabold text-green-600 mb-1">
              {eligibility?.level === 'Avancé' ? '25-40%' : eligibility?.level === 'Intermédiaire' ? '15-30%' : '10-20%'}
            </div>
            <div className="text-sm text-gray-600">ROI attendu</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">
              {eligibility?.level === 'Avancé' ? '3-6' : eligibility?.level === 'Intermédiaire' ? '6-9' : '9-12'}
            </div>
            <div className="text-sm text-gray-600">Mois pour ROI positif</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">
              {profile.mainChallenges.length * 15}%
            </div>
            <div className="text-sm text-gray-600">Gain de productivité</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4 pt-6">
        <button 
          onClick={downloadReport}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
        >
          <Download className="w-6 h-6" />
          Télécharger mon rapport
        </button>
        <button 
          onClick={() => window.open('https://calendly.com/contact-elsyvia/30min', '_blank')}
          className="bg-gradient-to-r from-green-500 to-teal-400 text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
        >
          <Calendar className="w-6 h-6" />
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 p-4">
          <div className="bg-white/70 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Accès Démonstration</h1>
              <p className="text-gray-600">Entrez votre jeton d'accès pour continuer.</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="••••••••••••"
                  required
                />
              </div>
              
              {loginError && (
                <div className="text-red-600 text-sm bg-red-100 p-3 rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {loginError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-4 rounded-full font-bold hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
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
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Header with logout button */}
          <div className="relative mb-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
              Tableau de Bord IA <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">ElsyvIA</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez en quelques minutes le potentiel de l'Intelligence Artificielle pour votre entreprise.
            </p>
            <button 
              onClick={handleLogout} 
              className="absolute top-0 right-0 bg-white text-gray-700 px-4 py-2 rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-all flex items-center gap-2 border border-gray-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto my-12 p-4 bg-white/60 backdrop-blur-lg rounded-full shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    onClick={() => { if (index < currentStep) { setCurrentStep(index); } }}
                    className={`flex items-center transition-all duration-300 ${index <= currentStep ? 'opacity-100' : 'opacity-50'} ${index < currentStep ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= index
                        ? 'bg-gradient-to-br from-blue-600 to-green-500 border-blue-700 text-white shadow-lg'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4 hidden md:block">
                      <div className={`font-bold transition-colors ${currentStep >= index ? 'text-blue-700' : 'text-gray-500'}`}>
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500">{step.subtitle}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-200">
                       <div
                        className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-500"
                        style={{ width: currentStep > index ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-200">
              {currentStep === 0 && <ProfileStep />}
              {currentStep === 1 && eligibility && <EligibilityStep />}
              {currentStep === 2 && <RecommendationsStep />}
              {currentStep === 3 && <ActionPlanStep />}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500">
            <p>🔒 Vos données restent confidentielles et ne sont pas stockées.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProspectDemoPage;
