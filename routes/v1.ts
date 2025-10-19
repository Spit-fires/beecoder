import Router from "../server/Router.ts";
import { getAccessToken } from "../utils.ts";

const router = new Router();

router.post("/v1/chat/completions", async (req, res) => {
  const token = getAccessToken();

  const headers: Record<string, string> = {
    "content-type": "application/json"
  };

  if (token !== null) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const aiReq = await fetch("https://text.pollinations.ai/openai", {
    method: "POST",
    body: req.body,
    headers
  });

  if (!aiReq.body) throw Error("Body not found.");

  await res.pipeFrom(aiReq.body);

  res.end();
});
