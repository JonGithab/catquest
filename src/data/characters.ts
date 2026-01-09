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
  lou: {
    id: 'lou',
    name: 'Lou',
    description: 'A tactical soldier who can glide with a parachute. Perfect for strategic landings!',
    color: 'foreground',
    ability: 'Glide',
    speed: 5,
    jumpPower: 14,
  },
  teri: {
    id: 'teri',
    name: 'Teri',
    description: 'A nimble climber who can scale walls with ease. Great for vertical exploration!',
    color: 'destructive',
    ability: 'Wall Climb',
    speed: 6,
    jumpPower: 14,
  },
};

export const getCharacter = (id: string): Character => {
  return characters[id] || characters.hywon;
};
