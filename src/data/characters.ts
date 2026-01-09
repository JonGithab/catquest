import { Character } from '@/types/game';

export const characters: Record<string, Character> = {
  hywon: {
    id: 'hywon',
    name: 'Hywon',
    description: 'A nimble explorer with the power of double jump. Perfect for reaching high places!',
    color: 'primary',
    ability: 'Double Jump',
    speed: 5,
    jumpPower: 14,
  },
  junnior: {
    id: 'junnior',
    name: 'Junnior',
    description: 'A fiery speedster who can dash through enemies. Great for aggressive playstyles!',
    color: 'accent',
    ability: 'Fire Dash',
    speed: 7,
    jumpPower: 14,
  },
};

export const getCharacter = (id: string): Character => {
  return characters[id] || characters.hywon;
};
