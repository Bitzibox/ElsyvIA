// Remplacez le contenu de : src/components/Chatbot.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import logoImage from './logo-elsyvia.png';
import chatbotIcon from './chatbot-icon.png';

// On définit une structure de message qui correspond à ce que l'API Gemini attend
export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const suggestedQuestions = [
    "Quels services proposez-vous ?",
    "Comment l'IA peut aider ma PME ?",
    "Organisez-vous des formations ?"
];

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    // L'état s'appelle maintenant "history" pour correspondre au backend
    const [history, setHistory] = useState<ChatMessage[]>([
        { role: 'model', parts: [{ text: "Bonjour ! Je suis Elsy, l'assistant virtuel d'ElsyvIA. Comment puis-je vous renseigner ?" }] }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim()) return;

        const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: messageText }] };
        const newHistory = [...history, newUserMessage];
        
        setHistory(newHistory);
        setIsLoading(true);

        try {
            // On envoie maintenant l'historique complet au backend
            const response = await axios.post('/api/chat', { history: newHistory });
            const botReply: ChatMessage = { role: 'model', parts: [{ text: response.data.reply }] };
            setHistory(prev => [...prev, botReply]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Désolé, une erreur technique m'empêche de répondre. Veuillez réessayer plus tard." }] };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(userInput);
        setUserInput('');
    };
    
    const handleSuggestedQuestionClick = (question: string) => {
        sendMessage(question);
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 hidden'}`}>
                <div className="w-80 sm:w-96 h-[32rem] bg-white rounded-lg shadow-xl flex flex-col">
                    <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-3 text-white flex justify-between items-center rounded-t-lg">
                        <div className="flex items-center gap-2"><img src={logoImage} alt="Avatar Elsy" className="w-8 h-8 rounded-full bg-white p-1" /><h3 className="font-semibold">Assistant Elsy</h3></div>
                        <button onClick={() => setIsOpen(false)} className="hover:opacity-75"><X size={20} /></button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {history.map((msg, index) => (
                            <div key={index} className={`mb-3 flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && <img src={logoImage} alt="Avatar" className="w-6 h-6 rounded-full bg-white p-0.5" />}
                                <div className={`p-2 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <ReactMarkdown className="prose prose-sm">{msg.parts[0].text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <img src={logoImage} alt="Avatar" className="w-6 h-6 rounded-full bg-white p-0.5" />
                                <div className="p-2 rounded-lg bg-gray-200 text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    {history.length <= 1 && (
                        <div className="p-3 border-t">
                            <p className="text-xs text-gray-500 mb-2">Suggestions :</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((q, i) => (
                                    <button key={i} onClick={() => handleSuggestedQuestionClick(q)} className="text-xs border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100">
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <form onSubmit={handleFormSubmit} className="p-3 border-t flex">
                        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Posez votre question..." className="flex-1 px-3 py-2 border rounded-l-md" disabled={isLoading} />
                        <button type="submit" className="bg-teal-600 text-white px-4 rounded-r-md" disabled={isLoading}><Send size={20} /></button>
                    </form>
                </div>
            </div>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={`transition-all duration-300 ease-in-out transform hover:scale-110`}
            >
                {isOpen ? null : <img src={chatbotIcon} alt="Ouvrir le chatbot" className="w-20 h-20 rounded-full" />}
            </button>
        </div>
    );
};

export default Chatbot;
