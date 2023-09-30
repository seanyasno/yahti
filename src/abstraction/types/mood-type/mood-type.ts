export const MOOD_TYPES = {
  Happy: 'happy',
  Hug: 'hug',
  Hungry: 'hungry',
  Love: 'love',
  Oof: 'oof',
  Sad: 'sad',
  Shock: 'shock',
  SuperLove: 'superLove',
} as const;

export type MoodType = typeof MOOD_TYPES[keyof typeof MOOD_TYPES];
