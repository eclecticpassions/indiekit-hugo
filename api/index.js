import indiekit from "@indiekit/indiekit";
import config from "../indiekitrc";

const app = indiekit(config);

export default async function (req, res) {
  // simple health check that bypasses indiekit and returns 200 OK
  if (req.url === "/ping" || req.url === "/health") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("OK");
    return;
  }
  return new Promise((resolve) => {
    app(req, res, () => resolve());
  });
}
