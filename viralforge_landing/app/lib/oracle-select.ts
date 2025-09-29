import { ORACLE_CARDS, type OracleCard } from "./oracle-cards"

export function selectOracleCardFromSurvey(data: {
  name?: string; email?: string; birthMonth?: string; currentFocus?: string; energyLevel?: string
}): OracleCard {
  const month  = (data.birthMonth || "").trim().toLowerCase()
  const focus  = (data.currentFocus || "").trim().toLowerCase()
  const energy = (data.energyLevel || "").trim().toLowerCase()
  const idHash = fnv1a([data.name||"", data.email||"", month, focus, energy].join("|"))

  const season  = monthToSeason(month)
  const element = seasonToElement(season)
  const tier    = energyTier(energy)

  const candidates = focusToCards(focus, element, tier, idHash)
  const idx = candidates.length ? idHash % candidates.length : 0
  return findByName(candidates[idx]) ?? defaultCard()
}

const CARD = {
  COSMIC_MESSENGER: "The Cosmic Messenger",
  INTERSTELLAR_JOURNEY: "The Interstellar Journey",
  MARTIAN_THRESHOLD: "The Martian Threshold",
  SOLAR_WIND: "The Solar Wind",
  DEEP_SPACE_ECHO: "The Deep Space Echo",
  PERIHELION_MOMENT: "The Perihelion Moment",
  HYPERBOLIC_PATH: "The Hyperbolic Path",
  COSMIC_DEBRIS: "The Cosmic Debris",
  OBSERVATORY_MOMENT: "The Observatory Moment",
  INFINITE_TRAJECTORY: "The Infinite Trajectory",
} as const

function focusToCards(focus: string, element: "water"|"air"|"fire"|"earth", tier: 1|2|3, hash: number): string[] {
  let pair: string[]
  if (/\b(new|begin|adventure|change|travel|start)\b/.test(focus)) {
    pair = [CARD.INTERSTELLAR_JOURNEY, CARD.INFINITE_TRAJECTORY]
  } else if (/\b(intuition|inner|spiritual|dream|sign)\b/.test(focus)) {
    pair = [CARD.DEEP_SPACE_ECHO, CARD.SOLAR_WIND]
  } else if (/\b(clarity|decision|strategy|truth|seen|visibility)\b/.test(focus)) {
    pair = [CARD.OBSERVATORY_MOMENT, CARD.PERIHELION_MOMENT]
  } else if (/\b(work|career|money|material|achievement|deadline|pressure)\b/.test(focus)) {
    pair = [CARD.MARTIAN_THRESHOLD, CARD.PERIHELION_MOMENT]
  } else if (/\b(communicat|message|signal|synchro)\b/.test(focus)) {
    pair = [CARD.COSMIC_MESSENGER, CARD.DEEP_SPACE_ECHO]
  } else if (/\b(transform|let go|no return|point of no return|irreversible)\b/.test(focus)) {
    pair = [CARD.HYPERBOLIC_PATH, CARD.COSMIC_DEBRIS]
  } else {
    pair = [CARD.INTERSTELLAR_JOURNEY, CARD.OBSERVATORY_MOMENT]
  }

  if (tier === 2) pair = (hash & 1) ? [pair[1], pair[0]] : pair
  if (tier === 3) pair = [pair[1], pair[0]]

  const favored = elementFavored(element)
  if (pair[1] && favored.has(pair[1]) && !favored.has(pair[0])) pair = [pair[1], pair[0]]
  return pair
}

function monthToSeason(m: string): "winter"|"spring"|"summer"|"autumn"|"unknown" {
  m = m.slice(0,3)
  if (["dec","jan","feb"].includes(m)) return "winter"
  if (["mar","apr","may"].includes(m)) return "spring"
  if (["jun","jul","aug"].includes(m)) return "summer"
  if (["sep","oct","nov"].includes(m)) return "autumn"
  return "unknown"
}
function seasonToElement(s: string): "water"|"air"|"fire"|"earth" {
  return s==="winter"?"water":s==="spring"?"air":s==="summer"?"fire":"earth"
}
function energyTier(e: string): 1|2|3 {
  if (/\b(calm|low|rest|soft|gentle)\b/.test(e)) return 1
  if (/\b(intense|high|surge|amped|charged)\b/.test(e)) return 3
  return 2
}
function elementFavored(el: "water"|"air"|"fire"|"earth") {
  switch (el) {
    case "water": return new Set([CARD.DEEP_SPACE_ECHO, CARD.COSMIC_MESSENGER])
    case "air":   return new Set([CARD.OBSERVATORY_MOMENT, CARD.SOLAR_WIND])
    case "fire":  return new Set([CARD.PERIHELION_MOMENT, CARD.MARTIAN_THRESHOLD, CARD.HYPERBOLIC_PATH])
    case "earth": return new Set([CARD.COSMIC_DEBRIS, CARD.INTERSTELLAR_JOURNEY])
  }
}
function findByName(n?: string): OracleCard | undefined { return ORACLE_CARDS.find(c => c.name === n) }
function defaultCard(): OracleCard { return findByName(CARD.INTERSTELLAR_JOURNEY) ?? ORACLE_CARDS[0] }
function fnv1a(s: string){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}