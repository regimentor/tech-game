import GameObject, { TGameObjectFactoryObject } from "./GameObject";
import { RigidBody } from "./RigidBody";

export type ICharacterFactoryObject = {
  rigidBody?: RigidBody;
} & TGameObjectFactoryObject;

export default class SceneObject extends GameObject {
  static create(options: ICharacterFactoryObject) {
    const obj = new SceneObject(
      options.gameId,
      options.spriteMap,
      options.startSprite,
      options.startPosition,
      options.width,
      options.height
    );

    if (options.rigidBody) {
      obj.attachRigidBody(options.rigidBody);
    }

    return obj;
  }

  private rigidBody: RigidBody;

  constructor(gameId, spriteMap, startSprite, startPosition, width, height) {
    super(gameId, spriteMap, startSprite, startPosition, width, height);
  }

  public checkCollision(obj: SceneObject) {
    return RigidBody.resolveCollision(this.rigidBody, obj.rigidBody);
  }

  attachRigidBody(rigidBody: RigidBody) {
    rigidBody.attachObject(this);
    this.rigidBody = rigidBody;
  }

  draw(context: CanvasRenderingContext2D) {
    super.draw(context);

    const box = this.rigidBody.getBox();

    if (this.debug) {
      context.save();
      context.fillStyle = "#E91E63";
      context.globalAlpha = 0.2;
      context.fillRect(
        box.left__top.x,
        box.right__top.y,
        box.width,
        box.height
      );
      context.restore();
    }
  }
}
