module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { question, answer, type } = req.body;
  if (!question || !answer || !type) {
    res.status(400).json({ error: 'Missing question, answer, or type.' });
    return;
  }

  // Guarantee correct answers for type/gender questions
  const q = question.toLowerCase();
  // Scientist/historical logic
  if (q.includes('scientist')) {
    return res.status(200).json({ answer: type === 'scientist' ? 'Yes.' : 'No.' });
  }
  if (q.includes('historical')) {
    return res.status(200).json({ answer: type === 'historical' ? 'Yes.' : 'No.' });
  }
  // Gender logic (add gender property to character list and pass it from frontend for best results)
  // Example: if (q.includes('female')) { return res.status(200).json({ answer: gender === 'female' ? 'Yes.' : 'No.' }); }
  // For now, fallback to Gemini for gender and other questions
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    res.status(500).json({ error: 'API key not configured.' });
    return;
  }
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  try {
    const prompt = `You are the Reverse Oracle for a fun guessing game. The answer is: ${answer}. The type is: ${req.body.type}. Only reply YES or NO to questions that can be answered that way.\n\nIMPORTANT: If asked 'Are you a scientist?' reply YES only if type is 'scientist', NO if 'historical'. If asked 'Are you a historical figure?' reply YES only if type is 'historical', NO if 'scientist'.\n\nIf asked about gender (male/female), answer based on the real gender of the answer. If you do not know, reply 'I cannot answer that.'\n\nWhen providing a fact or witty comment, make sure it is accurate and directly related to the answer. Do not make up information.\n\nIf the question is not yes/no (for example, 'hint'), reply: 'Please ask a yes/no question!' Never reveal the answer directly. If the question is truly unanswerable, reply: 'I cannot answer that.' After your answer, add a short, witty explanation or fun fact about the answer, but never say 'maybe'. Make it awesome!`;
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    let aiText = 'Sorry, no response.';
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      aiText = data.candidates[0].content.parts[0].text;
    } else if (data?.error?.message) {
      aiText = `Error: ${data.error.message}`;
    }
    res.status(200).json({ answer: aiText });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch Gemini response.' });
  }
};
