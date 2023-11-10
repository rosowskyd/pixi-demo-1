import { Tools } from '../system/Tools';
import { GameScene } from './GameScene';

interface Config {
  loader: Record<string, any>;
  bgSpeed: number;
  score: {
    x: number;
    y: number;
    anchor: number;
    style: {
      fontFamily: string;
      fontWeight: string;
      fontSize: number;
      fill: string[];
    };
  };
  diamonds: {
    chance: number;
    offset: {
      min: number;
      max: number;
    };
  };
  platforms: {
    moveSpeed: number;
    ranges: {
      rows: {
        min: number;
        max: number;
      };
      cols: {
        min: number;
        max: number;
      };
      offset: {
        min: number;
        max: number;
      };
    };
  };
  hero: {
    jumpSpeed: number;
    maxJumps: number;
    position: {
      x: number;
      y: number;
    };
  };
  bombs: {
    chance: number;
    offset: {
      min: number;
      max: number;
    };
  };
  scenes: {
    Game: typeof GameScene;
  };
}

export const Config: Config = {
  loader: Tools.massiveRequire(require.context('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
  bgSpeed: 2,
  score: {
    x: 10,
    y: 10,
    anchor: 0,
    style: {
      fontFamily: 'Verdana',
      fontWeight: 'bold',
      fontSize: 44,
      fill: ['#FF7F50'],
    },
  },
  diamonds: {
    chance: 0.4,
    offset: {
      min: 100,
      max: 200,
    },
  },
  platforms: {
    moveSpeed: -1.5,
    ranges: {
      rows: {
        min: 2,
        max: 6,
      },
      cols: {
        min: 3,
        max: 9,
      },
      offset: {
        min: 60,
        max: 200,
      },
    },
  },
  hero: {
    jumpSpeed: 15,
    maxJumps: 2,
    position: {
      x: 350,
      y: 595,
    },
  },
  bombs: {
    chance: 0.2,
    offset: {
      min: 200,
      max: 300,
    },
  },
  scenes: {
    Game: GameScene,
  },
};
