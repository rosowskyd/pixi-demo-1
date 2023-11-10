import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class LabelScore extends PIXI.Text {
  constructor() {
    super();

    this.x = App.config.score.x;
    this.y = App.config.score.y;
    this.anchor.set(App.config.score.anchor);
    this.style = App.config.score.style;

    this.renderScore();
  }

  renderScore(score: number = 0): void {
    this.text = `Score: ${score}`;
  }
}
