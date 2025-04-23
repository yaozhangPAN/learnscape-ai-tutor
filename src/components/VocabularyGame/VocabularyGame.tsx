import React, { useState } from 'react';
import Phaser from 'phaser';
import MainGameScene from './scenes/MainGameScene';
import { GameAssetUploader } from './GameAssetUploader';
import { useEffect, useRef } from 'react';

const VocabularyGame = () => {
  const [gameAssets, setGameAssets] = useState<string[]>([]);
  const gameRef = useRef<Phaser.Game | null>(null);

  const handleAssetUpload = (url: string) => {
    setGameAssets(prev => [...prev, url]);
  };

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
    <div>
      <div id="phaser-game" className="w-full h-[600px] max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg" />
      <div className="mt-4 text-center">
        <GameAssetUploader onUploadComplete={handleAssetUpload} />
      </div>
    </div>
  );
};

export default VocabularyGame;
