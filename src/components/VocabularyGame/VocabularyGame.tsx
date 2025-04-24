
import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import MainGameScene from './scenes/MainGameScene';
import { GameAssetUploader } from './GameAssetUploader';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
          gravity: { x: 0, y: 0 },
          debug: false
        }
      }
    };

    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(config);
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
    <div className="space-y-4">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>词汇冲关游戏说明</AlertTitle>
        <AlertDescription>
          1. 上传与单词相关的图片资源
          2. 拖拽图片进行互动学习
          3. 图片会根据拖拽距离自动回弹
        </AlertDescription>
      </Alert>
      
      <div id="phaser-game" className="w-full h-[600px] max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg border-2 border-blue-200" />
      
      <div className="mt-4 text-center space-y-2">
        <p className="text-sm text-gray-600 mb-2">
          上传图片来丰富您的词汇学习体验
        </p>
        <GameAssetUploader onUploadComplete={handleAssetUpload} />
      </div>
    </div>
  );
};

export default VocabularyGame;
