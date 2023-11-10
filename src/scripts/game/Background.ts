import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class Background {
  public speed: number;
  public container: PIXI.Container;
  public sprites!: PIXI.Sprite[];

  constructor() {
    this.speed = App.config.bgSpeed;
    this.container = new PIXI.Container();
    this.createSprites();
  }

  public createSprites(): void {
    this.sprites = [];

    for (let i = 0; i < 3; i++) {
      this.createSprite(i);
    }
  }

  public createSprite(i: number): void {
    const sprite = App.sprite('bg');

    sprite.x = sprite.width * i;
    sprite.y = 0;
    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  public move(sprite: PIXI.Sprite, offset: number): void {
    const spriteRightX = sprite.x + sprite.width;
    const screenLeftX = 0;

    if (spriteRightX <= screenLeftX) {
      sprite.x += sprite.width * this.sprites.length;
    }

    sprite.x -= offset;
  }

  update(dt: number): void {
    const offset = this.speed * dt;

    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }

  destroy(): void {
    this.container.destroy();
  }
}
