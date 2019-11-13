import { createApp } from "../main/index";
import Sprite from "../main/atoms/Sprite";

import { PlayerCharacter } from "./game/Character";
import { IMiddleware } from "../main/declare";
import { Land } from "./game/Land";

const m1: IMiddleware = app => {
  app.draw(PlayerCharacter.draw);
  app.draw(Land.draw);
};

Land.debug = true;
PlayerCharacter.debug = true;

const collisions: IMiddleware = app => {
  // console.log(PlayerCharacter.checkCollision(Land));
};

const app = createApp({ root: "#root", middlewares: [m1, collisions] });

app.registerGameObject(PlayerCharacter);
app.registerGameObject(Land);
