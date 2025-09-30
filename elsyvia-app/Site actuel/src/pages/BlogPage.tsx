// Remplacez le contenu de : src/pages/BlogPage.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '../data/blogPosts';

const POSTS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                const sorted = response.data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setAllPosts(sorted);
            } catch (error) {
                console.error("Erreur de récupération des articles:", error);
            }
        };
        fetchPosts();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + POSTS_PER_PAGE);
    };

    const visiblePosts = allPosts.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-28">
            <Helmet>
                <title>Blog IA & Ressources | ElsyvIA</title>
                <meta name="description" content="Découvrez nos articles, guides et analyses sur l'intelligence artificielle, l'automatisation et la transformation digitale pour les professionnels." />
                <meta name="keywords" content="blog IA, actualités IA, guide automatisation, ressources IA" />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <button onClick={() => navigate('/')} className="flex items-center text-teal-600 hover:text-teal-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Retour à l'accueil
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Blog & <span className="gradient-text">Ressources</span>
                    </h1>
                </div>
                
                {allPosts.length > 0 ? (
                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {visiblePosts.map((post) => (
                            <BlogCard key={post.id} post={post} onSelectPost={(id) => navigate(`/blog/${id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucun article pour le moment.</p>
                    </div>
                )}

                {visibleCount < allPosts.length && (
                    <div className="text-center mt-12">
                        <button onClick={handleLoadMore} className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                            Voir plus d'articles
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

interface BlogCardProps {
    post: BlogPost;
    onSelectPost: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onSelectPost }) => {
    return (
        <article className="bg-white rounded-2xl p-6 shadow-lg card-hover flex flex-col">
            <div className="flex-grow">
                <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                         <Calendar className="w-4 h-4 mr-1.5" />
                         <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.content.replace(/^# .*\n\n?/, '').trim()}</p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    <span>{post.readTime}</span>
                </div>
                <button onClick={() => onSelectPost(post.id)} className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                    Lire l'article →
                </button>
            </div>
        </article>
    );
};

export default BlogPage;
