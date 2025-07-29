const characterList = [
  // ... (your existing character list remains exactly the same)
];

// Helper functions
const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

const isYesNoQuestion = (question) => {
  const q = question.toLowerCase();
  return q.startsWith('is ') || 
         q.startsWith('are ') || 
         q.startsWith('was ') || 
         q.startsWith('were ') || 
         q.startsWith('did ') || 
         q.startsWith('does ') || 
         q.startsWith('do ') || 
         q.startsWith('has ') || 
         q.startsWith('have ') || 
         q.startsWith('can ') || 
         q.startsWith('could ') || 
         q.startsWith('would ') || 
         q.startsWith('will ') || 
         q.startsWith('should ') || 
         q.includes('?');
};

const getFieldSynonyms = (field) => {
  const fieldMap = {
    physics: ["physics", "physicist", "physicists", "physicts", "physicst"],
    chemistry: ["chemistry", "chemist", "chemists"],
    mathematics: ["mathematics", "mathematician", "mathematicians", "maths", "math"],
    biophysics: ["biophysics", "biophysicist", "biophysicists"],
    engineering: ["engineering", "engineer", "engineers"],
    aerospace: ["aerospace", "aerospace engineer", "aerospace engineers", "astronaut", "astronauts"],
    politics: ["politics", "politician", "politicians"],
    royalty: ["royalty", "king", "queen", "ruler", "monarch"],
    spirituality: ["spirituality", "spiritual", "religious"],
    literature: ["literature", "writer", "poet", "author"],
    revolutionary: ["revolutionary", "revolution", "freedom fighter"]
  };
  
  for (const key in fieldMap) {
    if (fieldMap[key].includes(field.toLowerCase())) {
      return fieldMap[key];
    }
  }
  return [field];
};

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, answer } = req.body;
    
    // Validate input
    if (!question || typeof question !== 'string' || question.length > 200) {
      return res.status(400).json({ error: 'Invalid question: must be a string under 200 characters' });
    }
    
    if (!answer || typeof answer !== 'string') {
      return res.status(400).json({ error: 'Invalid answer parameter' });
    }

    const chosen = characterList.find(c => 
      normalizeString(c.name) === normalizeString(answer)
    );

    if (!chosen) {
      return res.status(404).json({ error: 'Character not found in database' });
    }

    const q = question.toLowerCase().trim();
    const normalizedQ = normalizeString(q);

    // 1. Direct name guess (hidden in question)
    if (normalizedQ.includes(normalizeString(chosen.name))) {
      return res.status(200).json({ answer: 'Yes.' });
    }

    // Strict yes/no logic for all supported question types
    // Gender
    if (["female", "woman", "girl", "lady"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.gender === "female" ? "Yes." : "No." });
    }
    if (["male", "man", "boy", "gentleman"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.gender === "male" ? "Yes." : "No." });
    }

    // Life status
    if (["alive", "living", "currentlyalive", "stillalive"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.isDead ? "No." : "Yes." });
    }
    if (["dead", "die", "passedaway", "deceased", "notalive", "notliving", "died", "death"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.isDead ? "Yes." : "No." });
    }

    // Field
    const fieldMap = {
      physics: ["physics", "physicist"],
      chemistry: ["chemistry", "chemist"],
      mathematics: ["mathematics", "math", "mathematician"],
      politics: ["politics", "politician", "leader", "prime minister", "president"],
      literature: ["literature", "writer", "poet"],
      royalty: ["royalty", "king", "queen", "maharaj", "sultan"],
      spirituality: ["spiritual", "spirituality", "monk", "swami"],
      space: ["space", "astronaut", "rocket", "aerospace"],
      astrophysics: ["astrophysics", "astrophysicist"],
      revolutionary: ["revolutionary"]
    };
    for (const [field, synonyms] of Object.entries(fieldMap)) {
      if (synonyms.some(word => normalizedQ.includes(word))) {
        return res.status(200).json({ answer: chosen.field === field ? "Yes." : "No." });
      }
    }

    // Nobel Prize
    if (normalizedQ.includes("nobel") || normalizedQ.includes("prize")) {
      return res.status(200).json({ answer: chosen.nobel ? "Yes." : "No." });
    }

    // Country (India)
    if (normalizedQ.includes("india") || normalizedQ.includes("indian")) {
      return res.status(200).json({ answer: "Yes." });
    }

    // Century or era
    if (normalizedQ.includes("century") || normalizedQ.includes("era") || normalizedQ.includes("timeperiod")) {
      if (chosen.era && normalizedQ.includes(normalizeString(chosen.era))) {
        return res.status(200).json({ answer: "Yes." });
      }
      return res.status(200).json({ answer: "No." });
    }

    // Scientist/Historical figure
    if (normalizedQ.includes("scientist") || normalizedQ.includes("science")) {
      return res.status(200).json({ answer: chosen.type === "scientist" ? "Yes." : "No." });
    }
    if (normalizedQ.includes("historical") || normalizedQ.includes("history")) {
      return res.status(200).json({ answer: chosen.type === "historical" ? "Yes." : "No." });
    }

    // Fallback for anything else
    return res.status(200).json({ answer: "I can only answer yes or no questions." });

    // 3. For all other questions, use Gemini API with strict validation
    try {
      // Build a comprehensive prompt with all known facts
      const prompt = `You are an expert on famous Indian figures. Answer this question about ${chosen.name}:
Question: ${question}

Known facts:

Provide a concise answer (preferably yes/no if appropriate). If unsure, say "I don't know".`;

      const response = await fetch('https://api.gemini.com/v1/endpoint', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }],
            role: 'user'
          }],
          safetySettings: [
            {
              category: 'HARM_CATEGORY_DEROGATORY',
              threshold: 'BLOCK_NONE'
            }
          ],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.3
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Validate and sanitize Gemini's response
      let aiAnswer = '';
      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        aiAnswer = data.candidates[0].content.parts[0].text
          .trim()
          .replace(/^["']|["']$/g, ''); // Remove surrounding quotes if any
        
        // Ensure the answer is properly formatted
        if (aiAnswer.length > 200) {
          aiAnswer = aiAnswer.substring(0, 197) + '...';
        }
        
        // Convert to yes/no if it's a confirmation
        if (aiAnswer.toLowerCase().startsWith('yes') || 
            aiAnswer.toLowerCase().startsWith('correct')) {
          aiAnswer = 'Yes.';
        } else if (aiAnswer.toLowerCase().startsWith('no') || 
                  aiAnswer.toLowerCase().startsWith('incorrect')) {
          aiAnswer = 'No.';
        }
      } else {
        aiAnswer = "I don't have enough information to answer that.";
      }

      return res.status(200).json({ answer: aiAnswer });

    } catch (apiError) {
      console.error('Gemini API error:', apiError);
      // Fallback to our knowledge base if API fails
      if (chosen.achievements?.length > 0) {
        return res.status(200).json({ 
          answer: `I can't access full information right now. Did you know: ${chosen.name} is known for ${chosen.achievements[0]}.`
        });
      }
      return res.status(200).json({ 
        answer: "I'm having trouble accessing information. Please try a different question."
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'An internal server error occurred',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};