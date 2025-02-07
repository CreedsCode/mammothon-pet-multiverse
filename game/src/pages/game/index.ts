import { engineInit, } from "littlejsengine";
import { Game } from "./modules/game/Game";

let game: Game;

///////////////////////////////////////////////////////////////////////////////
export function initGame() {
  engineInit(
    () => {
      // Game init callback
      game = new Game();
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
export function destroyGame() {
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