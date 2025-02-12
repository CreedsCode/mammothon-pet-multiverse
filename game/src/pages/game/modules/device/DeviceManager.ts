export class DeviceManager {
  private readonly DEVICE_KEY = '@MyApp:deviceKey';
  private _deviceId: string | null = null;
  constructor() {
    this._deviceId = ""
    this.init();
  }

  private async init() {
    this._deviceId = await this.getOrCreateDeviceId();
    if (!this._deviceId) {
      console.error("Failed to get or create device ID");
      throw new Error("Failed to get or create device ID");
    } else {
      console.info("Device ID initialized:", this._deviceId);
    }
  }

  async getOrCreateDeviceId(): Promise<string | null> {
    try {
      const existingId = await localStorage.getItem(this.DEVICE_KEY);
      if (existingId) {
        return existingId;
      }

      const newDeviceId = crypto.randomUUID().toString();
      await localStorage.setItem(this.DEVICE_KEY, newDeviceId);
      return newDeviceId;
    } catch (error) {
      console.log("An error occurred while managing device ID: %o", error);
      return null;
    }
  }
}