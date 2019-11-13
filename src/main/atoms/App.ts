/**
 *
 * [] TODO: Добавить DI контейнер
 *    * Для возможности шарить какую либо логику межжду middlewares запускаемыми
 *      движком.
 *
 * */
import GameObject from "./GameObject";

export default class App {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  private gameObjects: GameObject[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.gameObjects = [];

    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.addEventListener("click", this.handleClick.bind(this));
  }

  registerGameObject(obj: GameObject) {
    this.gameObjects.push(obj);
  }

  draw(fn: (context: CanvasRenderingContext2D) => void) {
    fn(this.context);
  }

  inArea(x, y, dx, dy, w, h) {
    return x >= dx && x <= dx + w && y >= dy && y <= dy + h;
  }

  handleClick(event) {
    const canvasRect = this.canvas.getBoundingClientRect();
    const x = event.clientX - canvasRect.x;
    const y = event.clientY - canvasRect.y;

    for (let obj of this.gameObjects) {
      const dx = obj.position.x;
      const dy = obj.position.y;
      const w = obj.width;
      const h = obj.height;

      if (this.inArea(x, y, dx, dy, w, h)) {
        obj.emmit("click");
      }
    }
  }

  handleMouseMove(event) {
    const canvasRect = this.canvas.getBoundingClientRect();
    const x = event.clientX - canvasRect.x;
    const y = event.clientY - canvasRect.y;

    for (let obj of this.gameObjects) {
      const dx = obj.position.x;
      const dy = obj.position.y;
      const w = obj.width;
      const h = obj.height;

      if (this.inArea(x, y, dx, dy, w, h)) {
        obj.emmit("hover");
      }
    }
  }

  get sceneWidth() {
    return this.canvas.width;
  }

  get sceneHeight() {
    return this.canvas.height;
  }
}
