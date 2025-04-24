
import Phaser from 'phaser';

interface GameConfig {
  assets: string[];
}

export default class MainGameScene extends Phaser.Scene {
  private gameAssets: string[] = [];
  private draggedSprite: Phaser.GameObjects.Sprite | null = null;
  private originalPositions: Map<string, { x: number; y: number }> = new Map();

  constructor() {
    super({ key: 'MainGameScene' });
  }

  init(data: GameConfig) {
    this.gameAssets = data.assets || [];
  }

  preload() {
    // 加载每个上传的资源
    this.gameAssets.forEach((assetUrl, index) => {
      this.load.image(`asset-${index}`, assetUrl);
      console.log(`Loading asset ${index}: ${assetUrl}`);
    });

    // 加载背景和其他游戏资源
    this.load.image('background', '/lovable-uploads/f0df06aa-0094-4ce2-9d9a-d7d749143aed.png');
  }

  create() {
    // 添加背景
    this.add.image(400, 300, 'background').setAlpha(0.3);
    
    // 网格布局参数
    const gridSize = 3; // 每行显示的图片数量
    const padding = 20; // 图片之间的间距
    const startX = 100;
    const startY = 100;

    // 在网格中布局所有资源
    this.gameAssets.forEach((_, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      
      const x = startX + col * (200 + padding);
      const y = startY + row * (200 + padding);

      const sprite = this.add.sprite(x, y, `asset-${index}`);
      
      // 保存原始位置
      this.originalPositions.set(`asset-${index}`, { x, y });
      
      // 设置图片大小和交互性
      sprite.setDisplaySize(200, 200);
      sprite.setInteractive();
      
      // 启用拖拽
      this.input.setDraggable(sprite);

      // 添加悬停效果
      sprite.on('pointerover', () => {
        this.tweens.add({
          targets: sprite,
          scaleX: 1.1,
          scaleY: 1.1,
          duration: 200
        });
      });

      sprite.on('pointerout', () => {
        if (this.draggedSprite !== sprite) {
          this.tweens.add({
            targets: sprite,
            scaleX: 1,
            scaleY: 1,
            duration: 200
          });
        }
      });
    });

    // 设置拖拽事件
    this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
      this.draggedSprite = gameObject;
      gameObject.setDepth(1);
    });

    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
      this.draggedSprite = null;
      gameObject.setDepth(0);
      
      // 检查是否应该返回原位
      const distance = Phaser.Math.Distance.Between(
        gameObject.x,
        gameObject.y,
        this.originalPositions.get(gameObject.texture.key)?.x || 0,
        this.originalPositions.get(gameObject.texture.key)?.y || 0
      );

      if (distance > 200) { // 如果拖得太远，返回原位
        const originalPos = this.originalPositions.get(gameObject.texture.key);
        if (originalPos) {
          this.tweens.add({
            targets: gameObject,
            x: originalPos.x,
            y: originalPos.y,
            duration: 500,
            ease: 'Bounce.out'
          });
        }
      }
    });
  }

  update() {
    // 游戏循环更新逻辑
  }
}
