import { createIndieKit } from "@indiekit/indiekit";

const app = await createIndieKit({
  // Your config will come from env vars
});

export default async function handler(req, res) {
  await app(req, res);
}
