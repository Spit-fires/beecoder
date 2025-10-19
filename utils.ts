import { homedir } from "node:os";
import { join } from "node:path";
import { readFile, access } from "node:fs/promises";

interface IModel {
  model: string;
  name: string;
  maxInputChars?: number;
  capabilities: Array<"completion" | "tools" | "thinking" | "vision">;
}

let token: null | string = null;

const models: IModel[] = [
  {
    model: "deepseek",
    name: "DeepSeek V3.1",
    maxInputChars: 10000,
    capabilities: ["completion", "tools", "thinking"]
  },
  {
    model: "gemini",
    name: "Gemini 2.5 Flash Lite",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "openai",
    name: "OpenAI GPT-5 Nano",
    maxInputChars: 7000,
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "openai-fast",
    name: "OpenAI GPT-4.1 Nano",
    maxInputChars: 5000,
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "openai-large",
    name: "OpenAI GPT-5 Chat",
    maxInputChars: 30000,
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "openai-reasoning",
    name: "OpenAI o4 Mini",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "qwen-coder",
    name: "Qwen 2.5 Coder 32B",
    capabilities: ["completion", "tools", "vision"]
  }
];

async function accessToken() {
  const cfgFile = join(homedir(), ".beecoder");

  try {
    await access(cfgFile);
  } catch {
    return;
  }

  token = await readFile(cfgFile, { encoding: "utf8" });
}

function getAccessToken() {
  return token;
}

function getModel(): IModel[];
function getModel(model: string): IModel;
function getModel(model?: string) {
  if (model == undefined) return models;

  return models.find(mod => mod.model === model)!;
}

class Logger {
  static log(...msg: string[]) {
    process.stdout.write(msg.join(" ") + "\n");
  }

  static error(...msg: string[]) {
    process.stderr.write(msg.join(" ") + "\n");
  }
}

export { accessToken, getAccessToken, getModel, Logger };
