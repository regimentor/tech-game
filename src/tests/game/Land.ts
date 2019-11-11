import SceneObject from "../../main/atoms/SceneObject";
import Sprite from "../../main/atoms/Sprite";
// @ts-ignore
import landSprite from "../../assets/land.png";
import {RigidBody} from "../../main/atoms/RigidBody";




const Land = SceneObject.create({
  width: 192,
  height: 64,
  startPosition: {x: 100, y: 150},
  rigidBody: RigidBody.create({
    offsetLeft: -10,
    offsetRight: -10,
    offsetBottom: -10,
    offsetTop: -10
  }),


  startSprite: 'main',
  spriteMap: {
    main: Sprite.create(landSprite, {
      cut: {
        x: 0,
        y: 0,
        height: 64,
        width: 192
      }
    })
  },



});


export  {Land}