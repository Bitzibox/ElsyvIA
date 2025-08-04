// src/config.ts
// Configuration centralisée pour l'application

interface Config {
  geminiApiKey: string;
  isDevelopment: boolean;
}

const config: Config = {
  // Essaie d'abord la variable d'environnement, sinon utilise la clé en dur
  geminiApiKey: process.env.REACT_APP_GEMINI_API_KEY || '',
  isDevelopment: process.env.NODE_ENV === 'development'
};

// Validation de la configuration
if (!config.geminiApiKey || config.geminiApiKey === 'VOTRE_CLE_API_ICI') {
  console.warn('⚠️ Clé API Gemini non configurée. Veuillez configurer REACT_APP_GEMINI_API_KEY');
}

export default config;
