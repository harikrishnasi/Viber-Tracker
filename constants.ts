
import { Quote, IconKey } from './types';

export const STOIC_QUOTES: Quote[] = [
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "The best revenge is not to be like your enemy.", author: "Marcus Aurelius" },
  { text: "No man is free who is not master of himself.", author: "Epictetus" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
];

export const AVAILABLE_ICONS: { key: IconKey; label: string; emoji: string }[] = [
  { key: 'gym', label: 'Exercise', emoji: '💪' },
  { key: 'water', label: 'Hydrate', emoji: '💧' },
  { key: 'book', label: 'Read', emoji: '📚' },
  { key: 'sun', label: 'Morning', emoji: '🌅' },
  { key: 'moon', label: 'Sleep', emoji: '😴' },
  { key: 'code', label: 'Coding', emoji: '💻' },
  { key: 'clean', label: 'Tidy Up', emoji: '🧹' },
  { key: 'money', label: 'Save $', emoji: '💸' },
  { key: 'smoke', label: 'Smoking', emoji: '🚬' },
  { key: 'social', label: 'Social Media', emoji: '🤳' },
  { key: 'phone', label: 'Screen Time', emoji: '📱' },
  { key: 'brain', label: 'Overthinking', emoji: '🧠' },
  { key: 'fastfood', label: 'Junk Food', emoji: '🍔' },
  { key: 'game', label: 'Gaming', emoji: '🎮' },
  { key: 'beer', label: 'Alcohol', emoji: '🍺' },
];

export const GEMINI_PROMPT_CONTEXT = `
You are a wise stoic philosopher. 
Generate a short, powerful, single-sentence quote about resilience, discipline, or overcoming temptation.
Return ONLY the quote text, no author, no quotation marks.
`;
