
import Phaser from 'phaser';

export default class MainGameScene extends Phaser.Scene {
  private gameAssets: string[] = [];
  private gridSize = 3; // 每行显示的图片数量
  private padding = 20; // 图片之间的间距

  constructor() {
    super({ key: 'MainGameScene' });
  }

  init(data: { assets?: string[] }) {
    if (data.assets) {
      this.gameAssets = data.assets;
    }
  }

  preload() {
    // 加载每个上传的资源并赋予唯一的键值
    this.gameAssets.forEach((assetUrl, index) => {
      this.load.image(`asset-${index}`, assetUrl);
      console.log(`正在加载资源 ${index}: ${assetUrl}`);
    });
  }

  create() {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;
    
    // 在网格中显示加载的图片
    this.gameAssets.forEach((_, index) => {
      const row = Math.floor(index / this.gridSize);
      const col = index % this.gridSize;
      
      // 计算每个图片的位置
      const x = (screenWidth / (this.gridSize + 1)) * (col + 1);
      const y = this.padding + row * (screenHeight / 4);
      
      const sprite = this.add.sprite(x, y, `asset-${index}`);
      sprite.setInteractive();
      
      // 设置图片大小以适应屏幕
      const scale = Math.min(
        (screenWidth / this.gridSize - this.padding) / sprite.width,
        (screenHeight / 4 - this.padding) / sprite.height
      );
      sprite.setScale(scale);
      
      // 添加拖拽功能
      this.input.setDraggable(sprite);
      sprite.on('drag', function (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
        this.x = dragX;
        this.y = dragY;
      });
    });

    // 添加拖拽事件反馈
    this.input.on('dragstart', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) {
      gameObject.setTint(0xff0000);
    });

    this.input.on('dragend', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) {
      gameObject.clearTint();
    });
  }
}
