import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

const EmailSetup = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Configuration EmailJS requise
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            Pour activer l'envoi d'emails automatique, vous devez configurer EmailJS :
          </p>
          <ol className="text-sm text-blue-700 space-y-1 mb-3">
            <li>1. Créez un compte sur <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="underline">EmailJS.com</a></li>
            <li>2. Configurez un service email (Gmail, Outlook, etc.)</li>
            <li>3. Créez des templates d'email pour le contact et la newsletter</li>
            <li>4. Remplacez les IDs dans Contact.tsx et Blog.tsx</li>
          </ol>
          <div className="bg-blue-100 p-3 rounded mb-3">
            <p className="text-xs text-blue-800 font-medium mb-1">Templates nécessaires :</p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• <strong>Contact :</strong> Formulaire de contact → gendronch@gmail.com</li>
              <li>• <strong>Newsletter :</strong> Inscription newsletter → gendronch@gmail.com</li>
            </ul>
          </div>
          <a
            href="https://www.emailjs.com/docs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            Documentation EmailJS
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailSetup;