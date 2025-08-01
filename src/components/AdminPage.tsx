// Remplacez le contenu de : src/components/AdminPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LogOut } from 'lucide-react';
import { BlogPost } from '../data/blogPosts';

// 1. Importer l'éditeur et son moteur
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
// 2. Importer le style de l'éditeur
import 'react-markdown-editor-lite/lib/index.css';

const API_URL = '/api';

// 3. Initialiser le moteur de conversion
const mdParser = new MarkdownIt();

const AdminPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_URL}/posts`);
            setPosts(response.data.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            setError('');
        } catch (err) {
            setError('Erreur lors de la récupération des articles.');
        }
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('elsyvia_user');
        if (storedUser) {
            const { user, pass } = JSON.parse(storedUser);
            setUsername(user);
            setPassword(pass);
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            fetchPosts();
        }
    }, [isLoggedIn]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');
        try {
            await axios.post(`${API_URL}/login`, { username, password });
            sessionStorage.setItem('elsyvia_user', JSON.stringify({ user: username, pass: password }));
            setIsLoggedIn(true);
        } catch (err) {
            setLoginError('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('elsyvia_user');
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
        setPosts([]);
    };

    const handleSavePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPost) return;
        setIsSaving(true);
        setError('');
        const headers = { username, password };
        try {
            if (currentPost.id) {
                await axios.put(`${API_URL}/posts/${currentPost.id}`, currentPost, { headers });
            } else {
                await axios.post(`${API_URL}/posts`, currentPost, { headers });
            }
            setCurrentPost(null);
            fetchPosts();
        } catch (err: any) {
            setError(`Erreur de sauvegarde : ${err.response?.data?.message || err.message}`);
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleDeletePost = async (postId: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            const headers = { username, password };
            try {
                await axios.delete(`${API_URL}/posts/${postId}`, { headers });
                fetchPosts();
            } catch (err: any) {
                setError(`Erreur de suppression : ${err.response?.data?.message || err.message}`);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentPost) {
            const { name, value } = e.target;
            setCurrentPost({ ...currentPost, [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value });
        }
    };

    // Nouvelle fonction pour gérer les changements dans l'éditeur Markdown
    const handleEditorChange = ({ text }: { text: string }) => {
        if (currentPost) {
            setCurrentPost({ ...currentPost, content: text });
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h1 className="text-2xl font-bold mb-6 text-center">Accès Administration</h1>
                    <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Nom d'utilisateur</label><input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required /></div>
                    <div className="mb-6"><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" required /></div>
                    {loginError && <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>}
                    <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">Entrer</button>
                </form>
            </div>
        );
    }
    
    if (currentPost) {
        return (
            <div className="container mx-auto px-4 py-12 pt-28">
                <h2 className="text-3xl font-bold mb-6">{currentPost.id ? 'Modifier' : 'Créer'} un article</h2>
                <form onSubmit={handleSavePost} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div><label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label><input id="title" name="title" value={currentPost.title || ''} onChange={handleInputChange} placeholder="Le titre" className="w-full p-2 border rounded" required /></div>
                    <div><label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Extrait (résumé)</label><textarea id="excerpt" name="excerpt" value={currentPost.excerpt || ''} onChange={handleInputChange} placeholder="Un court résumé" className="w-full p-2 border rounded" rows={3} required /></div>
                    
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Contenu (Markdown)</label>
                        <MdEditor
                            value={currentPost.content || ''}
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={handleEditorChange}
                            config={{
                                view: {
                                    menu: true,
                                    md: true,
                                    html: false
                                }
                            }}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div><label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label><input id="category" name="category" value={currentPost.category || ''} onChange={handleInputChange} placeholder="Ex: PME" className="w-full p-2 border rounded" required /></div>
                        <div><label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-1">Temps de lecture</label><input id="readTime" name="readTime" value={currentPost.readTime || ''} onChange={handleInputChange} placeholder="Ex: 5 min" className="w-full p-2 border rounded" required /></div>
                        <div><label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Auteur</label><input id="author" name="author" value={currentPost.author || ''} onChange={handleInputChange} placeholder="Ex: Équipe ElsyvIA" className="w-full p-2 border rounded" required /></div>
                    </div>
                    <div><label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label><input id="tags" name="tags" value={currentPost.tags?.join(', ') || ''} onChange={handleInputChange} placeholder="Tags séparés par une virgule" className="w-full p-2 border rounded" /></div>
                    {error && <p className="text-red-500 my-4">{error}</p>}
                    <div className="flex gap-4 pt-4"><button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300">{isSaving ? 'Sauvegarde...' : 'Sauvegarder'}</button><button type="button" onClick={() => setCurrentPost(null)} className="bg-gray-300 px-4 py-2 rounded">Annuler</button></div>
                </form>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 pt-28">
            <div className="flex justify-between items-center mb-6"><h1 className="text-4xl font-bold">Gestion du Blog</h1><div className="flex items-center gap-4"><button onClick={() => setCurrentPost({ author: "Équipe ElsyvIA", featured: false })} className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">+ Créer un nouvel article</button><button onClick={handleLogout} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"><LogOut className="w-4 h-4" /><span>Déconnexion</span></button></div></div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100"><tr><th className="p-4 text-left font-semibold">Titre</th><th className="p-4 text-left font-semibold">Catégorie</th><th className="p-4 text-left font-semibold">Date</th><th className="p-4 text-left font-semibold">Actions</th></tr></thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{post.title}</td><td className="p-4">{post.category}</td><td className="p-4">{new Date(post.date).toLocaleDateString('fr-CA')}</td><td className="p-4 space-x-4"><button onClick={() => setCurrentPost(post)} className="text-blue-600 hover:underline">Modifier</button><button onClick={() => handleDeletePost(post.id)} className="text-red-600 hover:underline">Supprimer</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
