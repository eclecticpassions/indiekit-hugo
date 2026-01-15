import http from "http";
import indiekit from "@indiekit/indiekit";
import config from "./indiekit.config.js"; // adjust path/filename if needed

const app = indiekit(config);

function normalizePath(rawUrl = "/") {
return rawUrl.split("?")[0].replace(new RegExp("/+$"), "") || "/";
}

const handler = (req, res) => {
const path = normalizePath(req.url);

if (path === "/" || path === "/ping" || path === "/health") {
res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
res.end("OK");
return;
}

// delegate to Indiekit middleware (connect-style)
app(req, res, () => {
if (!res.writableEnded) {
res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
res.end("Not found");
}
});
};

const port = process.env.PORT || 8822;
const server = http.createServer(handler);

server.listen(port, () => {
  console.log("Server listening on " + port);
});

