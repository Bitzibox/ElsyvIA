// Ce fichier doit être placé dans /api/chat.js

// Importation du SDK officiel de Google
import { GoogleGenerativeAI } from '@google/generative-ai';

// Récupération de la clé API depuis les variables d'environnement du serveur
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Définition du handler pour la route /api/chat
export default async function handler(req, res) {
  // On s'assure que la requête est bien de type POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  // --- ÉTAPE 1: VÉRIFICATION DE LA CLÉ API ---
  if (!GEMINI_API_KEY) {
    console.error("ERREUR CRITIQUE: La variable d'environnement GEMINI_API_KEY n'est pas définie sur le serveur.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  try {
    // --- ÉTAPE 2: PARSING ROBUSTE DE LA REQUÊTE ---
    let requestBody = req.body;
    
    // Log pour debug
    console.log('Corps de la requête reçu:', JSON.stringify(requestBody, null, 2));
    
    // Certains environnements ne parsènt pas automatiquement le JSON
    if (typeof requestBody === 'string') {
        try {
            requestBody = JSON.parse(requestBody);
        } catch (e) {
            console.error('Erreur de parsing JSON du corps de la requête:', req.body);
            return res.status(400).json({ error: 'Le corps de la requête n\'est pas un JSON valide.' });
        }
    }

    const { history } = requestBody;

    // Validation plus robuste
    if (!history) {
      console.error('Validation échouée: le champ "history" est manquant.', requestBody);
      return res.status(400).json({ error: 'Le champ "history" est requis.' });
    }

    if (!Array.isArray(history)) {
      console.error('Validation échouée: le champ "history" n\'est pas un tableau.', typeof history);
      return res.status(400).json({ error: 'Le champ "history" doit être un tableau.' });
    }

    // Vérifier que chaque élément de l'historique a la bonne structure
    const isValidHistory = history.every(msg => 
      msg && 
      typeof msg === 'object' && 
      (msg.role === 'user' || msg.role === 'model') &&
      Array.isArray(msg.parts) &&
      msg.parts.length > 0 &&
      msg.parts.every(part => part && typeof part.text === 'string')
    );

    if (!isValidHistory) {
      console.error('Validation échouée: structure de l\'historique invalide.', history);
      return res.status(400).json({ error: 'Structure de l\'historique invalide.' });
    }

    console.log('Historique validé:', JSON.stringify(history, null, 2));

    // --- ÉTAPE 3: PRÉPARATION DE L'HISTORIQUE POUR GEMINI ---
    const contents = [
      // Instruction système
      { 
        role: 'user', 
        parts: [{ 
          text: "CONTEXTE: Ton nom est Elsy. Tu es une assistante IA experte pour la société ElsyvIA. Tu es spécialisée dans les solutions d'IA pour les entreprises et le secteur public. Sois concise, utile et réponds toujours en français." 
        }] 
      },
      { 
        role: 'model', 
        parts: [{ text: 'Entendu. Je suis prête à vous aider.' }] 
      },
      // Ajouter l'historique de la conversation
      ...history
    ];
    
    console.log('Contents envoyés à Gemini:', JSON.stringify(contents, null, 2));
    
    // --- ÉTAPE 4: APPEL À L'API GEMINI ---
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent({ contents });
    const response = await result.response;
    const text = response.text();

    console.log('Réponse de Gemini:', text);

    // --- ÉTAPE 5: ENVOI DE LA RÉPONSE ---
    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Erreur dans le bloc CATCH de /api/chat:", error);
    
    // Afficher plus de détails sur l'erreur
    if (error.response) {
      console.error('Erreur de réponse:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Erreur de requête:', error.request);
    } else {
      console.error('Erreur:', error.message);
    }
    
    res.status(500).json({ 
      error: "Une erreur interne est survenue lors de la communication avec l'IA.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}























