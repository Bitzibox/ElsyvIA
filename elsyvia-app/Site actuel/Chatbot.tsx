import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import chatbotIcon from './chatbot-icon.png';
import { X, Send, User, Bot, Maximize2, Minimize2 } from 'lucide-react'; // Import des nouvelles icônes
import config from '/src/config';

// Structure de message simple pour l'affichage dans le frontend
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialMessage: string | null;
  clearInitialMessage: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen, initialMessage, clearInitialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // --- AJOUT : État pour gérer l'agrandissement
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcomeMessage = "Bonjour ! Je suis Elsy, votre assistante IA.\n\nComment puis-je vous aider aujourd'hui ?";

  const predefinedQuestions = [
    "Quels services proposez-vous ?",
    "Comment puis-je vous contacter ?",
    "Parlez-moi de vos solutions pour le secteur public",
  ];

  // Utilisation de la configuration centralisée
  const GEMINI_API_KEY = config.geminiApiKey;
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: welcomeMessage, sender: 'bot' }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageAndGetResponse = async (prompt: string, currentHistory: Message[]) => {
    setIsLoading(true);
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === 'VOTRE_CLE_API_ICI') {
        throw new Error('Configuration manquante');
      }
      const botResponse = await callGeminiAPI(prompt, currentHistory);
      const botMessage: Message = { text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur lors de la génération de réponse:', error);
      let errorText = "Désolée, une erreur est survenue.\n\nVeuillez réessayer.";
      
      if (error instanceof Error) {
        if (error.message.includes('Configuration manquante')) {
          errorText = "Configuration manquante.\n\nVeuillez contacter l'administrateur.";
        } else if (error.message.includes('403')) {
          errorText = "Accès non autorisé à l'API.\n\nVérifiez votre configuration.";
        } else if (error.message.includes('429')) {
          errorText = "Trop de requêtes.\n\nVeuillez patienter un moment.";
        }
      }
      
      const errorMessage: Message = { text: errorText, sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && initialMessage) {
      const userMessage: Message = { text: initialMessage, sender: 'user' };
      const newHistory = [...messages, userMessage];
      setMessages(newHistory);
      sendMessageAndGetResponse(initialMessage, newHistory);
      clearInitialMessage();
    }
  }, [isOpen, initialMessage]);

  const callGeminiAPI = async (prompt: string, conversationHistory: Message[]) => {
    try {
      const contents = [
        { role: 'user', parts: [{ text: "CONTEXTE: STRUCTURE tes réponses avec des sauts de ligne, des listes à puces (*) et des paragraphes clairs pour une lisibilité maximale. Utilise les titres en gras (**) pour mettre en évidence les sujets. Utilise la syntaxe Markdown pour le formatage (retours à la ligne avec deux espaces + entrée, **gras**, *italique*, listes avec - ou *, etc.). Pour contacter la société ElsyvIA, il faut soit envoyer un mail à contact@elsyvia.com ou remplir le formulaire directement en page d'accueil du site rubrique contact. Ton nom est Elsy. Tu ne réponds exclusivement qu'aux questions concernant la société ElsyvIA. Tu ne sors sous AUCUN PRETEXTE du contexte ElsyvIA. Tu es une assistante IA experte pour la société ElsyvIA. Tu es spécialisée dans les solutions d'IA pour les entreprises et le secteur public. Sois concise, utile et réponds toujours en français." }] },
        { role: 'model', parts: [{ text: 'Entendu. Je suis prête à vous aider avec des réponses bien formatées.' }] },
        ...conversationHistory
          .filter(msg => msg.text !== welcomeMessage)
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          })),
        { role: 'user', parts: [{ text: prompt }] }
      ];

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1024 }
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Erreur API Gemini:', response.status, errorData);
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Réponse invalide de l\'API');
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à Gemini:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage: Message = { text: input, sender: 'user' };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    const currentInput = input;
    setInput('');
    await sendMessageAndGetResponse(currentInput, newHistory);
  };
  
  const handlePredefinedQuestionClick = async (question: string) => {
    if (isLoading) return;

    const userMessage: Message = { text: question, sender: 'user' };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    
    await sendMessageAndGetResponse(question, newHistory);
  };

  return (
    <>
      <style>{`
        .chatbot-message .prose { line-height: 1.5; font-size: 14px; color: inherit; }
        .chatbot-message .prose p { margin-bottom: 0.75rem; }
        .chatbot-message .prose p:last-child { margin-bottom: 0; }
        .chatbot-message .prose strong { font-weight: 600; color: inherit; }
        .chatbot-message .prose ul, .chatbot-message .prose ol { margin: 0.5rem 0; padding-left: 1.25rem; }
        .chatbot-message .prose li { margin-bottom: 0.25rem; }
        .chatbot-message .prose h1, .chatbot-message .prose h2, .chatbot-message .prose h3, .chatbot-message .prose h4, .chatbot-message .prose h5, .chatbot-message .prose h6 { margin-top: 0.5rem; margin-bottom: 0.5rem; font-size: inherit; font-weight: 600; color: inherit; }
        .chatbot-message .prose em { font-style: italic; }
        .chatbot-message .prose code { background-color: rgba(0, 0, 0, 0.1); padding: 0.125rem 0.25rem; border-radius: 0.25rem; font-size: 0.875em; }
        .user-message .prose { color: white; }
        .user-message .prose strong { color: white; }
        .user-message .prose code { background-color: rgba(255, 255, 255, 0.2); color: white; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          // --- CORRECTION : Utilisation d'une méthode de positionnement plus robuste ---
          <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed z-50 flex flex-col bg-white rounded-2xl shadow-2xl ${
              isExpanded
                ? 'inset-5 md:inset-y-10 md:inset-x-1/4' // Positionnement robuste pour l'état agrandi
                : 'bottom-24 right-5 h-3/4 max-h-[600px] w-11/12 max-w-md' // Positionnement pour l'état normal
            }`}
          >
            <header className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <h3 className="font-bold text-lg">Discutez avec Elsy</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="p-1 rounded-full hover:bg-white/20"
                  aria-label={isExpanded ? "Réduire la fenêtre" : "Agrandir la fenêtre"}
                >
                  {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1 rounded-full hover:bg-white/20"
                  aria-label="Fermer le chat"
                >
                  <X size={20} />
                </button>
              </div>
            </header>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 my-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                      <Bot size={20} className="text-white" />
                    </div>
                  )}
                  <div className={`chatbot-message px-4 py-2 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'user-message bg-blue-500 text-white rounded-br-none max-w-xs md:max-w-sm' 
                      : `bg-white text-gray-800 rounded-bl-none border ${isExpanded ? 'max-w-full' : 'max-w-xs md:max-w-sm'}`
                  }`}>
                    <ReactMarkdown className="prose prose-sm">
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start gap-3 my-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-white text-gray-800 rounded-bl-none border">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t bg-white rounded-b-2xl">
              {!isLoading && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {predefinedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handlePredefinedQuestionClick(question)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={isLoading}
                />
                <button 
                  onClick={handleSend} 
                  disabled={isLoading || input.trim() === ''}
                  className="bg-teal-600 text-white p-3 rounded-full hover:bg-teal-700 disabled:bg-gray-400 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-teal-600 to-blue-600 text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'x' : 'chat'}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={36} /> : <img src={chatbotIcon} alt="Chat" className="w-12 h-12" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default Chatbot;
