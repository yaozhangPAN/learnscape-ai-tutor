
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';

const PhaserGame = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameContainerRef.current && !gameInstanceRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#f8f9fa',
        scene: GameScene
      };

      gameInstanceRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
      }
    };
  }, []);

  return <div id="game-container" ref={gameContainerRef} className="w-full h-[600px] rounded-lg" />;
};

export default PhaserGame;
