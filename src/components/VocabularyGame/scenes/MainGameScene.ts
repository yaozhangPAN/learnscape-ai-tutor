
import Phaser from 'phaser';

export default class MainGameScene extends Phaser.Scene {
  private gameAssets: string[] = [];

  constructor() {
    super({ key: 'MainGameScene' });
  }

  init(data: { assets?: string[] }) {
    if (data.assets) {
      this.gameAssets = data.assets;
    }
  }

  preload() {
    // Load each uploaded asset with a unique key
    this.gameAssets.forEach((assetUrl, index) => {
      this.load.image(`asset-${index}`, assetUrl);
      console.log(`Loading asset ${index}: ${assetUrl}`);
    });
  }

  create() {
    // Create a container to display uploaded images
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Display loaded images in a grid
    this.gameAssets.forEach((_, index) => {
      const sprite = this.add.sprite(0, 0, `asset-${index}`);
      sprite.setInteractive();
      
      // Add drag functionality
      this.input.setDraggable(sprite);
      sprite.on('drag', function (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
        this.x = dragX;
        this.y = dragY;
      });
    });

    // Add drag events
    this.input.on('dragstart', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) {
      gameObject.setTint(0xff0000);
    });

    this.input.on('dragend', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) {
      gameObject.clearTint();
    });
  }
}
