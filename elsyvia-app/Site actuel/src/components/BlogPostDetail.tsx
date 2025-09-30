// Dans : src/components/BlogPostDetail.tsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '../data/blogPosts';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ post, onBack }) => {
  return (
    // CORRECTION ICI : Simplification pour assurer que la marge en haut s'applique
    <div className="bg-white pt-32 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Bouton de retour */}
        <div className="mb-8">
          <button 
            onClick={onBack} 
            className="inline-flex items-center text-gray-600 hover:text-teal-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au blog
          </button>
        </div>

        {/* En-tête de l'article */}
        <header className="mb-8">
          <p className="text-base font-semibold text-teal-600">{post.category}</p>
          
          {/* CORRECTION ICI : J'ai supprimé le <h1> qui affichait le titre en double */}

          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>Par {post.author}</span>
            <span>&middot;</span>
            <span>{post.readTime} de lecture</span>
          </div>
        </header>

        {/* Le contenu de l'article (qui contient déjà le titre) */}
        <div className="prose prose-lg lg:prose-xl max-w-none prose-h1:text-teal-700 prose-a:text-teal-600 hover:prose-a:text-teal-700">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
