import indiekit from "@indiekit/indiekit";
import config from "../indiekit.config.js";

const app = indiekit(config);

export default async function (req, res) {
  return new Promise((resolve) => {
    app(req, res, () => resolve());
  });
}
