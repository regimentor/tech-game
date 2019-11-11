import createCanvas from "./atoms/createCanvas";
import gameLoop from "./atoms/gameLoop";
import App from "./atoms/App";
import {TMiddlewares} from "./declare";





interface IOption {
  middlewares?: TMiddlewares;
  canvasId?: string;
  root: string;
}

export default function createApp(
  options: IOption = { canvasId: "game-screen", root: null, middlewares: [] }
) {
  let canvas = createCanvas(options.canvasId);

  if (!options.root) {
    throw Error("I need root option");
  }

  let root = document.querySelector(options.root);

  root.appendChild(canvas);

  const app = new App(canvas);

  const draw = (frameTime: number) => {};

  gameLoop(draw, app, options.middlewares);

  return app;
}
