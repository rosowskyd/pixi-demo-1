import * as Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { App } from '../system/App';
// [10]
import { Diamond } from './Diamond';
import { Bomb } from './Bomb';
// [/10]

export class Platform {
  public rows: number;
  public cols: number;
  public tileSize: number;
  public width: number;
  public height: number;
  public dx: number;
  public body: Matter.Body | undefined;
  public container: PIXI.Container;
  // [10]
  public diamonds: Diamond[];
  public bombs: Bomb[];
  // [/10]

  constructor(rows: number, cols: number, x: number) {
    // [10]
    this.diamonds = [];
    this.bombs = [];
    // [/10]

    this.rows = rows;
    this.cols = cols;

    this.tileSize = PIXI.Texture.from('tile').width;
    this.width = this.tileSize * this.cols;
    this.height = this.tileSize * this.rows;

    this.createContainer(x);
    this.createTiles();

    this.dx = App.config.platforms.moveSpeed;
    this.createBody();
    this.createDiamonds();
    this.createBombs();
  }

  // [10]
  public createDiamonds(): void {
    const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

    for (let i = 0; i < this.cols; i++) {
      if (Math.random() < App.config.diamonds.chance) {
        console.log("Tile", this.tileSize)
        console.log("Y", y)
        this.createDiamond(this.tileSize * i, -y);
      }
    }
  }

  public createDiamond(x: number, y: number): void {
    const diamond = new Diamond(x, y);
    const test = this.container.addChild(diamond.sprite);
    diamond.sprite = test
    diamond.createBody();
    this.diamonds.push(diamond);
  }
  // [/10]

  public createBombs(): void {
    const y = App.config.bombs.offset.min + Math.random() * (App.config.bombs.offset.max - App.config.bombs.offset.min);

    for (let i = 0; i < this.cols; i++) {
      if (Math.random() < App.config.bombs.chance) {
        this.createBomb(this.tileSize * i, -y);
      }
    }
  }

  public createBomb(x: number, y: number): void {
    const bomb = new Bomb(x, y);
    const test = this.container.addChild(bomb.sprite);
    console.log("TEST BOMB",test)
    bomb.sprite = test
    console.log("BOMB SPRITE 2",bomb.sprite)
    bomb.createBody();
    this.bombs.push(bomb);
  }

  public createBody(): void {
    this.body = Matter.Bodies.rectangle(
      this.width / 2 + this.container.x,
      this.height / 2 + this.container.y,
      this.width,
      this.height,
      { friction: 0, isStatic: true }
    );
    Matter.World.add(App.physics.world, this.body);
    (this.body as any).gamePlatform = this;
  }

  public createContainer(x: number): void {
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = window.innerHeight - this.height;
  }

  public createTiles(): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createTile(row, col);
      }
    }
  }

  public createTile(row: number, col: number): void {
    const texture = row === 0 ? 'platform' : 'tile';
    const tile = App.sprite(texture);
    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }

  // 06
  public move(): void {
    if (this.body) {
      Matter.Body.setPosition(this.body, { x: this.body.position.x + this.dx, y: this.body.position.y });
      this.container.x = this.body.position.x - this.width / 2;
      this.container.y = this.body.position.y - this.height / 2;
    }
  }

  destroy(): void {
    if (this.body) {
      Matter.World.remove(App.physics.world, this.body);
    }
    this.diamonds.forEach((diamond) => diamond.destroy());
    this.bombs.forEach((bomb) => bomb.destroy());
    this.container.destroy();
  }
}
