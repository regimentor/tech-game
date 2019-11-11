import GameObject from "./GameObject";
import SceneObject from "./SceneObject";

export type TRigidBodyFactoryObject = {
  offsetTop: number;
  offsetLeft: number;
  offsetRight: number;
  offsetBottom: number;
};

export class RigidBody {
  static create(options: TRigidBodyFactoryObject) {
    return new RigidBody(
      options.offsetTop,
      options.offsetLeft,
      options.offsetRight,
      options.offsetBottom
    );
  }

  object: GameObject;

  constructor(
    private readonly offsetTop: number,
    private readonly offsetLeft: number,
    private readonly offsetRight: number,
    private readonly offsetBottom: number
  ) {}

  attachObject(obj: GameObject) {
    this.object = obj;
  }

  getLeftTop() {
    return {
      x: this.object.position.x - this.offsetLeft,
      y: this.object.position.y - this.offsetTop
    };
  }

  getLeftBottom() {
    return {
      x: this.object.position.x - this.offsetLeft,
      y: this.object.position.y + this.object.height + this.offsetBottom
    };
  }

  getRightTop() {
    return {
      x: this.object.position.x + this.object.width + this.offsetRight,
      y: this.object.position.y - this.offsetTop
    };
  }

  getRightBottom() {
    return {
      x: this.object.position.x + this.object.width + this.offsetRight,
      y: this.object.position.y + this.object.height + this.offsetBottom
    };
  }

  getBox() {
    return {
      left__top: this.getLeftTop(),
      left__bottom: this.getLeftBottom(),
      right__top: this.getRightTop(),
      right_bottom: this.getRightBottom(),
      width: this.object.width + this.offsetRight + this.offsetLeft,
      height: this.object.height + this.offsetTop + this.offsetBottom
    };
  }

  static resolveCollision(obj1: RigidBody, obj2: RigidBody) {
    const c1 = obj1.getBox();
    const c2 = obj2.getBox();

    return (
      c1.left__top.x < c2.right__top.x &&
      c1.right__top.x > c2.left__top.x &&
      c1.left__top.y < c2.left__bottom.y &&
      c1.left__bottom.y > c2.left__top.y
    );
  }
}
