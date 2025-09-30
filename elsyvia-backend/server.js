// Remplacez le contenu de : /var/www/elsyvia-backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001;
const dataDir = path.join(__dirname, 'data');
const blogFilePath = path.join(dataDir, 'blog.json');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const ADMIN_USERNAME = "admin_Chris";
const ADMIN_PASSWORD = "120304Aurore1985,;:!01";
const GEMINI_API_KEY = "AIzaSyCDhtCBpSbDAytn-NaQCVAqc3ZDzK1ZAIc"; // Votre clé est déjà là

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(bodyParser.json());

// --- FONCTION DE RECHERCHE DANS LES ARTICLES ---
const findRelevantArticle = (query) => {
    const posts = readPosts();
    if (!posts || posts.length === 0) return null;
    let bestMatch = null;
    let maxScore = 0;
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    if (queryWords.length === 0) return null;
    posts.forEach(post => {
        const title = post.title || '';
        const excerpt = post.excerpt || '';
        const articleContent = post.content || '';
        let score = 0;
        const searchableText = `${title} ${excerpt} ${articleContent}`.toLowerCase();
        queryWords.forEach(word => {
            if (searchableText.includes(word)) score++;
        });
        if (score > maxScore) {
            maxScore = score;
            bestMatch = post;
        }
    });
    return maxScore >= 2 ? bestMatch : null;
};

// --- ROUTE DU CHATBOT (Version simple et stable avec RAG) ---
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Le message est manquant." });
    }

    try {
        const relevantArticle = findRelevantArticle(message);
        let context = "";

        if (relevantArticle) {
            context = `
                Contexte pertinent trouvé dans notre base de connaissances :
                ---
                Titre : ${relevantArticle.title}
                Contenu : ${relevantArticle.content.replace(/^# .*\n\n?/, '').trim().substring(0, 3000)}
                ---
            `;
        }

        const chat = model.startChat({ history: [] });
        const systemInstruction = `
            Tu es Elsy, un assistant expert pour ElsyvIA. Tu es amical et professionnel.
            Réponds à la question du visiteur. Si un CONTEXTE est fourni, base ta réponse PRINCIPALEMENT sur ces informations et mentionne l'article.
            Si on te demande les informations de contact d'Elsyvia, tu  fournis l'adresse mail : contact@elsyvia.com et la possibilité de compléter le formulaire de contact du site
            Si aucun contexte n'est fourni ou s'il n'est pas pertinent, utilise tes connaissances générales sur ElsyvIA.
            IMPORTANT : Tu t'es déjà présenté dans le premier message. Ne te présente plus et ne dis plus "Bonjour". Réponds directement à la question.
            Règle : Ne réponds JAMAIS aux questions qui n'ont aucun rapport avec ElsyvIA, ses services, ou l'IA en entreprise.
            ${context}
        `;
        
        const result = await chat.sendMessage(systemInstruction + "\n\nQuestion du visiteur : " + message);
        const text = result.response.text();
        res.json({ reply: text });

    } catch (error) {
        console.error("Erreur de l'API Gemini:", error);
        res.status(500).json({ error: "Désolé, une erreur est survenue avec notre assistant IA." });
    }
});

// --- Vos fonctions et routes existantes (ne changent pas) ---
const createSlug = (title) => { const now = Date.now().toString().slice(-4); return title.toLowerCase().trim().replace(/[àáâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[îï]/g, 'i').replace(/[ôö]/g, 'o').replace(/[ùûü]/g, 'u').replace(/ç/g, 'c').replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') + '-' + now; };
const readPosts = () => { try { if (!fs.existsSync(blogFilePath)) return []; const data = fs.readFileSync(blogFilePath, 'utf8'); return data ? JSON.parse(data) : []; } catch (error) { return []; } };
const writePosts = (posts) => { if (posts && Array.isArray(posts)) { fs.writeFileSync(blogFilePath, JSON.stringify(posts, null, 2), 'utf8'); } };
const authMiddleware = (req, res, next) => { const { username, password } = req.headers; if (!username || !password || username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) { return res.status(401).json({ message: 'Accès non autorisé' }); } next(); };
app.post('/api/login', (req, res) => { const { username, password } = req.body; if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) { res.status(200).json({ success: true }); } else { res.status(401).json({ success: false }); } });
app.get('/api/posts', (req, res) => { res.json(readPosts()); });
app.get('/api/posts/:id', (req, res) => { const post = readPosts().find(p => p.id === req.params.id); if (post) res.json(post); else res.status(404).json({ message: 'Article non trouvé' }); });
app.post('/api/posts', authMiddleware, (req, res) => { const posts = readPosts(); const newPostData = req.body; if (newPostData.title && newPostData.content && !newPostData.content.trim().startsWith('#')) { newPostData.content = `# ${newPostData.title}\n\n${newPostData.content}`; } const newPost = { id: createSlug(newPostData.title), ...newPostData, date: new Date().toISOString().split('T')[0] }; posts.push(newPost); writePosts(posts); res.status(201).json(newPost); });
app.put('/api/posts/:id', authMiddleware, (req, res) => { let posts = readPosts(); const index = posts.findIndex(p => p.id === req.params.id); if (index !== -1) { const updatedPostData = req.body; if (updatedPostData.title && updatedPostData.content) { const contentWithoutH1 = updatedPostData.content.replace(/^# .*\n\n?/, ''); updatedPostData.content = `# ${updatedPostData.title}\n\n${contentWithoutH1}`; } posts[index] = { ...posts[index], ...updatedPostData }; writePosts(posts); res.json(posts[index]); } else { res.status(404).json({ message: 'Article non trouvé' }); } });
app.delete('/api/posts/:id', authMiddleware, (req, res) => { let posts = readPosts(); const updatedPosts = posts.filter(p => p.id !== req.params.id); if (posts.length !== updatedPosts.length) { writePosts(updatedPosts); res.status(204).send(); } else { res.status(404).json({ message: 'Article non trouvé' }); } });

app.listen(port, () => {
    console.log(`Serveur backend ElsyvIA (version stable) démarré sur http://localhost:${port}`);
});
