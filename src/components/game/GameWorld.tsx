import { Level, PlayerState, CharacterType, Collectible as CollectibleType, Enemy as EnemyType } from '@/types/game';
import { Player } from './Player';
import { Platform } from './Platform';
import { Enemy } from './Enemy';
import { Collectible } from './Collectible';
import { Portal } from './Portal';

interface GameWorldProps {
  level: Level;
  player: PlayerState;
  characterType: CharacterType;
  collectibles: CollectibleType[];
  enemies: EnemyType[];
  cameraOffset: number;
}

export const GameWorld = ({ level, player, characterType, collectibles, enemies, cameraOffset }: GameWorldProps) => {
  const getBackground = () => {
    switch (level.theme) {
      case 'meadow':
        return 'linear-gradient(180deg, hsl(195 85% 75%) 0%, hsl(195 80% 65%) 50%, hsl(120 50% 70%) 100%)';
      case 'forest':
        return 'linear-gradient(180deg, hsl(30 80% 65%) 0%, hsl(330 60% 55%) 50%, hsl(270 50% 35%) 100%)';
      case 'sky':
        return 'linear-gradient(180deg, hsl(250 50% 25%) 0%, hsl(270 45% 20%) 50%, hsl(280 40% 15%) 100%)';
      case 'building':
        return 'linear-gradient(180deg, hsl(25 30% 25%) 0%, hsl(20 25% 20%) 50%, hsl(15 20% 15%) 100%)';
      default:
        return 'var(--gradient-sky)';
    }
  };

  // The game's internal resolution is based on level.height (600px)
  // We'll scale everything to fit the viewport
  const viewportWidth = 800; // Internal game resolution width
  const viewportHeight = level.height; // 600px

  return (
    <div 
      className="relative w-[95vw] max-w-[1400px] aspect-[4/3] overflow-hidden rounded-2xl"
      style={{
        background: getBackground(),
        boxShadow: '0 0 0 4px hsl(var(--foreground) / 0.1), 0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      {/* Scaled game content container */}
      <div 
        className="absolute inset-0 origin-top-left"
        style={{
          width: viewportWidth,
          height: viewportHeight,
          transform: `scale(var(--game-scale, 1))`,
        }}
      >
        <style>{`
          @media (min-width: 1px) {
            :root { --game-scale: calc(95vw / ${viewportWidth}); }
          }
          @media (min-width: 1474px) {
            :root { --game-scale: calc(1400px / ${viewportWidth}); }
          }
        `}</style>

        {/* Background decorations */}
        {level.theme === 'meadow' && (
          <>
            {/* Sun */}
            <div 
              className="absolute top-8 right-12 w-16 h-16 rounded-full bg-yellow-300"
              style={{ 
                boxShadow: '0 0 40px hsl(45 95% 60% / 0.6)',
                left: 700 - cameraOffset * 0.1,
              }}
            />
            {/* Clouds */}
            <div 
              className="absolute top-16 w-24 h-8 bg-white/60 rounded-full"
              style={{ left: 200 - cameraOffset * 0.3 }}
            />
            <div 
              className="absolute top-24 w-16 h-6 bg-white/50 rounded-full"
              style={{ left: 500 - cameraOffset * 0.3 }}
            />
            <div 
              className="absolute top-12 w-20 h-7 bg-white/55 rounded-full"
              style={{ left: 900 - cameraOffset * 0.3 }}
            />
          </>
        )}

        {level.theme === 'forest' && (
          <>
            {/* Moon */}
            <div 
              className="absolute top-8 w-12 h-12 rounded-full bg-yellow-100"
              style={{ 
                left: 650 - cameraOffset * 0.1,
                boxShadow: '0 0 30px hsl(45 70% 80% / 0.5)',
              }}
            />
            {/* Trees in background */}
            {[100, 300, 600, 1000, 1400].map((x, i) => (
              <div 
                key={i}
                className="absolute bottom-20"
                style={{ left: x - cameraOffset * 0.5 }}
              >
                <div className="w-3 h-20 bg-amber-900/60 mx-auto" />
                <div className="w-16 h-24 bg-green-800/50 rounded-t-full -mt-16" />
              </div>
            ))}
          </>
        )}

        {level.theme === 'sky' && (
          <>
            {/* Stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: (i * 67 + 20) - cameraOffset * 0.2,
                  top: (i * 23) % 300 + 20,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.3 + Math.random() * 0.7,
                }}
              />
            ))}
            {/* Distant clouds */}
            <div 
              className="absolute top-32 w-32 h-10 bg-purple-400/20 rounded-full blur-sm"
              style={{ left: 300 - cameraOffset * 0.2 }}
            />
            <div 
              className="absolute top-48 w-24 h-8 bg-purple-400/15 rounded-full blur-sm"
              style={{ left: 800 - cameraOffset * 0.2 }}
            />
          </>
        )}

        {level.theme === 'building' && (
          <>
            {/* Brick wall background pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 20px,
                    hsl(15 30% 30%) 20px,
                    hsl(15 30% 30%) 22px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    hsl(15 40% 25%),
                    hsl(15 40% 25%) 40px,
                    hsl(15 30% 30%) 40px,
                    hsl(15 30% 30%) 42px
                  )
                `,
                transform: `translateX(${-cameraOffset * 0.1}px)`,
              }}
            />
            {/* Doors in corridor */}
            {[200, 450, 750, 1050, 1350, 1650, 1950].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 420,
                  width: 50,
                  height: 100,
                }}
              >
                {/* Door frame */}
                <div 
                  className="absolute inset-0 rounded-t-lg"
                  style={{
                    background: 'linear-gradient(180deg, hsl(30 40% 35%) 0%, hsl(25 35% 25%) 100%)',
                    border: '3px solid hsl(30 30% 20%)',
                    boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.3), inset 2px 2px 4px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Door handle */}
                  <div 
                    className="absolute right-2 top-1/2 w-2 h-4 rounded-full"
                    style={{ background: 'hsl(45 60% 50%)' }}
                  />
                  {/* Door panels */}
                  <div 
                    className="absolute top-3 left-2 right-2 h-8 rounded"
                    style={{ 
                      background: 'hsl(30 35% 30%)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  />
                  <div 
                    className="absolute bottom-8 left-2 right-2 h-10 rounded"
                    style={{ 
                      background: 'hsl(30 35% 30%)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  />
                </div>
              </div>
            ))}
            {/* Ceiling lights */}
            {[150, 400, 700, 1000, 1300, 1600, 1900].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 80,
                }}
              >
                <div className="w-1 h-8 bg-gray-600 mx-auto" />
                <div 
                  className="w-10 h-6 rounded-b-lg"
                  style={{
                    background: 'radial-gradient(ellipse at center, hsl(45 90% 70%) 0%, hsl(45 80% 50%) 100%)',
                    boxShadow: '0 0 20px hsl(45 80% 60% / 0.4), 0 10px 40px hsl(45 80% 50% / 0.2)',
                  }}
                />
              </div>
            ))}
          </>
        )}

        {/* Platforms */}
        {level.platforms.map(platform => (
          <Platform key={platform.id} platform={platform} cameraOffset={cameraOffset} />
        ))}

        {/* Portal */}
        {level.portal && (
          <Portal portal={level.portal} cameraOffset={cameraOffset} />
        )}

        {/* Collectibles */}
        {collectibles.map(collectible => (
          <Collectible key={collectible.id} collectible={collectible} cameraOffset={cameraOffset} />
        ))}

        {/* Enemies */}
        {enemies.map(enemy => (
          <Enemy key={enemy.id} enemy={enemy} cameraOffset={cameraOffset} />
        ))}

        {/* Player */}
        <Player player={player} characterType={characterType} cameraOffset={cameraOffset} />

        {/* Bottom danger zone indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-destructive/50 to-transparent" />
      </div>
    </div>
  );
};
