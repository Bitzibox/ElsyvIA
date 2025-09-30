// Remplacez le contenu de : src/pages/PostDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogPostDetail from '../components/BlogPostDetail';
import { BlogPost } from '../data/blogPosts';

const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await axios.get(`/api/posts/${id}`);
                    setPost(response.data);
                } catch (error) {
                    console.error(`Erreur de récupération de l'article ${id}:`, error);
                    navigate('/blog');
                }
            };
            fetchPost();
        }
    }, [id, navigate]);

    if (!post) {
        return (
            <>
                <Helmet>
                    <title>Chargement... | ElsyvIA</title>
                </Helmet>
                <div className="text-center py-48">Chargement de l'article...</div>
            </>
        );
    }

    const postUrl = `https://elsyvia.com/blog/${post.id}`;

    return (
        <>
            <Helmet>
                {/* Balises SEO Standard */}
                <title>{`${post.title} | ElsyvIA`}</title>
                <meta name="description" content={post.excerpt} />
                {post.tags && <meta name="keywords" content={post.tags.join(', ')} />}

                {/* Balises Open Graph pour LinkedIn, Facebook, etc. */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={postUrl} />
                <meta property="og:site_name" content="ElsyvIA" />
                
                {/* LA BALISE IMAGE IMPORTANTE */}
                <meta property="og:image" content="https://elsyvia.com/og-image.png" />
            </Helmet>
            
            <BlogPostDetail post={post} onBack={() => navigate('/blog')} />
        </>
    );
};

export default PostDetailPage;
