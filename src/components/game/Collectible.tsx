import { motion } from 'framer-motion';
import { Collectible as CollectibleType } from '@/types/game';

interface CollectibleProps {
  collectible: CollectibleType;
  cameraOffset: number;
}

export const Collectible = ({ collectible, cameraOffset }: CollectibleProps) => {
  if (collectible.collected) return null;

  const baseStyle = {
    left: collectible.x - cameraOffset,
    top: collectible.y,
    width: 30,
    height: 30,
  };

  if (collectible.type === 'coin') {
    return (
      <motion.div
        className="absolute z-10"
        style={baseStyle}
        animate={{
          y: [0, -5, 0],
          rotateY: [0, 360],
        }}
        transition={{
          y: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 1.5, repeat: Infinity, ease: "linear" },
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-game-coin flex items-center justify-center"
          style={{
            boxShadow: '0 0 10px hsl(45 95% 60% / 0.6), inset -2px -2px 0 rgba(0,0,0,0.2)',
            border: '2px solid hsl(40 80% 45%)',
          }}
        >
          <span className="font-display font-bold text-amber-800 text-sm">$</span>
        </div>
      </motion.div>
    );
  }

  if (collectible.type === 'heart') {
    return (
      <motion.div
        className="absolute z-10"
        style={baseStyle}
        animate={{
          scale: [1, 1.15, 1],
          y: [0, -3, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div 
          className="w-full h-full bg-game-heart"
          style={{
            clipPath: 'path("M15 5 C10 0, 0 0, 0 10 C0 18, 15 28, 15 28 C15 28, 30 18, 30 10 C30 0, 20 0, 15 5 Z")',
            boxShadow: '0 0 15px hsl(350 85% 60% / 0.5)',
          }}
        />
      </motion.div>
    );
  }

  if (collectible.type === 'star') {
    return (
      <motion.div
        className="absolute z-10"
        style={baseStyle}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{
            filter: 'drop-shadow(0 0 8px hsl(45 95% 60% / 0.7))',
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-game-coin">
            <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 15.77L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" />
          </svg>
        </div>
      </motion.div>
    );
  }

  return null;
};
