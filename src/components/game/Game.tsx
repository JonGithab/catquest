import { AnimatePresence } from 'framer-motion';
import { useGameEngine } from '@/hooks/useGameEngine';
import { MainMenu } from './MainMenu';
import { GameWorld } from './GameWorld';
import { GameHUD } from './GameHUD';
import { PauseMenu } from './PauseMenu';
import { GameOverScreen } from './GameOverScreen';
import { LevelCompleteScreen } from './LevelCompleteScreen';

export const Game = () => {
  const {
    gameState,
    level,
    collectibles,
    enemies,
    cameraOffset,
    startGame,
    pauseGame,
    resumeGame,
    restartLevel,
    nextLevel,
    selectLevel,
  } = useGameEngine();

  const handleMainMenu = () => {
    window.location.reload(); // Simple way to reset to main menu
  };

  if (!gameState.isPlaying) {
    return (
      <MainMenu 
        onStartGame={startGame} 
        onSelectLevel={(levelId) => {
          startGame('hywon');
          setTimeout(() => selectLevel(levelId), 100);
        }}
      />
    );
  }

  if (!level) {
    return <div className="text-foreground p-8">Loading level...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-foreground/10">
      <div className="relative">
        {/* Game World */}
        <GameWorld
          level={level}
          player={gameState.player}
          characterType={gameState.selectedCharacter}
          collectibles={collectibles}
          enemies={enemies}
          cameraOffset={cameraOffset}
        />

        {/* HUD */}
        <GameHUD
          player={gameState.player}
          score={gameState.score}
          levelName={level.name}
          onPause={pauseGame}
        />

        {/* Overlays */}
        <AnimatePresence>
          {gameState.isPaused && !gameState.isGameOver && !gameState.isLevelComplete && (
            <PauseMenu
              onResume={resumeGame}
              onRestart={restartLevel}
              onMainMenu={handleMainMenu}
            />
          )}

          {gameState.isGameOver && (
            <GameOverScreen
              score={gameState.score}
              onRestart={restartLevel}
              onMainMenu={handleMainMenu}
            />
          )}

          {gameState.isLevelComplete && (
            <LevelCompleteScreen
              levelName={level.name}
              score={gameState.score}
              coins={gameState.player.coins}
              stars={gameState.player.stars}
              isLastLevel={gameState.currentLevel >= 3}
              onNextLevel={nextLevel}
              onRestart={restartLevel}
              onMainMenu={handleMainMenu}
            />
          )}
        </AnimatePresence>

        {/* Mobile Controls Hint */}
        <div className="mt-4 text-center text-muted-foreground text-sm">
          Use arrow keys or WASD to move • Space or ↑ to jump • ESC to pause
        </div>
      </div>
    </div>
  );
};
