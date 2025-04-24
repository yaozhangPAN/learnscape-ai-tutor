
import Phaser from 'phaser';

export default class MainGameScene extends Phaser.Scene {
  private gameAssets: string[] = [];
  private phaserScript: HTMLScriptElement | null = null;

  constructor() {
    super({ key: 'MainGameScene' });
  }

  init(data: { assets?: string[] }) {
    if (data.assets) {
      this.gameAssets = data.assets;
    }
  }

  preload() {
    // Load the external Phaser script
    this.phaserScript = document.createElement('script');
    this.phaserScript.src = 'https://xfwnjocfdvuocvwjopke.supabase.co/storage/v1/object/public/vocabulary-game//phaser.js';
    document.head.appendChild(this.phaserScript);

    // Load game assets
    this.gameAssets.forEach((assetUrl, index) => {
      this.load.image(`asset-${index}`, assetUrl);
    });
  }

  create() {
    // Your game initialization code here
    console.log('Phaser game scene created');
  }

  shutdown() {
    // Clean up when the scene is shut down
    if (this.phaserScript) {
      document.head.removeChild(this.phaserScript);
      this.phaserScript = null;
    }
    super.shutdown();
  }
}
