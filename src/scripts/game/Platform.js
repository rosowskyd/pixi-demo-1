import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';
// [10]
import { Diamond } from './Diamond';
import { Bomb } from './Bomb';
// [/10]

export class Platform {
    constructor(rows, cols, x) {
        // [10]
        this.diamonds = [];
        this.bombs = [];
        // [/10]

        this.rows = rows;
        this.cols = cols;

        this.tileSize = PIXI.Texture.from("tile").width;
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
    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                this.createDiamond(this.tileSize * i, -y);
            }
        }
    }

    createDiamond(x, y) {
            const diamond = new Diamond(x, y);
            this.container.addChild(diamond.sprite);
            diamond.createBody();
            this.diamonds.push(diamond);
    }
    // [/10]

    createBombs() {
        const y = App.config.bombs.offset.min + Math.random() * (App.config.bombs.offset.max - App.config.bombs.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.bombs.chance) {
                this.createBomb(this.tileSize * i, -y);
            }
        }
    }

    createBomb(x, y) {
            const bomb = new Bomb(x, y);
            this.container.addChild(bomb.sprite);
            bomb.createBody();
            this.bombs.push(bomb);
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, {friction: 0, isStatic: true});
        Matter.World.add(App.physics.world, this.body);
        this.body.gamePlatform = this;
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }

    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile" 
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }


    // 06
    move() {
        if (this.body) {
            Matter.Body.setPosition(this.body, {x: this.body.position.x + this.dx, y: this.body.position.y});
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
        }
    }

    destroy() {
        Matter.World.remove(App.physics.world, this.body);
        this.diamonds.forEach(diamond => diamond.destroy());
        this.bombs.forEach(bomb => bomb.destroy());
        this.container.destroy();
    }
}