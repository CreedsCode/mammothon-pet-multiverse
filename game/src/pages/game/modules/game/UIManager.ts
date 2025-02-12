import { GameState, GameStateManager } from "./GameStateManager";
import { getUIObject, getInitUISystem, UIObjectType } from "../../../../lib/littlejs-ui";

export class UIManager {
  private static instance: UIManager;
  private gameStateManager: GameStateManager;
  private currentState: GameState | null = null;
  private _uiRoot: UIObjectType | null = null;
  private UIObjectConstructor: UIObjectType | null = null;

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

  public async initialize(): Promise<void> {
    // Get the UI system components
    const [UIObject, initUISystem] = await Promise.all([
      getUIObject(),
      getInitUISystem()
    ]);

    // Store the constructor
    this.UIObjectConstructor = UIObject;

    // Initialize the UI system
    initUISystem();
  }

  public async createUI(): Promise<void> {
    if (!this.UIObjectConstructor) {
      await this.initialize();
    }

    // One-time UI setup
    this._uiRoot = new this.UIObjectConstructor!();
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