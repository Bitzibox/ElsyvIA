import React from 'react';
import { Heart, Shield, BookOpen, Handshake } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Accessibilité',
      description: 'Rendre l\'IA compréhensible et utilisable par tous, quel que soit le niveau technique'
    },
    {
      icon: Shield,
      title: 'Éthique',
      description: 'Développer une IA responsable, transparente et respectueuse des valeurs humaines'
    },
    {
      icon: BookOpen,
      title: 'Pédagogie',
      description: 'Transmettre les connaissances avec clarté pour une autonomie durable'
    },
    {
      icon: Handshake,
      title: 'Accompagnement humain',
      description: 'Un suivi personnalisé à chaque étape de votre transformation digitale'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Notre <span className="gradient-text">philosophie</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Chez ElsyvIA, nous croyons que l'intelligence artificielle doit servir l'humain,
            pas le remplacer. Notre mission est de démocratiser l'IA en la rendant accessible,
            compréhensible et utile pour tous.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>

        {/* Team/Founder Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Une expertise au service de votre transformation
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Notre équipe combine expertise technique et vision business pour vous accompagner
              dans votre transformation digitale. Nous mettons notre passion de l'IA au service
              de votre réussite, avec une approche sur-mesure et un accompagnement de qualité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Rencontrez l'équipe
              </a>
              <a
                href="#services"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-teal-600 hover:text-teal-600 transition-all duration-300"
              >
                Nos services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;