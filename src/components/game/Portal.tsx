import { motion } from 'framer-motion';
import { Portal as PortalType } from '@/types/game';

interface PortalProps {
  portal: PortalType;
  cameraOffset: number;
}

export const Portal = ({ portal, cameraOffset }: PortalProps) => {
  return (
    <motion.div
      className="absolute z-5"
      style={{
        left: portal.x - cameraOffset,
        top: portal.y,
        width: 60,
        height: 80,
      }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-game-portal opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: 'blur(10px)',
        }}
      />
      
      {/* Portal frame */}
      <div 
        className="absolute inset-2 rounded-full border-4 border-game-portal overflow-hidden"
        style={{
          boxShadow: '0 0 20px hsl(280 80% 60% / 0.6), inset 0 0 15px hsl(280 80% 60% / 0.4)',
        }}
      >
        {/* Swirl effect */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-conic from-purple-500 via-pink-500 to-purple-500 opacity-60" 
            style={{
              background: 'conic-gradient(from 0deg, hsl(280 80% 50%), hsl(320 70% 60%), hsl(280 80% 50%))',
            }}
          />
        </motion.div>
        
        {/* Center glow */}
        <div className="absolute inset-4 rounded-full bg-white/30" />
        
        {/* Sparkles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        />
      </div>
    </motion.div>
  );
};
