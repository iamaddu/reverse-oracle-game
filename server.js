require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

app.post('/api/gemini', async (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
        return res.status(400).json({ error: 'Missing question or answer.' });
    }
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: 'API key not configured.' });
    }
    try {
        const prompt = `You are the Reverse Oracle. The answer is: ${answer}. Only reply Yes/No/Maybe to this question: ${question}`;
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await response.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.';
        res.json({ answer: aiText });
    } catch (err) {
        console.error('Gemini API error:', err);
        res.status(500).json({ error: 'Failed to fetch Gemini response.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
