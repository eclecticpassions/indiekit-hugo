# Indiekit server for https://burgeonlab.com

Learn more at <https://getindiekit.com>

## Repository Setup

**Primary source**: https://codeberg.org/burgeonlab/indiekit-hugo

**Mirror**: https://github.com/eclecticpassions/indiekit-hugo

To run Indiekit on Render.com, a GitHub repo is required (no Gitea support yet on Render, [#3671](https://github.com/issues/created?q=is%3Aissue+state%3Aclosed+archived%3Afalse+author%3A%40me+sort%3Aupdated-desc&issue=buildkite%7Cagent%7C3671)). Therefore, a mirror is set up from Codeberg. All changes originate from the primary source.

## Installed Plugins

- @indiekit/preset-hugo
- @indiekit/store-gitea
- @indiekit/store-s3
- @indiekit/syndicator-mastodon

## Notes on Setup

### Services Used

- [Render](https://render.com/) used to host the serverless Indiekit (Node.js app) app (free tier)
  - [MongoDB](https://www.mongodb.com/) is semi-required by Indiekit for full functionality (free-tier)
  - [Cron-job](https://cron-job.org/en/) can be used to prevent server spinning down, but is [not advised](https://community.render.com/t/will-using-cron-jobs-to-hit-free-tier-web-service-every-13-14-minutes-use-up-my-free-instance-hours/23630/2)
- S3-compatible bucket (object storage) as my [media store](https://getindiekit.com/configuration/publication#mediastore) (via [@indiekit/store-s3](https://getindiekit.com/plugins/stores/s3))
  - There are many S3 providers but I am using [OVH's Standard 3-AZ Object Storage](https://www.ovhcloud.com/en/public-cloud/object-storage/) at the moment
- Hosted Git Repo as my [content store](https://getindiekit.com/plugins/stores/) (via [@indiekit/store-gitea](https://getindiekit.com/plugins/stores/gitea))
  - Indiekit supports a variety of Git hosts: GitHub, Gitea/Forgejo, Bitbucket, and GitLab
  - Your content store doesn't have to be separated like me. It could go into the a single S3 bucket or via FTP, file system options

### Configuation Notes

- Separate stores:
  - Media store — S3 object bucket
  - Content store — Gitea repo (Codeberg)
- Media served via [Bunny CDN](https://bunny.net/?ref=k4vc3x5108)[^1]
  - Origin: S3 bucket
  - Edge rule: "override origin url"
  - Workflow: Hugo front matter (Indiekit image link) -> Bunny CDN link -> S3 bucket link -> 🖼️

## Contributions

- [v1.0.0 Beta 26](https://github.com/getindiekit/indiekit/releases/tag/v1.0.0-beta.26): Add `public-read` ACL permission to store-s3

## To-Do

- [x] [Add publication:categories](https://getindiekit.com/configuration/publication#categories) using a URL for a list of tags in json—added but nothing changed in the interface?
- [x] Move Indiekit repo and content-store to Codeberg([store-gitea](https://getindiekit.com/plugins/stores/gitea))
- [ ] Investigate [Fly.io](https://fly.io/) for hosting Indiekit as they do not [spin down](https://fly.io/docs/launch/autostop-autostart/#configure-automatic-start-and-stop) the server after [15m of inactivity](https://community.fly.io/t/is-there-an-inactivity-delay-for-free-tier/10855) and has a pay-as-you-go [pricing scheme](https://fly.io/docs/about/pricing/) that *should* work out at around USD $2/month

## Bugs

- Date field is not displayed fully (blocked by the calendar icon)
- Blinking/typing cursor doesn't show when typing in dark mode

[^1]: This is an affiliate link. I'm a big fan of Bunny.net, I use Bunny Storage for all my static hosting needs and Bunny CDN to great effect. I've written about them [on my blog](https://burgeonlab.com/support/#bunnynet) if you're interested in trying them with your static website or migrating from GitHub Pages.