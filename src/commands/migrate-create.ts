import { Payload } from "payload";

export default function (payload: Payload) {
  return async function (options: any) {
    const adapter = payload.db;
    if (!adapter) {
      throw new Error("No database adapter found");
    }

    const file = "migrations";
    const forceAcceptWarning = false;
    const migrationName = "";
    const skipEmpty = false;

    try {
      await adapter.createMigration({
        file,
        forceAcceptWarning,
        migrationName,
        payload,
        skipEmpty,
      });
    } catch (err: any) {
      throw new Error(`Error creating migration: ${err.message}`);
    }

    process.exit(0);
  };
}
