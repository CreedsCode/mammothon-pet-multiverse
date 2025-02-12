import { Client, Session } from "@heroiclabs/nakama-js";

export async function sendRpcRequest(
  client: Client,
  session: Session | null,
  method: string,
  payload: object
) {
  if (!session) {
    console.error("No session for RPC:", method);
    return null;
  }

  try {
    return await client.rpc(session, method, payload);
  } catch (error) {
    // Handle persona tag conflict specifically
    if (error instanceof Error && 'code' in error && error.code === 9) {
      console.log(`${method}: Persona already claimed (expected)`);
    } else {
      console.error(`${method} failed:`, error instanceof Error ? error.message : "Unknown error");
    }
    return null;
  }
} 