export default {
  application: {
    timeZone: "Asia/Hong_Kong",
    themeColor: "#ff5e00",
    themeColorScheme: "dark",
    name: "BurgeonLab: Indiekit Server",
  },
  publication: {
    me: process.env.PUBLICATION_URL,
    mediaStore: "@indiekit/store-s3",
    store: "@indiekit/store-gitea",
    enrichPostData: true,
    categories: `${process.env.PUBLICATION_URL}/tags/index.json`,
    postTypes: {
      note: {
        name: "Microblog",
        post: {
          path: "content/notes/{yyyy}/{DDD}{n}.md",
          url: "/notes/{yyyy}/{DDD}{n}",
        },
        media: {
          path: "content/media/{yyyy}/{DDD}{n}.{ext}",
          url: "content/media/{yyyy}/{DDD}{n}.{ext}",
        },
      },
      photo: {
        name: "Photo",
        post: {
          path: "content/photos/{yyyy}/{DDD}{n}.md",
          url: "content/photos/{yyyy}/{DDD}{n}",
        },
        media: {
          path: "content/media/{yyyy}/{DDD}{n}.{ext}",
          url: "content/media/{yyyy}/{DDD}{n}.{ext}",
        },
      },
    },
  },
  plugins: [
    "@indiekit/preset-hugo",
    "@indiekit/store-github",
    "@indiekit/store-gitea",
    "@indiekit/store-s3",
    "@indiekit/syndicator-mastodon",
    "@indiekit/endpoint-image",
    "@indiekit/post-type-note",
    "@indiekit/post-type-photo",
  ],
  "@indiekit/preset-hugo": {
    frontMatterFormat: "toml",
  },
  "@indiekit/post-type-note": {
    fields: {
      name: {},
      content: { required: true },
      category: {},
      geo: {},
      location: {},
      summary: {},
    },
  },
  "@indiekit/post-type-photo": {
    fields: {
      featured: { required: true },
      name: {},
      content: {},
      category: {},
      geo: {},
      location: {},
    },
  },
  "@indiekit/store-github": {
    user: process.env.STORE_GITHUB_USER,
    repo: process.env.STORE_GITHUB_REPO,
    branch: "main",
  },
  "@indiekit/store-gitea": {
    user: process.env.STORE_GITEA_USER,
    repo: process.env.STORE_GITEA_REPO,
    branch: "main",
    instance: "https://codeberg.org",
  },
  "@indiekit/store-s3": {
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
  },
  "@indiekit/syndicator-mastodon": {
    includePermalink: true,
    checked: false,
    url: process.env.MASTODON_SERVER,
    user: process.env.MASTODON_USER,
  },
  "@indiekit/endpoint-image": {
    mountPath: "/image",
  },
};
