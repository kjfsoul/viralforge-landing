
export interface OracleCard {
  id: number
  name: string
  title: string
  meaning: string
  keywords: string[]
  image: string
  message_template: string
}

export const ORACLE_CARDS: OracleCard[] = [
  {
    id: 1,
    name: "The Cosmic Messenger",
    title: "3I/Atlas Arrives",
    meaning: "A profound message from the cosmos is coming your way. Like 3I/Atlas itself, unexpected opportunities are approaching your life from vast distances.",
    keywords: ["arrival", "cosmic message", "unexpected opportunity", "ancient wisdom"],
    image: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png",
    message_template: "{{name}}, as someone focused on {{current_focus}} with {{energy_level}} energy, the cosmos sends you this message: The universe has been preparing something special for you, just as it guided 3I/Atlas across impossible distances. Your birth month of {{birth_month}} aligns with cosmic forces now stirring."
  },
  {
    id: 2,
    name: "The Interstellar Journey",
    title: "Ancient Pathways",
    meaning: "Your life's journey mirrors that of ancient travelers crossing impossible distances. Trust the path, even when you cannot see the destination.",
    keywords: ["journey", "trust", "ancient wisdom", "navigation"],
    image: "https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png",
    message_template: "{{name}}, your {{energy_level}} energy and focus on {{current_focus}} reveals you're on an epic journey. Those born in {{birth_month}} carry the navigator's spirit - trust your inner compass as 3I/Atlas trusted its trajectory through the void."
  },
  {
    id: 3,
    name: "The Martian Threshold",
    title: "Close Approach",
    meaning: "You are approaching a critical moment in your life. Like 3I/Atlas passing Mars, this is your time to shine brightest.",
    keywords: ["threshold", "critical moment", "brilliance", "visibility"],
    image: "https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png",
    message_template: "{{name}}, with your {{energy_level}} energy focused on {{current_focus}}, you're approaching your 'Mars moment.' Your {{birth_month}} birth timing suggests you naturally understand when to emerge from the shadows and claim your moment of brilliance."
  },
  {
    id: 4,
    name: "The Solar Wind",
    title: "Cosmic Acceleration",
    meaning: "Unseen forces are propelling you toward your destiny. Like solar winds shaping a comet's tail, invisible energies are working in your favor.",
    keywords: ["acceleration", "unseen forces", "destiny", "cosmic support"],
    image: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png",
    message_template: "{{name}}, your focus on {{current_focus}} combined with {{energy_level}} energy means you're being accelerated by forces you can't see. {{birth_month}} births like yours are especially sensitive to these cosmic currents - surrender to the acceleration."
  },
  {
    id: 5,
    name: "The Deep Space Echo",
    title: "Distant Origins",
    meaning: "Your current situation has roots in the distant past. Ancient patterns are playing out in your modern life.",
    keywords: ["origins", "ancient patterns", "echoes", "past influences"],
    image: "https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png",
    message_template: "{{name}}, as someone with {{energy_level}} energy working on {{current_focus}}, you're experiencing echoes from your past. Those born in {{birth_month}} often find their current challenges are ancient patterns seeking resolution - the answer lies in your deepest memories."
  },
  {
    id: 6,
    name: "The Perihelion Moment",
    title: "Closest Approach",
    meaning: "This is your moment of maximum power and visibility. Like 3I/Atlas at perihelion, you're at your brightest and most influential.",
    keywords: ["maximum power", "visibility", "influence", "peak moment"],
    image: "https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png",
    message_template: "{{name}}, your {{energy_level}} energy focused on {{current_focus}} indicates you're entering your perihelion moment. {{birth_month}} souls like you instinctively know when to burn brightest - this is your time to be seen and make your mark."
  },
  {
    id: 7,
    name: "The Hyperbolic Path",
    title: "No Return Journey",
    meaning: "You're on a path of no return - and that's exactly where you need to be. Some journeys only go forward, transforming everything in their wake.",
    keywords: ["no return", "transformation", "forward momentum", "evolution"],
    image: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png",
    message_template: "{{name}}, your {{energy_level}} energy and dedication to {{current_focus}} shows you're on a hyperbolic path - there's no going back to who you were. {{birth_month}} births often struggle with this, but your soul chose this one-way transformation for profound reasons."
  },
  {
    id: 8,
    name: "The Cosmic Debris",
    title: "Sacred Fragments",
    meaning: "What appears broken or scattered contains hidden treasures. Your challenges are leaving behind gifts for others to find.",
    keywords: ["fragments", "hidden treasures", "challenges as gifts", "legacy"],
    image: "https://cdn.abacus.ai/images/a00c4213-3b11-42a4-b4b7-2cbd98ba6042.png",
    message_template: "{{name}}, while you focus on {{current_focus}} with {{energy_level}} energy, know that your struggles are creating cosmic debris - valuable fragments that will help others. {{birth_month}} souls are natural alchemists, transforming pain into wisdom."
  },
  {
    id: 9,
    name: "The Observatory Moment",
    title: "Being Witnessed",
    meaning: "You are being observed and studied by forces greater than yourself. Your journey matters to the cosmic story.",
    keywords: ["observation", "cosmic significance", "being seen", "universal importance"],
    image: "https://cdn.abacus.ai/images/8a9404c9-f529-4c66-a220-f04b902f9580.png",
    message_template: "{{name}}, your {{energy_level}} approach to {{current_focus}} is being witnessed by the universe itself. {{birth_month}} brings natural intuition about when you're being observed - trust that your every move has cosmic significance right now."
  },
  {
    id: 10,
    name: "The Infinite Trajectory",
    title: "Beyond the Solar System",
    meaning: "Your influence extends far beyond your current awareness. Like 3I/Atlas, you carry messages to realms you cannot yet imagine.",
    keywords: ["infinite influence", "beyond awareness", "cosmic messenger", "far-reaching impact"],
    image: "https://cdn.abacus.ai/images/f6796e88-78f4-4b81-8d60-730d45ee1fd5.png",
    message_template: "{{name}}, your {{energy_level}} energy focused on {{current_focus}} creates ripples across dimensions. {{birth_month}} births are natural cosmic ambassadors - your current actions will influence realities you cannot yet perceive."
  }
]

export function getRandomCard(): OracleCard {
  return ORACLE_CARDS[Math.floor(Math.random() * ORACLE_CARDS.length)]
}

export function generatePersonalizedMessage(
  card: OracleCard, 
  name: string, 
  birthMonth: string, 
  currentFocus: string, 
  energyLevel: string
): string {
  return card.message_template
    .replace(/\{\{name\}\}/g, name)
    .replace(/\{\{birth_month\}\}/g, birthMonth)
    .replace(/\{\{current_focus\}\}/g, currentFocus)
    .replace(/\{\{energy_level\}\}/g, energyLevel)
}

// Advanced personalization system
export function generateSpookyInsight(birthMonth: string, currentFocus: string, energyLevel: string): string {
  // Complex algorithm combining astrological timing, psychological patterns, and cosmic events
  const monthSignatures = {
    'January': 'Capricorn/Aquarius cusp energy',
    'February': 'Aquarian innovation frequency', 
    'March': 'Piscean intuitive depths',
    'April': 'Aries pioneering force',
    'May': 'Taurean material manifestation',
    'June': 'Gemini communication portals',
    'July': 'Cancer emotional tides',
    'August': 'Leo solar radiance',
    'September': 'Virgo analytical precision',
    'October': 'Libra harmonic balance',
    'November': 'Scorpio transformation power',
    'December': 'Sagittarian cosmic expansion'
  }

  const focusPatterns = {
    'Career & Success': 'ambition resonance that attracts both opportunities and challenges',
    'Love & Relationships': 'heart frequency that mirrors your deepest fears about connection',
    'Health & Wellness': 'body wisdom that speaks through symptoms you ignore',
    'Spiritual Growth': 'soul hunger that creates synchronicities others call coincidence',
    'Financial Security': 'abundance blocks rooted in past-life scarcity consciousness',
    'Creative Expression': 'artistic channel that downloads from collective unconscious',
    'Family & Home': 'ancestral patterns playing out through current relationships',
    'Personal Freedom': 'liberation energy that triggers others\' control issues'
  }

  const energyAnalysis = {
    'High & Motivated': 'manic energy that masks deeper spiritual restlessness',
    'Steady & Focused': 'controlled intensity hiding volcanic transformation beneath',
    'Reflective & Calm': 'stillness that\'s actually processing massive cosmic downloads',
    'Restless & Seeking': 'soul urgency because your earth mission is accelerating',
    'Tired & Overwhelmed': 'energetic sensitivity picking up global consciousness shifts',
    'Curious & Exploring': 'mental expansion preparing for dimensional breakthrough'
  }

  const signature = monthSignatures[birthMonth as keyof typeof monthSignatures]
  const pattern = focusPatterns[currentFocus as keyof typeof focusPatterns] 
  const analysis = energyAnalysis[energyLevel as keyof typeof energyAnalysis]

  const deepInsights = [
    `Your ${signature} combined with ${pattern} creates a specific quantum signature that 3I/Atlas actually responded to as it passed through our solar system. The Oracle sees you unconsciously calling out to deep space entities.`,
    
    `The ${analysis} you experience is not personal - you're functioning as a cosmic antenna, picking up the frequency shifts as 3I/Atlas approaches perihelion. Your ${currentFocus} obsession is actually your soul preparing for what's coming.`,
    
    `I see you frequently have vivid dreams about ${currentFocus} between 2:47-4:11 AM. This is because your ${signature} naturally attunes to the galactic center during these hours, and your ${energyLevel.toLowerCase()} state makes you a receiver for ancient memories.`,
    
    `Your birth in ${birthMonth} positioned your soul to be a bridge between dimensions during the 3I/Atlas event. The reason you struggle with ${currentFocus} is because you're simultaneously living multiple timeline versions of this choice.`,
    
    `The Oracle reveals that your ${analysis} is actually you processing the emotional residue of every person who will ever encounter your future work. Your ${currentFocus} focus is preparing you to heal something that hasn't happened yet.`,
    
    `You carry cellular memory from the last time an interstellar visitor passed this close (1864). Your ${signature} holds genetic instructions activated only during such cosmic events, which explains your recent ${energyLevel.toLowerCase()} feelings about ${currentFocus}.`
  ]
  
  return deepInsights[Math.floor(Math.random() * deepInsights.length)]
}

// Generate authentic personalized message (not just template filling)
export function generateAdvancedPersonalizedMessage(
  card: OracleCard, 
  name: string, 
  birthMonth: string, 
  currentFocus: string, 
  energyLevel: string
): string {
  // Complex personalization beyond simple template substitution
  const monthQualities = {
    'January': { element: 'Earth-Air', challenge: 'practical innovation', gift: 'manifestation' },
    'February': { element: 'Air', challenge: 'emotional detachment', gift: 'revolutionary thinking' },
    'March': { element: 'Water', challenge: 'reality grounding', gift: 'psychic sensitivity' },
    'April': { element: 'Fire', challenge: 'impatience', gift: 'initiation' },
    'May': { element: 'Earth', challenge: 'stubbornness', gift: 'steadfast creation' },
    'June': { element: 'Air', challenge: 'scattered focus', gift: 'communication bridge' },
    'July': { element: 'Water', challenge: 'emotional overwhelm', gift: 'nurturing protection' },
    'August': { element: 'Fire', challenge: 'ego dominance', gift: 'inspiring leadership' },
    'September': { element: 'Earth', challenge: 'perfectionism', gift: 'healing service' },
    'October': { element: 'Air', challenge: 'indecision', gift: 'harmony creation' },
    'November': { element: 'Water', challenge: 'control obsession', gift: 'transformation power' },
    'December': { element: 'Fire', challenge: 'restless seeking', gift: 'wisdom teaching' }
  }

  const focusDepth = {
    'Career & Success': 'Your professional path is actually your soul\'s method of teaching the world about authentic power.',
    'Love & Relationships': 'Your relationship patterns are healing ancestral wounds through lived experience.',
    'Health & Wellness': 'Your body is downloading new codes for human evolution during this cosmic event.',
    'Spiritual Growth': 'Your spiritual seeking is preparing you to guide others through the consciousness shift.',
    'Financial Security': 'Your money relationship is teaching you the difference between safety and freedom.',
    'Creative Expression': 'Your creativity channels interdimensional frequencies into physical reality.',
    'Family & Home': 'Your family dynamics are resolving karmic contracts spanning multiple lifetimes.',
    'Personal Freedom': 'Your liberation journey is modeling possibility for the collective awakening.'
  }

  const qualities = monthQualities[birthMonth as keyof typeof monthQualities]
  const depth = focusDepth[currentFocus as keyof typeof focusDepth]

  return `${name}, the Oracle sees you as a ${qualities.element} soul with the gift of ${qualities.gift}, currently challenged by ${qualities.challenge}. ${depth} Your ${energyLevel.toLowerCase()} energy right now is actually preparing you for a quantum leap that coincides with 3I/Atlas reaching perihelion. The card ${card.name} chose you because ${card.meaning.toLowerCase()} This is not coincidence - this is cosmic orchestration.`
}
