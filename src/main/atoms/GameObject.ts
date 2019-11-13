import { TPosition, TSpriteMap } from "../declare";

export type TGameObjectFactoryObject = {
  gameId?: string;
  spriteMap: TSpriteMap;
  startSprite: string;
  startPosition: TPosition;
  width: number;
  height: number;
  onHover?: () => void;
  onClick?: () => void;
};

export default class GameObject {
  public position: TPosition;
  public debug?: boolean;

  constructor(
    private gameId: string,
    private spriteMap: TSpriteMap,
    private currentSprite: string,
    private startPosition: TPosition,
    private onHover: () => void = null,
    private onClick: () => void = null,
    public width: number,
    public height: number
  ) {
    this.position = startPosition;

    this.draw = this.draw.bind(this);
  }

  public changeCurrentSprite(value) {
    this.currentSprite = value;
  }

  public setPositionX(value) {
    this.position.x = value;
  }

  public setPositionY(value) {
    this.position.y = value;
  }

  draw(context: CanvasRenderingContext2D) {
    this.spriteMap[this.currentSprite].draw(context, this.position, {
      width: this.width,
      height: this.height
    });
  }

  emmit(event) {
    switch (event) {
      case "hover":
        if (this.onHover) this.onHover();
        break;

      case "click":
        if (this.onClick) this.onClick();
        break;
      default:
        break;
    }
  }
}
