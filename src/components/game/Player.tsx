import { motion } from 'framer-motion';
import { CharacterType, PlayerState } from '@/types/game';

interface PlayerProps {
  player: PlayerState;
  characterType: CharacterType;
  cameraOffset: number;
}

export const Player = ({ player, characterType, cameraOffset }: PlayerProps) => {
  const isDerrik = characterType === 'derrik';
  const isChristo = characterType === 'christo';
  const isLou = characterType === 'lou';
  const isTeri = characterType === 'teri';
  
  const getBodyColor = () => {
    if (isDerrik) return 'bg-primary';
    if (isLou) return 'bg-foreground';
    if (isTeri) return 'bg-destructive';
    return 'bg-accent';
  };

  const getBlushColor = () => {
    if (isDerrik) return 'bg-pink-300';
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
        width: isDerrik ? 50 : 40,
        height: isDerrik ? 55 : 50,
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

        {/* Character accessories: Derrik's plumber gear / Christo's flame / Lou's wings / Teri's claws */}
        {isDerrik ? (
          <>
            {/* Derrik's plumber cap */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="w-10 h-4 bg-red-600 rounded-t-full" />
              <div className="w-12 h-2 bg-red-700 rounded-full -mt-0.5" />
              {/* Cap emblem */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-2.5 bg-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
              </div>
            </div>
            {/* Derrik's wrench */}
            <motion.div 
              className="absolute top-4 -right-5 transform rotate-45"
              animate={player.isMoving ? { rotate: [35, 55, 35] } : { rotate: 45 }}
              transition={{ duration: 0.3, repeat: player.isMoving ? Infinity : 0 }}
            >
              {/* Handle */}
              <div className="w-2.5 h-10 bg-gray-500 rounded-full" style={{ boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.3)' }} />
              {/* Wrench head */}
              <div className="absolute -top-2 -left-1.5 w-5.5 h-4 bg-gray-400 rounded-sm" style={{ boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4)' }}>
                <div className="absolute top-1 left-1 w-1.5 h-2 bg-gray-600 rounded-sm" />
              </div>
            </motion.div>
          </>
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
        ) : isChristo ? (
          <>
            {/* Christo's flame */}
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
            
            {/* Christo's bike */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14">
              {/* Back wheel */}
              <motion.div 
                className="absolute left-0 bottom-0 w-5 h-5 rounded-full border-2 border-gray-700 bg-gray-800"
                animate={player.isMoving ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.3, repeat: player.isMoving ? Infinity : 0, ease: "linear" }}
              >
                <div className="absolute inset-1 rounded-full bg-gray-600" />
                <div className="absolute inset-1.5 rounded-full bg-gray-700" />
              </motion.div>
              
              {/* Front wheel */}
              <motion.div 
                className="absolute right-0 bottom-0 w-5 h-5 rounded-full border-2 border-gray-700 bg-gray-800"
                animate={player.isMoving ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.3, repeat: player.isMoving ? Infinity : 0, ease: "linear" }}
              >
                <div className="absolute inset-1 rounded-full bg-gray-600" />
                <div className="absolute inset-1.5 rounded-full bg-gray-700" />
              </motion.div>
              
              {/* Bike frame */}
              <div className="absolute bottom-2 left-2 w-10 h-1.5 bg-orange-600 rounded-full transform -rotate-6" />
              <div className="absolute bottom-2 left-2 w-4 h-1 bg-orange-600 rounded-full transform rotate-45" />
              <div className="absolute bottom-3 right-2 w-3 h-1 bg-orange-600 rounded-full transform -rotate-60" />
              
              {/* Exhaust flame */}
              <motion.div
                className="absolute -left-2 bottom-2"
                animate={{ 
                  scaleX: player.isMoving ? [1, 1.5, 1] : 0.5,
                  opacity: player.isMoving ? [0.8, 1, 0.8] : 0.3 
                }}
                transition={{ duration: 0.15, repeat: Infinity }}
              >
                <div className="w-3 h-1.5 bg-orange-500 rounded-l-full" />
                <div className="absolute left-0 top-0 w-2 h-1 bg-yellow-400 rounded-l-full" />
              </motion.div>
            </div>
          </>
        ) : null}

        {/* Legs - hidden for Christo since on bike */}
        {!isChristo && (
          <>
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
          </>
        )}
      </div>
    </motion.div>
  );
};
