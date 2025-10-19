import Router from "../server/Router.ts";

const router = new Router();

router.get("/", (_, res) => {
  res.writeHead(200);
  res.end("ok");
});
