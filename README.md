# CatQuest Technical Documentation

## Overview

CatQuest is a 2D platformer game built with React, TypeScript, and Framer Motion. The game features custom physics, collision detection, and procedural audio generation using the Web Audio API.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Game Engine](#game-engine)
3. [Type System](#type-system)
4. [Components](#components)
5. [Hooks](#hooks)
6. [Level System](#level-system)
7. [Audio System](#audio-system)
8. [Character System](#character-system)
9. [Viewport & Scaling](#viewport--scaling)

---

## Architecture

```
src/
├── components/
│   └── game/
│       ├── Game.tsx           # Main game orchestrator
│       ├── GameWorld.tsx      # Level rendering & backgrounds
│       ├── GameHUD.tsx        # Heads-up display (health, coins, etc.)
│       ├── Player.tsx         # Player character rendering
│       ├── Platform.tsx       # Platform rendering
│       ├── Enemy.tsx          # Enemy rendering & animation
│       ├── Collectible.tsx    # Coin/star/powerup rendering
│       ├── Portal.tsx         # Level exit portal
│       ├── MainMenu.tsx       # Start screen & character select
│       ├── PauseMenu.tsx      # In-game pause overlay
│       ├── GameOverScreen.tsx # Death/game over screen
│       ├── LevelCompleteScreen.tsx # Level victory screen
│       └── MobileControls.tsx # Touch controls for mobile
├── hooks/
│   ├── useGameEngine.ts       # Core game loop & physics
│   ├── useMusicPlayer.ts      # Procedural background music
│   ├── useSoundEffects.ts     # Procedural sound effects
│   └── use-mobile.tsx         # Mobile device detection
├── data/
│   ├── levels.ts              # Level definitions (platforms, enemies, collectibles)
│   └── characters.ts          # Character stats & abilities
├── types/
│   └── game.ts                # TypeScript interfaces & types
└── pages/
    └── Index.tsx              # Entry point rendering <Game />
```

---

## Game Engine

The game engine is implemented in `src/hooks/useGameEngine.ts` and handles:

### Physics Constants

| Constant | Value | Description |
|----------|-------|-------------|
| Gravity | 0.5 | Downward acceleration per frame |
| Terminal Velocity | 15 | Maximum falling speed |
| Friction | 0.85 | Ground deceleration multiplier |
| Air Resistance | 0.95 | Air deceleration multiplier |

### Game Loop

The engine uses `requestAnimationFrame` for a 60fps game loop:

```typescript
const gameLoop = (timestamp: number) => {
  // 1. Process input (keyboard/mobile controls)
  // 2. Apply physics (gravity, velocity)
  // 3. Check platform collisions
  // 4. Check enemy collisions
  // 5. Check collectible collisions
  // 6. Check portal collision (level complete)
  // 7. Update camera offset
  // 8. Update game state
};
```

### Collision Detection

Uses AABB (Axis-Aligned Bounding Box) collision:

```typescript
const checkCollision = (
  x1: number, y1: number, w1: number, h1: number,
  x2: number, y2: number, w2: number, h2: number
): boolean => {
  return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
};
```

### Player States

| State | Description |
|-------|-------------|
| `isGrounded` | Player is standing on a platform |
| `isJumping` | Player is in upward motion |
| `isMoving` | Horizontal movement active |
| `isInvulnerable` | Temporary damage immunity after hit |
| `facingRight` | Sprite direction |

### Input Handling

- **Desktop**: Keyboard events (`keydown`/`keyup`) for Arrow keys, WASD, Space
- **Mobile**: Touch controls via `triggerMobileInput()` function

---

## Type System

Defined in `src/types/game.ts`:

### Core Types

```typescript
type CharacterType = 'hywon' | 'junnior';

type Theme = 'meadow' | 'forest' | 'sky' | 'building' | 'whitten' 
           | 'donuts' | 'c2' | 'rooftop' | 'metro' | 'catwalk';

type PlatformType = 'grass' | 'stone' | 'ice' | 'moving' | 'brick' | 'terracotta';

type EnemyType = 'slime' | 'bat' | 'spike';

type CollectibleType = 'coin' | 'heart' | 'star' | 'powerup';
```

### Key Interfaces

```typescript
interface Position { x: number; y: number; }
interface Velocity { vx: number; vy: number; }

interface PlayerState {
  position: Position;
  velocity: Velocity;
  isGrounded: boolean;
  isJumping: boolean;
  facingRight: boolean;
  isMoving: boolean;
  health: number;
  maxHealth: number;
  coins: number;
  stars: number;
  isInvulnerable: boolean;
}

interface GameState {
  currentLevel: number;
  selectedCharacter: CharacterType;
  player: PlayerState;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  isLevelComplete: boolean;
  score: number;
  lives: number;
}
```

---

## Components

### Game.tsx (Main Orchestrator)

Responsibilities:
- Initializes `useGameEngine` and `useMusicPlayer` hooks
- Manages fullscreen mode
- Renders appropriate screen based on game state
- Handles screen transitions with `AnimatePresence`

### GameWorld.tsx (Level Renderer)

Responsibilities:
- Renders theme-specific backgrounds (parallax layers, decorations)
- Positions all game objects relative to camera offset
- Renders platforms, enemies, collectibles, portal, and player

**Supported Themes:**
| Theme | Visual Elements |
|-------|-----------------|
| `meadow` | Hills, clouds, flowers, sun |
| `forest` | Trees, mushrooms, fog, fireflies |
| `sky` | Floating islands, rainbow, birds |
| `building` | Brick walls, windows, vines |
| `whitten` | Terracotta, DC flags, decorative elements |
| `donuts` | Coffee cups, donuts, pink gradient |
| `c2` | World cable maps, tech displays |
| `rooftop` | City skyline, stars, antenna |
| `metro` | Tunnel, trains, station signs |
| `catwalk` | Spotlights, runway, fashion elements |

### Player.tsx

Renders the player character with:
- Character-specific colors (Hywon: cyan, Junnior: orange)
- Cat ear and tail animations
- Movement and direction states
- Invulnerability flash effect

### Enemy.tsx

Renders enemies with patrol behavior:
- **Slime**: Bouncing ground enemy
- **Bat**: Flying enemy with wing flaps
- **Spike**: Static hazard

### MobileControls.tsx

Touch-friendly controls with:
- D-pad for movement (left/right)
- Jump button
- Pause button
- Responsive positioning

---

## Hooks

### useGameEngine

```typescript
const {
  gameState,      // Current game state
  level,          // Current level data
  character,      // Selected character data
  collectibles,   // Active collectibles array
  enemies,        // Active enemies array
  cameraOffset,   // Horizontal camera position
  startGame,      // (characterId) => void
  pauseGame,      // () => void
  resumeGame,     // () => void
  restartLevel,   // () => void
  nextLevel,      // () => void
  selectLevel,    // (levelId) => void
  triggerMobileInput // (action, isPressed) => void
} = useGameEngine();
```

### useMusicPlayer

```typescript
const {
  isPlaying,      // Music currently playing
  playMusic,      // (theme) => void
  stopMusic,      // () => void
  setVolume       // (0-1) => void
} = useMusicPlayer();
```

Uses Web Audio API to generate procedural music per theme:
- **Meadow**: Cheerful major chords
- **Forest**: Mysterious minor progressions
- **Sky**: Ethereal pad sounds
- **Metro**: Industrial ambient tones
- **Default**: Generic atmospheric pads

### useSoundEffects

```typescript
const {
  playJumpSound,
  playCollectSound,
  playDamageSound,
  playLevelCompleteSound,
  playGameOverSound
} = useSoundEffects();
```

---

## Level System

Levels are defined in `src/data/levels.ts`:

### Level Structure

```typescript
interface Level {
  id: number;
  name: string;
  theme: Theme;
  background: string;
  width: number;           // Level width in pixels
  height: number;          // Level height (typically 600)
  playerStart: Position;   // Spawn point
  platforms: Platform[];
  enemies: Enemy[];
  collectibles: Collectible[];
  portal: Portal;          // Level exit
}
```

### Current Levels

| ID | Name | Theme | Description |
|----|------|-------|-------------|
| 1 | Sunny Meadow | meadow | Tutorial level with gentle terrain |
| 2 | Enchanted Forest | forest | Dark forest with mushrooms |
| 3 | Sky Kingdom | sky | Floating platforms in clouds |
| 4 | South Building | building | Brick architecture |
| 5 | Whitten Building | whitten | Terracotta with DC flags |
| 6 | Dunkin' Donuts | donuts | Coffee and donut themed |
| 7 | GWCC Parks | c2 | World cable map scenery |
| 8 | Rooftop | rooftop | City skyline at night |
| 9 | Underground Metro | metro | Subway station environment |
| 10 | Catwalk | catwalk | Fashion runway with spotlights |

### Platform Types

| Type | Behavior |
|------|----------|
| `grass` | Standard green platform |
| `stone` | Gray rocky platform |
| `ice` | Slippery surface (reduced friction) |
| `moving` | Oscillates horizontally or vertically |
| `brick` | Red brick texture |
| `terracotta` | Orange/brown terracotta blocks |

---

## Audio System

### Music Generation

The `useMusicPlayer` hook creates procedural music using Web Audio API oscillators:

```typescript
const getAudioContext = () => {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContextRef.current;
};
```

Each theme has unique chord progressions and timbres generated in real-time.

### Sound Effects

Short, synthesized sounds for:
- Jump (rising pitch)
- Collect (bell-like chime)
- Damage (dissonant buzz)
- Level complete (victory fanfare)
- Game over (descending tones)

---

## Character System

Defined in `src/data/characters.ts`:

### Hywon

| Stat | Value |
|------|-------|
| Speed | 5 |
| Jump Power | 12 |
| Ability | Double Jump |
| Color | Cyan (primary) |

### Junnior

| Stat | Value |
|------|-------|
| Speed | 7 |
| Jump Power | 10 |
| Ability | Fire Dash |
| Color | Orange (accent) |

---

## Viewport & Scaling

### Container Dimensions

- **Internal viewport**: 800×600 pixels
- **Container width**: 1400px max
- **Aspect ratio**: 16:10

### Responsive Scaling

The game container uses CSS transforms to scale content while maintaining aspect ratio:

```css
.game-container {
  aspect-ratio: 16 / 10;
  max-width: 1400px;
  overflow: hidden;
}
```

### Camera System

Horizontal scrolling follows the player:

```typescript
const targetOffset = Math.max(0, 
  Math.min(
    playerPosition.x - 400,  // Center player
    levelWidth - 800         // Clamp to level bounds
  )
);
cameraOffset = lerp(cameraOffset, targetOffset, 0.1);
```

---

## Development Notes

### Adding a New Level

1. Add theme to `src/types/game.ts` Theme type
2. Add theme to `useMusicPlayer.ts` Theme type and `playThemeMusic` switch
3. Create level object in `src/data/levels.ts`
4. Add background rendering in `GameWorld.tsx` `getBackgroundStyle` and theme-specific JSX

### Adding a New Enemy Type

1. Add type to `EnemyType` in `src/types/game.ts`
2. Implement rendering in `Enemy.tsx`
3. Add collision behavior in `useGameEngine.ts` game loop

### Adding a New Character

1. Add type to `CharacterType` in `src/types/game.ts`
2. Define stats in `src/data/characters.ts`
3. Add visual variant in `Player.tsx`
4. Add selection option in `MainMenu.tsx`

---

## Performance Considerations

- **requestAnimationFrame**: Ensures 60fps game loop synced with display refresh
- **Refs over State**: Game loop variables use refs to avoid re-render overhead
- **Memoization**: Character and level data cached in refs
- **Conditional Rendering**: Only visible elements rendered based on camera position

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `framer-motion` | Animations & transitions |
| `lucide-react` | Icons |
| `tailwindcss` | Styling |
| `typescript` | Type safety |

---

*Documentation generated for CatQuest v1.0*
