import { motion } from 'framer-motion';
import { Crown, Home, RotateCcw, Star, Trophy, Coins, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VictoryScreenProps {
  totalScore: number;
  totalCoins: number;
  totalStars: number;
  levelsCompleted: number;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const VictoryScreen = ({
  totalScore,
  totalCoins,
  totalStars,
  levelsCompleted,
  onPlayAgain,
  onMainMenu,
}: VictoryScreenProps) => {
  // Confetti particles
  const confettiColors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7', '#F97316', '#22C55E'];
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: 6 + Math.random() * 8,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-b from-primary/80 via-accent/70 to-secondary/80 backdrop-blur-md z-50 flex items-center justify-center rounded-2xl overflow-hidden"
    >
      {/* Confetti */}
      {confettiParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-sm"
          style={{
            left: `${particle.x}%`,
            top: -20,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, 700],
            x: [0, Math.sin(particle.id) * 50],
            rotate: [0, 360 * 3],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Sparkle effects */}
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
        >
          <Sparkles className="w-4 h-4 text-game-coin" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.3, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 12, delay: 0.2 }}
        className="game-card text-center max-w-md mx-4 relative z-10"
      >
        {/* Crown with glow */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.5 }}
          className="relative mb-2"
        >
          <motion.div
            className="absolute inset-0 blur-xl bg-game-coin/50 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <Crown className="w-20 h-20 text-game-coin mx-auto relative" />
        </motion.div>

        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.7 }}
          className="font-display text-4xl font-bold bg-gradient-to-r from-game-coin via-accent to-primary bg-clip-text text-transparent mb-2"
        >
          VICTORY!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground mb-6"
        >
          You've conquered all of CatQuest!
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            className="bg-gradient-to-br from-game-coin/20 to-game-coin/5 border border-game-coin/30 rounded-xl p-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Trophy className="w-8 h-8 text-game-coin mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Total Score</p>
            <p className="font-display text-2xl font-bold text-foreground">{totalScore.toLocaleString()}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <Coins className="w-8 h-8 text-game-coin mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Coins Collected</p>
            <p className="font-display text-2xl font-bold text-game-coin">{totalCoins}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Star className="w-8 h-8 fill-game-coin text-game-coin mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Stars Earned</p>
            <p className="font-display text-2xl font-bold text-foreground">{totalStars}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-success/20 to-success/5 border border-success/30 rounded-xl p-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Heart className="w-8 h-8 fill-destructive text-destructive mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Levels Completed</p>
            <p className="font-display text-2xl font-bold text-success">{levelsCompleted}/10</p>
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Button
            onClick={onPlayAgain}
            className="game-button bg-primary text-primary-foreground hover:bg-primary/90 w-full"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>

          <Button
            onClick={onMainMenu}
            variant="secondary"
            className="game-button bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full"
          >
            <Home className="w-5 h-5 mr-2" />
            Main Menu
          </Button>
        </motion.div>

        {/* Thank you message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-xs text-muted-foreground mt-4"
        >
          Thank you for playing CatQuest! 🐱✨
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
