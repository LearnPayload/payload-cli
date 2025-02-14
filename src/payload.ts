#!/usr/bin/env bun
import path from "path";
import fs from "fs";
import { Command } from "commander";
import { getPayload } from "payload";

const availableCommands = [
  {
    name: "migrate",
    description: "Run any migrations that have not yet been run",
  },
  {
    name: "migrate:create",
    description: "Create a new migration file in the migrations directory. ",
  },
  {
    name: "migrate:down",
    description: "Roll back the last batch of migrations.",
  },
  {
    name: "migrate:refresh",
    description:
      "Roll back all migrations that have been run, and run them again.",
  },
  { name: "migrate:reset", description: "Roll back all migrations" },
  {
    name: "migrate:status",
    description:
      "Check the status of migrations and output a table of which migrations have been run, and which migrations have not yet run",
  },
  {
    name: "migrate:fresh",
    description:
      "Drops all entities from the database and re-runs all migrations from scratch.",
  },
  {
    name: "db:seed",
    description: "Runs any seeders that are in the db folder.",
  },
];

const payloadConfig = await loadConfig();
const payload = await getPayload({ config: payloadConfig });

const program = new Command();

program.version("0.0.2");

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

program.parse();
