import { Client, Session } from "@heroiclabs/nakama-js";
import { DeviceManager } from "../device/DeviceManager";

export class AuthManager {
  private session: Session | null = null;
  private username: string | null = null;

  constructor(
    private client: Client,
    private deviceManager: DeviceManager
  ) { }

  async authenticate(): Promise<Session> {
    const deviceId = await this.deviceManager.getOrCreateDeviceId();
    if (!deviceId) {
      throw new Error("Failed to get device ID");
    }

    this.username = this.generateUsername(deviceId);
    this.session = await this.client.authenticateDevice(deviceId, true, this.username);

    return this.session;
  }

  private generateUsername(deviceId: string): string {
    return `mcun_${deviceId.slice(0, 4)}_${deviceId.slice(-4)}`;
  }

  getSession(): Session | null {
    return this.session;
  }

  getUsername(): string | null {
    return this.username;
  }
} 