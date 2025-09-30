import React from 'react';
import { Lightbulb, Cog, GraduationCap, Building2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Lightbulb,
      title: 'Conseil en stratégie IA',
      description: 'Audit de vos besoins, définition de votre roadmap IA et identification des opportunités d\'automatisation.',
      features: [
        'Analyse de vos processus métier',
        'Identification des cas d\'usage prioritaires',
        'Roadmap de transformation digitale',
        'ROI et étude de faisabilité'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Cog,
      title: 'Intégration sur-mesure',
      description: 'Développement et déploiement de solutions IA adaptées à votre environnement et vos contraintes.',
      features: [
        'Chatbots intelligents',
        'Automatisation de processus',
        'IA générative personnalisée',
        'Intégration API et outils existants'
      ],
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: GraduationCap,
      title: 'Formation & Acculturation',
      description: 'Ateliers pratiques pour rendre vos équipes autonomes et confiantes avec les outils IA.',
      features: [
        'Formations sur-mesure',
        'Ateliers pratiques',
        'Support continu',
        'Certification des compétences'
      ],
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Building2,
      title: 'Secteur public & para-public',
      description: 'Accompagnement spécialisé pour les collectivités, administrations et organisations publiques.',
      features: [
        'Conformité RGPD et sécurité',
        'Solutions respectueuses des contraintes publiques',
        'Accompagnement change management',
        'Formation des agents'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos <span className="gradient-text">services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De la stratégie à la mise en œuvre, nous vous accompagnons à chaque étape
            de votre transformation IA avec des solutions sur-mesure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg card-hover">
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Discutons de votre projet
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
