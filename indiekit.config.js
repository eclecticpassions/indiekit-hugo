export default {
  application: {
    timeZone: 'Asia/Hong_Kong',
    themeColor: '#FFB800',
    themeColorScheme: 'dark',
    name: 'BurgeonLab: Indiekit Server'
  },
  publication: {
    me: 'https://burgeonlab.com',
    mediaStore: '@indiekit/store-s3',
    store: '@indiekit/store-github',
    enrichPostData: true,
    postTypes: { note: [Object], photo: [Object] }
  },
  plugins: [
    '@indiekit/preset-hugo',
    '@indiekit/store-github',
    '@indiekit/store-s3',
    '@indiekit/syndicator-mastodon',
    '@indiekit/endpoint-image',
    '@indiekit/post-type-photo'
  ],
  '@indiekit/preset-hugo': {
    frontMatterFormat: 'toml'
  },
  '@indiekit/store-github': {
    user: process.env.STORE_GITHUB_USER,
    repo: process.env.STORE_GITHUB_REPO,
    branch: 'main'
  },
  '@indiekit/store-s3': {
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read'
  },
  '@indiekit/syndicator-mastodon': {
    includePermalink: true,
    checked: false,
    url: process.env.MASTODON_SERVER,
    user: process.env.MASTODON_USER
  },
  '@indiekit/endpoint-image': { mountPath: '/image' },
  '@indiekit/post-type-photo': {
    name: 'Photo',
    fields: {
      photo: [Object],
      content: {},
      category: {},
      geo: {},
      location: {},
      'post-status': {},
      'mp-photo-alt': [Object],
      published: [Object],
      visibility: {}
    }
  }
}