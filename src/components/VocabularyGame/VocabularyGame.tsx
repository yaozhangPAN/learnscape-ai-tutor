
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

// 在这里引入您的自定义场景
// import YourGameScene from './scenes/YourGameScene';

const VocabularyGame = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game',
      backgroundColor: '#FFFFFF',
      scene: {
        // 您可以将自定义场景添加到这里
        // 例如: [YourGameScene]
        // 或者直接在这里定义场景
        preload: function() {
          // 在这里加载您的游戏资源
          console.log('Game assets loading...');
        },
        create: function() {
          // 在这里初始化您的游戏元素
          console.log('Game scene created');
          const text = this.add.text(400, 300, '加载您的游戏场景', {
            fontSize: '32px',
            color: '#000'
          });
          text.setOrigin(0.5);
        },
        update: function() {
          // 在这里更新您的游戏逻辑
        }
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 300 },  // Fixed: Added the missing x property to gravity
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
