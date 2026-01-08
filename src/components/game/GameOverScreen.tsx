import { motion } from 'framer-motion';
import { RotateCcw, Home, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const GameOverScreen = ({ score, onRestart, onMainMenu }: GameOverScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-foreground/70 backdrop-blur-sm z-40 flex items-center justify-center rounded-2xl"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="game-card text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 0.5 }}
        >
          <Skull className="w-16 h-16 text-destructive mx-auto mb-4" />
        </motion.div>
        
        <h2 className="font-display text-4xl font-bold text-destructive mb-2">Game Over</h2>
        <p className="text-muted-foreground mb-2">Don't give up!</p>
        
        <div className="bg-muted rounded-xl px-6 py-3 mb-6">
          <p className="text-sm text-muted-foreground">Final Score</p>
          <p className="font-display text-3xl font-bold text-foreground">{score}</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button
            onClick={onRestart}
            className="game-button bg-primary text-primary-foreground hover:bg-primary/90 w-48"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          
          <Button
            onClick={onMainMenu}
            variant="outline"
            className="game-button w-48"
          >
            <Home className="w-5 h-5 mr-2" />
            Main Menu
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
