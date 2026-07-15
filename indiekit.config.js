export default {
    application: {
        name: "BurgeonLab: Indiekit Server",
        port: process.env.PORT,
        url: process.env.INDIEKIT_URL, //comment this line out to access local macOS server: `direnv allow` and `npx indiekit serve --port <PORT NUMBER>`
        timeZone: "Asia/Hong_Kong",
        themeColor: "#ff5e00",
        themeColorScheme: "dark",
    },
    publication: {
        me: process.env.PUBLICATION_URL,
        mediaStore: "@indiekit/store-s3",
        store: "@indiekit/store-gitea",
        enrichPostData: true,
        categories: "https://burgeonlab.com/tags/index.json", // Doesn't work
        postTypes: {
            note: {
                name: "Note",
                post: {
                    path: "content/notes/{yyyy}/{MM}{dd}-{H}{m}{s}.md",
                    url: "/notes/{yyyy}/{MM}{dd}-{H}{m}{s}",
                },
                media: {
                    path: "content/media/{yyyy}/{MM}{dd}-{H}{m}{s}.{ext}",
                    url: "content/media/{yyyy}/{MM}{dd}-{H}{m}{s}.{ext}",
                },
            },
            reply: {
                name: "Reply",
                post: {
                    path: "content/notes/replies/{yyyy}/{MM}{dd}-{H}{m}{s}.md",
                    url: "/notes/{yyyy}/{MM}{dd}-{H}{m}{s}-reply",
                },
            },
            rsvp: {
                name: "RSVP",
                post: {
                    path: "content/notes/rsvps/{yyyy}/{MM}{dd}-{H}{m}{s}.md",
                    url: "/notes/{yyyy}/{MM}{dd}-{H}{m}{s}-rsvp",
                },
            },
            event: {
                name: "Event",
                post: {
                    path: "content/events/{yyyy}/{MM}{dd}-{H}{m}{s}.md",
                    url: "/events/{yyyy}/{MM}{dd}-{H}{m}{s}",
                },
            },
            like: {
                name: "Like",
                post: {
                    path: "content/likes/{yyyy}/{MM}{dd}-{H}{m}{s}.md",
                    url: "/likes/{yyyy}/{t}",
                },
            },
            photo: {
                name: "Photo",
                post: {
                    path: "content/photos/{yyyy}/{MM}{dd}-{H}{m}{s}.md",
                    url: "content/photos/{yyyy}/{MM}{dd}-{H}{m}{s}",
                },
                media: {
                    path: "content/media/{yyyy}/{MM}{dd}-{H}{m}{s}.{ext}",
                    url: "content/media/{yyyy}/{MM}{dd}-{H}{m}{s}.{ext}",
                },
            },
        },
    },
    plugins: [
        "@eclecticpassions/indiekit-preset-hugo",
        "@indiekit/store-gitea",
        "@indiekit/store-s3",
        "@indiekit/syndicator-mastodon",
        "@indiekit/endpoint-webmention-io",
        "@indiekit/endpoint-image",
        "@indiekit/post-type-event",
        "@indiekit/post-type-rsvp",
        "@indiekit/post-type-note",
        "@indiekit/post-type-photo",
        "@indiekit/post-type-reply",
        "@indiekit/post-type-like",
    ],
    "@eclecticpassions/indiekit-preset-hugo": {
        frontMatterFormat: "toml",
    },
    "@indiekit/post-type-note": {
        fields: {
            content: { required: true },
            category: {},
            geo: {},
            location: {},
            "in-reply-to": {},
            "like-of": {},
        },
    },
    "@indiekit/post-type-photo": {
        fields: {
            featured: {},
            photo: {},
            name: {},
            content: {},
            category: {},
            geo: {},
            location: {},
            "in-reply-to": {},
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
        token: process.env.GITEA_TOKEN,
    },
    "@indiekit/store-s3": {
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        bucket: process.env.S3_BUCKET,
        acl: "public-read",
    },
    "@indiekit/endpoint-webmention-io": {
        mountPath: "/webmentions",
        token: process.env.WEBMENTION_IO_TOKEN,
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
