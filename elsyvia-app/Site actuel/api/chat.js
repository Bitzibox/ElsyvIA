// Ce fichier doit être placé dans /api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
    console.log('--- ✅ TRACEUR : APPEL REÇU PAR /var/www/elsyvia-app/ElsyvIA/api/chat.js ---');
    if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  if (!GEMINI_API_KEY) {
    console.error("ERREUR CRITIQUE: La variable d'environnement GEMINI_API_KEY n'est pas définie sur le serveur.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  try {
    let requestBody = req.body;

    if (typeof requestBody === 'string') {
        try {
            requestBody = JSON.parse(requestBody);
        } catch (e) {
            console.error('Erreur de parsing JSON du corps de la requête:', req.body);
            return res.status(400).json({ error: 'Le corps de la requête n\'est pas un JSON valide.' });
        }
    }

    let contents = [];
    let promptMessage = '';
    
    // NOUVELLE LOGIQUE : Détecter si la requête est du format 'history' ou 'message'
    if (requestBody.history && Array.isArray(requestBody.history)) {
      console.log("Requête reçue de la page de démo. Utilisation de l'historique.");
      contents = requestBody.history;
      promptMessage = contents[contents.length - 1].parts[0].text;
    } else if (requestBody.message) {
      console.log("Requête reçue du chatbot standard. Création d'un historique.");
      promptMessage = requestBody.message;
      // On construit l'historique avec un prompt système de base
      contents = [
        { role: 'user', parts: [{ text: "CONTEXTE: Ton nom est Elsy. Tu es une assistante IA experte pour la société ElsyvIA. Tu ne réponds qu'aux questions sur la société ElsyvIA et ses services. Sois concise, utile et réponds toujours en français." }] },
        { role: 'model', parts: [{ text: 'Entendu. Je suis prête à vous aider.' }] },
        { role: 'user', parts: [{ text: promptMessage }] }
      ];
    } else {
      console.error('Validation échouée: format de requête invalide.', requestBody);
      return res.status(400).json({ error: 'Format de requête invalide. Attendu: { history: [...] } ou { message: "..." }.' });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({ contents });

    const result = await chat.sendMessage(promptMessage);
    const response = await result.response;
    const text = response.text();
    
    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Erreur dans le bloc CATCH de /api/chat:", error);
    
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
