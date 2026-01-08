import { motion } from 'framer-motion';
import { Enemy as EnemyType } from '@/types/game';

interface EnemyProps {
  enemy: EnemyType;
  cameraOffset: number;
}

export const Enemy = ({ enemy, cameraOffset }: EnemyProps) => {
  if (enemy.type === 'slime') {
    return (
      <motion.div
        className="absolute z-10"
        style={{
          left: enemy.x - cameraOffset,
          top: enemy.y,
          width: enemy.width,
          height: enemy.height,
        }}
        animate={{
          scaleY: [1, 0.85, 1],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div 
          className="w-full h-full rounded-t-full rounded-b-lg bg-game-enemy relative"
          style={{
            boxShadow: 'inset -3px -3px 0 rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {/* Eyes */}
          <div className="absolute top-2 left-0 right-0 flex justify-center gap-2">
            <div className="w-2.5 h-3 bg-card rounded-full flex items-center justify-center">
              <motion.div 
                className="w-1.5 h-2 bg-foreground rounded-full"
                animate={{ x: enemy.direction === 1 ? 0.5 : -0.5 }}
              />
            </div>
            <div className="w-2.5 h-3 bg-card rounded-full flex items-center justify-center">
              <motion.div 
                className="w-1.5 h-2 bg-foreground rounded-full"
                animate={{ x: enemy.direction === 1 ? 0.5 : -0.5 }}
              />
            </div>
          </div>
          
          {/* Angry eyebrows */}
          <div className="absolute top-1 left-0 right-0 flex justify-center gap-3">
            <div className="w-3 h-1 bg-foreground/60 -rotate-12 rounded" />
            <div className="w-3 h-1 bg-foreground/60 rotate-12 rounded" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (enemy.type === 'bat') {
    return (
      <motion.div
        className="absolute z-10"
        style={{
          left: enemy.x - cameraOffset,
          top: enemy.y,
          width: enemy.width,
          height: enemy.height,
        }}
        animate={{
          y: [0, -8, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Wings */}
        <motion.div 
          className="absolute top-1/2 -left-3 w-4 h-6 bg-purple-700 rounded-tl-full"
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: 0.15, repeat: Infinity }}
          style={{ transformOrigin: 'right center' }}
        />
        <motion.div 
          className="absolute top-1/2 -right-3 w-4 h-6 bg-purple-700 rounded-tr-full"
          animate={{ rotate: [20, -20, 20] }}
          transition={{ duration: 0.15, repeat: Infinity }}
          style={{ transformOrigin: 'left center' }}
        />
        
        {/* Body */}
        <div 
          className="w-full h-full rounded-full bg-purple-800 relative"
          style={{
            boxShadow: 'inset -2px -2px 0 rgba(0,0,0,0.3)',
          }}
        >
          {/* Ears */}
          <div className="absolute -top-2 left-1 w-2 h-3 bg-purple-800 rounded-t-full" />
          <div className="absolute -top-2 right-1 w-2 h-3 bg-purple-800 rounded-t-full" />
          
          {/* Eyes */}
          <div className="absolute top-3 left-0 right-0 flex justify-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
};
