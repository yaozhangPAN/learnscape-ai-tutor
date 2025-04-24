
import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });
  }

  preload() {
    // Load game assets from Supabase storage
    this.load.setBaseURL('https://xfwnjocfdvuocvwjopke.supabase.co/storage/v1/object/public/vocabulary-game/');
    this.load.image('background', 'background.png');
    this.load.image('card', 'card.png');
  }

  create() {
    // Set up game scene
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    
    // Add background
    this.add.image(centerX, centerY, 'background');
    
    // Add title text
    this.add.text(centerX, centerY - 100, 'Vocabulary Game', { 
      fontSize: '48px',
      color: '#333',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    // Add instructions
    this.add.text(centerX, centerY, 'Match the correct words with their definitions', { 
      fontSize: '24px',
      color: '#555',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    // Add start button
    const startButton = this.add.text(centerX, centerY + 100, 'Start Game', {
      fontSize: '32px',
      color: '#fff',
      backgroundColor: '#4CAF50',
      padding: { x: 20, y: 10 },
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    startButton.setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        console.log('Game started!');
      });
  }

  update() {
    // Game loop update logic
  }
}
