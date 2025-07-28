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
    const prompt = `You are the Reverse Oracle for a fun guessing game. The answer is: ${answer}. The type is: ${req.body.type}. Only reply YES or NO to questions that can be answered that way. If the question is not yes/no (for example, 'hint'), reply: 'Please ask a yes/no question!' Never reveal the answer directly. If the question is truly unanswerable, reply: 'I cannot answer that.' After your answer, add a short, witty explanation or fun fact about the answer, but never say 'maybe'. Make it awesome!`;
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
