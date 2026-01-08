import { motion } from 'framer-motion';
import { Heart, Star, Coins, Pause } from 'lucide-react';
import { PlayerState } from '@/types/game';

interface GameHUDProps {
  player: PlayerState;
  score: number;
  levelName: string;
  onPause: () => void;
}

export const GameHUD = ({ player, score, levelName, onPause }: GameHUDProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30 pointer-events-none">
      {/* Left side - Health and collectibles */}
      <div className="flex flex-col gap-2 pointer-events-auto">
        {/* Health */}
        <div className="flex gap-1">
          {Array.from({ length: player.maxHealth }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                opacity: i < player.health ? 1 : 0.3,
              }}
              transition={{ delay: i * 0.1 }}
            >
              <Heart 
                className={`w-8 h-8 ${i < player.health ? 'fill-game-heart text-game-heart' : 'text-muted-foreground'}`}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Coins */}
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1.5">
          <Coins className="w-5 h-5 text-game-coin" />
          <span className="font-display font-bold text-foreground">{player.coins}</span>
        </div>
        
        {/* Stars */}
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1.5">
          <Star className="w-5 h-5 fill-game-coin text-game-coin" />
          <span className="font-display font-bold text-foreground">{player.stars}</span>
        </div>
      </div>

      {/* Center - Level name */}
      <div className="bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 pointer-events-auto">
        <h2 className="font-display font-bold text-lg text-foreground">{levelName}</h2>
      </div>

      {/* Right side - Score and pause */}
      <div className="flex flex-col items-end gap-2 pointer-events-auto">
        {/* Pause button */}
        <motion.button
          onClick={onPause}
          className="w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Pause className="w-5 h-5 text-foreground" />
        </motion.button>
        
        {/* Score */}
        <div className="bg-card/80 backdrop-blur-sm rounded-full px-4 py-1.5">
          <span className="font-display font-bold text-foreground">Score: {score}</span>
        </div>
      </div>
    </div>
  );
};
