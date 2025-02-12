import { engineInit } from "littlejsengine";
import { Game } from "./modules/game/Game";
import { DeviceManager } from "./modules/device/DeviceManager";
import { NakamaManager, makeRpcCall } from "./modules/nakama/NakamaManager";

let game: Game;

///////////////////////////////////////////////////////////////////////////////
export function initGame() {
  engineInit(
    async () => {
      // Game init callback
      const deviceManager = new DeviceManager();
      game = new Game(deviceManager);

    },
    () => {
      // Game update callback
      game.update();
    },
    () => {
      // Game updatePost callback
    },
    () => {
      // Game render callback
      game.render();
    },
    () => {
      // Game renderPost callback
      game.renderPost();
    },
    ["tiles.png"]
  );
}

///////////////////////////////////////////////////////////////////////////////
export async function destroyGame() {
  // engineDestroy();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  game.update();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() { }

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  game.render();
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  game.renderPost();
}