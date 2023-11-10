import * as PIXI from 'pixi.js';
import { App } from './App';

export class Scene {
  public container: PIXI.Container;

  constructor() {
    this.container = new PIXI.Container();
    this.container.interactive = true;
    App.app.ticker.add(this.update, this);
  }

  update(): void {
  }

  destroy(): void {
  }


}
