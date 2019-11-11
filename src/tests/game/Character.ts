import SceneObject from "../../main/atoms/SceneObject";
import Sprite from "../../main/atoms/Sprite";
// @ts-ignore
import mageAttacRightSprite from "../../assets/mage/attac-right.png";
// @ts-ignore
import mageAttacLeftSprite from "../../assets/mage/attac-left.png";
// @ts-ignore
import mageWalkRightSprite from "../../assets/mage/walk-right.png";
// @ts-ignore
import mageWalkLeftSprite from "../../assets/mage/walk-left.png";
// @ts-ignore
import mageRight from "../../assets/mage/mage-right.png";
// @ts-ignore
import mageLeft from "../../assets/mage/mage-left.png";
import { RigidBody } from "../../main/atoms/RigidBody";

const PlayerCharacter = SceneObject.create({
  width: 128,
  height: 128,

  startPosition: {
    x: 150,
    y: 0
  },
  startSprite: "stay-right",
  spriteMap: {
    ["stay-left"]: Sprite.create(mageLeft, {
      cut: {
        x: 0,
        y: 0,
        width: 128,
        height: 128
      }
    }),
    ["stay-right"]: Sprite.create(mageRight, {
      cut: {
        x: 0,
        y: 0,
        width: 128,
        height: 128
      }
    }),
    ["walk-left"]: Sprite.create(mageWalkLeftSprite, {
      withAnimation: true,
      animationDelay: 100,
      frames: [
        { x: 0, y: 0, width: 128, height: 128 },
        { x: 128, y: 0, width: 128, height: 128 },
        { x: 256, y: 0, width: 128, height: 128 },
        { x: 384, y: 0, width: 128, height: 128 },
        { x: 512, y: 0, width: 128, height: 128 },
        { x: 640, y: 0, width: 128, height: 128 }
      ]
    }),
    ["walk-right"]: Sprite.create(mageWalkRightSprite, {
      withAnimation: true,
      animationDelay: 100,
      frames: [
        { x: 0, y: 0, width: 128, height: 128 },
        { x: 128, y: 0, width: 128, height: 128 },
        { x: 256, y: 0, width: 128, height: 128 },
        { x: 384, y: 0, width: 128, height: 128 },
        { x: 512, y: 0, width: 128, height: 128 },
        { x: 640, y: 0, width: 128, height: 128 }
      ]
    }),
    ["attac-right"]: Sprite.create(mageAttacRightSprite, {
      withAnimation: true,
      animationDelay: 100,
      frames: [
        { x: 0, y: 0, width: 128, height: 128 },
        { x: 128, y: 0, width: 128, height: 128 },
        { x: 256, y: 0, width: 128, height: 128 },
        { x: 384, y: 0, width: 128, height: 128 },
        { x: 512, y: 0, width: 128, height: 128 },
        { x: 640, y: 0, width: 128, height: 128 },
        { x: 768, y: 0, width: 128, height: 128 }
      ]
    }),
    ["attac-left"]: Sprite.create(mageAttacLeftSprite, {
      withAnimation: true,
      animationDelay: 100,
      frames: [
        { x: 768, y: 0, width: 128, height: 128 },
        { x: 640, y: 0, width: 128, height: 128 },
        { x: 512, y: 0, width: 128, height: 128 },
        { x: 384, y: 0, width: 128, height: 128 },
        { x: 256, y: 0, width: 128, height: 128 },
        { x: 128, y: 0, width: 128, height: 128 },
        { x: 0, y: 0, width: 128, height: 128 }
      ]
    })
  },

  rigidBody: RigidBody.create({
    offsetTop: -70,
    offsetBottom: -20,
    offsetRight: -70,
    offsetLeft: -20
  })
});

let direction: "left" | "right" | "top" | "down" = "right";

console.dir(PlayerCharacter);

window.addEventListener("keyup", event => {
  switch (direction) {
    case "right":
      PlayerCharacter.changeCurrentSprite("stay-right");
      break;

    case "left":
      PlayerCharacter.changeCurrentSprite("stay-left");
      break;

    case "top":
    case "down":
      PlayerCharacter.changeCurrentSprite("stay-right");
    default:
      break;
  }
});

window.addEventListener("keydown", event => {
  console.log(event.keyCode);
  switch (event.keyCode) {
    // up
    case 38:
      direction = "top";
      PlayerCharacter.changeCurrentSprite("walk-right");
      PlayerCharacter.setPositionY(PlayerCharacter.position.y - 10);
      break;

    // down
    case 40:
      direction = "down";
      PlayerCharacter.changeCurrentSprite("walk-right");
      PlayerCharacter.setPositionY(PlayerCharacter.position.y + 10);
      break;

    // right
    case 39:
      direction = "right";
      PlayerCharacter.changeCurrentSprite("walk-right");
      PlayerCharacter.setPositionX(PlayerCharacter.position.x + 10);
      break;

    // left
    case 37:
      direction = "left";
      PlayerCharacter.changeCurrentSprite("walk-left");
      PlayerCharacter.setPositionX(PlayerCharacter.position.x - 10);
      break;

    // space (attac)
    case 32:
      switch (direction) {
        case "right":
          PlayerCharacter.changeCurrentSprite("attac-right");
          break;

        case "left":
          PlayerCharacter.changeCurrentSprite("attac-left");
          break;

        case "top":
        case "down":
          PlayerCharacter.changeCurrentSprite("attac-right");
        default:
          break;
      }

      break;
  }
});

export { PlayerCharacter };
