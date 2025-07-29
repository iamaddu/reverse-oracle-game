const fetch = require('node-fetch');
  
  const characterList = [
  { name: "Thomas Edison", gender: "male", isDead: true, dateOfDeath: 1931, field: "invention", dynasty: null, era: "19th-20th century", birthplace: "United States", nobel: false, achievements: ["Light Bulb", "Phonograph", "Motion Picture Camera"] },
  { name: "Alexander Graham Bell", gender: "male", isDead: true, dateOfDeath: 1922, field: "invention", dynasty: null, era: "19th-20th century", birthplace: "Scotland", nobel: false, achievements: ["Telephone", "Audiometer"] },
  { name: "Albert Einstein", gender: "male", isDead: true, dateOfDeath: 1955, field: "physics", dynasty: null, era: "20th century", birthplace: "Germany", nobel: true, achievements: ["Theory of Relativity", "Nobel Prize in Physics"] },
  { name: "Marie Curie", gender: "female", isDead: true, dateOfDeath: 1934, field: "chemistry", dynasty: null, era: "19th-20th century", birthplace: "Poland", nobel: true, achievements: ["Radioactivity", "Nobel Prize in Chemistry", "Nobel Prize in Physics"] },
  { name: "Isaac Newton", gender: "male", isDead: true, dateOfDeath: 1727, field: "physics", dynasty: null, era: "17th-18th century", birthplace: "England", nobel: false, achievements: ["Laws of Motion", "Calculus", "Gravity"] },
  { name: "Nikola Tesla", gender: "male", isDead: true, dateOfDeath: 1943, field: "engineering", dynasty: null, era: "19th-20th century", birthplace: "Serbia", nobel: false, achievements: ["AC Current", "Tesla Coil", "Wireless Power"] },
  { name: "Ada Lovelace", gender: "female", isDead: true, dateOfDeath: 1852, field: "mathematics", dynasty: null, era: "19th century", birthplace: "England", nobel: false, achievements: ["First Computer Algorithm", "Analytical Engine"] },
  { name: "Charles Darwin", gender: "male", isDead: true, dateOfDeath: 1882, field: "biology", dynasty: null, era: "19th century", birthplace: "England", nobel: false, achievements: ["Theory of Evolution", "Natural Selection"] },
  { name: "Stephen Hawking", gender: "male", isDead: true, dateOfDeath: 2018, field: "physics", dynasty: null, era: "20th-21st century", birthplace: "England", nobel: false, achievements: ["Black Hole Theory", "A Brief History of Time"] },
  { name: "Galileo Galilei", gender: "male", isDead: true, dateOfDeath: 1642, field: "physics", dynasty: null, era: "16th-17th century", birthplace: "Italy", nobel: false, achievements: ["Telescope", "Heliocentrism", "Scientific Method"] }
];


// Enhanced helper functions
const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

const isYesNoQuestion = (question) => {
  const q = question.toLowerCase();
  return /^(is|are|was|were|did|does|do|has|have|can|could|would|will|should)\b/i.test(q) || 
         q.includes('?') ||
         q.startsWith('did ') || 
         q.startsWith('does ') || 
         q.startsWith('do ') || 
         q.startsWith('have ') || 
         q.startsWith('has ');
};

const getFieldSynonyms = (field) => {
  const fieldMap = {
    physics: ["physics", "physicist", "physicists", "physicts", "physicst"],
    chemistry: ["chemistry", "chemist", "chemists"],
    mathematics: ["mathematics", "mathematician", "mathematicians", "maths", "math"],
    engineering: ["engineering", "engineer", "engineers"],
    aerospace: ["aerospace", "aerospace engineer", "aerospace engineers", "astronaut", "astronauts"],
    politics: ["politics", "politician", "politicians", "leader", "president", "prime minister"],
    royalty: ["royalty", "king", "queen", "ruler", "monarch", "maharaj", "sultan", "emperor"],
    spirituality: ["spirituality", "spiritual", "religious", "monk", "swami", "guru"],
    literature: ["literature", "writer", "poet", "author", "novelist"],
    revolutionary: ["revolutionary", "revolution", "freedom fighter", "activist"],
    astronomy: ["astronomy", "astronomer"],
    biology: ["biology", "biologist"],
    medicine: ["medicine", "doctor", "physician"]
  };
  
  for (const key in fieldMap) {
    if (fieldMap[key].includes(field.toLowerCase())) {
      return fieldMap[key];
    }
  }
  return [field];
};

const getEraInfo = (era) => {
  const eraMap = {
    "ancient": ["ancient", "bc", "bce"],
    "5th-6th century": ["5th", "6th", "500", "600"],
    "11th century": ["11th", "1000s", "1000"],
    "16th-17th century": ["16th", "17th", "1500s", "1600s"],
    "17th-18th century": ["17th", "18th", "1600s", "1700s"],
    "19th century": ["19th", "1800s"],
    "19th-20th century": ["19th", "20th", "1800s", "1900s"],
    "20th century": ["20th", "1900s"]
  };
  
  for (const [eraKey, keywords] of Object.entries(eraMap)) {
    if (eraKey === era) {
      return keywords;
    }
  }
  return [];
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

    // 1. First check for direct name guesses (hidden in questions)
    if (normalizedQ.includes(normalizeString(chosen.name))) {
      return res.status(200).json({ answer: 'Yes, that is correct!' });
    }

    // 2. Handle all question types systematically
    // Gender questions
    if (["female", "woman", "girl", "lady", "sister", "daughter", "mother"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.gender === "female" ? "Yes." : "No." });
    }
    if (["male", "man", "boy", "gentleman", "brother", "son", "father"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.gender === "male" ? "Yes." : "No." });
    }

    // Alive/Dead questions
    if (["alive", "living", "still alive", "currently alive"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.isDead ? "No." : "Yes." });
    }
    if (["dead", "die", "passed away", "deceased", "not alive", "died", "death"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ answer: chosen.isDead ? "Yes." : "No." });
    }

    // Field of work questions
    const fieldSynonyms = getFieldSynonyms(chosen.field);
    if (fieldSynonyms.some(syn => normalizedQ.includes(syn))) {
      return res.status(200).json({ answer: "Yes." });
    }

    // Nobel Prize questions
    if (["nobel", "noble", "prize", "award", "laureate"].some(word => normalizedQ.includes(word)) && 
        ["win", "won", "received", "got", "awarded"].some(verb => normalizedQ.includes(verb))) {
      return res.status(200).json({ answer: chosen.nobel ? "Yes." : "No." });
    }

    // Country/Nationality questions
    if (["india", "indian", "country", "nation", "from"].some(word => normalizedQ.includes(word))) {
      return res.status(200).json({ 
        answer: chosen.birthplace && chosen.birthplace.includes("India") ? "Yes." : "No." 
      });
    }

    // Dynasty questions
    if (["dynasty", "kingdom", "empire", "rule", "reign"].some(word => normalizedQ.includes(word)) && chosen.dynasty) {
      if (normalizedQ.includes(normalizeString(chosen.dynasty))) {
        return res.status(200).json({ answer: "Yes." });
      } else {
        return res.status(200).json({ answer: "No." });
      }
    }

    // Era/Time period questions
    if (["century", "era", "time", "period", "age"].some(word => normalizedQ.includes(word))) {
      const eraKeywords = getEraInfo(chosen.era);
      if (eraKeywords.some(keyword => normalizedQ.includes(keyword))) {
        return res.status(200).json({ answer: "Yes." });
      } else {
        return res.status(200).json({ answer: "No." });
      }
    }

    // Date of death questions
    if (["died", "death", "pass away", "deceased"].some(word => normalizedQ.includes(word))) {
      const yearMatch = q.match(/\b(\d{3,4})\b/);
      if (yearMatch && parseInt(yearMatch[1]) === chosen.dateOfDeath) {
        return res.status(200).json({ answer: "Yes." });
      } else if (yearMatch) {
        return res.status(200).json({ answer: "No." });
      }
    }

    // Achievement questions
    if (
      chosen.achievements &&
      chosen.achievements.some(ach =>
        normalizedQ.includes(normalizeString(ach)) ||
        normalizeString(ach).includes(normalizedQ)
      )
    ) {
      return res.status(200).json({ answer: "Yes." });
    } else {
      return res.status(200).json({ answer: "No." });
    }

    // Book/Work questions
    if (["book", "write", "author", "poem", "work", "publication"].some(word => normalizedQ.includes(word))) {
      if (chosen.achievements && chosen.achievements.some(ach => 
        ["book", "write", "poem", "literature"].some(litWord => ach.toLowerCase().includes(litWord)))) {
        return res.status(200).json({ answer: "Yes." });
      } else {
        return res.status(200).json({ answer: "No." });
      }
    }

    // 3. For all other questions, use Gemini API with better prompting
    try {
      // Build a comprehensive prompt
      const prompt = `You are playing a Reverse Oracle game where the answer is ${chosen.name}. 
      The player is trying to guess who it is by asking yes/no questions. 
      Answer the following question with a single word ("Yes." or "No.") when possible, 
      or a very short factual answer if a yes/no answer isn't possible.

      Question: ${question}

      Some facts about ${chosen.name}:
      - Gender: ${chosen.gender}
      - Field: ${chosen.field}
      - Birthplace: ${chosen.birthplace}
      - Era: ${chosen.era}
      - ${chosen.nobel ? "Won a Nobel Prize" : "Did not win a Nobel Prize"}
      - Known for: ${chosen.achievements ? chosen.achievements.join(', ') : 'N/A'}
      ${chosen.dynasty ? `- Dynasty: ${chosen.dynasty}` : ''}

      Answer concisely:`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }],
              role: 'user'
            }],
            generationConfig: {
              maxOutputTokens: 50,
              temperature: 0.3
            }
          })
        }
      );

      const data = await response.json();
      let aiAnswer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      
      // Normalize the response
      if (aiAnswer.toLowerCase().startsWith('yes') || 
          aiAnswer.toLowerCase().includes('correct') ||
          aiAnswer.toLowerCase().includes('right')) {
        aiAnswer = 'Yes.';
      } else if (aiAnswer.toLowerCase().startsWith('no') || 
                aiAnswer.toLowerCase().includes('incorrect') ||
                aiAnswer.toLowerCase().includes('wrong')) {
        aiAnswer = 'No.';
      } else if (aiAnswer.length > 50) {
        // If the answer is too long, simplify it
        aiAnswer = "I can't answer that with just yes or no.";
      } else if (!aiAnswer) {
        aiAnswer = "I don't know.";
      }

      return res.status(200).json({ answer: aiAnswer });

    } catch (apiError) {
      console.error('Gemini API error:', apiError);
      // Fallback to our knowledge base
      if (chosen.achievements?.length > 0) {
        return res.status(200).json({ 
          answer: `Did you know: ${chosen.name} is known for ${chosen.achievements[0]}.`
        });
      }
      return res.status(200).json({ 
        answer: "I can't answer that question right now."
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'An internal server error occurred'
    });
  }
};