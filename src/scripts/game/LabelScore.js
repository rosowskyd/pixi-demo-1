import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class LabelScore extends PIXI.Text {
    constructor() {
        super();
        this.x = App.config.score.x;
        this.y = App.config.score.y;
        this.anchor.set(App.config.score.anchor);
        this.style = App.config.score.style;
        this.renderScore();
    }

    renderScore(score = 0) {
        const highScore = JSON.parse(localStorage.getItem('highscore')) || [];

        const scores = { score };

        highScore.push(scores)

        highScore.sort((a, b) => b.score - a.score).splice(1);

        const currentHighScore = highScore[0]?.score || 0;

        this.text = `Score: ${score} High Score: ${currentHighScore}`;

        localStorage.setItem('highscore', JSON.stringify(highScore));
    }
}




