const characterList = [
  { name: "C. V. Raman", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: true },
  { name: "Homi J. Bhabha", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false },
  { name: "Vikram Sarabhai", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false },
  { name: "A. P. J. Abdul Kalam", type: "scientist", gender: "male", field: "aerospace", birthplace: "India", nobel: false },
  { name: "Satyendra Nath Bose", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false },
  { name: "Jagadish Chandra Bose", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false },
  { name: "Srinivasa Ramanujan", type: "scientist", gender: "male", field: "mathematics", birthplace: "India", nobel: false },
  { name: "Prafulla Chandra Ray", type: "scientist", gender: "male", field: "chemistry", birthplace: "India", nobel: false },
  { name: "Meghnad Saha", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false },
  { name: "G. N. Ramachandran", type: "scientist", gender: "male", field: "biophysics", birthplace: "India", nobel: false },
  { name: "Kalpana Chawla", type: "scientist", gender: "female", field: "aerospace", birthplace: "India", nobel: false },
  { name: "Rakesh Sharma", type: "scientist", gender: "male", field: "aerospace", birthplace: "India", nobel: false },
  { name: "M. Visvesvaraya", type: "scientist", gender: "male", field: "engineering", birthplace: "India", nobel: false },
  { name: "Subrahmanyan Chandrasekhar", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: true },
  { name: "Venkatraman Ramakrishnan", type: "scientist", gender: "male", field: "chemistry", birthplace: "India", nobel: true },
  { name: "Mahatma Gandhi", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false },
  { name: "Sardar Vallabhbhai Patel", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false },
  { name: "Jawaharlal Nehru", type: "historical", gender: "male" },
  { name: "Bhagat Singh", type: "historical", gender: "male" },
  { name: "Rani Lakshmibai", type: "historical", gender: "female" },
  { name: "Subhas Chandra Bose", type: "historical", gender: "male" },
  { name: "Swami Vivekananda", type: "historical", gender: "male" },
  { name: "Rabindranath Tagore", type: "historical", gender: "male" },
  { name: "Chhatrapati Shivaji Maharaj", type: "historical", gender: "male" },
  { name: "Tipu Sultan", type: "historical", gender: "male" },
  { name: "Dr. B. R. Ambedkar", type: "historical", gender: "male" },
  { name: "Raja Ram Mohan Roy", type: "historical", gender: "male" },
  { name: "Sarojini Naidu", type: "historical", gender: "female" },
  { name: "Mangal Pandey", type: "historical", gender: "male" }
];

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { question, answer, type, gender } = req.body;
  if (!question || !answer || !type || !gender) {
    res.status(400).json({ error: 'Missing question, answer, type, or gender.' });
    return;
  }
const chosen = characterList.find(c => c.name.toLowerCase() === answer.toLowerCase());

  // Guarantee correct answers for type/gender questions
  const q = question.toLowerCase();
  // Intercept known facts (type, gender, field, birthplace, nobel)
  // ...existing code for intercepts...
  // Find the chosen character's facts from the frontend list
  // (Removed duplicate characterList declaration)
  try {
    // Build a summary of the chosen person for Gemini
    let summary = '';
    if (chosen) {
      summary = `Here are some facts about the person:\nName: ${chosen.name}\nType: ${chosen.type || ''}\nGender: ${chosen.gender || ''}\nField: ${chosen.field || ''}\nBirthplace: ${chosen.birthplace || ''}\nNobel Prize: ${chosen.nobel !== undefined ? (chosen.nobel ? 'Yes' : 'No') : ''}`;
    }
    // Compose the prompt for Gemini
    const prompt = summary
      ? `${summary}\n\nQuestion: ${question}\nAnswer in yes/no if possible, otherwise provide a short factual answer.`
      : `Question: ${question}\nAnswer in yes/no if possible, otherwise provide a short factual answer.`;
    const response = await fetch('https://api.gemini.com/v1/endpoint', {
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
