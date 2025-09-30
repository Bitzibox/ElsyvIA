// Ce fichier doit être placé dans /api/chat.js

// Importation du SDK officiel de Google
import { GoogleGenerativeAI } from '@google/generative-ai';

// Récupération de la clé API depuis les variables d'environnement du serveur
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Vérification de la présence de la clé
if (!GEMINI_API_KEY) {
  throw new Error("La variable d'environnement GEMINI_API_KEY n'est pas définie.");
}

// Initialisation du client AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Définition du handler pour la route /api/chat
export default async function handler(req, res) {
  // On s'assure que la requête est bien de type POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { history } = req.body;

    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ error: 'Le champ "history" est manquant ou invalide.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // L'historique reçu du frontend est déjà au bon format
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // On envoie uniquement le dernier message de l'utilisateur
    const lastUserMessage = history[history.length - 1].parts[0].text;
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Erreur côté serveur dans /api/chat:", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
}
