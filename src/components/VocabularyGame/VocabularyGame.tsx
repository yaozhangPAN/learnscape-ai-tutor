
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainGameScene from './scenes/MainGameScene';

const VocabularyGame = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game',
      backgroundColor: '#FFFFFF',
      scene: MainGameScene,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 300 },
          debug: false
        }
      }
    };

    // 创建新的游戏实例
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
    }

    // 清理函数
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div id="phaser-game" className="w-full h-[600px] max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg" />
  );
};

export default VocabularyGame;
