import {
  type Vector2,
  cameraScale,
  drawLine,
  getCameraSize,
  rgb,
  setCameraPos,
  setCanvasFixedSize,
  setObjectDefaultDamping,
  setShowWatermark,
  vec2,
} from "littlejsengine";


export class Game {
  private readonly _canvasSize: Vector2;

  constructor() {
    this._canvasSize = vec2(1280, 720);
    setCanvasFixedSize(this._canvasSize);
  }

  update(): void { }

  render(): void { }

  renderPost(): void { }
}
