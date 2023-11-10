import { LoaderResource, Loader as PixiLoader } from 'pixi.js';

export class Loader {
  public loader: PixiLoader;
  public config: { loader: { key: string; data: { default: string } }[] };
  public resources: { [key: string]: LoaderResource } = {};

  constructor(loader: any, config: { loader: { key: string; data: { default: string } }[] }) {
    this.loader = loader;
    this.config = config;
  }

  preload(): Promise<void> {
    for (const asset of this.config.loader) {
      let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
      key = key.substring(0, key.indexOf('.'));
      if (asset.key.indexOf('.png') !== -1 || asset.key.indexOf('.jpg') !== -1) {
        this.loader.add(key, asset.data.default);
      }
    }

    return new Promise((resolve) => {
      this.loader.load((loader: any, resources: { [key: string]: LoaderResource; }) => {
        this.resources = resources;
        resolve();
      });
    });
  }
  load(arg0: (loader: any, resources: { [key: string]: LoaderResource; }) => void) {
    throw new Error('Method not implemented.');
  }
  add(key: string, _default: string) {
    throw new Error('Method not implemented.');
  }
}
