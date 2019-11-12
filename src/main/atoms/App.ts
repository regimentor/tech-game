
/**
 *
 * [] TODO: Добавить DI контейнер
 *    * Для возможности шарить какую либо логику межжду middlewares запускаемыми
 *      движком.
 *
 * */
export default class App {

  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  draw(fn: (context: CanvasRenderingContext2D) => void) {
    fn(this.context);
  }



  get sceneWidth() {
    return this.canvas.width;
  }

  get sceneHeight() {
    return this.canvas.height;
  }
}
