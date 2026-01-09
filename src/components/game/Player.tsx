import { motion } from 'framer-motion';
import { CharacterType, PlayerState } from '@/types/game';

interface PlayerProps {
  player: PlayerState;
  characterType: CharacterType;
  cameraOffset: number;
}

export const Player = ({ player, characterType, cameraOffset }: PlayerProps) => {
  const isHywon = characterType === 'hywon';
  const isLou = characterType === 'lou';
  const isTeri = characterType === 'teri';
  
  const getBodyColor = () => {
    if (isHywon) return 'bg-primary';
    if (isLou) return 'bg-foreground';
    if (isTeri) return 'bg-destructive';
    return 'bg-accent';
  };

  const getBlushColor = () => {
    if (isHywon) return 'bg-pink-300';
    if (isLou) return 'bg-green-700';
    if (isTeri) return 'bg-rose-300';
    return 'bg-orange-300';
  };
  
  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: player.position.x - cameraOffset,
        top: player.position.y,
        width: 40,
        height: 50,
      }}
      animate={{
        scaleX: player.facingRight ? 1 : -1,
        y: player.isJumping ? -5 : 0,
      }}
      transition={{ duration: 0.1 }}
    >
      {/* Character body */}
      <div className={`relative w-full h-full ${player.isInvulnerable ? 'animate-pulse opacity-70' : ''}`}>
        {/* Main body */}
        <div 
          className={`absolute inset-0 rounded-t-full rounded-b-lg ${getBodyColor()} overflow-hidden`}
          style={{
            boxShadow: 'inset -4px -4px 0 rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {/* Lou's camo pattern */}
          {isLou && (
            <>
              <div className="absolute top-2 left-1 w-4 h-3 rounded-full transform -rotate-12"
                style={{ backgroundColor: '#556B2F' }} />
              <div className="absolute top-6 right-0 w-5 h-4 rounded-full transform rotate-25"
                style={{ backgroundColor: '#6B8E23' }} />
              <div className="absolute top-12 left-2 w-6 h-3 rounded-full transform rotate-15"
                style={{ backgroundColor: '#4A5D23' }} />
              <div className="absolute top-4 right-2 w-3 h-5 rounded-full transform -rotate-30"
                style={{ backgroundColor: '#3D4F1F' }} />
              <div className="absolute top-9 left-0 w-4 h-3 rounded-full transform rotate-45"
                style={{ backgroundColor: '#556B2F' }} />
              <div className="absolute bottom-4 right-1 w-5 h-3 rounded-full transform -rotate-20"
                style={{ backgroundColor: '#6B8E23' }} />
            </>
          )}
        </div>
        
        {/* Face */}
        <div className="absolute top-2 left-0 right-0 flex flex-col items-center">
          {/* Eyes */}
          <div className="flex gap-2 mb-1">
            <motion.div 
              className="w-3 h-3.5 bg-card rounded-full flex items-center justify-center"
              animate={{ scaleY: player.isJumping ? 1.2 : 1 }}
            >
              <div className="w-1.5 h-2 bg-foreground rounded-full" />
            </motion.div>
            <motion.div 
              className="w-3 h-3.5 bg-card rounded-full flex items-center justify-center"
              animate={{ scaleY: player.isJumping ? 1.2 : 1 }}
            >
              <div className="w-1.5 h-2 bg-foreground rounded-full" />
            </motion.div>
          </div>
          
          {/* Cheeks (blush) */}
          <div className="flex gap-6 -mt-0.5">
            <div className={`w-2 h-1 rounded-full ${getBlushColor()} opacity-60`} />
            <div className={`w-2 h-1 rounded-full ${getBlushColor()} opacity-60`} />
          </div>
          
          {/* Smile */}
          <div 
            className="w-4 h-2 border-b-2 border-foreground/40 rounded-b-full mt-1"
          />
        </div>

        {/* Character accessories: Hywon's bow / Junnior's flame / Lou's wings / Teri's claws */}
        {isHywon ? (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <div className="w-6 h-3 bg-secondary rounded-full" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rounded-full" />
          </div>
        ) : isLou ? (
          <>
            {/* Lou's military helmet */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-11 h-5 bg-olive-700 rounded-t-full"
              style={{ backgroundColor: '#556B2F' }} />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-2 bg-olive-600 rounded-sm"
              style={{ backgroundColor: '#6B8E23' }} />
            {/* Helmet strap */}
            <div className="absolute top-4 left-0 w-1 h-3 rounded-full"
              style={{ backgroundColor: '#3d3d3d' }} />
            <div className="absolute top-4 right-0 w-1 h-3 rounded-full"
              style={{ backgroundColor: '#3d3d3d' }} />
            
            {/* Dog tags */}
            <motion.div 
              className="absolute top-10 left-1/2 -translate-x-1/2"
              animate={{ rotate: player.isMoving ? [-5, 5, -5] : 0 }}
              transition={{ duration: 0.2, repeat: player.isMoving ? Infinity : 0 }}
            >
              <div className="w-1 h-3 bg-gray-400 rounded-sm" />
              <div className="w-3 h-4 bg-gray-300 rounded-sm border border-gray-400" />
            </motion.div>

            {/* Parachute pack on back (visible when jumping) */}
            {player.isJumping && player.velocity.vy > 0 && (
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-16 h-10 rounded-t-full"
                  style={{ backgroundColor: '#556B2F', opacity: 0.9 }} />
                {/* Parachute lines */}
                <div className="absolute bottom-0 left-2 w-0.5 h-6 bg-gray-600 transform -rotate-12" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gray-600" />
                <div className="absolute bottom-0 right-2 w-0.5 h-6 bg-gray-600 transform rotate-12" />
              </motion.div>
            )}
          </>
        ) : isTeri ? (
          <>
            {/* Teri's climbing claws on hands */}
            <motion.div 
              className="absolute top-6 -left-2"
              animate={player.isMoving ? { rotate: [-10, 10, -10] } : { rotate: 0 }}
              transition={{ duration: 0.2, repeat: player.isMoving ? Infinity : 0 }}
            >
              <div className="flex flex-col gap-0.5">
                <div className="w-3 h-1 bg-slate-400 rounded-full transform -rotate-45" />
                <div className="w-3 h-1 bg-slate-400 rounded-full transform -rotate-45" />
                <div className="w-3 h-1 bg-slate-400 rounded-full transform -rotate-45" />
              </div>
            </motion.div>
            <motion.div 
              className="absolute top-6 -right-2"
              animate={player.isMoving ? { rotate: [10, -10, 10] } : { rotate: 0 }}
              transition={{ duration: 0.2, repeat: player.isMoving ? Infinity : 0 }}
            >
              <div className="flex flex-col gap-0.5">
                <div className="w-3 h-1 bg-slate-400 rounded-full transform rotate-45" />
                <div className="w-3 h-1 bg-slate-400 rounded-full transform rotate-45" />
                <div className="w-3 h-1 bg-slate-400 rounded-full transform rotate-45" />
              </div>
            </motion.div>
            {/* Headband */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-destructive/80 rounded-full" />
            <div className="absolute -top-2 right-0 w-3 h-4 bg-destructive/80 rounded-sm transform rotate-12" />
          </>
        ) : (
          <motion.div 
            className="absolute -top-3 left-1/2 -translate-x-1/2"
            animate={{ 
              y: [0, -3, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <div className="w-4 h-5 bg-orange-500 rounded-t-full opacity-90" />
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-400 rounded-t-full" />
          </motion.div>
        )}

        {/* Legs */}
        <motion.div 
          className="absolute -bottom-2 left-2 w-3 h-4 bg-foreground/30 rounded-b-lg"
          animate={player.isMoving ? { rotate: [-15, 15, -15] } : { rotate: 0 }}
          transition={{ duration: 0.15, repeat: player.isMoving ? Infinity : 0 }}
        />
        <motion.div 
          className="absolute -bottom-2 right-2 w-3 h-4 bg-foreground/30 rounded-b-lg"
          animate={player.isMoving ? { rotate: [15, -15, 15] } : { rotate: 0 }}
          transition={{ duration: 0.15, repeat: player.isMoving ? Infinity : 0 }}
        />
      </div>
    </motion.div>
  );
};
