import * as Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class Diamond {
  public sprite: PIXI.Sprite;
  public body: Matter.Body;

  constructor(x: number, y: number) {
    this.createSprite(x, y);
    App.app.ticker.add(this.update, this);
  }

  public createSprite(x: number, y: number): void {
    this.sprite = App.sprite('diamond');
    this.sprite.x = x;
    this.sprite.y = y;
    this.createBody();
  }

  public update(): void {
    if (this.sprite) {
      Matter.Body.setPosition(this.body, {
        x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
        y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y,
      });
    }
  }

  public createBody(): void {
    console.log("DIAMOND SPRITE",this.sprite)
    this.body = Matter.Bodies.rectangle(
      this.sprite.width / 2 + this.sprite.x + (this.sprite?.parent?.x ? this.sprite.parent.x : 0),
      this.sprite.height / 2 + this.sprite.y + (this.sprite?.parent?.y ? this.sprite.parent.x : 0),
      this.sprite.width,
      this.sprite.height,
      { friction: 0, isStatic: true, render: { fillStyle: '#060a19' } }
    );
    this.body.isSensor = true;
    (this.body as any).gameDiamond = this;
    Matter.World.add(App.physics.world, this.body);
  }

  // [14]
  destroy(): void {
    if (this.sprite) {
      App.app.ticker.remove(this.update, this);
      Matter.World.remove(App.physics.world, this.body);
      this.sprite.destroy();
      this.sprite = null;
    }
  }
}
