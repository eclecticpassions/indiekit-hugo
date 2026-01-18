export default {
  application: {
    timeZone: "Asia/Hong_Kong",
    themeColor: "#FFB800",
    themeColorScheme: "dark",
    name: "BurgeonLab: Indiekit Server",
  },
  publication: {
    me: process.env.PUBLICATION_URL,
    mediaStore: "@indiekit/store-s3",
    store: "@indiekit/store-gitea",
    enrichPostData: true,
    postTemplate: (properties) => {
      if (properties.category) {
        properties.tags = properties.category;
      }
      return Indiekit.publication.postTemplate(properties);
    },
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
        fields: {
          title: {}
        }
      },
    }
  },
  plugins: [
    "@indiekit/preset-hugo",
    "@indiekit/store-github",
    "@indiekit/store-gitea",
    "@indiekit/store-s3",
    "@indiekit/syndicator-mastodon",
    "@indiekit/endpoint-image",
    "@indiekit/post-type-photo",
  ],
  "@indiekit/preset-hugo": {
    frontMatterFormat: "toml",
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
  "@indiekit/post-type-photo": {
    name: "Photo",
    fields: {
      photo: { required: true },
      content: {},
      category: {},
      location: {},
      geo: {},
      "post-status": {},
      "mp-photo-alt": { required: true },
      published: { required: true },
      visibility: {},
    },
  },
};
