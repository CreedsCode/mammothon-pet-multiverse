import { Client, Session } from "@heroiclabs/nakama-js";

export class NakamaManager {
  private static instance: NakamaManager;
  private client: Client;
  private session: Session | null = null;

  private constructor() {
    this.client = new Client("defaultkey", "127.0.0.1", "7350");
  }

  static getInstance(): NakamaManager {
    if (!NakamaManager.instance) {
      NakamaManager.instance = new NakamaManager();
    }
    return NakamaManager.instance;
  }

  setSession(session: Session) {
    this.session = session;
  }

  getClient(): Client {
    return this.client;
  }

  getSession(): Session | null {
    return this.session;
  }

  async rpc(route: string, payload: Record<string, unknown> = {}): Promise<unknown> {
    if (!this.session && route !== "nakama/check-username") {
      throw new Error("Session required for this RPC call");
    }
    try {
      const response = await this.client.rpc(this.session!, route, payload);
      return response.payload;
    } catch (error) {
      console.error(`RPC call failed (${route}):`, error);
      throw error;
    }
  }
}

// Simple wrapper for RPC calls
export async function makeRpcCall(route: string, payload: Record<string, unknown> = {}): Promise<unknown> {
  return NakamaManager.getInstance().rpc(route, payload);
} 