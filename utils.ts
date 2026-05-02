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
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "qwen-coder",
    name: "Qwen 2.5 Coder 32B",
    capabilities: ["completion", "tools"]
  },
  {
    model: "mistral",
    name: "Mistral",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "openai-audio",
    name: "OpenAI Audio",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "openai-audio-large",
    name: "OpenAI Audio Large",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "gemini",
    name: "Gemini 2.5 Flash Lite",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "gemini-flash-lite-3.1",
    name: "Gemini Flash Lite 3.1",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "gemini-fast",
    name: "Gemini Fast",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "deepseek",
    name: "DeepSeek V3.1",
    maxInputChars: 10000,
    capabilities: ["completion", "tools", "thinking"]
  },
  {
    model: "deepseek-pro",
    name: "DeepSeek Pro",
    capabilities: ["completion", "tools", "thinking"]
  },
  {
    model: "grok",
    name: "Grok",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "grok-large",
    name: "Grok Large",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "gemini-search",
    name: "Gemini Search",
    capabilities: ["completion", "vision"]
  },
  {
    model: "midijourney",
    name: "Midijourney",
    capabilities: ["completion", "tools"]
  },
  {
    model: "midijourney-large",
    name: "Midijourney Large",
    capabilities: ["completion", "tools"]
  },
  {
    model: "claude-fast",
    name: "Claude Fast",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "claude",
    name: "Claude",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "claude-large",
    name: "Claude Large",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "claude-opus-4.7",
    name: "Claude Opus 4.7",
    capabilities: ["completion", "tools", "vision"]
  },
  {
    model: "perplexity-fast",
    name: "Perplexity Fast",
    capabilities: ["completion"]
  },
  {
    model: "perplexity-reasoning",
    name: "Perplexity Reasoning",
    capabilities: ["completion", "thinking"]
  },
  {
    model: "kimi",
    name: "Kimi",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "kimi-k2.6",
    name: "Kimi K2.6",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "gemini-large",
    name: "Gemini Large",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "nova-fast",
    name: "Nova Fast",
    capabilities: ["completion", "tools"]
  },
  {
    model: "nova",
    name: "Nova",
    capabilities: ["completion", "tools", "thinking"]
  },
  {
    model: "glm",
    name: "GLM",
    capabilities: ["completion", "tools", "thinking"]
  },
  {
    model: "llama",
    name: "Llama",
    capabilities: ["completion", "tools"]
  },
  {
    model: "minimax",
    name: "MiniMax",
    capabilities: ["completion", "tools", "thinking"]
  },
  {
    model: "mistral-large",
    name: "Mistral Large",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "polly",
    name: "Polly",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "qwen-coder-large",
    name: "Qwen Coder Large",
    capabilities: ["completion", "tools"]
  },
  {
    model: "qwen-large",
    name: "Qwen Large",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "qwen-vision",
    name: "Qwen Vision",
    capabilities: ["completion", "tools", "thinking", "vision"]
  },
  {
    model: "qwen-safety",
    name: "Qwen Safety",
    capabilities: ["completion"]
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
