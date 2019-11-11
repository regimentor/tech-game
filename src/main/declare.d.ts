import Sprite from "./atoms/Sprite";
import App from "./atoms/App";

export type TSpriteMap = { [key: string]: Sprite };
export type TPosition = { x: number; y: number };
export interface drawFunctionInterface {
  (currentFrameTime: number): void;
}

export interface IMiddleware {
  (app: App, frameStart: number): void;
}

export type TMiddlewares = IMiddleware[];
