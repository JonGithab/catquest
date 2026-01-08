import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LevelCompleteScreenProps {
  levelName: string;
  score: number;
  coins: number;
  stars: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const LevelCompleteScreen = ({ 
  levelName, 
  score, 
  coins, 
  stars, 
  isLastLevel,
  onNextLevel, 
  onRestart, 
  onMainMenu 
}: LevelCompleteScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-foreground/60 backdrop-blur-sm z-40 flex items-center justify-center rounded-2xl"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="game-card text-center max-w-sm"
      >
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
        </motion.div>
        
        <h2 className="font-display text-3xl font-bold text-success mb-1">Level Complete!</h2>
        <p className="text-muted-foreground mb-4">{levelName}</p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div 
            className="bg-muted rounded-xl p-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-muted-foreground">Score</p>
            <p className="font-display text-xl font-bold text-foreground">{score}</p>
          </motion.div>
          
          <motion.div 
            className="bg-muted rounded-xl p-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xs text-muted-foreground">Coins</p>
            <p className="font-display text-xl font-bold text-game-coin">{coins}</p>
          </motion.div>
          
          <motion.div 
            className="bg-muted rounded-xl p-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-muted-foreground">Stars</p>
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-game-coin text-game-coin" />
              <span className="font-display text-xl font-bold text-foreground">{stars}</span>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col gap-3">
          {isLastLevel ? (
            <Button
              onClick={onMainMenu}
              className="game-button bg-success text-success-foreground hover:bg-success/90 w-full"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Victory! Return Home
            </Button>
          ) : (
            <Button
              onClick={onNextLevel}
              className="game-button bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              Next Level
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
          
          <Button
            onClick={onRestart}
            variant="secondary"
            className="game-button bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
