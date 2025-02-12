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
import { DeviceManager } from "../device/DeviceManager";
import { makeRpcCall, NakamaManager } from "../nakama/NakamaManager";
import { GameState, GameStateManager } from "./GameStateManager";
import { UIManager } from "./UIManager";

export class Game {
  private readonly _canvasSize: Vector2;
  private readonly _deviceManager: DeviceManager;
  private readonly _gameStateManager: GameStateManager;
  private readonly _uiManager: UIManager;
  private _nakama: NakamaManager;

  constructor(deviceManager: DeviceManager) {
    this._canvasSize = vec2(1280, 720);
    setCanvasFixedSize(this._canvasSize);
    this._deviceManager = deviceManager;
    this._gameStateManager = GameStateManager.getInstance();
    this._uiManager = UIManager.getInstance();
    this._nakama = NakamaManager.getInstance();
    this._uiManager.createUI();
    this.initialize();
  }

  private async initialize() {
    this._gameStateManager.setState(GameState.AUTHENTICATING);
    await this.createOrGetAccount();
  }

  private async createOrGetAccount() {
    const deviceId = await this._deviceManager.getOrCreateDeviceId();
    if (!deviceId) {
      console.error("Failed to get device ID");
      return;
    }

    const username = `mcun_${deviceId.slice(0, 4)}_${deviceId.slice(deviceId.length - 4)}`;

    try {
      const session = await this._nakama.getClient().authenticateDevice(deviceId, true, username);
      this._nakama.setSession(session);
      console.info("Successfully authenticated:", session);

      // Fetch account data
      const account = await this._nakama.getClient().getAccount(session);
      const userId = account.user?.id;
      console.info("User data:", {
        username: account.user?.username,
        avatarUrl: account.user?.avatar_url,
        userId
      });

      // Initialize player data
      await makeRpcCall("nakama/claim-persona", { personaTag: username });
      await makeRpcCall("tx/game/create-player", { nickname: username });
      const playerInfo = await makeRpcCall("query/game/player-info", { nickname: username });
      console.log("Player info fetched successfully", playerInfo);

      // After successful initialization
      this._gameStateManager.setState(GameState.MENU);
    } catch (error) {
      if (error instanceof Response && error.status === 400) {
        const errorBody = await error.text();
        const errorJson = JSON.parse(errorBody);

        // Check if error is just that persona is already claimed
        if (errorJson?.error?.Message?.includes("already associated with this account")) {
          // This is fine, continue with player setup
          console.log("Persona already claimed by this account, continuing...");
          try {
            await makeRpcCall("tx/game/create-player", { nickname: username });
            const playerInfo = await makeRpcCall("query/game/player-info", { nickname: username });
            console.log("Player info fetched successfully", playerInfo);
            this._gameStateManager.setState(GameState.MENU);
            return;
          } catch (playerError) {
            console.error("Failed to setup player after persona check:", playerError);
            this._gameStateManager.setState(GameState.LOGIN);
            return;
          }
        }

        console.error("RPC call failed (nakama/claim-persona):", JSON.stringify({
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          body: errorBody
        }));
      }
      console.error("Setup failed:", error instanceof Error ? error.message : "Unknown error");
      this._gameStateManager.setState(GameState.LOGIN);
    }
  }

  update(): void {
    switch (this._gameStateManager.getState()) {
      case GameState.LOGIN:
        // console.log("update: Updating login");
        break;
      case GameState.MENU:
        // console.log("update: Updating menu");
        break;
      case GameState.PLAYING:
        // console.log("update: Updating playing");
        break;
      // Add other states as needed
    }
  }


  render(): void {
    switch (this._gameStateManager.getState()) {
      case GameState.AUTHENTICATING:
        // this._uiManager.renderAuthenticatingUI();
        break;
      case GameState.LOGIN:
        // this._uiManager.renderLoginUI();
        break;
      case GameState.MENU:
        // this._uiManager.renderMenuUI();
        break;
      case GameState.PLAYING:
        // this._uiManager.renderPlayingUI();
        break;
    }
  }

  renderPost(): void { }
}
