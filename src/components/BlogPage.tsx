import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Tag, Search, Filter } from 'lucide-react';
import { blogPosts, BlogPost } from '../data/blogPosts';

interface BlogPageProps {
  onBack: () => void;
  selectedPost?: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ onBack, selectedPost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Si un article spécifique est sélectionné, l'afficher
  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (post) {
      return <BlogPostDetail post={post} onBack={onBack} />;
    }
  }

  // Filtrer les articles
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Obtenir toutes les catégories et tags uniques
  const categories = [...new Set(blogPosts.map(post => post.category))];
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center text-teal-600 hover:text-teal-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog & <span className="gradient-text">Ressources</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Découvrez nos articles, guides pratiques et analyses pour maîtriser l'IA
            et transformer votre organisation avec succès.
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Filtre par catégorie */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Filtre par tag */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Tous les tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            {/* Reset */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedTag('');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Articles */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun article ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {post.category}
        </span>
        {post.featured && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
            À la une
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
        {post.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.slice(0, 3).map(tag => (
          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Meta info */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-1" />
          <span>{post.author}</span>
        </div>
        <button className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
          Lire l'article →
        </button>
      </div>
    </article>
  );
};

const BlogPostDetail: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <button
            onClick={onBack}
            className="flex items-center text-teal-600 hover:text-teal-700 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au blog
          </button>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  À la une
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-6">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime} de lecture</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <article className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, match => {
                  const level = match.trim().length;
                  return `<h${level} class="text-${4-level}xl font-bold text-gray-900 mt-8 mb-4">`;
                }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }} />
            </div>
          </article>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Besoin d'accompagnement pour votre projet IA ?
            </h3>
            <p className="mb-6">
              Nos experts sont là pour vous aider à concrétiser vos ambitions.
            </p>
            <button
              onClick={onBack}
              className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;