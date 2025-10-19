import EventEmitter from "node:events";
import type http from "node:http";

interface IReq {
  headers: http.IncomingHttpHeaders;
  body: string;
}

interface IRes {
  writeHead: (statusCode: number, headers?: Record<string, string>) => void;
  send: (body: object, statusCode?: number) => void;
  end: (body?: string) => void;
  pipeFrom: (stream: ReadableStream<Uint8Array<ArrayBuffer>>) => Promise<void>;
}

class RouteEvent extends EventEmitter {}
const routeEvent = new RouteEvent();

const routes = new Set();

class Router {
  constructor() {}

  get(path: string, fun: (req: IReq, res: IRes) => void) {
    const key = "GET" + path;
    routeEvent.on(key, fun);
    routes.add(key);
  }

  post(path: string, fun: (req: IReq, res: IRes) => void) {
    const key = "POST" + path;
    routeEvent.on(key, fun);
    routes.add(key);
  }
}

function hasRoute(path: string) {
  return routes.has(path);
}

export default Router;
export { hasRoute, routeEvent };
