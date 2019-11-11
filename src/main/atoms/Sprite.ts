export type TFrames = Array<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export type TSpriteCut = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export interface ISpriteFactoryInterface {
  cut?: TSpriteCut;

  withAnimation?: boolean;
  animationDelay?: number;
  frames?: TFrames;
}

export default class Sprite {
  private readonly _image: HTMLImageElement;

  private isLoaded: boolean;

  private startAnimationInterval: any;

  private frameIndex: number;


  static create(imageSrc: string, options: ISpriteFactoryInterface) {
    return new Sprite(
      imageSrc,
      options.withAnimation,
      options.animationDelay,
      options.frames,
      options.cut
    );
  }

  constructor(
    imageSrc: string,
    private readonly withAnimation: boolean,
    private readonly animationDelay: number,
    private readonly frames: TFrames,
    private readonly cut: TSpriteCut
  ) {
    this.isLoaded = false;

    this._image = new Image();

    this._image.onload = this.loadImage.bind(this);

    this._image.src = imageSrc;

    this.draw = this.draw.bind(this);
    this.animationStart = this.animationStart.bind(this);
    this.animationFunc = this.animationFunc.bind(this);

    this.frameIndex = 0;
  }

  animationStart() {
    if (!this.startAnimationInterval) {
      this.startAnimationInterval = setInterval(
        this.animationFunc,
        this.animationDelay
      );
    }
  }

  animationStop() {}

  animationFunc() {
    if (this.frameIndex < this.frames.length - 1) {
      this.frameIndex += 1;
    } else {
      this.frameIndex = 0;
    }
  }

  get image() {
    return this.image;
  }

  loadImage() {
    this.isLoaded = true;
  }

  draw(
    context: CanvasRenderingContext2D,
    position: { x: number; y: number } = { x: 0, y: 0 },
    body: { width: number; height: number } = { width: 0, height: 0 },
    debug?:boolean
  ) {
    if (this.isLoaded) {
      // drawImage(image, image-start-x, image-start-y, image-start-Width, image-start-Height, dx, dy, dWidth, dHeight)
      if (!this.withAnimation) {
        context.drawImage(
          this._image,
          this.cut.x,
          this.cut.y,
          this.cut.width,
          this.cut.height,
          position.x,
          position.y,
          body.width,
          body.height
        );
      } else {

        if (!this.startAnimationInterval) {
          this.animationStart();
        }

        context.drawImage(
          this._image,
          this.frames[this.frameIndex].x,
          this.frames[this.frameIndex].y,
          this.frames[this.frameIndex].width,
          this.frames[this.frameIndex].height,
          position.x,
          position.y,
          body.width,
          body.height
        );
      }

    }
  }
}
