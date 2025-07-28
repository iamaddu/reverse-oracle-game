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
    const { question, answer, type, gender } = req.body;
    
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

    // 1. First check for direct name guesses (hidden in questions)
    if (normalizedQ.includes(normalizeString(chosen.name))) {
      return res.status(200).json({ answer: 'Yes, that is correct!' });
    }

    // 2. Handle all yes/no question types systematically
    if (isYesNoQuestion(q)) {
      // Type questions
      const typeSynonyms = {
        scientist: ["scientist", "science", "researcher"],
        historical: ["historical", "history", "historian", "leader"]
      };
      
      for (const [typeKey, synonyms] of Object.entries(typeSynonyms)) {
        if (synonyms.some(word => normalizedQ.includes(word))) {
          return res.status(200).json({ 
            answer: chosen.type === typeKey ? 'Yes.' : 'No.' 
          });
        }
      }

      // Gender questions
      const genderSynonyms = {
        female: ["female", "woman", "girl", "lady"],
        male: ["male", "man", "boy", "gentleman"]
      };
      
      for (const [genderKey, synonyms] of Object.entries(genderSynonyms)) {
        if (synonyms.some(word => normalizedQ.includes(word))) {
          return res.status(200).json({ 
            answer: chosen.gender === genderKey ? 'Yes.' : 'No.' 
          });
        }
      }

      // Field of work questions
      const fieldSynonyms = getFieldSynonyms(chosen.field);
      if (fieldSynonyms.some(syn => normalizedQ.includes(syn))) {
        return res.status(200).json({ answer: 'Yes.' });
      }

      // Nobel Prize questions
      const nobelPatterns = ['nobel', 'noble', 'prize', 'laureate', 'award'];
      if (nobelPatterns.some(word => normalizedQ.includes(word)) && 
          normalizedQ.includes('win') || normalizedQ.includes('won')) {
        return res.status(200).json({ 
          answer: chosen.nobel ? 'Yes.' : 'No.' 
        });
      }

      // Alive/dead questions
      const lifeStatusWords = ['alive', 'dead', 'died', 'living', 'pass away', 'deceased'];
      if (lifeStatusWords.some(word => normalizedQ.includes(word))) {
        return res.status(200).json({ 
          answer: chosen.isDead ? 'No, deceased.' : 'Yes, still alive.' 
        });
      }

      // Date of birth questions
      if ((normalizedQ.includes('born') || normalizedQ.includes('birth')) && 
          chosen.dateOfBirth) {
        if (normalizedQ.includes(normalizeString(chosen.dateOfBirth))) {
          return res.status(200).json({ answer: 'Yes.' });
        }
        return res.status(200).json({ 
          answer: `No, born on ${chosen.dateOfBirth}.` 
        });
      }

      // Date of death questions
      if ((normalizedQ.includes('die') || normalizedQ.includes('death')) && 
          chosen.dateOfDeath) {
        if (normalizedQ.includes(normalizeString(chosen.dateOfDeath))) {
          return res.status(200).json({ answer: 'Yes.' });
        }
        return res.status(200).json({ 
          answer: `No, died on ${chosen.dateOfDeath}.` 
        });
      }

      // Family questions
      const familyMap = {
        father: chosen.fatherName,
        mother: chosen.motherName,
        spouse: chosen.spouse,
        children: chosen.children ? chosen.children.join(', ') : null
      };
      
      for (const [relation, value] of Object.entries(familyMap)) {
        if (normalizedQ.includes(relation) && value) {
          if (normalizedQ.includes(normalizeString(value))) {
            return res.status(200).json({ answer: 'Yes.' });
          }
          return res.status(200).json({ 
            answer: `No. ${relation.charAt(0).toUpperCase() + relation.slice(1)}: ${value}` 
          });
        }
      }

      // Education questions
      if ((normalizedQ.includes('educat') || normalizedQ.includes('school') || 
           normalizedQ.includes('college') || normalizedQ.includes('university')) && 
          chosen.education) {
        const eduMatch = chosen.education.some(edu => 
          normalizedQ.includes(normalizeString(edu))
        );
        return res.status(200).json({ 
          answer: eduMatch ? 'Yes.' : `No. Education: ${chosen.education.join(', ')}` 
        });
      }

      // Achievement questions
      if ((normalizedQ.includes('achiev') || normalizedQ.includes('famous') || 
           normalizedQ.includes('known') || normalizedQ.includes('contribut')) && 
          chosen.achievements) {
        const achievementMatch = chosen.achievements.some(ach => 
          normalizedQ.includes(normalizeString(ach))
        );
        return res.status(200).json({ 
          answer: achievementMatch ? 'Yes.' : `No. Achievements: ${chosen.achievements.join(', ')}` 
        });
      }
    }

    // 3. For all other questions, use Gemini API with strict validation
    try {
      // Build a comprehensive prompt with all known facts
      const prompt = `You are an expert on famous Indian figures. Answer this question about ${chosen.name}:
Question: ${question}

Known facts:
- Type: ${chosen.type}
- Gender: ${chosen.gender}
- Field: ${chosen.field}
- Birthplace: ${chosen.birthplace}
- Date of Birth: ${chosen.dateOfBirth || 'unknown'}
- Date of Death: ${chosen.dateOfDeath || 'still alive'}
- Nobel Prize: ${chosen.nobel ? 'Yes' : 'No'}
- Achievements: ${chosen.achievements?.join(', ') || 'none listed'}
- Education: ${chosen.education?.join(', ') || 'unknown'}
- Father: ${chosen.fatherName || 'unknown'}
- Mother: ${chosen.motherName || 'unknown'}
- Spouse: ${chosen.spouse || 'unknown'}
- Children: ${chosen.children?.join(', ') || 'unknown'}

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