
import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainGameScene from './scenes/MainGameScene';
import { GameAssetUploader } from './GameAssetUploader';

const VocabularyGame = () => {
  const [gameAssets, setGameAssets] = useState<string[]>([]);
  const gameRef = useRef<Phaser.Game | null>(null);

  const handleAssetUpload = (url: string) => {
    setGameAssets(prev => [...prev, url]);
    // 重启游戏场景以加载新资源
    if (gameRef.current) {
      gameRef.current.scene.start('MainGameScene', { assets: [...gameAssets, url] });
    }
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
          gravity: { x: 0, y: 0 },  // 移除重力以便更好地操作资源
          debug: false
        }
      }
    };

    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
      // 使用当前资源初始化场景
      gameRef.current.scene.start('MainGameScene', { assets: gameAssets });
    }

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
