// Ce fichier doit être placé dans /api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
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

    const { history } = requestBody;

    if (!history) {
      console.error('Validation échouée: le champ "history" est manquant.', requestBody);
      return res.status(400).json({ error: 'Le champ "history" est requis.' });
    }

    if (!Array.isArray(history)) {
      console.error('Validation échouée: le champ "history" n\'est pas un tableau.', typeof history);
      return res.status(400).json({ error: 'Le champ "history" doit être un tableau.' });
    }

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

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const chat = model.startChat({ history });

    const lastMessage = history[history.length - 1].parts[0].text;
    const result = await chat.sendMessage(lastMessage);
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
