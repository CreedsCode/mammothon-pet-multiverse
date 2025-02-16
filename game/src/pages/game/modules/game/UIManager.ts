/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { GameState, GameStateManager } from "./GameStateManager";
import { vec2, WHITE } from "littlejsengine";

// Import types from our type definitions
import type { UIObject, UIText, initUISystem } from "../../../../types/littlejsengine/plugins/uiSystem";
// Import the actual JavaScript implementation
import "../../../../lib/plugins/uiSystem.js";

export class UIManager {
  private static instance: UIManager;
  private gameStateManager: GameStateManager;
  private currentState: GameState | null = null;
  private _uiRoot: UIObject | null = null;

  private constructor() {
    this.gameStateManager = GameStateManager.getInstance();
    console.log("init ui done")
    // Subscribe to state changes
    this.gameStateManager.onStateChange((newState: GameState) => {
      this.handleStateChange(newState);
    });
  }

  public static getInstance(): UIManager {
    if (!UIManager.instance) {
      UIManager.instance = new UIManager();
    }
    return UIManager.instance;
  }

  public async createUI(): Promise<void> {
    this._uiRoot = new UIObject();
    const uiInfo = new UIText(vec2(0, 50), vec2(1e3, 70),
      'LittleJS UI System Example\nM = Toggle menu');
    uiInfo.textColor = WHITE;
    uiInfo.lineWidth = 8;
    this._uiRoot.addChild(uiInfo);
    console.log("UI initialized");
  }

  private handleStateChange(newState: GameState): void {
    this.currentState = newState;

    // Switch to appropriate UI based on new state
    switch (newState) {
      case GameState.AUTHENTICATING:
        this.renderAuthenticatingUI();
        break;
      case GameState.LOGIN:
        this.renderLoginUI();
        break;
      case GameState.MENU:
        this.renderMenuUI();
        break;
      case GameState.PLAYING:
        this.renderPlayingUI();
        break;
    }
  }

  public renderAuthenticatingUI(): void {
    // Render authenticating UI
    console.log("Rendering auth UI");
  }

  public renderLoginUI(): void {
    // Render login UI
    console.log("Rendering login UI");
  }

  public renderMenuUI(): void {
    // Render menu UI
    console.log("Rendering menu UI");
  }

  public renderPlayingUI(): void {
    // Render playing UI
    console.log("Rendering playing UI");
  }
} 