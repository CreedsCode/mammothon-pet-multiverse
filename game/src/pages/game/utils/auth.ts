import { Client } from "@heroiclabs/nakama-js";

export function generateDeviceId() {
  try {
    const newId = crypto.randomUUID().toString();
    localStorage.setItem('@MyApp:deviceKey', newId);
    return newId;
  } catch (error) {
    console.error("Device ID generation failed:", error);
    return null;
  }
}

export async function getOrCreateDeviceId() {
  try {
    const storedId = await localStorage.getItem('@MyApp:deviceKey');
    return storedId || generateDeviceId();
  } catch (error) {
    console.error("Device ID error:", error);
    return generateDeviceId(); // Fallback attempt
  }
}

export async function authenticateWithNakama(client: Client, deviceId: string) {
  try {
    const username = `mcun_${deviceId.slice(0, 4)}_${deviceId.slice(-4)}`;
    const session = await client.authenticateDevice(deviceId, true, username);
    console.info("Auth success:", session);
    return { session, username };
  } catch (error) {
    console.error("Auth failed:", error);
    return { session: null, username: null };
  }
} 