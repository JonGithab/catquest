import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUp, Zap } from 'lucide-react';

interface MobileControlsProps {
  onLeftStart: () => void;
  onLeftEnd: () => void;
  onRightStart: () => void;
  onRightEnd: () => void;
  onJump: () => void;
  onDash: () => void;
  characterType: 'hywon' | 'junnior';
}

export const MobileControls = ({
  onLeftStart,
  onLeftEnd,
  onRightStart,
  onRightEnd,
  onJump,
  onDash,
  characterType,
}: MobileControlsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between items-end z-50 pointer-events-none md:hidden">
      {/* Left side - Movement controls */}
      <div className="flex gap-2 pointer-events-auto">
        <motion.button
          onTouchStart={(e) => {
            e.preventDefault();
            onLeftStart();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onLeftEnd();
          }}
          onMouseDown={onLeftStart}
          onMouseUp={onLeftEnd}
          onMouseLeave={onLeftEnd}
          className="w-16 h-16 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-primary/50 transition-colors touch-none"
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-8 h-8 text-foreground" />
        </motion.button>
        <motion.button
          onTouchStart={(e) => {
            e.preventDefault();
            onRightStart();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onRightEnd();
          }}
          onMouseDown={onRightStart}
          onMouseUp={onRightEnd}
          onMouseLeave={onRightEnd}
          className="w-16 h-16 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-primary/50 transition-colors touch-none"
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight className="w-8 h-8 text-foreground" />
        </motion.button>
      </div>

      {/* Right side - Action controls */}
      <div className="flex gap-2 pointer-events-auto">
        <motion.button
          onTouchStart={(e) => {
            e.preventDefault();
            onDash();
          }}
          onClick={onDash}
          className="w-14 h-14 bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-secondary transition-colors touch-none"
          whileTap={{ scale: 0.9 }}
        >
          <Zap className="w-6 h-6 text-secondary-foreground" />
        </motion.button>
        <motion.button
          onTouchStart={(e) => {
            e.preventDefault();
            onJump();
          }}
          onClick={onJump}
          className="w-20 h-20 bg-primary/80 backdrop-blur-sm rounded-full flex items-center justify-center active:bg-primary transition-colors touch-none"
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-10 h-10 text-primary-foreground" />
        </motion.button>
      </div>
    </div>
  );
};
