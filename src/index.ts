#!/usr/bin/env bun
import path from "path";
import fs from "fs";
import { Command } from "commander";
import { getPayload } from "payload";

const availableCommands = [
  //   { name: "migrate", description: "" },
  //   { name: "migrate:create", description: "" },
  //   { name: "migrate:down", description: "" },
  //   { name: "migrate:refresh", description: "" },
  //   { name: "migrate:reset", description: "" },
  //   { name: "migrate:status", description: "" },
  { name: "migrate:fresh", description: "dddd" },
];

const payloadConfig = await loadConfig();
const payload = await getPayload({ config: payloadConfig });

const program = new Command();

async function loadConfig() {
  const configPath = path.join(process.cwd(), "src", "payload.config.ts");
  if (!fs.existsSync(configPath)) {
    console.error("No config file found at", configPath);
    process.exit(1);
  }
  const config = await import(configPath);
  return config.default;
}

async function loadAction(command: string) {
  const actionPath = path.join(
    __dirname,
    "commands",
    `${command.replace(":", "-")}.ts`
  );
  if (!fs.existsSync(actionPath)) {
    console.error("No config file found at", actionPath);
    process.exit(1);
  }
  const config = await import(actionPath);
  return config.default;
}

for (const command of availableCommands) {
  const action = await loadAction(command.name);
  program
    .command(command.name)
    .description(command.description)
    .action(action(payload));
}

// program
//   .command("migrate:fresh")
//   .description("Reset the database")
//   .action(async (options) => {
//     const config = await loadConfig();
//     const payload = await getPayload({ config });
//     const adapter = payload.db;

//     if (!adapter) {
//       throw new Error("No database adapter found");
//     }
//     await adapter.migrateFresh({ forceAcceptWarning: false });
//     process.exit(0);
//     // Your migration logic here...
//   });

program.parse();
