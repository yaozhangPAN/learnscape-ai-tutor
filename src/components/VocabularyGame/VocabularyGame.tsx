
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

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
        preload: function() {
          // Load game assets here
        },
        create: function() {
          const text = this.add.text(400, 300, 'Vocabulary Game', {
            fontSize: '32px',
            color: '#000'
          });
          text.setOrigin(0.5);
        }
      }
    };

    // Create new game instance
    gameRef.current = new Phaser.Game(config);

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
    };
  }, []);

  return <div id="phaser-game" className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg" />;
};

export default VocabularyGame;
