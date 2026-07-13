# Indiekit server for https://burgeonlab.com

Visit <https://getindiekit.com> to learn about Indiekit. It is a [Micropub](https://indieweb.org/Micropub) server and client.

## Repository Setup

**Primary source**: <https://codeberg.org/burgeonlab/indiekit-hugo>

**Mirror**: <https://github.com/eclecticpassions/indiekit-hugo> [^2]

## Installed Plugins

- @indiekit/store-gitea
- @indiekit/store-s3
- @indiekit/syndicator-mastodon
@indiekit/endpoint-webmention-io
- ~~@indiekit/preset-hugo~~

## Custom Plugins

- [@eclecticpassions/indiekit-preset-hugo](https://www.npmjs.com/package/@eclecticpassions/indiekit-preset-hugo)

## Notes on Setup

### Services Used

- Previously, my Indiekit server was hosted on Render, but due to cold starts / spin-down due to free-tier limitations; I have moved the server to my Raspberry Pi 4B 8GB using [Docker](https://www.docker.com/) and Docker Compose
  - For public access when using Indiekit as an [IndieAuth](https://getindiekit.com/specifications#indieauth) verification endpoint, [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel) is used temporarily
  - For normal (i.e. personal) usage of Indiekit, public access is not required and accessible only via my [Tailnet](https://tailscale.com/docs/concepts/tailnet?q=tailnet)
- [MongoDB](https://www.mongodb.com/) is semi-required by Indiekit for full functionality (free-tier, fully managed cloud DB called MongoDB Atlas)
- S3-compatible bucket (object storage) as my [media store](https://getindiekit.com/configuration/publication#mediastore) (via [@indiekit/store-s3](https://getindiekit.com/plugins/stores/s3))
  - There are many S3 providers but I am using [OVH's Standard 3-AZ Object Storage](https://www.ovhcloud.com/en/public-cloud/object-storage/) at the moment
- Hosted Git on Codeberg (private repo) as my [content store](https://getindiekit.com/plugins/stores/) (via [@indiekit/store-gitea](https://getindiekit.com/plugins/stores/gitea))
  - Indiekit supports a variety of Git hosts: GitHub, Gitea/Forgejo, Bitbucket, and GitLab
  - Your [content store](https://getindiekit.com/concepts#content-store) doesn't have to be separated like me. It could go into the a single S3 bucket, FTP, file-system, etc

#### Previously

- [Render](https://render.com/) used to host the serverless Indiekit (Node.js app) app (free tier)
  - [Cron-job](https://cron-job.org/en/) can be used to prevent server spinning down, but is [not advised](https://community.render.com/t/will-using-cron-jobs-to-hit-free-tier-web-service-every-13-14-minutes-use-up-my-free-instance-hours/23630/2)

### Configuration Notes

- Separate stores:
  - Media store — S3 object bucket
  - Content store — Gitea repo (Codeberg)
- Media served via [Bunny CDN](https://bunny.net/?ref=k4vc3x5108)[^1]
  - Origin: S3 bucket
  - Edge rule: "override origin url"
  - Workflow: Hugo front matter (Indiekit image link) -> Bunny CDN link -> S3 bucket link -> 🖼️

## Contributions

- [v1.0.0 Beta 26](https://github.com/getindiekit/indiekit/releases/tag/v1.0.0-beta.26)
  - Feature: [Add `public-read` ACL permission to store-s3](https://github.com/getindiekit/indiekit/pull/810)
- [v1.0.0 Beta 27](https://github.com/getindiekit/indiekit/releases/tag/v1.0.0-beta.27)
  - Feature: [Remote domain support for `endpoint-image`](https://github.com/getindiekit/indiekit/issues/814)
  - Bug fix: [Cursor and radio buttons doesn't show in dark mode](https://github.com/getindiekit/indiekit/issues/817)
  - Bug fix: [Date field too short](https://github.com/getindiekit/indiekit/issues/833)
- [v1.0.0 Beta 28](https://github.com/getindiekit/indiekit/releases/tag/v1.0.0-beta.28)
  - Feature: [Markdown handling improvements](https://github.com/getindiekit/indiekit/pull/845)

## To-Do

- [x] Move Indiekit repo and content-store to Codeberg([store-gitea](https://getindiekit.com/plugins/stores/gitea))
- [x] Investigate [Fly.io](https://fly.io/) for hosting Indiekit as they do not [spin down](https://fly.io/docs/launch/autostop-autostart/#configure-automatic-start-and-stop) the server after [15m of inactivity](https://community.fly.io/t/is-there-an-inactivity-delay-for-free-tier/10855) and has a pay-as-you-go [pricing scheme](https://fly.io/docs/about/pricing/) that *should* work out at around USD $2/month
  - Self-hosting with Docker and Raspberry Pi instead
- [x] Customize front matter property name from `category` to `tags` to match my Hugo front matter setup
  - Created my first custom `preset-hugo` plugin (link above)
- [ ] Migrate S3 bucket provider from OVH to Bunny.net where I host all my sites

## Bugs

- Added [publication:categories](https://getindiekit.com/configuration/publication#categories) using URL to JSON file but nothing changed in web interface ([expected something like this](https://github.com/getindiekit/indiekit/pull/521))
- `syndicator-mastodon` doesn't work for `likes` post type ([issue #843](https://github.com/getindiekit/indiekit/issues/843))
- `syndicator-mastodon` doesn't show tags (aka categories) in the syndicated post [(issue #832](https://github.com/getindiekit/indiekit/issues/832)

[^1]: This is an affiliate link. I'm a big fan of Bunny.net, I use Bunny Storage for all my static hosting needs and Bunny CDN to great effect. I've written about them [on my blog](https://burgeonlab.com/support/#bunnynet) if you're interested in trying them with your static website or migrating from GitHub Pages.
[^2]: To run Indiekit on [Render](https://render.com), a GitHub repo is required (Render doesn't support Gitea yet—[issue #3671](https://github.com/issues/created?q=is%3Aissue+state%3Aclosed+archived%3Afalse+author%3A%40me+sort%3Aupdated-desc&issue=buildkite%7Cagent%7C3671)). Therefore, a mirror is set up from Codeberg. *All changes originate from the **primary source**.*
