import path from "path";
import fs from "fs";
import { Payload } from "payload";

export default function (payload: Payload) {
  return async function (options: any) {
    try {
      const seederPath = path.join(process.cwd(), "src", "db", "seed.ts");
      if (!fs.existsSync(seederPath)) {
        console.warn("No seed file found at", seederPath);
        process.exit(0);
      }
      const seeder = await import(seederPath);
      seeder.handler();
    } catch (error: any) {
      throw new Error(`Error running seeder: ${error.message}`);
    }
  };
}
