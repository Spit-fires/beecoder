import Program from "./cli/Program.ts";
import { listen } from "./server/Server.ts";
import { accessToken, Logger } from "./utils.ts";

import pkg from "./package.json" with { type: "json" };

import "./routes/index.ts";
import "./routes/api.ts";
import "./routes/v1.ts";

const prg = new Program();
prg.add("-v", () => Logger.log(pkg.version));
prg.add("--version", () => Logger.log(pkg.version));
prg.add("start", start);
prg.add("-h", help);
prg.add("--help", help);
prg.parse();

function help() {
  Logger.log(`${pkg.name}:${pkg.version} ${pkg.description}

Repository:
  https://github.com/${pkg.author}/${pkg.name}

Usage:
  beecoder [command]
  beecoder [flags]

Available Commands:
  start    Start server

Flags:
  -h, --h Help text
  -v, --v Show version information`);
}

async function start() {
  try {
    await accessToken();
    await listen();
  
    Logger.log("Listening: http://localhost:11434");
  } catch (err) {
    Logger.error((err as Error).toString());
    process.exit(1);
  }
}
