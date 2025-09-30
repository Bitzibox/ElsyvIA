// src/pages/HomePage.tsx

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importations des composants
// J'ai remplacé MapChart par Map, qui existe bien dans la librairie
import { BookOpen, Radar, Map, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import Contact from '../components/Contact';

// L'interface pour les articles de blog reste inchangée
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

// ============================================================================
// COMPOSANTS DE LA PAGE (MIS À JOUR AVEC LE NOUVEAU DISCOURS)
// ============================================================================

// SECTION 1 : HÉROS (MESSAGE PRINCIPAL MIS À JOUR)
const HeroSection: React.FC = () => (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-white text-center overflow-hidden px-4 pt-24">
        <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                Au-delà des IA génériques : Concevons l'agent expert adapté à <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">votre réalité locale.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Nous développons des agents IA sur mesure pour les collectivités, réseaux et organisations qui transforment vos données et votre savoir-métier en un avantage stratégique.
            </p>
            <a href="#contact" className="inline-flex items-center bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors duration-300 transform hover:scale-105">
                Planifier un entretien stratégique <ArrowRight className="w-5 h-5 ml-2" />
            </a>
        </div>
    </section>
);

// SECTION 2 : PROBLÈME / SOLUTION (REMPLACE L'ANCIENNE SECTION "ABOUT")
const ProblemSolutionSection: React.FC = () => (
    <section id="solution" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">L'information abonde, la pertinence fait défaut.</h2>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto text-left">
                <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Les limites de l'IA universelle</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">Les assistants génériques manquent de contexte métier et local. Ils ne connaissent ni vos réglementations, ni vos données, ni la terminologie de votre secteur. Le résultat ? Des réponses vagues et une faible valeur ajoutée.</p>
                </div>
                <div className="bg-teal-500 text-white p-8 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">La puissance de l'IA sur mesure</h3>
                    <p className="text-lg leading-relaxed">Nous créons un copilote digital calibré pour vous. Entraîné sur vos référentiels et sensibilisé à votre écosystème, il devient un véritable expert qui comprend vos enjeux et accélère vos missions.</p>
                </div>
            </div>
        </div>
    </section>
);

// SECTION 3 : CAS D'USAGE (REMPLACE L'ANCIENNE SECTION "SERVICES")
const UseCasesSection: React.FC = () => (
    <section id="use-cases" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Votre agent IA sur mesure peut devenir...</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6"><BookOpen className="w-8 h-8 text-teal-600" /></div>
                    <h3 className="text-xl font-bold mb-3">Un Guide Expert</h3>
                    <p className="text-gray-600">Traduisez des réglementations complexes en un guide interactif et instantané pour vos équipes ou le grand public.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6"><Radar className="w-8 h-8 text-teal-600" /></div>
                    <h3 className="text-xl font-bold mb-3">Un Assistant de Veille</h3>
                    <p className="text-gray-600">Surveillez l'actualité économique ou les appels d'offres sur votre territoire avec des synthèses intelligentes.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    {/* L'icône a été corrigée ici */}
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6"><Map className="w-8 h-8 text-teal-600" /></div>
                    <h3 className="text-xl font-bold mb-3">Un Copilote d'Analyse</h3>
                    <p className="text-gray-600">Connectez votre agent à vos données pour identifier des tendances et révéler des opportunités cachées.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 mb-6"><MessageSquare className="w-8 h-8 text-teal-600" /></div>
                    <h3 className="text-xl font-bold mb-3">Un Compagnon Digital</h3>
                    <p className="text-gray-600">Déployez un expert virtuel qui parle le même langage que vos collaborateurs pour les former et les assister.</p>
                </div>
            </div>
        </div>
    </section>
);

// SECTION 4 : NOTRE DÉMARCHE (NOUVELLE SECTION AJOUTÉE)
const MethodologySection: React.FC = () => (
    <section id="methodology" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Une IA à la carte : notre démarche</h2>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="flex items-start"><CheckCircle2 className="w-8 h-8 text-teal-500 mr-4 mt-1 flex-shrink-0" /><div><h3 className="text-xl font-bold mb-2">1. Écoute & Cadrage Stratégique</h3><p className="text-gray-700">Nous partons de vos priorités pour définir les objectifs, les utilisateurs cibles et le périmètre d'action de votre futur agent IA.</p></div></div>
                <div className="flex items-start"><CheckCircle2 className="w-8 h-8 text-teal-500 mr-4 mt-1 flex-shrink-0" /><div><h3 className="text-xl font-bold mb-2">2. Conception & Intégration Data</h3><p className="text-gray-700">Nous identifions et connectons les sources de savoir pertinentes : documents internes, bases de données métier, open data locale.</p></div></div>
                <div className="flex items-start"><CheckCircle2 className="w-8 h-8 text-teal-500 mr-4 mt-1 flex-shrink-0" /><div><h3 className="text-xl font-bold mb-2">3. Développement & Personnalisation</h3><p className="text-gray-700">Nous façonnons la "personnalité" de votre agent (ton, style, expertise) pour qu'il s'intègre parfaitement à vos outils existants.</p></div></div>
                <div className="flex items-start"><CheckCircle2 className="w-8 h-8 text-teal-500 mr-4 mt-1 flex-shrink-0" /><div><h3 className="text-xl font-bold mb-2">4. Optimisation & Suivi Continu</h3><p className="text-gray-700">Nous analysons les retours d'usage pour affiner ses réponses, enrichir ses connaissances et garantir son efficacité sur le long terme.</p></div></div>
            </div>
        </div>
    </section>
);


// SECTION BLOG (INCHANGÉE)
interface BlogSectionProps {
  articles: BlogPost[];
  onSelectPost: (id: string) => void;
  onViewBlog: () => void;
}
const BlogSection: React.FC<BlogSectionProps> = ({ articles, onSelectPost, onViewBlog }) => (
    <section id="blog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nos derniers articles</h2>
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
// PAGE D'ACCUEIL PRINCIPALE (STRUCTURE MISE À JOUR)
// ============================================================================
const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [recentPosts, setRecentPosts] = React.useState<BlogPost[]>([]);

    React.useEffect(() => {
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
                <title>ElsyvIA | Conception d'Agents IA sur mesure pour les Territoires</title>
                <meta name="description" content="Nous développons des agents IA experts, adaptés à votre secteur et votre réalité locale. Transformez votre savoir-métier en un avantage stratégique." />
                <meta name="keywords" content="agent IA, IA sur mesure, IA pour collectivités, IA pour PME, innovation territoriale, transformation digitale, copilote IA" />
            </Helmet>

            <HeroSection />
            <ProblemSolutionSection />
            <UseCasesSection />
            <MethodologySection />
            
            <BlogSection
                articles={recentPosts}
                onViewBlog={() => navigate('/blog')}
                onSelectPost={(id) => navigate(`/blog/${id}`)}
            />
            <Contact />
        </>
    );
};

export default HomePage;
