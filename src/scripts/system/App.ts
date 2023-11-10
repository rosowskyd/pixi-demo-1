import * as Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { Loader } from './Loader';
import { ScenesManager } from './ScenesManager';

class Application {
  public config: any;
  public app: PIXI.Application;
  public loader: Loader;
  public scenes: ScenesManager;
  public physics: Matter.Engine;

  run(config: any): void {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    this.config = config;

    this.app = new PIXI.Application({ resizeTo: window });
    document.body.appendChild(this.app.view);

    this.loader = new Loader(this.app.loader, this.config);
    this.loader.preload().then(() => this.start());

    this.scenes = new ScenesManager();
    this.app.stage.interactive = true;
    this.app.stage.addChild(this.scenes.container);

    this.createPhysics();
  }

  public createPhysics(): void {
    this.physics = Matter.Engine.create();
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.physics);
  }

  res(key: string): PIXI.Texture {
    return this.loader.resources[key].texture;
  }

  sprite(key: string): PIXI.Sprite {
    return new PIXI.Sprite(this.res(key));
  }

  public start(): void {
    this.scenes.start('Game');
  }
}

export const App = new Application();
