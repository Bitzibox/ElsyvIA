// Contenu modifié pour : src/components/Blog.tsx

import React from 'react';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';
import emailjs from 'emailjs-com';
import { BlogPost } from '../data/blogPosts';

interface BlogProps {
  articles: BlogPost[];
  onViewBlog: () => void;
  onSelectPost: (id: string) => void;
}

const Blog: React.FC<BlogProps> = ({ articles, onViewBlog, onSelectPost }) => {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog & <span className="gradient-text">Ressources</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos articles, guides pratiques et retours d'expérience
            pour maîtriser l'IA et transformer votre organisation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 card-hover">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.content.replace(/^# .*\n\n?/, '').trim()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{article.readTime} de lecture</span>
                <button
                  onClick={() => onSelectPost(article.id)}
                  className="flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 mb-16">
            <button
                onClick={onViewBlog}
                className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
            >
                Voir tous les articles
            </button>
        </div>

        <NewsletterSubscription />

      </div>
    </section>
  );
};

// Le composant Newsletter COMPLET avec son formulaire
const NewsletterSubscription: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const templateParams = { from_name: 'Inscription Newsletter', from_email: email, to_email: 'gendronch@gmail.com', company: 'Newsletter ElsyvIA', subject: 'Nouvelle inscription à la newsletter', message: `Nouvelle inscription à la newsletter ElsyvIA:\n\nEmail: ${email}\nDate: ${new Date().toLocaleString('fr-FR')}\n\nCette personne souhaite recevoir la newsletter mensuelle avec les actualités IA.` };
            await emailjs.send('service_8dsleng', 'template_5lc3rzk', templateParams, 'hP7-YEoHV4VtCfhQn');
            setSubmitStatus('success');
            setEmail('');
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div id="newsletter" className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="max-w-2xl mx-auto">
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Recevez notre ebook gratuit !
                </h3>
                <p className="text-blue-100 mb-6">
        Inscrivez-vous à notre newsletter pour recevoir notre guide complet
        sur l'IA et ne rien manquer de nos actualités.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre adresse email" required disabled={isSubmitting} className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50" />
                    <button type="submit" disabled={isSubmitting || !email} className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
                    </button>
                </form>
                {submitStatus === 'success' && <div className="p-3"><span className="text-green-100">✅ Merci ! Votre inscription a été prise en compte.</span></div>}
                {submitStatus === 'error' && <div className="p-3"><span className="text-red-100">❌ Une erreur s'est produite. Veuillez réessayer.</span></div>}
                <p className="text-xs text-blue-200 mt-4">
                    Pas de spam. Désinscription possible à tout moment.
                </p>
            </div>
        </div>
    );
};

export default Blog;
