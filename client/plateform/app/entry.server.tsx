import { PassThrough } from "node:stream";
import { parse } from "cookie";
import { ServerRouter } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { renderToPipeableStream } from "react-dom/server";
import i18n from "../i18n";

export const streamTimeout = 5000;

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: any,
  loadContext: any
) {
  return new Promise((resolve, reject) => {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    const lang = cookies.lang || "en";

    i18n.changeLanguage(lang);

    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      }
    );

    setTimeout(abort, streamTimeout + 1000);
  });
}
