// Remplacez le contenu de : src/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import de TOUS les composants de la page d'accueil
import Hero from '../components/Hero'; // Le composant qui avait disparu
import About from '../components/About';
import Services from '../components/Services';
import UseCases from '../components/UseCases';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Blog from '../components/Blog';
import { BlogPost } from '../data/blogPosts';

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
        <title>ElsyvIA | Intelligence Artificielle au service des organisations innovantes</title>
        <meta name="description" content="Boostez votre productivité avec l'IA. ElsyvIA propose des solutions de conseil, d'intégration sur-mesure et de formation en automatisation pour les entreprises." />
        <meta name="keywords" content="conseil IA, formation IA, automatisation, intelligence artificielle, PME, transformation digitale" />
      </Helmet>
      <Hero /> {/* On s'assure que le Hero est bien affiché ici */}
      <About />
      <Services />
      <UseCases />
      <Testimonials />
      <Contact />
      <Blog 
        articles={recentPosts}
        onViewBlog={() => navigate('/blog')} 
        onSelectPost={(id) => navigate(`/blog/${id}`)} 
      />
    </>
  );
};

export default HomePage;
