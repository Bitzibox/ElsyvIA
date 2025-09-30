// Remplacez le contenu de : src/components/EmbeddedChat.tsx

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import logoImage from './logo-elsyvia.png';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const suggestedQuestions = [
    "Quels services proposez-vous ?",
    "Comment l'IA peut aider ma PME ?",
    "Parlez-moi de vos formations."
];

// On ajoute une nouvelle prop "autoScrollEnabled" qui est activée par défaut
const EmbeddedChat: React.FC<{ initialMessage?: string; autoScrollEnabled?: boolean }> = ({ initialMessage, autoScrollEnabled = true }) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: initialMessage || "Bonjour ! Posez-moi une question pour commencer." }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef<null | HTMLDivElement>(null); // Référence pour la fenêtre de chat

    useEffect(() => {
        // Le scroll ne se produit que si l'option est activée
        if (autoScrollEnabled && chatBodyRef.current) {
            // On fait défiler le conteneur des messages, pas la page entière
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, autoScrollEnabled]);

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim()) return;
        const newUserMessage: Message = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, newUserMessage]);
        setIsLoading(true);
        try {
            const response = await axios.post('/api/chat', { message: messageText });
            const botReply: Message = { sender: 'bot', text: response.data.reply };
            setMessages(prev => [...prev, botReply]);
        } catch (error) {
            const errorMessage: Message = { sender: 'bot', text: "Désolé, une erreur technique m'empêche de répondre." };
            setMessages(prev => [...prev, errorMessage]);
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
        <div className="w-full h-full bg-white rounded-lg shadow-xl flex flex-col">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-3 text-white flex justify-between items-center rounded-t-lg">
                <div className="flex items-center gap-2">
                    <img src={logoImage} alt="Avatar Elsy" className="w-8 h-8 rounded-full bg-white p-1" />
                    <h3 className="font-semibold">Assistant Elsy</h3>
                </div>
            </div>
            {/* On ajoute la référence au conteneur des messages */}
            <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-3 flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'bot' && <img src={logoImage} alt="Avatar" className="w-6 h-6 rounded-full bg-white p-0.5" />}
                        <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            <ReactMarkdown className="prose prose-sm">{msg.text}</ReactMarkdown>
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
            </div>
            {messages.length <= 1 && (
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
    );
};

export default EmbeddedChat;
