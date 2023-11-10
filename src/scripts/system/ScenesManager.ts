import * as PIXI from 'pixi.js';
import { App } from './App';

export class ScenesManager {
  public container: PIXI.Container;
  public scene: any; 

  constructor() {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    this.scene = null;
  }

  start(scene: string): void {
    if (this.scene) {
      this.scene.destroy();
    }

    this.scene = new (App.config.scenes[scene] as any)();
    this.container.addChild(this.scene.container);
  }

  update(dt: number): void {
    if (this.scene && this.scene.update) {
      this.scene.update(dt);
    }
  }
}
