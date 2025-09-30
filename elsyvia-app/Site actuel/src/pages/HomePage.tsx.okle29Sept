// src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importations des composants de la page
import { LayoutDashboard, BrainCircuit, ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Contact from '../components/Contact'; // <-- IMPORTATION DE VOTRE COMPOSANT

// Définition du type pour un article de blog
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

// ============================================================================
//  COMPOSANTS EMBARQUÉS DANS LA PAGE
// ============================================================================

const Hero = () => (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-white text-center overflow-hidden px-4 pt-24">
        <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                Prenez des décisions plus <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">intelligentes</span> grâce à la Data Analyse.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Nous transformons vos données brutes en insights stratégiques pour piloter la croissance de votre organisation et optimiser vos services.
            </p>
            <a href="#contact" className="inline-flex items-center bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 transform hover:scale-105">
                Planifier un diagnostic data gratuit <ArrowRight className="w-5 h-5 ml-2" />
            </a>
        </div>
    </section>
);

const About = () => (
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre ADN : la donnée au service de votre performance.</h2>
            <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                    Chez ElsyvIA, notre mission est de rendre l'analyse de données accessible et actionnable grâce à l'intelligence artificielle pour transformer vos données en votre plus grand atout.
                </p>
            </div>
        </div>
    </section>
);

const Services = () => (
    <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nos solutions pour faire parler vos données</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6"><LayoutDashboard className="w-8 h-8 text-teal-600" /></div>
                    <h3 className="text-xl font-bold mb-3">Reporting & Dashboards Intelligents</h3>
                    <p className="text-gray-600">Automatisez vos rapports et visualisez vos indicateurs clés en temps réel pour suivre votre performance.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6"><BrainCircuit className="w-8 h-8 text-teal-600" /></div>
                    <h3 className="text-xl font-bold mb-3">Analyse Prédictive & Modélisation</h3>
                    <p className="text-gray-600">Anticipez l'avenir. Grâce à nos modèles d'IA, prévoyez les ventes, les risques ou optimisez vos ressources.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6"><ClipboardCheck className="w-8 h-8 text-teal-600" /></div>
                    <h3 className="text-xl font-bold mb-3">Audit & Stratégie Data</h3>
                    <p className="text-gray-600">Nous évaluons votre maturité data et bâtissons avec vous une feuille de route claire et actionnable.</p>
                </div>
            </div>
        </div>
    </section>
);

const UseCases = () => (
    <section id="use-cases" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">La Data Analyse en action</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-10">
                <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Pour les Entreprises</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Marketing :</strong> Optimiser les campagnes publicitaires.</span></li>
                        <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Ventes :</strong> Mieux cibler la prospection.</span></li>
                        <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Opérations :</strong> Prévoir les besoins en stock.</span></li>
                    </ul>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Pour les Collectivités</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Urbanisme :</strong> Améliorer les transports publics.</span></li>
                        <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Services Publics :</strong> Optimiser la collecte des déchets.</span></li>
                        <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 mt-1 flex-shrink-0" /><span><strong>Citoyenneté :</strong> Comprendre les besoins des administrés.</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

interface BlogSectionProps {
  articles: BlogPost[];
  onSelectPost: (id: string) => void;
  onViewBlog: () => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ articles, onSelectPost, onViewBlog }) => (
    <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nos dernières analyses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {articles.length > 0 ? articles.map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer" onClick={() => onSelectPost(post.id)}>
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-teal-600">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <span className="font-semibold text-teal-600 hover:underline">Lire la suite</span>
                        </div>
                    </div>
                )) : <p className="col-span-3 text-center text-gray-500">Chargement des articles...</p>}
            </div>
            <div className="text-center mt-12">
                <button onClick={onViewBlog} className="bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors duration-300">
                    Voir tous les articles
                </button>
            </div>
        </div>
    </section>
);


// ============================================================================
// PAGE D'ACCUEIL PRINCIPALE
// ============================================================================
const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                const sortedPosts = response.data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setRecentPosts(sortedPosts.slice(0, 3));
            } catch (error) {
                console.error("Erreur lors de la récupération des articles récents:", error);
            }
        };
        fetchRecentPosts();
    }, []);

    return (
        <>
            <Helmet>
                <title>ElsyvIA | Data Analyse IA pour Entreprises & Collectivités</title>
                <meta name="description" content="Transformez vos données en décisions stratégiques. ElsyvIA propose des solutions IA sur-mesure pour l'analyse de données, le reporting et la business intelligence." />
                <meta name="keywords" content="data analyse IA, business intelligence, reporting automatisé, visualisation de données, IA pour collectivités, IA pour PME, science des données" />
            </Helmet>

            <Hero />
            <About />
            <Services />
            <UseCases />
            <BlogSection
                articles={recentPosts}
                onViewBlog={() => navigate('/blog')}
                onSelectPost={(id) => navigate(`/blog/${id}`)}
            />
            
            {/* On appelle simplement votre composant Contact ici */}
            <Contact />
        </>
    );
};

export default HomePage;
