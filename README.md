# Indiekit server for https://burgeonlab.com

Learn more at <https://getindiekit.com>

## Plugins Used

- preset-hugo
- store-s3
- store-github
- syndicator-mastodon

## Notes on Set Up

- Hosting Indiekit on Render.com (free tier)
- Separate stores:
  - Media store — S3 object bucket
  - Content store — Git repo
- Media served via [Bunny CDN](https://bunny.net/?ref=k4vc3x5108)[^1]
  - Origin: S3 bucket
  - Edge rule: "override origin url"
  - Workflow: Hugo front matter (Indiekit image link) -> Bunny CDN link -> S3 bucket link -> 🖼️

[^1]: This is an affiliate link. I'm a big fan of Bunny.net, I use Bunny Storage for all my static hosting needs and Bunny CDN to great effect. I've written about them [on my blog](https://burgeonlab.com/support/#bunnynet) if you're interested in trying them with your static website or migrating from GitHub Pages.

## My Contributions

- [v1.0.0 Beta 26](https://github.com/getindiekit/indiekit/releases/tag/v1.0.0-beta.26): Add `public-read` ACL permission to store-s3

## To-Do

- [ ] [Add publication:categories](https://getindiekit.com/configuration/publication#categories) using a URL for a list of tags in json
- [ ] Move Indiekit repo and content-store to Codeberg([store-gitea](https://getindiekit.com/plugins/stores/gitea))
