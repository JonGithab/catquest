import { motion } from 'framer-motion';
import { Play, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const PauseMenu = ({ onResume, onRestart, onMainMenu }: PauseMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-foreground/60 backdrop-blur-sm z-40 flex items-center justify-center rounded-2xl"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="game-card text-center"
      >
        <h2 className="font-display text-3xl font-bold text-foreground mb-6">Paused</h2>
        
        <div className="flex flex-col gap-3">
          <Button
            onClick={onResume}
            className="game-button bg-primary text-primary-foreground hover:bg-primary/90 w-48"
          >
            <Play className="w-5 h-5 mr-2" />
            Resume
          </Button>
          
          <Button
            onClick={onRestart}
            variant="secondary"
            className="game-button bg-secondary text-secondary-foreground hover:bg-secondary/90 w-48"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Restart Level
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

        <p className="text-muted-foreground text-sm mt-4">Press ESC to resume</p>
      </motion.div>
    </motion.div>
  );
};
