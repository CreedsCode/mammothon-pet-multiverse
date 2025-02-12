import { GameState, GameStateManager } from "./GameStateManager";

export class UIManager {
  private static instance: UIManager;
  private gameStateManager: GameStateManager;
  private currentState: GameState | null = null;

  private constructor() {
    this.gameStateManager = GameStateManager.getInstance();
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

  public createUI(): void {
    // One-time UI setup
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
    console.log("Rendering authenticating UI");
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