import App from "./App";
import { IMiddleware } from "../createApp";



export default function gameLoop(
  draw: drawFunctionInterface,
  app: App,
  middlewares: IMiddleware[] = [],
  gameLogicOnScene?: () => void,

) {
  const dt = 1 / 60;

  let frameStart = Date.now();
  let accamulatorTime = 0;

  const clear = () => {
    app.context.fillStyle = '#fff';
    app.context.fillRect(
      0,
      0,
      app.sceneWidth,
      app.sceneHeight
    );
  };

  const loop = () => {
    const currentFrameTime = Date.now();

    clear();

    draw(currentFrameTime);

    middlewares.forEach(m => m(app, frameStart));

    accamulatorTime = accamulatorTime + currentFrameTime - frameStart;
    frameStart = currentFrameTime;

    if (accamulatorTime > 0.2) {
      accamulatorTime = 0.2;
    }

    while (accamulatorTime > dt) {
      if (gameLogicOnScene) {
        gameLogicOnScene();
      }
      accamulatorTime -= dt;
    }

    window.requestAnimationFrame(loop);
  };

  loop();
}
