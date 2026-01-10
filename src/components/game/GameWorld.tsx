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
        return 'linear-gradient(180deg, hsl(200 70% 65%) 0%, hsl(140 50% 55%) 50%, hsl(120 45% 35%) 100%)';
      case 'purpleline':
        return 'linear-gradient(180deg, hsl(270 60% 25%) 0%, hsl(280 50% 18%) 50%, hsl(290 45% 12%) 100%)';
      case 'sky':
        return 'linear-gradient(180deg, hsl(250 50% 25%) 0%, hsl(270 45% 20%) 50%, hsl(280 40% 15%) 100%)';
      case 'building':
        return 'linear-gradient(180deg, hsl(25 30% 25%) 0%, hsl(20 25% 20%) 50%, hsl(15 20% 15%) 100%)';
      case 'whitten':
        return 'linear-gradient(180deg, hsl(35 40% 85%) 0%, hsl(25 35% 75%) 50%, hsl(20 50% 55%) 100%)';
      case 'donuts':
        return 'linear-gradient(180deg, hsl(330 70% 85%) 0%, hsl(25 80% 75%) 50%, hsl(35 60% 65%) 100%)';
      case 'c2':
        return 'linear-gradient(180deg, hsl(220 40% 15%) 0%, hsl(210 45% 12%) 50%, hsl(200 50% 8%) 100%)';
      case 'skyline':
        return 'linear-gradient(180deg, hsl(210 40% 85%) 0%, hsl(200 50% 75%) 50%, hsl(190 45% 65%) 100%)';
      case 'metro':
        return 'linear-gradient(180deg, hsl(220 15% 18%) 0%, hsl(220 20% 12%) 50%, hsl(220 25% 8%) 100%)';
      case 'catwalk':
        return 'linear-gradient(180deg, hsl(280 30% 12%) 0%, hsl(300 25% 8%) 50%, hsl(320 20% 5%) 100%)';
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
            {/* Sun */}
            <div 
              className="absolute top-8 w-14 h-14 rounded-full bg-yellow-300"
              style={{ 
                left: 680 - cameraOffset * 0.1,
                boxShadow: '0 0 50px hsl(45 95% 60% / 0.5)',
              }}
            />
            {/* Clouds */}
            <div 
              className="absolute top-12 w-28 h-9 bg-white/70 rounded-full"
              style={{ left: 150 - cameraOffset * 0.2 }}
            />
            <div 
              className="absolute top-20 w-20 h-7 bg-white/60 rounded-full"
              style={{ left: 450 - cameraOffset * 0.2 }}
            />
            <div 
              className="absolute top-16 w-24 h-8 bg-white/65 rounded-full"
              style={{ left: 800 - cameraOffset * 0.2 }}
            />
            {/* Campus buildings in background */}
            {[80, 400, 750, 1150, 1550].map((x, i) => (
              <div 
                key={`bldg-${i}`}
                className="absolute"
                style={{ 
                  left: x - cameraOffset * 0.3,
                  bottom: 120,
                }}
              >
                {/* Main building */}
                <div 
                  className="relative"
                  style={{
                    width: 70 + (i % 2) * 20,
                    height: 80 + (i % 3) * 25,
                    background: `linear-gradient(180deg, hsl(${15 + i * 5} 25% 70%) 0%, hsl(${15 + i * 5} 20% 55%) 100%)`,
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Windows */}
                  <div className="absolute top-3 left-2 right-2 grid grid-cols-3 gap-1">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <div key={j} className="h-4 bg-blue-300/60 rounded-sm" />
                    ))}
                  </div>
                  {/* Door */}
                  <div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-10 rounded-t-lg"
                    style={{ background: 'hsl(25 35% 35%)' }}
                  />
                </div>
              </div>
            ))}
            {/* Tall green trees */}
            {[50, 180, 350, 550, 700, 900, 1100, 1300, 1500, 1700].map((x, i) => (
              <div 
                key={`tree-${i}`}
                className="absolute"
                style={{ 
                  left: x - cameraOffset * 0.5,
                  bottom: 100,
                }}
              >
                {/* Tree trunk */}
                <div 
                  className="w-4 h-24 mx-auto"
                  style={{ background: 'hsl(25 50% 30%)' }}
                />
                {/* Tree foliage - layered */}
                <div 
                  className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
                  style={{ background: `hsl(${120 + i * 5} 55% ${35 + (i % 3) * 5}%)` }}
                />
                <div 
                  className="absolute -top-14 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
                  style={{ background: `hsl(${125 + i * 5} 50% ${40 + (i % 3) * 5}%)` }}
                />
                <div 
                  className="absolute -top-18 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full"
                  style={{ background: `hsl(${130 + i * 5} 45% ${45 + (i % 3) * 5}%)` }}
                />
              </div>
            ))}
            {/* Campus walkway/path */}
            <div 
              className="absolute bottom-16 h-4"
              style={{
                left: -cameraOffset * 0.8,
                width: 2200,
                background: 'linear-gradient(90deg, hsl(30 20% 60%), hsl(25 25% 55%))',
                borderTop: '2px solid hsl(30 15% 50%)',
              }}
            />
            {/* Lamp posts */}
            {[200, 500, 850, 1200, 1600].map((x, i) => (
              <div
                key={`lamp-${i}`}
                className="absolute"
                style={{
                  left: x - cameraOffset * 0.6,
                  bottom: 100,
                }}
              >
                <div className="w-1 h-20 bg-gray-700 mx-auto" />
                <div 
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-5 rounded-b-lg"
                  style={{
                    background: 'hsl(45 80% 75%)',
                    boxShadow: '0 0 15px hsl(45 70% 60% / 0.4)',
                  }}
                />
              </div>
            ))}
            {/* Testudo statue (UMD mascot - terrapin) */}
            <div
              className="absolute"
              style={{
                left: 600 - cameraOffset * 0.4,
                bottom: 120,
              }}
            >
              {/* Pedestal */}
              <div 
                className="w-12 h-6 mx-auto rounded-t"
                style={{ background: 'hsl(0 0% 50%)' }}
              />
              {/* Turtle shell */}
              <div 
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-6 rounded-full"
                style={{ 
                  background: 'linear-gradient(180deg, hsl(35 60% 45%) 0%, hsl(25 50% 35%) 100%)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                }}
              />
              {/* Head */}
              <div 
                className="absolute -top-4 -left-1 w-3 h-3 rounded-full"
                style={{ background: 'hsl(100 30% 40%)' }}
              />
            </div>
          </>
        )}

        {level.theme === 'purpleline' && (
          <>
            {/* Rail tracks running across the bottom */}
            <div 
              className="absolute bottom-24 left-0 right-0 h-4"
              style={{
                background: 'hsl(0 0% 30%)',
                transform: `translateX(${-cameraOffset * 0.8}px)`,
                width: level.width,
              }}
            >
              {/* Rail ties (wooden planks) */}
              {Array.from({ length: Math.ceil(level.width / 40) }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-6 h-4"
                  style={{
                    left: i * 40,
                    background: 'hsl(25 40% 30%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                  }}
                />
              ))}
              {/* Metal rails */}
              <div className="absolute top-0.5 left-0 right-0 h-1 bg-gray-400" style={{ width: level.width }} />
              <div className="absolute bottom-0.5 left-0 right-0 h-1 bg-gray-400" style={{ width: level.width }} />
            </div>

            {/* Maryland flags */}
            {[150, 500, 900, 1300, 1700].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 40,
                }}
              >
                {/* Flag pole */}
                <div className="w-1 h-28 bg-gray-600 mx-auto" />
                {/* Maryland Flag */}
                <div 
                  className="absolute top-2 left-2 w-20 h-12 rounded-sm overflow-hidden grid grid-cols-2 grid-rows-2"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Top-left: Black and gold (Calvert) */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'hsl(45 90% 50%)' }} />
                    <div className="absolute top-0 left-0 w-full h-1/2" style={{ background: 'hsl(0 0% 10%)' }} />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rotate-45" style={{ background: 'hsl(45 90% 50%)' }} />
                  </div>
                  {/* Top-right: Red and white (Crossland) */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'white' }} />
                    <div className="absolute top-0 left-0 right-0 bottom-0">
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-600 -translate-x-1/2" />
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-600 -translate-y-1/2" />
                    </div>
                  </div>
                  {/* Bottom-left: Red and white (Crossland) */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'white' }} />
                    <div className="absolute top-0 left-0 right-0 bottom-0">
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-600 -translate-x-1/2" />
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-600 -translate-y-1/2" />
                    </div>
                  </div>
                  {/* Bottom-right: Black and gold (Calvert) */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0" style={{ background: 'hsl(45 90% 50%)' }} />
                    <div className="absolute top-0 left-0 w-full h-1/2" style={{ background: 'hsl(0 0% 10%)' }} />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rotate-45" style={{ background: 'hsl(45 90% 50%)' }} />
                  </div>
                </div>
              </div>
            ))}

            {/* Purple Line train cars in background */}
            {[200, 800, 1400].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset * 0.6,
                  top: 180,
                }}
              >
                <div 
                  className="w-24 h-14 rounded-lg relative"
                  style={{
                    background: 'linear-gradient(180deg, hsl(270 60% 45%) 0%, hsl(280 55% 35%) 100%)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Windows */}
                  <div className="absolute top-2 left-2 right-2 flex gap-1">
                    <div className="flex-1 h-4 bg-blue-200/60 rounded" />
                    <div className="flex-1 h-4 bg-blue-200/60 rounded" />
                    <div className="flex-1 h-4 bg-blue-200/60 rounded" />
                  </div>
                  {/* Purple Line stripe */}
                  <div className="absolute bottom-3 left-0 right-0 h-2 bg-purple-400" />
                  {/* Wheels */}
                  <div className="absolute -bottom-2 left-3 w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-500" />
                  <div className="absolute -bottom-2 right-3 w-4 h-4 rounded-full bg-gray-700 border-2 border-gray-500" />
                </div>
              </div>
            ))}

            {/* Overhead power lines */}
            <div 
              className="absolute top-20 left-0 h-0.5 bg-gray-500"
              style={{
                width: level.width,
                transform: `translateX(${-cameraOffset * 0.9}px)`,
              }}
            />
            {/* Power line poles */}
            {[100, 400, 700, 1000, 1300, 1600, 1900].map((x, i) => (
              <div
                key={i}
                className="absolute w-2 h-24 bg-gray-600"
                style={{
                  left: x - cameraOffset,
                  top: 20,
                }}
              >
                <div className="absolute -top-1 -left-2 w-6 h-2 bg-gray-500 rounded" />
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

        {level.theme === 'whitten' && (
          <>
            {/* Terracotta wall texture background */}
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 24px,
                    hsl(20 45% 50%) 24px,
                    hsl(20 45% 50%) 26px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    hsl(22 50% 55%),
                    hsl(22 50% 55%) 50px,
                    hsl(20 45% 50%) 50px,
                    hsl(20 45% 50%) 52px
                  )
                `,
                transform: `translateX(${-cameraOffset * 0.1}px)`,
              }}
            />
            {/* Washington DC Flags */}
            {[180, 550, 950, 1350, 1750, 2150].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 60,
                }}
              >
                {/* Flag pole */}
                <div className="w-1 h-32 bg-amber-800 mx-auto" />
                {/* DC Flag */}
                <div 
                  className="absolute top-2 left-2 w-16 h-10 rounded-sm overflow-hidden"
                  style={{
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Two red bars at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-3 flex">
                    <div className="flex-1 bg-red-600" />
                    <div className="w-1 bg-white" />
                    <div className="flex-1 bg-red-600" />
                  </div>
                  {/* Three red stars at top */}
                  <div className="absolute top-1 left-0 right-0 flex justify-center gap-1">
                    <div className="text-red-600 text-xs">★</div>
                    <div className="text-red-600 text-xs">★</div>
                    <div className="text-red-600 text-xs">★</div>
                  </div>
                </div>
              </div>
            ))}
            {/* Decorative arched windows */}
            {[350, 750, 1150, 1550, 1950].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 120,
                }}
              >
                <div 
                  className="w-12 h-20 rounded-t-full"
                  style={{
                    background: 'linear-gradient(180deg, hsl(200 60% 70%) 0%, hsl(200 50% 50%) 100%)',
                    border: '3px solid hsl(20 40% 40%)',
                    boxShadow: 'inset 0 0 15px rgba(255,255,255,0.3)',
                  }}
                >
                  {/* Window cross */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-900/60" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-amber-900/60 -translate-x-1/2" />
                </div>
              </div>
            ))}
            {/* Ornate ceiling molding */}
            <div 
              className="absolute top-0 left-0 right-0 h-4"
              style={{
                background: 'linear-gradient(180deg, hsl(25 45% 45%) 0%, hsl(22 40% 55%) 100%)',
                borderBottom: '2px solid hsl(20 35% 35%)',
              }}
            />
          </>
        )}

        {level.theme === 'donuts' && (
          <>
            {/* Dunkin-style pink/orange background pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, hsl(330 80% 70%) 0%, transparent 30%),
                  radial-gradient(circle at 80% 60%, hsl(25 90% 65%) 0%, transparent 25%),
                  radial-gradient(circle at 50% 80%, hsl(330 70% 75%) 0%, transparent 35%)
                `,
              }}
            />
            {/* Flying donuts */}
            {[
              { x: 120, y: 80, color: 'hsl(330 70% 65%)', sprinkles: true },
              { x: 350, y: 140, color: 'hsl(30 80% 55%)', sprinkles: false },
              { x: 600, y: 60, color: 'hsl(280 60% 65%)', sprinkles: true },
              { x: 850, y: 120, color: 'hsl(45 85% 60%)', sprinkles: false },
              { x: 1100, y: 70, color: 'hsl(330 75% 60%)', sprinkles: true },
              { x: 1400, y: 130, color: 'hsl(200 70% 60%)', sprinkles: false },
              { x: 1650, y: 90, color: 'hsl(25 80% 60%)', sprinkles: true },
              { x: 1900, y: 150, color: 'hsl(330 65% 70%)', sprinkles: false },
              { x: 2150, y: 80, color: 'hsl(120 50% 55%)', sprinkles: true },
              { x: 2400, y: 120, color: 'hsl(45 80% 55%)', sprinkles: true },
            ].map((donut, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: donut.x - cameraOffset * 0.5,
                  top: donut.y,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s',
                }}
              >
                {/* Donut body */}
                <div 
                  className="w-10 h-10 rounded-full relative"
                  style={{
                    background: donut.color,
                    boxShadow: `inset -3px -3px 8px rgba(0,0,0,0.2), 2px 4px 8px rgba(0,0,0,0.3)`,
                  }}
                >
                  {/* Donut hole */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{ background: 'hsl(330 70% 85%)' }}
                  />
                  {/* Sprinkles */}
                  {donut.sprinkles && (
                    <>
                      <div className="absolute top-1 left-2 w-1 h-2 bg-yellow-400 rotate-45 rounded-full" />
                      <div className="absolute top-2 right-1 w-1 h-2 bg-blue-400 -rotate-30 rounded-full" />
                      <div className="absolute bottom-2 left-1 w-1 h-2 bg-green-400 rotate-12 rounded-full" />
                      <div className="absolute bottom-1 right-2 w-1 h-2 bg-red-400 -rotate-45 rounded-full" />
                      <div className="absolute top-3 left-5 w-1 h-2 bg-purple-400 rotate-60 rounded-full" />
                    </>
                  )}
                </div>
              </div>
            ))}
            {/* Coffee cups with spilling coffee */}
            {[300, 750, 1200, 1650, 2100].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 420,
                }}
              >
                {/* Coffee cup */}
                <div 
                  className="w-8 h-12 rounded-b-lg relative"
                  style={{
                    background: 'linear-gradient(180deg, hsl(0 0% 95%) 0%, hsl(0 0% 85%) 100%)',
                    border: '2px solid hsl(0 0% 75%)',
                  }}
                >
                  {/* Cup handle */}
                  <div 
                    className="absolute -right-2 top-2 w-3 h-5 border-2 border-gray-400 rounded-r-full bg-transparent"
                  />
                  {/* Coffee inside */}
                  <div 
                    className="absolute top-1 left-0.5 right-0.5 h-4 rounded-t"
                    style={{ background: 'hsl(25 70% 25%)' }}
                  />
                  {/* Dunkin logo stripe */}
                  <div 
                    className="absolute top-5 left-0 right-0 h-2"
                    style={{ background: 'linear-gradient(90deg, hsl(330 80% 55%), hsl(25 90% 55%))' }}
                  />
                </div>
                {/* Spilling coffee */}
                <div 
                  className="absolute -left-4 top-2 w-6 h-16"
                  style={{
                    background: 'linear-gradient(180deg, hsl(25 70% 25%) 0%, hsl(25 60% 20% / 0.6) 50%, transparent 100%)',
                    borderRadius: '0 0 50% 50%',
                    transform: 'rotate(-20deg)',
                  }}
                />
                {/* Coffee splashes */}
                <div 
                  className="absolute -left-6 top-16 w-4 h-4 rounded-full"
                  style={{ background: 'hsl(25 65% 25% / 0.7)' }}
                />
                <div 
                  className="absolute -left-2 top-18 w-3 h-3 rounded-full"
                  style={{ background: 'hsl(25 60% 22% / 0.5)' }}
                />
              </div>
            ))}
            {/* Steam rising from cups */}
            {[300, 750, 1200, 1650, 2100].map((x, i) => (
              <div
                key={`steam-${i}`}
                className="absolute"
                style={{
                  left: x - cameraOffset + 2,
                  top: 400,
                }}
              >
                {[0, 1, 2].map((s) => (
                  <div
                    key={s}
                    className="absolute w-1 h-6 opacity-40 animate-pulse"
                    style={{
                      left: s * 4,
                      background: 'linear-gradient(180deg, transparent, hsl(0 0% 90%), transparent)',
                      animationDelay: `${s * 0.3}s`,
                      borderRadius: '50%',
                    }}
                  />
                ))}
              </div>
            ))}
            {/* "DONUTS" neon sign */}
            <div 
              className="absolute top-8"
              style={{ left: 400 - cameraOffset * 0.2 }}
            >
              <div 
                className="px-4 py-2 text-2xl font-bold tracking-wider"
                style={{
                  color: 'hsl(330 90% 65%)',
                  textShadow: '0 0 10px hsl(330 90% 65%), 0 0 20px hsl(330 80% 55%), 0 0 30px hsl(330 70% 50%)',
                  fontFamily: 'sans-serif',
                }}
              >
                DONUTS
              </div>
            </div>
            {/* Another sign further in level */}
            <div 
              className="absolute top-12"
              style={{ left: 1600 - cameraOffset * 0.2 }}
            >
              <div 
                className="px-3 py-1 text-xl font-bold"
                style={{
                  color: 'hsl(25 95% 60%)',
                  textShadow: '0 0 10px hsl(25 95% 60%), 0 0 20px hsl(25 85% 50%)',
                  fontFamily: 'sans-serif',
                }}
              >
                COFFEE ☕
              </div>
            </div>
          </>
        )}

        {level.theme === 'c2' && (
          <>
            {/* World map background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                transform: `translateX(${-cameraOffset * 0.05}px)`,
              }}
            >
              {/* Simplified continent shapes */}
              {/* North America */}
              <div 
                className="absolute"
                style={{
                  left: 80,
                  top: 80,
                  width: 120,
                  height: 100,
                  background: 'hsl(150 40% 35%)',
                  borderRadius: '30% 50% 40% 60%',
                  opacity: 0.6,
                }}
              />
              {/* South America */}
              <div 
                className="absolute"
                style={{
                  left: 130,
                  top: 200,
                  width: 60,
                  height: 120,
                  background: 'hsl(150 40% 35%)',
                  borderRadius: '50% 50% 60% 40%',
                  opacity: 0.6,
                }}
              />
              {/* Europe */}
              <div 
                className="absolute"
                style={{
                  left: 320,
                  top: 60,
                  width: 80,
                  height: 60,
                  background: 'hsl(150 40% 35%)',
                  borderRadius: '40% 60% 50% 30%',
                  opacity: 0.6,
                }}
              />
              {/* Africa */}
              <div 
                className="absolute"
                style={{
                  left: 310,
                  top: 140,
                  width: 80,
                  height: 120,
                  background: 'hsl(150 40% 35%)',
                  borderRadius: '50% 50% 40% 60%',
                  opacity: 0.6,
                }}
              />
              {/* Asia */}
              <div 
                className="absolute"
                style={{
                  left: 420,
                  top: 50,
                  width: 180,
                  height: 130,
                  background: 'hsl(150 40% 35%)',
                  borderRadius: '30% 60% 50% 40%',
                  opacity: 0.6,
                }}
              />
              {/* Australia */}
              <div 
                className="absolute"
                style={{
                  left: 550,
                  top: 240,
                  width: 70,
                  height: 50,
                  background: 'hsl(150 40% 35%)',
                  borderRadius: '40% 50% 60% 50%',
                  opacity: 0.6,
                }}
              />
            </div>
            {/* Undersea cable lines */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-40"
              style={{ transform: `translateX(${-cameraOffset * 0.1}px)` }}
            >
              {/* Trans-Atlantic cable */}
              <path 
                d="M 200 120 Q 280 180 350 100" 
                stroke="hsl(180 80% 50%)" 
                strokeWidth="2" 
                fill="none"
                className="animate-pulse"
              />
              {/* Trans-Pacific cable */}
              <path 
                d="M 180 140 Q 50 300 600 180" 
                stroke="hsl(200 70% 55%)" 
                strokeWidth="2" 
                fill="none"
                style={{ animationDelay: '0.5s' }}
                className="animate-pulse"
              />
              {/* Europe to Asia */}
              <path 
                d="M 380 80 Q 450 120 520 90" 
                stroke="hsl(280 60% 55%)" 
                strokeWidth="2" 
                fill="none"
                style={{ animationDelay: '1s' }}
                className="animate-pulse"
              />
              {/* Africa to Asia */}
              <path 
                d="M 360 200 Q 420 220 480 150" 
                stroke="hsl(45 80% 55%)" 
                strokeWidth="2" 
                fill="none"
                style={{ animationDelay: '1.5s' }}
                className="animate-pulse"
              />
              {/* Asia to Australia */}
              <path 
                d="M 520 170 Q 540 220 570 250" 
                stroke="hsl(330 70% 55%)" 
                strokeWidth="2" 
                fill="none"
                style={{ animationDelay: '2s' }}
                className="animate-pulse"
              />
            </svg>
            {/* Data nodes / connection points */}
            {[
              { x: 200, y: 120 }, { x: 350, y: 100 }, { x: 180, y: 140 },
              { x: 380, y: 80 }, { x: 520, y: 90 }, { x: 360, y: 200 },
              { x: 480, y: 150 }, { x: 570, y: 250 }, { x: 130, y: 250 },
            ].map((node, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full animate-pulse"
                style={{
                  left: node.x - cameraOffset * 0.1,
                  top: node.y,
                  background: 'hsl(180 90% 60%)',
                  boxShadow: '0 0 8px hsl(180 90% 60%), 0 0 16px hsl(180 80% 50%)',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
            {/* Server racks in foreground */}
            {[150, 450, 800, 1150, 1500, 1850, 2200, 2550].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 380,
                }}
              >
                {/* Server rack */}
                <div 
                  className="w-14 h-28 rounded-t"
                  style={{
                    background: 'linear-gradient(180deg, hsl(220 20% 25%) 0%, hsl(220 25% 18%) 100%)',
                    border: '2px solid hsl(220 15% 35%)',
                  }}
                >
                  {/* Server units */}
                  {[0, 1, 2, 3, 4].map((u) => (
                    <div
                      key={u}
                      className="mx-1 my-1 h-4 rounded-sm flex items-center gap-0.5 px-1"
                      style={{ background: 'hsl(220 30% 15%)' }}
                    >
                      {/* Blinking LEDs */}
                      <div 
                        className="w-1 h-1 rounded-full animate-pulse"
                        style={{ 
                          background: u % 2 === 0 ? 'hsl(120 80% 50%)' : 'hsl(45 90% 50%)',
                          animationDelay: `${u * 0.3 + i * 0.1}s`,
                        }}
                      />
                      <div 
                        className="w-1 h-1 rounded-full animate-pulse"
                        style={{ 
                          background: 'hsl(180 70% 50%)',
                          animationDelay: `${u * 0.2 + i * 0.15}s`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* Floating data packets */}
            {[100, 350, 650, 950, 1250, 1550, 1850, 2150, 2450].map((x, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: x - cameraOffset * 0.6,
                  top: 60 + (i % 3) * 40,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: '3s',
                }}
              >
                <div 
                  className="w-6 h-4 rounded-sm flex items-center justify-center text-xs font-mono"
                  style={{
                    background: `hsl(${180 + i * 20} 70% 45%)`,
                    color: 'white',
                    boxShadow: `0 0 10px hsl(${180 + i * 20} 70% 45% / 0.5)`,
                  }}
                >
                  {['01', '10', '11', '00'][i % 4]}
                </div>
              </div>
            ))}
            {/* GWCC Parks sign */}
            <div 
              className="absolute top-6"
              style={{ left: 300 - cameraOffset * 0.15 }}
            >
              <div 
                className="px-4 py-2 text-xl font-bold tracking-widest"
                style={{
                  color: 'hsl(180 90% 65%)',
                  textShadow: '0 0 10px hsl(180 90% 65%), 0 0 20px hsl(180 80% 50%), 0 0 30px hsl(180 70% 45%)',
                  fontFamily: 'monospace',
                }}
              >
                C2 NETWORK HUB
              </div>
            </div>
            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(180 50% 50%) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(180 50% 50%) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: `translateX(${-cameraOffset * 0.02}px)`,
              }}
            />
          </>
        )}

        {level.theme === 'skyline' && (
          <>
            {/* Bright sky with sun */}
            <div 
              className="absolute w-16 h-16 rounded-full"
              style={{
                left: 650 - cameraOffset * 0.05,
                top: 40,
                background: 'radial-gradient(circle, hsl(50 100% 85%) 0%, hsl(45 90% 75%) 60%, transparent 100%)',
                boxShadow: '0 0 40px hsl(50 90% 70% / 0.5)',
              }}
            />
            {/* Simple clouds */}
            {[100, 350, 600, 900].map((x, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-60"
                style={{
                  left: x - cameraOffset * 0.1,
                  top: 60 + (i % 3) * 20,
                  width: 60 + (i % 2) * 20,
                  height: 20,
                  background: 'hsl(0 0% 100%)',
                }}
              />
            ))}
            {/* Distant city silhouette - simplified */}
            <div 
              className="absolute bottom-20 left-0 right-0"
              style={{ transform: `translateX(${-cameraOffset * 0.1}px)` }}
            >
              {[
                { x: 50, w: 30, h: 80 },
                { x: 100, w: 50, h: 120 },
                { x: 180, w: 35, h: 90 },
                { x: 250, w: 60, h: 150 },
                { x: 350, w: 40, h: 100 },
                { x: 420, w: 55, h: 130 },
                { x: 510, w: 45, h: 110 },
                { x: 600, w: 70, h: 160 },
                { x: 700, w: 35, h: 85 },
                { x: 780, w: 50, h: 120 },
              ].map((b, i) => (
                <div
                  key={i}
                  className="absolute bottom-0"
                  style={{
                    left: b.x,
                    width: b.w,
                    height: b.h,
                    background: 'hsl(210 30% 70%)',
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              ))}
            </div>
            {/* Penthouse floor pattern */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-8"
              style={{
                background: 'linear-gradient(90deg, hsl(30 20% 85%) 0%, hsl(35 25% 80%) 50%, hsl(30 20% 85%) 100%)',
              }}
            />
          </>
        )}

        {level.theme === 'metro' && (
          <>
            {/* Tunnel arch overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 120% 80% at 50% 0%, transparent 60%, hsl(220 20% 8%) 100%)
                `,
              }}
            />
            {/* Tunnel segments */}
            {[0, 400, 800, 1200, 1600, 2000, 2400, 2800].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 0,
                  width: 400,
                  height: '100%',
                }}
              >
                {/* Tunnel arch lines */}
                <div 
                  className="absolute top-0 left-0 right-0 h-full border-l-4 border-r-4 opacity-20"
                  style={{ borderColor: 'hsl(220 15% 25%)' }}
                />
                {/* Support beams */}
                <div 
                  className="absolute top-0 left-1/2 w-2 h-full -translate-x-1/2 opacity-10"
                  style={{ background: 'hsl(220 10% 30%)' }}
                />
              </div>
            ))}
            {/* Track rails */}
            <div 
              className="absolute bottom-20 left-0 right-0 h-2"
              style={{
                background: 'linear-gradient(90deg, hsl(220 15% 25%) 0%, hsl(220 15% 25%) 48%, hsl(220 10% 15%) 48%, hsl(220 10% 15%) 52%, hsl(220 15% 25%) 52%, hsl(220 15% 25%) 100%)',
                transform: `translateX(${-cameraOffset}px)`,
              }}
            />
            {/* Rail ties */}
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-16 w-12 h-3"
                style={{
                  left: i * 40 - cameraOffset,
                  background: 'hsl(25 30% 25%)',
                  borderRadius: '2px',
                }}
              />
            ))}
            {/* Platform edge warning strips */}
            {[0, 450, 850, 1300, 1700, 2150, 2550, 3000].map((x, i) => (
              <div
                key={i}
                className="absolute bottom-20 h-2"
                style={{
                  left: x - cameraOffset,
                  width: i === 7 ? 200 : (i % 2 === 0 ? 400 : 350),
                  background: 'repeating-linear-gradient(90deg, hsl(45 90% 55%) 0px, hsl(45 90% 55%) 20px, hsl(220 20% 15%) 20px, hsl(220 20% 15%) 40px)',
                }}
              />
            ))}
            {/* Station signs */}
            {[200, 1000, 1900, 2750].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 60,
                }}
              >
                <div 
                  className="px-4 py-2 rounded"
                  style={{
                    background: 'hsl(220 20% 20%)',
                    border: '2px solid hsl(220 15% 35%)',
                  }}
                >
                  <div 
                    className="text-sm font-bold tracking-wide"
                    style={{ color: 'hsl(0 0% 90%)' }}
                  >
                    {['METRO CENTER', 'GALLERY PL', 'UNION STATION', 'CHINATOWN'][i]}
                  </div>
                </div>
                {/* Metro line indicators */}
                <div className="flex gap-1 mt-1 justify-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">R</div>
                  <div className="w-4 h-4 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">O</div>
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">B</div>
                </div>
              </div>
            ))}
            {/* Pillars */}
            {[350, 750, 1200, 1650, 2100, 2500, 2950].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 150,
                }}
              >
                <div 
                  className="w-8 h-80"
                  style={{
                    background: 'linear-gradient(90deg, hsl(220 15% 28%) 0%, hsl(220 15% 22%) 50%, hsl(220 15% 28%) 100%)',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
            {/* Ceiling lights */}
            {[100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500, 2700, 2900].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 30,
                }}
              >
                <div 
                  className="w-20 h-3 rounded-b"
                  style={{
                    background: 'linear-gradient(180deg, hsl(45 70% 75%) 0%, hsl(45 60% 65%) 100%)',
                    boxShadow: '0 5px 20px hsl(45 60% 60% / 0.3), 0 10px 40px hsl(45 50% 50% / 0.15)',
                  }}
                />
              </div>
            ))}
            {/* Train in tunnel (background decoration) */}
            <div 
              className="absolute"
              style={{
                left: 1400 - cameraOffset * 0.3,
                top: 280,
                opacity: 0.3,
              }}
            >
              {/* Train cars */}
              {[0, 1, 2].map((car) => (
                <div
                  key={car}
                  className="inline-block mx-0.5"
                  style={{
                    width: 60,
                    height: 35,
                    background: 'linear-gradient(180deg, hsl(220 20% 40%) 0%, hsl(220 25% 30%) 100%)',
                    borderRadius: '4px',
                  }}
                >
                  {/* Windows */}
                  <div className="flex gap-1 px-1 pt-1">
                    {[0, 1, 2, 3].map((w) => (
                      <div
                        key={w}
                        className="w-3 h-4 rounded-sm"
                        style={{ background: 'hsl(45 50% 70%)' }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Ventilation grates on ceiling */}
            {[250, 650, 1050, 1450, 1850, 2250, 2650, 3050].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 10,
                }}
              >
                <div 
                  className="w-16 h-4 flex gap-0.5"
                >
                  {Array.from({ length: 8 }).map((_, j) => (
                    <div
                      key={j}
                      className="flex-1 h-full"
                      style={{ background: 'hsl(220 15% 20%)' }}
                    />
                  ))}
                </div>
              </div>
            ))}
            {/* Emergency exit signs */}
            {[600, 1500, 2400].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 100,
                }}
              >
                <div 
                  className="px-2 py-1 text-xs font-bold rounded"
                  style={{
                    background: 'hsl(120 70% 35%)',
                    color: 'white',
                    boxShadow: '0 0 10px hsl(120 70% 40% / 0.5)',
                  }}
                >
                  EXIT →
                </div>
              </div>
            ))}
          </>
        )}

        {level.theme === 'catwalk' && (
          <>
            {/* Dramatic dark background with subtle purple hue */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(ellipse at 50% 100%, hsl(280 40% 20%) 0%, transparent 70%)',
              }}
            />
            {/* Spotlights from above */}
            {[150, 450, 750, 1050, 1350, 1650, 1950, 2250, 2550, 2850, 3150].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 0,
                }}
              >
                {/* Spotlight beam */}
                <div 
                  className="w-40 h-full opacity-15"
                  style={{
                    background: `linear-gradient(180deg, hsl(${[320, 280, 45, 180, 320, 280, 45, 180, 320, 280, 45][i]} 70% 70%) 0%, transparent 80%)`,
                    clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
                  }}
                />
                {/* Light source */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 rounded-b-full"
                  style={{
                    background: `hsl(${[320, 280, 45, 180, 320, 280, 45, 180, 320, 280, 45][i]} 80% 60%)`,
                    boxShadow: `0 0 20px hsl(${[320, 280, 45, 180, 320, 280, 45, 180, 320, 280, 45][i]} 80% 60%)`,
                  }}
                />
              </div>
            ))}
            {/* Runway strip lights */}
            {Array.from({ length: 85 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-pulse"
                style={{
                  left: i * 40 + 20 - cameraOffset,
                  top: 510,
                  background: i % 2 === 0 ? 'hsl(320 80% 60%)' : 'hsl(45 90% 70%)',
                  boxShadow: `0 0 8px ${i % 2 === 0 ? 'hsl(320 80% 60%)' : 'hsl(45 90% 70%)'}`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
            {/* Camera flash effects */}
            {[300, 700, 1100, 1500, 1900, 2300, 2700, 3100].map((x, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: x - cameraOffset,
                  top: 350 + (i % 2) * 50,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s',
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: 'white',
                    boxShadow: '0 0 15px white, 0 0 30px white',
                  }}
                />
              </div>
            ))}
            {/* Fashion show audience silhouettes */}
            {[50, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  bottom: 85,
                }}
              >
                {/* Head */}
                <div 
                  className="w-4 h-4 rounded-full mx-auto"
                  style={{ background: 'hsl(0 0% 15%)' }}
                />
                {/* Body */}
                <div 
                  className="w-6 h-8 rounded-t-lg -mt-1"
                  style={{ background: 'hsl(0 0% 12%)' }}
                />
              </div>
            ))}
            {/* CATWALK neon sign */}
            <div 
              className="absolute top-10"
              style={{ left: 400 - cameraOffset * 0.1 }}
            >
              <div 
                className="px-6 py-3 text-3xl font-bold tracking-widest"
                style={{
                  color: 'hsl(320 90% 65%)',
                  textShadow: '0 0 10px hsl(320 90% 65%), 0 0 20px hsl(320 80% 55%), 0 0 40px hsl(320 70% 50%)',
                  fontFamily: 'sans-serif',
                }}
              >
                CATWALK
              </div>
            </div>
            {/* Second sign */}
            <div 
              className="absolute top-16"
              style={{ left: 1800 - cameraOffset * 0.1 }}
            >
              <div 
                className="px-4 py-2 text-xl font-bold tracking-wide"
                style={{
                  color: 'hsl(45 90% 65%)',
                  textShadow: '0 0 10px hsl(45 90% 65%), 0 0 20px hsl(45 80% 55%)',
                  fontFamily: 'sans-serif',
                }}
              >
                ★ FASHION WEEK ★
              </div>
            </div>
            {/* Hanging fabric decorations */}
            {[250, 750, 1250, 1750, 2250, 2750, 3250].map((x, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: x - cameraOffset,
                  top: 20,
                }}
              >
                <div 
                  className="w-1 h-16"
                  style={{ 
                    background: `linear-gradient(180deg, hsl(${[320, 280, 45, 180, 320, 280, 45][i]} 60% 50%) 0%, transparent 100%)`,
                  }}
                />
              </div>
            ))}
            {/* Glitter particles */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  left: (i * 85 + 30) - cameraOffset * 0.4,
                  top: 50 + (i % 5) * 60,
                  background: ['hsl(320 80% 70%)', 'hsl(45 90% 75%)', 'hsl(280 70% 70%)', 'white'][i % 4],
                  boxShadow: `0 0 4px ${['hsl(320 80% 70%)', 'hsl(45 90% 75%)', 'hsl(280 70% 70%)', 'white'][i % 4]}`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.6,
                }}
              />
            ))}

            {/* Celebration Fireworks */}
            {[200, 600, 1000, 1400, 1800, 2200, 2600, 3000].map((x, i) => (
              <div
                key={`firework-${i}`}
                className="absolute"
                style={{
                  left: x - cameraOffset * 0.3,
                  top: 60 + (i % 3) * 40,
                }}
              >
                {/* Firework burst center */}
                <div
                  className="absolute w-4 h-4 rounded-full animate-ping"
                  style={{
                    background: ['hsl(320 90% 60%)', 'hsl(45 100% 55%)', 'hsl(200 90% 60%)', 'hsl(280 85% 60%)', 'hsl(160 80% 55%)', 'hsl(350 90% 55%)', 'hsl(30 100% 60%)', 'hsl(270 90% 65%)'][i],
                    boxShadow: `0 0 20px ${['hsl(320 90% 60%)', 'hsl(45 100% 55%)', 'hsl(200 90% 60%)', 'hsl(280 85% 60%)', 'hsl(160 80% 55%)', 'hsl(350 90% 55%)', 'hsl(30 100% 60%)', 'hsl(270 90% 65%)'][i]}`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: '1.5s',
                  }}
                />
                {/* Firework rays/sparks */}
                {Array.from({ length: 12 }).map((_, j) => (
                  <div
                    key={j}
                    className="absolute animate-pulse"
                    style={{
                      width: '2px',
                      height: 12 + (j % 3) * 6,
                      background: `linear-gradient(to top, ${['hsl(320 90% 60%)', 'hsl(45 100% 55%)', 'hsl(200 90% 60%)', 'hsl(280 85% 60%)', 'hsl(160 80% 55%)', 'hsl(350 90% 55%)', 'hsl(30 100% 60%)', 'hsl(270 90% 65%)'][i]}, transparent)`,
                      transform: `rotate(${j * 30}deg)`,
                      transformOrigin: 'bottom center',
                      left: '7px',
                      top: '2px',
                      animationDelay: `${i * 0.4 + j * 0.05}s`,
                      opacity: 0.9,
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Blast Effects - Large sparkle bursts */}
            {[350, 900, 1500, 2100, 2700].map((x, i) => (
              <div
                key={`blast-${i}`}
                className="absolute"
                style={{
                  left: x - cameraOffset * 0.5,
                  top: 100 + (i % 2) * 60,
                }}
              >
                {/* Blast core */}
                <div
                  className="absolute w-8 h-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${['hsl(45 100% 70%)', 'hsl(320 90% 70%)', 'hsl(180 80% 65%)', 'hsl(280 85% 70%)', 'hsl(30 100% 65%)'][i]} 0%, transparent 70%)`,
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                    animationDelay: `${i * 0.6}s`,
                  }}
                />
                {/* Blast sparkle particles */}
                {Array.from({ length: 8 }).map((_, j) => {
                  const angle = (j / 8) * Math.PI * 2;
                  const radius = 20 + (j % 2) * 10;
                  return (
                    <div
                      key={j}
                      className="absolute w-2 h-2 rounded-full animate-pulse"
                      style={{
                        left: Math.cos(angle) * radius + 12,
                        top: Math.sin(angle) * radius + 12,
                        background: ['hsl(45 100% 75%)', 'hsl(320 90% 75%)', 'white', 'hsl(280 85% 75%)'][j % 4],
                        boxShadow: `0 0 8px ${['hsl(45 100% 75%)', 'hsl(320 90% 75%)', 'white', 'hsl(280 85% 75%)'][j % 4]}`,
                        animationDelay: `${i * 0.6 + j * 0.1}s`,
                        animationDuration: '0.8s',
                      }}
                    />
                  );
                })}
              </div>
            ))}

            {/* Shooting stars / Streak effects */}
            {[100, 500, 1100, 1700, 2300, 2900].map((x, i) => (
              <div
                key={`streak-${i}`}
                className="absolute overflow-hidden"
                style={{
                  left: x - cameraOffset * 0.2,
                  top: 30 + (i % 4) * 35,
                  width: '60px',
                  height: '4px',
                  transform: `rotate(${15 + i * 5}deg)`,
                }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${['hsl(45 100% 70%)', 'hsl(320 90% 65%)', 'hsl(200 85% 65%)', 'white', 'hsl(280 80% 65%)', 'hsl(160 75% 60%)'][i]})`,
                    animation: 'slide-in-right 1.5s ease-out infinite',
                    animationDelay: `${i * 0.8}s`,
                  }}
                />
              </div>
            ))}

            {/* Confetti-like falling sparkles */}
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={`confetti-${i}`}
                className="absolute"
                style={{
                  left: (i * 140 + 50) - cameraOffset * 0.6,
                  top: 20 + (i % 8) * 50,
                  animation: 'fade-in 2s ease-in-out infinite alternate',
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <div
                  className="rounded-sm"
                  style={{
                    width: 4 + (i % 3) * 2,
                    height: 4 + (i % 2) * 3,
                    background: ['hsl(320 90% 65%)', 'hsl(45 100% 60%)', 'hsl(200 85% 60%)', 'hsl(280 80% 65%)', 'hsl(160 75% 55%)', 'white'][i % 6],
                    transform: `rotate(${i * 25}deg)`,
                    boxShadow: `0 0 6px ${['hsl(320 90% 65%)', 'hsl(45 100% 60%)', 'hsl(200 85% 60%)', 'hsl(280 80% 65%)', 'hsl(160 75% 55%)', 'white'][i % 6]}`,
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
      </div>
    </div>
  );
};
