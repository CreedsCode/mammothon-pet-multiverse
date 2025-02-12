export enum GameState {
  AUTHENTICATING,
  LOGIN,
  LOADING,
  MENU,
  PLAYING,
  PAUSED,
  GAME_OVER
}

export class GameStateManager {
  private static instance: GameStateManager;
  private currentState: GameState;
  private stateChangeCallbacks: ((newState: GameState) => void)[] = [];

  private constructor() {
    this.currentState = GameState.AUTHENTICATING;
  }

  public static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  public setState(newState: GameState): void {
    if (this.currentState === newState) return;
    console.log("Setting state to:", newState);
    this.currentState = newState;
    // Notify all subscribers of state change
    this.stateChangeCallbacks.forEach(callback => callback(newState));
  }

  public getState(): GameState {
    return this.currentState;
  }

  public onStateChange(callback: (newState: GameState) => void): void {
    this.stateChangeCallbacks.push(callback);
  }

  isState(state: GameState): boolean {
    return this.currentState === state;
  }
} 