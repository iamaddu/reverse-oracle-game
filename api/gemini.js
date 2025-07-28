const characterList = [
  {
    name: "C. V. Raman",
    type: "scientist",
    gender: "male",
    field: "physics",
    birthplace: "India",
    nobel: true,
    dateOfBirth: "1888-11-07",
    dateOfDeath: "1970-11-21",
    isDead: true,
    achievements: ["Nobel Prize in Physics 1930", "Discovery of Raman Effect", "Knight Bachelor (1929)", "Bharat Ratna (1954)", "Fellow of the Royal Society"],
    fatherName: "Chandrasekhara Iyer",
    motherName: "Parvathi Ammal",
    spouse: "Lokasundari Ammal",
    children: ["Radhakrishnan Raman"],
    education: ["Presidency College, Madras"],
    placeOfBirth: "Tiruchirappalli",
    placeOfDeath: "Bangalore",
    religion: "Hinduism",
    nationality: "Indian",
    books: [],
    hobbies: ["Music", "Reading"],
    freedomFighter: false
  },
  {
    name: "Homi J. Bhabha",
    type: "scientist",
    gender: "male",
    field: "physics",
    birthplace: "India",
    nobel: false,
    dateOfBirth: "1909-10-30",
    dateOfDeath: "1966-01-24",
    isDead: true,
    achievements: ["Father of Indian Nuclear Program", "Founding Tata Institute of Fundamental Research", "Padma Bhushan (1954)", "Fellow of the Royal Society"],
    fatherName: "Jehangir Hormusji Bhabha",
    motherName: "Meherbai Bhabha",
    spouse: null,
    children: [],
    education: ["Elphinstone College", "Caius College, Cambridge"],
    placeOfBirth: "Bombay",
    placeOfDeath: "Mont Blanc, Switzerland",
    religion: "Zoroastrianism",
    nationality: "Indian",
    books: [],
    hobbies: ["Painting", "Classical music"],
    freedomFighter: false
  },
  { name: "Vikram Sarabhai", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false, dateOfBirth: "1919-08-12", dateOfDeath: "1971-12-30", isDead: true, achievements: ["Father of Indian Space Program", "Founding ISRO", "Padma Bhushan (1966)", "Padma Vibhushan (posthumous, 1972)"], fatherName: "Ambalal Sarabhai", hobbies: ["Tennis", "Music"], freedomFighter: false },
  { name: "A. P. J. Abdul Kalam", type: "scientist", gender: "male", field: "aerospace", birthplace: "India", nobel: false, dateOfBirth: "1931-10-15", dateOfDeath: "2015-07-27", isDead: true, achievements: ["Missile Man of India", "President of India (2002-2007)", "Padma Bhushan (1981)", "Padma Vibhushan (1990)", "Bharat Ratna (1997)", "Pokhran-II nuclear tests"], fatherName: "Jainulabdeen", hobbies: ["Reading", "Writing", "Veena playing"], freedomFighter: false },
  { name: "Satyendra Nath Bose", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false, dateOfBirth: "1894-01-01", dateOfDeath: "1974-02-04", isDead: true, achievements: ["Bose-Einstein statistics", "Padma Vibhushan (1954)", "Fellow of the Royal Society"], fatherName: "Surendranath Bose", hobbies: ["Music", "Mathematics"], freedomFighter: false },
  { name: "Jagadish Chandra Bose", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false, dateOfBirth: "1858-11-30", dateOfDeath: "1937-11-23", isDead: true, achievements: ["Radio and microwave optics", "Plant physiology pioneer", "Knight Bachelor (1917)", "Fellow of the Royal Society"], fatherName: "Bhagawan Chandra Bose", hobbies: ["Botany", "Writing"], freedomFighter: false },
  { name: "Srinivasa Ramanujan", type: "scientist", gender: "male", field: "mathematics", birthplace: "India", nobel: false, dateOfBirth: "1887-12-22", dateOfDeath: "1920-04-26", isDead: true, achievements: ["Mathematical genius", "Ramanujan prime", "Ramanujan theta function", "Fellow of the Royal Society"], fatherName: "K. Srinivasa Iyengar", hobbies: ["Mathematics", "Religious studies"], freedomFighter: false },
  { name: "Prafulla Chandra Ray", type: "scientist", gender: "male", field: "chemistry", birthplace: "India", nobel: false, dateOfBirth: "1861-08-02", dateOfDeath: "1944-06-16", isDead: true, achievements: ["Father of Indian Chemistry", "Founded Bengal Chemicals", "Knight Bachelor (1919)", "Fellow of the Royal Society"], fatherName: "Harish Chandra Ray", hobbies: ["Writing", "Teaching"], freedomFighter: false },
  { name: "Meghnad Saha", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: false, dateOfBirth: "1893-10-06", dateOfDeath: "1956-02-16", isDead: true, achievements: ["Saha ionization equation", "Founder of Saha Institute of Nuclear Physics", "Fellow of the Royal Society"], fatherName: "Jagannath Saha", hobbies: ["Teaching", "Politics"], freedomFighter: false },
  { name: "G. N. Ramachandran", type: "scientist", gender: "male", field: "biophysics", birthplace: "India", nobel: false, dateOfBirth: "1922-10-08", dateOfDeath: "2001-04-07", isDead: true, achievements: ["Ramachandran plot", "Padma Bhushan (1970)", "Fellow of the Royal Society"], fatherName: "G. Narayana Iyer", hobbies: ["Physics", "Music"], freedomFighter: false },
  { name: "Kalpana Chawla", type: "scientist", gender: "female", field: "aerospace", birthplace: "India", nobel: false, dateOfBirth: "1962-03-17", dateOfDeath: "2003-02-01", isDead: true, achievements: ["First Indian woman in space", "NASA astronaut", "Congressional Space Medal of Honor (posthumous)"], fatherName: "Banarasi Lal Chawla", hobbies: ["Flying", "Cycling"], freedomFighter: false },
  { name: "Rakesh Sharma", type: "scientist", gender: "male", field: "aerospace", birthplace: "India", nobel: false, dateOfBirth: "1949-01-13", isDead: false, achievements: ["First Indian in space", "Hero of Soviet Union"], fatherName: "Devendranath Sharma", hobbies: ["Flying", "Reading"], freedomFighter: false },
  { name: "M. Visvesvaraya", type: "scientist", gender: "male", field: "engineering", birthplace: "India", nobel: false, dateOfBirth: "1861-09-15", dateOfDeath: "1962-04-14", isDead: true, achievements: ["Great engineer", "Bharat Ratna (1955)", "Diwan of Mysore"], fatherName: "Srinivasa Sastry", hobbies: ["Engineering", "Writing"], freedomFighter: false },
  { name: "Subrahmanyan Chandrasekhar", type: "scientist", gender: "male", field: "physics", birthplace: "India", nobel: true, dateOfBirth: "1910-10-19", dateOfDeath: "1995-08-21", isDead: true, achievements: ["Nobel Prize in Physics 1983", "Chandrasekhar limit", "Fellow of the Royal Society"], fatherName: "C. S. Chandrasekhar", hobbies: ["Mathematics", "Music"], freedomFighter: false },
  { name: "Venkatraman Ramakrishnan", type: "scientist", gender: "male", field: "chemistry", birthplace: "India", nobel: true, dateOfBirth: "1952-05-04", isDead: false, achievements: ["Nobel Prize in Chemistry 2009", "Ribosome structure research", "Fellow of the Royal Society"], fatherName: "C. V. Ramakrishnan", hobbies: ["Music", "Reading"], freedomFighter: false },
  { name: "Mahatma Gandhi", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1869-10-02", dateOfDeath: "1948-01-30", isDead: true, achievements: ["Father of the Nation", "Leader of Indian Independence Movement", "Salt March", "Nonviolent resistance"], fatherName: "Karamchand Gandhi", hobbies: ["Spinning", "Reading"], freedomFighter: true },
  { name: "Sardar Vallabhbhai Patel", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1875-10-31", dateOfDeath: "1950-12-15", isDead: true, achievements: ["Iron Man of India", "Unification of India", "Deputy Prime Minister"], fatherName: "Jhaverbhai Patel", hobbies: ["Farming", "Reading"], freedomFighter: true },
  { name: "Jawaharlal Nehru", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1889-11-14", dateOfDeath: "1964-05-27", isDead: true, achievements: ["First Prime Minister of India", "Architect of Modern India", "Discovery of India (book)"], fatherName: "Motilal Nehru", hobbies: ["Gardening", "Writing"], freedomFighter: true },
  { name: "Bhagat Singh", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1907-09-28", dateOfDeath: "1931-03-23", isDead: true, achievements: ["Indian revolutionary", "Lahore Conspiracy Case", "Assembly Bombing"], fatherName: "Kishan Singh Sandhu", hobbies: ["Reading", "Writing"], freedomFighter: true },
  { name: "Rani Lakshmibai", type: "historical", gender: "female", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1828-11-19", dateOfDeath: "1858-06-18", isDead: true, achievements: ["Queen of Jhansi", "Leader in 1857 revolt"], fatherName: "Moropant Tambe", hobbies: ["Horse riding", "Sword fighting"], freedomFighter: true },
  { name: "Subhas Chandra Bose", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1897-01-23", dateOfDeath: "1945-08-18", isDead: true, achievements: ["Leader of Indian National Army", "Azad Hind Government", "Forward Bloc founder"], fatherName: "Janakinath Bose", hobbies: ["Reading", "Traveling"], freedomFighter: true },
  { name: "Swami Vivekananda", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1863-01-12", dateOfDeath: "1902-07-04", isDead: true, achievements: ["Spiritual leader", "Chicago World Parliament of Religions 1893", "Ramakrishna Mission founder"], fatherName: "Vishwanath Datta", hobbies: ["Meditation", "Reading"], freedomFighter: false },
  { name: "Rabindranath Tagore", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1861-05-07", dateOfDeath: "1941-08-07", isDead: true, achievements: ["Nobel Prize in Literature 1913", "Gitanjali", "Jana Gana Mana composer", "Knighthood (renounced)", "Visva-Bharati University founder"], fatherName: "Debendranath Tagore", hobbies: ["Poetry", "Music", "Painting"], freedomFighter: false },
  { name: "Chhatrapati Shivaji Maharaj", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1630-02-19", dateOfDeath: "1680-04-03", isDead: true, achievements: ["Founder of Maratha Empire", "Guerrilla warfare pioneer", "Hindavi Swarajya"], fatherName: "Shahaji Bhosale", hobbies: ["Horse riding", "Sword fighting"], freedomFighter: true },
  { name: "Tipu Sultan", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1751-11-20", dateOfDeath: "1799-05-04", isDead: true, achievements: ["Tiger of Mysore", "Rocket artillery pioneer", "Resistance to British"], fatherName: "Sultan Hyder Ali", hobbies: ["Horse riding", "Military strategy"], freedomFighter: true },
  { name: "Dr. B. R. Ambedkar", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1891-04-14", dateOfDeath: "1956-12-06", isDead: true, achievements: ["Architect of Indian Constitution", "Social reformer", "First Law Minister of India", "Bharat Ratna (1990)"], fatherName: "Ramji Maloji Sakpal", hobbies: ["Reading", "Writing"], freedomFighter: false },
  { name: "Raja Ram Mohan Roy", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1772-05-22", dateOfDeath: "1833-09-27", isDead: true, achievements: ["Social reformer", "Abolition of Sati", "Founder of Brahmo Samaj"], fatherName: "Ramkanta Roy", hobbies: ["Writing", "Social work"], freedomFighter: false },
  { name: "Sarojini Naidu", type: "historical", gender: "female", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1879-02-13", dateOfDeath: "1949-03-02", isDead: true, achievements: ["Nightingale of India", "First woman President of INC", "Governor of United Provinces"], fatherName: "Aghorenath Chattopadhyay", hobbies: ["Poetry", "Writing"], freedomFighter: true },
  { name: "Mangal Pandey", type: "historical", gender: "male", field: "politics", birthplace: "India", nobel: false, dateOfBirth: "1827-07-19", dateOfDeath: "1857-04-08", isDead: true, achievements: ["Indian soldier, 1857 revolt", "First martyr of 1857"], fatherName: "Divakar Pandey", hobbies: ["Horse riding", "Shooting"], freedomFighter: true }
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

  // Guarantee correct answers for type/gender/fact/personal life questions
  const q = question.toLowerCase();
  if (q.includes('scientist')) {
    return res.status(200).json({ answer: chosen && chosen.type === 'scientist' ? 'Yes.' : 'No.' });
  }
  if (q.includes('historical')) {
    return res.status(200).json({ answer: chosen && chosen.type === 'historical' ? 'Yes.' : 'No.' });
  }
  if (q.includes('female')) {
    return res.status(200).json({ answer: chosen && chosen.gender === 'female' ? 'Yes.' : 'No.' });
  }
  if (q.includes('male')) {
    return res.status(200).json({ answer: chosen && chosen.gender === 'male' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('physics')) {
    return res.status(200).json({ answer: chosen.field === 'physics' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('chemistry')) {
    return res.status(200).json({ answer: chosen.field === 'chemistry' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('mathematics')) {
    return res.status(200).json({ answer: chosen.field === 'mathematics' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('biophysics')) {
    return res.status(200).json({ answer: chosen.field === 'biophysics' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('engineering')) {
    return res.status(200).json({ answer: chosen.field === 'engineering' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('aerospace')) {
    return res.status(200).json({ answer: chosen.field === 'aerospace' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('politics')) {
    return res.status(200).json({ answer: chosen.field === 'politics' ? 'Yes.' : 'No.' });
  }
  if (chosen && q.includes('india')) {
    return res.status(200).json({ answer: chosen.birthplace === 'India' ? 'Yes.' : 'No.' });
  }
  if (chosen && (q.includes('nobel') || q.includes('prize'))) {
    return res.status(200).json({ answer: chosen.nobel ? 'Yes.' : 'No.' });
  }
  if (chosen && (q.includes('freedom fighter') || q.includes('freedom'))) {
    return res.status(200).json({ answer: chosen.freedomFighter ? 'Yes.' : 'No.' });
  }
  if (chosen && (q.includes('dead') || q.includes('died') || q.includes('passed away'))) {
    return res.status(200).json({ answer: chosen.isDead ? 'Yes.' : 'No.' });
  }
  if (chosen && (q.includes('date of birth') || q.includes('born') || q.includes('birthday'))) {
    if (chosen.dateOfBirth && q.includes(chosen.dateOfBirth)) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Date of birth is ${chosen.dateOfBirth || 'unknown'}.` });
    }
  }
  if (chosen && (q.includes('date of death') || q.includes('died'))) {
    if (chosen.dateOfDeath && q.includes(chosen.dateOfDeath)) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Date of death is ${chosen.dateOfDeath || 'unknown'}.` });
    }
  }
  // Personal life: father's name
  if (chosen && (q.includes('father') || q.includes('father name') || q.includes('dad'))) {
    if (chosen.fatherName && q.includes(chosen.fatherName.toLowerCase())) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Father's name is ${chosen.fatherName || 'unknown'}.` });
    }
  }
  // Personal life: mother's name
  if (chosen && (q.includes('mother') || q.includes('mother name') || q.includes('mom'))) {
    if (chosen.motherName && q.includes(chosen.motherName.toLowerCase())) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Mother's name is ${chosen.motherName || 'unknown'}.` });
    }
  }
  // Personal life: spouse
  if (chosen && (q.includes('spouse') || q.includes('wife') || q.includes('husband') || q.includes('married'))) {
    if (chosen.spouse && q.includes(chosen.spouse.toLowerCase())) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Spouse is ${chosen.spouse || 'unknown'}.` });
    }
  }
  // Personal life: children
  if (chosen && (q.includes('child') || q.includes('children') || q.includes('son') || q.includes('daughter'))) {
    if (chosen.children && chosen.children.some(c => q.includes(c.toLowerCase()))) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Children are ${chosen.children && chosen.children.length > 0 ? chosen.children.join(', ') : 'unknown'}.` });
    }
  }
  // Personal life: education
  if (chosen && (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('school'))) {
    if (chosen.education && chosen.education.some(e => q.includes(e.toLowerCase()))) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Education: ${chosen.education ? chosen.education.join(', ') : 'unknown'}.` });
    }
  }
  // Personal life: place of birth
  if (chosen && (q.includes('place of birth') || q.includes('born in') || q.includes('birthplace'))) {
    if (chosen.placeOfBirth && q.includes(chosen.placeOfBirth.toLowerCase())) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Place of birth is ${chosen.placeOfBirth || 'unknown'}.` });
    }
  }
  // Personal life: place of death
  if (chosen && (q.includes('place of death') || q.includes('died in') || q.includes('death place'))) {
    if (chosen.placeOfDeath && q.includes(chosen.placeOfDeath.toLowerCase())) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Place of death is ${chosen.placeOfDeath || 'unknown'}.` });
    }
  }
  // Personal life: religion
  if (chosen && (q.includes('religion') || q.includes('faith'))) {
    if (chosen.religion && q.includes(chosen.religion.toLowerCase())) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Religion is ${chosen.religion || 'unknown'}.` });
    }
  }
  // Personal life: nationality
  if (chosen && (q.includes('nationality') || q.includes('citizen'))) {
    if (chosen.nationality && q.includes(chosen.nationality.toLowerCase())) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Nationality is ${chosen.nationality || 'unknown'}.` });
    }
  }
  // Personal life: books
  if (chosen && (q.includes('book') || q.includes('books') || q.includes('author'))) {
    if (chosen.books && chosen.books.some(b => q.includes(b.toLowerCase()))) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Notable books: ${chosen.books && chosen.books.length > 0 ? chosen.books.join(', ') : 'unknown'}.` });
    }
  }
  // Personal life: hobbies
  if (chosen && (q.includes('hobby') || q.includes('hobbies') || q.includes('interest'))) {
    if (chosen.hobbies && chosen.hobbies.some(h => q.includes(h.toLowerCase()))) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Hobbies are ${chosen.hobbies ? chosen.hobbies.join(', ') : 'unknown'}.` });
    }
  }
  // Achievements
  if (chosen && (q.includes('achievement') || q.includes('achieve') || q.includes('award') || q.includes('did'))) {
    if (chosen.achievements && chosen.achievements.some(a => q.includes(a.toLowerCase()))) {
      return res.status(200).json({ answer: 'Yes.' });
    } else {
      return res.status(200).json({ answer: `No. Achievements are: ${chosen.achievements ? chosen.achievements.join(', ') : 'unknown'}.` });
    }
  }
  // If not intercepted, call Gemini
  try {
    // Build a summary of the chosen person for Gemini
    let summary = '';
    if (chosen) {
      summary = `Here are all known facts about the person for your reference:\n` +
        `Name: ${chosen.name}\n` +
        `Type: ${chosen.type || 'Unknown'}\n` +
        `Gender: ${chosen.gender || 'Unknown'}\n` +
        `Field: ${chosen.field || 'Unknown'}\n` +
        `Birthplace: ${chosen.birthplace || 'Unknown'}\n` +
        `Nobel Prize: ${chosen.nobel !== undefined ? (chosen.nobel ? 'Yes' : 'No') : 'Unknown'}\n`;
    }
    // Compose the prompt for Gemini
    const prompt = summary
      ? `${summary}\n\nYou are an expert on famous Indian scientists and historical figures. Based on the above facts and your own knowledge, answer the following question in yes/no if possible, otherwise provide a short factual answer.\nQuestion: ${question}`
      : `You are an expert on famous Indian scientists and historical figures. Answer the following question in yes/no if possible, otherwise provide a short factual answer.\nQuestion: ${question}`;
    const response = await fetch('https://api.gemini.com/v1/endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    let aiText = '';
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      aiText = data.candidates[0].content.parts[0].text;
    } else if (data?.error?.message) {
      aiText = `Error: ${data.error.message}`;
    } else {
      // Fallback: always return a friendly YES/NO style answer
      aiText = "I don't have enough information to answer that confidently, but my best guess is: No.";
    }
    res.status(200).json({ answer: aiText });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to fetch Gemini response.' });
  }
};
