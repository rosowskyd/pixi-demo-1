import * as Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { LabelScore } from './LabelScore';
import { App } from '../system/App';
import { Background } from './Background';
import { Scene } from '../system/Scene';
import { Hero } from './Hero';
import { Platforms } from './Platforms';

export class GameScene extends Scene {
  public bg: Background;
  public hero: Hero;
  public platfroms: Platforms;
  public labelScore: LabelScore;
  public gameOver: PIXI.Sprite;
  constructor() {
    super()
    this.create()
  }

  create(): void {
    this.createBackground();
    this.createHero();
    this.createPlatforms();
    this.setEvents();
    //[13]
    this.createUI();
    //[/13]
  }

  //[13]
  public createUI(): void {
    this.labelScore = new LabelScore();
    this.container.addChild(this.labelScore);
    this.hero.sprite.on('score', () => {
      this.labelScore.renderScore(this.hero.score);
    });
  }
  //[13]

  public setEvents(): void {
    Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
  }

  public onCollisionStart(event: Matter.IEventCollision<Matter.Engine>): void {
    const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
    const hero = colliders.find(body => (body as any).gameHero) as Matter.Body & { gameHero?: Hero };
    const platform = colliders.find(body => (body as any).gamePlatform) as Matter.Body & { gamePlatform?: any };
    // colliders for bomb

    if (hero && platform) {
      this.hero.stayOnPlatform(platform.gamePlatform);
    }

    const diamond = colliders.find(body => (body as any).gameDiamond) as Matter.Body & { gameDiamond?: any };

    if (hero && diamond) {
      this.hero.collectDiamond(diamond.gameDiamond);
    }

    const bomb = colliders.find(body => (body as any).gameBomb) as Matter.Body & { gameBomb?: any };

    if (hero && bomb) {
      this.hero.dieFromBomb(bomb.gameBomb);
    }
  }

  public async createHero(): Promise<void> {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);

    this.container.interactive = true;
    this.container.on('pointerdown', () => {
      this.hero.startJump();
    });

    // [14]
    this.hero.sprite.once('die', async () => {
      this.gameOver = App.sprite('gameover');
      this.gameOver.anchor.set(0.5);
      this.gameOver.x = window.innerWidth / 2;
      this.gameOver.y = window.innerHeight / 2;

      this.container.addChild(this.gameOver);

      App.app.ticker.add((delta) => {
        this.gameOver.rotation += 0.04 * delta;
      });
      await setTimeout(() => {
        App.scenes.start('Game');
      }, 3000);
    });
    // [/14]
  }

  public createBackground(): void {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  public createPlatforms(): void {
    this.platfroms = new Platforms();
    console.log("PLATFORMS2",this.platfroms)
    this.container.addChild(this.platfroms.container);
  }

  update(dt: number = 0): void {
    console.log("BG",this.bg)
    console.log("PLATFORMS",this.platfroms)
    this.bg.update(dt);
    if (this.platfroms) {
      this.platfroms.update();
    }
  }

  destroy(): void {
    Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    App.app.ticker.remove(this.update, this);
    this.bg.destroy();
    this.hero.destroy();
    this.platfroms.destroy();
    this.labelScore.destroy();
  }
}
