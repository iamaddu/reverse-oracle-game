module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { question, answer } = req.body;
  if (!question || !answer) {
    res.status(400).json({ error: 'Missing question or answer.' });
    return;
  }
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: 'API key not configured.' });
    return;
  }
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
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
    res.status(200).json({ answer: aiText });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch Gemini response.' });
  }
};
