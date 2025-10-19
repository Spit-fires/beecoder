import http from "node:http";
import { hasRoute, routeEvent } from "./Router.ts";
import { Writable } from "node:stream";

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  const { method, url, headers } = req;
  const chunks: Uint8Array<ArrayBufferLike>[] = [];
  let body: string;

  console.info(method, url);

  if (!url) throw Error("URL  not found!");

  if (!hasRoute(method + url)) {
    res.statusCode = 404;
    res.end();

    return;
  }

  req
    .on("data", chunk => chunks.push(chunk))
    .on("end", () => {
      body = Buffer.concat(chunks).toString();
      chunks.length = 0;

      const routerRes = { headers, body };
      const routerReq = {
        writeHead: res.writeHead.bind(res),
        send: send.bind(res),
        end: res.end.bind(res),
        async pipeFrom(stream: ReadableStream<Uint8Array<ArrayBuffer>>) {
          await stream.pipeTo(Writable.toWeb(res));
        }
      };

      routeEvent.emit(method + url, routerRes, routerReq);
    });
});

function send(
  this: http.ServerResponse<http.IncomingMessage>,
  body: object,
  statusCode: number = 200
) {
  this.statusCode = statusCode;

  if (body) {
    this.setHeader("Content-Type", "application/json");
    this.end(JSON.stringify(body));

    return;
  }

  this.end();
}

server.on("error", e => {
  console.error(e);
  server.close();
});

async function listen() {
  return new Promise<void>(resolve => {
    server.listen(11434, "localhost", resolve);
  });
}

export { listen, routeEvent };
