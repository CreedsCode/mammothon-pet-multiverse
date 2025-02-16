import { engineInit, setShowSplashScreen } from "littlejsengine";
import { Game } from "./modules/game/Game";
import { DeviceManager } from "./modules/device/DeviceManager";
import { NakamaManager, makeRpcCall } from "./modules/nakama/NakamaManager";
// Import types from our type definitions
import type { UIObject, UIText, initUISystem } from "../../types/littlejsengine/plugins/uiSystem";
// Import the actual JavaScript implementation
import "../../lib/plugins/uiSystem.js";

let game: Game;
setShowSplashScreen(true);
///////////////////////////////////////////////////////////////////////////////
export function initGame() {
  engineInit(
    async () => {
      // Game init callback
      setShowSplashScreen(true);
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