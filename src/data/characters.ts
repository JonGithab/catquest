import { Character } from '@/types/game';

export const characters: Record<string, Character> = {
  luna: {
    id: 'luna',
    name: 'Luna',
    description: 'A nimble explorer with the power of double jump. Perfect for reaching high places!',
    color: 'primary',
    ability: 'Double Jump',
    speed: 5,
    jumpPower: 12,
  },
  blaze: {
    id: 'blaze',
    name: 'Blaze',
    description: 'A fiery speedster who can dash through enemies. Great for aggressive playstyles!',
    color: 'accent',
    ability: 'Fire Dash',
    speed: 7,
    jumpPower: 10,
  },
};

export const getCharacter = (id: string): Character => {
  return characters[id] || characters.luna;
};
