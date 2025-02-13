import { Payload } from "payload";

export default function (payload: Payload) {
  return async function (options: any) {
    const adapter = payload.db;
    if (!adapter) {
      throw new Error("No database adapter found");
    }
    try {
      await adapter.migrate();
    } catch (err: any) {
      throw new Error(`Error creating migration: ${err.message}`);
    }
  };
}
