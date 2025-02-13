import { Payload } from "payload";

export default function (payload: Payload) {
  return async function (options: any) {
    const adapter = payload.db;
    if (!adapter) {
      throw new Error("No database adapter found");
    }
    try {
      await adapter.migrateStatus();
    } catch (error: any) {
      throw new Error(`Error running migrate:status: ${error.message}`);
    }
    process.exit(0);
  };
}
