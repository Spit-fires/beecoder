import Router from "../server/Router.ts";
import { getModel } from "../utils.ts";

const router = new Router();

router.get("/api/version", (_, res) => {
  const data = {
    version: "0.19.2"
  };

  res.send(data);
});

router.get("/api/tags", (_, res) => {
  const models = getModel();

  res.send({ models });
});

router.post("/api/show", (req, res) => {
  const body = JSON.parse(req.body) as { model: string };

  const model = getModel(body.model);

  const data = {
    details: {},
    model_info: {},
    capabilities: model.capabilities,
    modified_at: "0001-01-01T00:00:00Z"
  };

  res.send(data);
});
