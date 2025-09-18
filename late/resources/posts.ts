import type { LateResourceModule } from "../types";

export const postsResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List posts",
      routing: {
        request: {
          method: "GET",
          url: "/posts",
          qs: {
            page: "={{ $parameter.page || 1 }}",
            limit: "={{ $parameter.limit || 10 }}",
            status: "={{ $parameter.status || undefined }}",
            platform: "={{ $parameter.platform || undefined }}",
          },
        },
      },
    },
    {
      name: "Get",
      value: "get",
      action: "Get post",
      routing: {
        request: {
          method: "GET",
          url: "=/posts/{{ $parameter.postId }}",
        },
      },
    },
    {
      name: "Create",
      value: "create",
      action: "Create post",
      routing: {
        request: {
          method: "POST",
          url: "/posts",
          body: {
            content: "={{ $parameter.content }}",
            platforms:
              "={{ (() => {\n  const platforms = [];\n  const selectedPlatforms = $parameter.selectedPlatforms || [];\n  \n  if (selectedPlatforms.includes('twitter') && $parameter.twitterAccounts?.length) {\n    $parameter.twitterAccounts.forEach(accountId => {\n      platforms.push({ platform: 'twitter', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('instagram') && $parameter.instagramAccounts?.length) {\n    $parameter.instagramAccounts.forEach(accountId => {\n      platforms.push({ platform: 'instagram', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('facebook') && $parameter.facebookAccounts?.length) {\n    $parameter.facebookAccounts.forEach(accountId => {\n      platforms.push({ platform: 'facebook', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('linkedin') && $parameter.linkedinAccounts?.length) {\n    $parameter.linkedinAccounts.forEach(accountId => {\n      platforms.push({ platform: 'linkedin', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('tiktok') && $parameter.tiktokAccounts?.length) {\n    $parameter.tiktokAccounts.forEach(accountId => {\n      platforms.push({ platform: 'tiktok', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('youtube') && $parameter.youtubeAccounts?.length) {\n    $parameter.youtubeAccounts.forEach(accountId => {\n      platforms.push({ platform: 'youtube', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('threads') && $parameter.threadsAccounts?.length) {\n    $parameter.threadsAccounts.forEach(accountId => {\n      platforms.push({ platform: 'threads', accountId });\n    });\n  }\n  \n  return platforms;\n})() }}",
            scheduledFor: "={{ $parameter.scheduledFor || undefined }}",
            timezone: "={{ $parameter.timezone || 'UTC' }}",
            publishNow: "={{ $parameter.publishNow || false }}",
            isDraft: "={{ $parameter.isDraft || false }}",
            visibility: "={{ $parameter.visibility || 'public' }}",
            tags: "={{ $parameter.tags ? $parameter.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [] }}",
            mediaItems: "={{ $parameter.mediaItems?.items || [] }}",
            platformSpecificData:
              "={{ (() => { const platformSpecific = {}; if ($parameter.twitterThreadItems?.items?.length > 0) { platformSpecific.threadItems = $parameter.twitterThreadItems.items.map(item => ({ content: item.content, mediaItems: item.mediaItems?.items || [] })); } if ($parameter.threadsThreadItems?.items?.length > 0) { platformSpecific.threadItems = $parameter.threadsThreadItems.items.map(item => ({ content: item.content, mediaItems: item.mediaItems?.items || [] })); } if ($parameter.tiktokPrivacyLevel || $parameter.tiktokAllowComments !== undefined || $parameter.tiktokAllowDuet !== undefined || $parameter.tiktokAllowStitch !== undefined) { platformSpecific.tiktokSettings = { privacy_level: $parameter.tiktokPrivacyLevel || 'PUBLIC_TO_EVERYONE', allow_comment: $parameter.tiktokAllowComments !== false, allow_duet: $parameter.tiktokAllowDuet !== false, allow_stitch: $parameter.tiktokAllowStitch !== false }; } return Object.keys(platformSpecific).length > 0 ? platformSpecific : {}; })() }}",
          },
        },
      },
    },
    {
      name: "Update",
      value: "update",
      action: "Update post",
      routing: {
        request: {
          method: "PUT",
          url: "=/posts/{{ $parameter.postId }}",
          body: {
            content: "={{ $parameter.content || undefined }}",
            platforms:
              "={{ (() => {\n  const platforms = [];\n  const selectedPlatforms = $parameter.selectedPlatforms || [];\n  \n  if (selectedPlatforms.includes('twitter') && $parameter.twitterAccounts?.length) {\n    $parameter.twitterAccounts.forEach(accountId => {\n      platforms.push({ platform: 'twitter', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('instagram') && $parameter.instagramAccounts?.length) {\n    $parameter.instagramAccounts.forEach(accountId => {\n      platforms.push({ platform: 'instagram', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('facebook') && $parameter.facebookAccounts?.length) {\n    $parameter.facebookAccounts.forEach(accountId => {\n      platforms.push({ platform: 'facebook', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('linkedin') && $parameter.linkedinAccounts?.length) {\n    $parameter.linkedinAccounts.forEach(accountId => {\n      platforms.push({ platform: 'linkedin', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('tiktok') && $parameter.tiktokAccounts?.length) {\n    $parameter.tiktokAccounts.forEach(accountId => {\n      platforms.push({ platform: 'tiktok', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('youtube') && $parameter.youtubeAccounts?.length) {\n    $parameter.youtubeAccounts.forEach(accountId => {\n      platforms.push({ platform: 'youtube', accountId });\n    });\n  }\n  \n  if (selectedPlatforms.includes('threads') && $parameter.threadsAccounts?.length) {\n    $parameter.threadsAccounts.forEach(accountId => {\n      platforms.push({ platform: 'threads', accountId });\n    });\n  }\n  \n  return platforms.length > 0 ? platforms : undefined;\n})() }}",
            scheduledFor: "={{ $parameter.scheduledFor || undefined }}",
            timezone: "={{ $parameter.timezone || undefined }}",
            publishNow: "={{ $parameter.publishNow || undefined }}",
            isDraft: "={{ $parameter.isDraft || undefined }}",
            visibility: "={{ $parameter.visibility || undefined }}",
            tags: "={{ $parameter.tags ? $parameter.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : undefined }}",
            mediaItems: "={{ $parameter.mediaItems?.items || undefined }}",
            platformSpecificData:
              "={{ (() => { const platformSpecific = {}; if ($parameter.twitterThreadItems?.items?.length > 0) { platformSpecific.threadItems = $parameter.twitterThreadItems.items.map(item => ({ content: item.content, mediaItems: item.mediaItems?.items || [] })); } if ($parameter.threadsThreadItems?.items?.length > 0) { platformSpecific.threadItems = $parameter.threadsThreadItems.items.map(item => ({ content: item.content, mediaItems: item.mediaItems?.items || [] })); } if ($parameter.tiktokPrivacyLevel || $parameter.tiktokAllowComments !== undefined || $parameter.tiktokAllowDuet !== undefined || $parameter.tiktokAllowStitch !== undefined) { platformSpecific.tiktokSettings = { privacy_level: $parameter.tiktokPrivacyLevel || 'PUBLIC_TO_EVERYONE', allow_comment: $parameter.tiktokAllowComments !== false, allow_duet: $parameter.tiktokAllowDuet !== false, allow_stitch: $parameter.tiktokAllowStitch !== false }; } return Object.keys(platformSpecific).length > 0 ? platformSpecific : undefined; })() }}",
          },
        },
      },
    },
    {
      name: "Delete",
      value: "delete",
      action: "Delete post",
      routing: {
        request: {
          method: "DELETE",
          url: "=/posts/{{ $parameter.postId }}",
        },
      },
    },
    {
      name: "Retry",
      value: "retry",
      action: "Retry failed post",
      routing: {
        request: {
          method: "POST",
          url: "=/posts/{{ $parameter.postId }}/retry",
        },
      },
    },
  ],

  fields: [
    {
      displayName: "Post ID",
      name: "postId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["get", "update", "delete", "retry"],
        },
      },
      description:
        "The unique identifier of the post. You can get this from the 'List Posts' operation or from the response when creating a post.",
      required: true,
    },
    {
      displayName: "Content",
      name: "content",
      type: "string",
      typeOptions: {
        rows: 4,
      },
      default: "",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "The main text content of your post. Will be used across all selected platforms. Note: Different platforms have different character limits (Twitter: 280, LinkedIn: 3000, Instagram: 2200). Emojis and hashtags are supported.",
      placeholder: "Hello, world! 🌍 #socialmedia #automation",
      required: true,
    },
    {
      displayName: "Platforms",
      name: "selectedPlatforms",
      type: "multiOptions",
      options: [
        { name: "Twitter/X", value: "twitter" },
        { name: "Instagram", value: "instagram" },
        { name: "Facebook", value: "facebook" },
        { name: "LinkedIn", value: "linkedin" },
        { name: "TikTok", value: "tiktok" },
        { name: "YouTube", value: "youtube" },
        { name: "Threads", value: "threads" },
      ],
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "Select the platforms where you want to post your content. After selecting platforms, you'll be able to choose specific accounts for each platform.",
      required: true,
    },
    {
      displayName: "Twitter/X Accounts",
      name: "twitterAccounts",
      type: "multiOptions",
      typeOptions: {
        loadOptionsMethod: "getTwitterAccounts",
      },
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["twitter"],
        },
      },
      description:
        "Select the Twitter/X accounts to post to. Make sure you have connected Twitter accounts in your LATE profile.",
      required: false,
    },
    {
      displayName: "Instagram Accounts",
      name: "instagramAccounts",
      type: "multiOptions",
      typeOptions: {
        loadOptionsMethod: "getInstagramAccounts",
      },
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["instagram"],
        },
      },
      description:
        "Select the Instagram accounts to post to. Make sure you have connected Instagram Business accounts in your LATE profile.",
    },
    {
      displayName: "Facebook Accounts",
      name: "facebookAccounts",
      type: "multiOptions",
      typeOptions: {
        loadOptionsMethod: "getFacebookAccounts",
      },
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["facebook"],
        },
      },
      description:
        "Select the Facebook pages to post to. Make sure you have connected Facebook pages in your LATE profile.",
    },
    {
      displayName: "LinkedIn Accounts",
      name: "linkedinAccounts",
      type: "multiOptions",
      typeOptions: {
        loadOptionsMethod: "getLinkedinAccounts",
      },
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["linkedin"],
        },
      },
      description:
        "Select the LinkedIn accounts/companies to post to. Make sure you have connected LinkedIn accounts in your LATE profile.",
    },
    {
      displayName: "TikTok Accounts",
      name: "tiktokAccounts",
      type: "multiOptions",
      typeOptions: {
        loadOptionsMethod: "getTiktokAccounts",
      },
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["tiktok"],
        },
      },
      description:
        "Select the TikTok accounts to post to. Make sure you have connected TikTok accounts in your LATE profile.",
    },
    {
      displayName: "YouTube Accounts",
      name: "youtubeAccounts",
      type: "multiOptions",
      typeOptions: {
        loadOptionsMethod: "getYoutubeAccounts",
      },
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["youtube"],
        },
      },
      description:
        "Select the YouTube channels to post to. Make sure you have connected YouTube channels in your LATE profile.",
    },
    {
      displayName: "Threads Accounts",
      name: "threadsAccounts",
      type: "multiOptions",
      typeOptions: {
        loadOptionsMethod: "getThreadsAccounts",
      },
      default: [],
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["threads"],
        },
      },
      description:
        "Select the Threads accounts to post to. Make sure you have connected Threads accounts in your LATE profile.",
    },
    {
      displayName: "Scheduled For",
      name: "scheduledFor",
      type: "dateTime",
      default: "",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "When to publish the post. Leave empty to publish immediately. Date/time should be in the future. Use together with timezone for accurate scheduling across different time zones.",
    },
    {
      displayName: "Timezone",
      name: "timezone",
      type: "string",
      default: "UTC",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "Timezone for the scheduled post. Use standard timezone names like 'America/New_York', 'Europe/London', 'Asia/Tokyo', etc. Defaults to UTC if not specified.",
      placeholder: "America/New_York",
    },
    {
      displayName: "Publish Now",
      name: "publishNow",
      type: "boolean",
      default: false,
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "Publish the post immediately instead of scheduling it. When enabled, 'Scheduled For' will be ignored and the post will be published right away.",
    },
    {
      displayName: "Is Draft",
      name: "isDraft",
      type: "boolean",
      default: false,
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "Save as draft instead of scheduling or publishing. Drafts don't count toward your upload limits and can be edited later before publishing.",
    },
    {
      displayName: "Visibility",
      name: "visibility",
      type: "options",
      options: [
        {
          name: "Public",
          value: "public",
          description: "Visible to everyone",
        },
        {
          name: "Private",
          value: "private",
          description: "Only visible to followers/connections",
        },
        {
          name: "Unlisted",
          value: "unlisted",
          description:
            "Not shown in public feeds but accessible via direct link",
        },
      ],
      default: "public",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "Who can see this post. Note: Not all platforms support all visibility options. Platform-specific defaults will be used when not supported.",
    },
    {
      displayName: "Tags",
      name: "tags",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "Comma-separated tags/keywords for the post. Primarily used by YouTube for search optimization (500 char limit, ~15 tags max). Keep tags relevant and descriptive.",
      placeholder: "programming, tutorial, automation, n8n",
    },
    {
      displayName: "Media Items",
      name: "mediaItems",
      type: "fixedCollection",
      default: { items: [] },
      typeOptions: {
        multipleValues: true,
        sortable: true,
      },
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description:
        "Media files to attach to your post. Upload files first using 'Media > Upload', then use the returned URLs here. Supports up to 5GB per file.",
      options: [
        {
          name: "items",
          displayName: "Media Items",
          values: [
            {
              displayName: "Type",
              name: "type",
              type: "options",
              options: [
                {
                  name: "Image",
                  value: "image",
                  description: "JPEG, PNG, WebP, GIF images",
                },
                {
                  name: "Video",
                  value: "video",
                  description: "MP4, MOV, AVI, WebM videos",
                },
                {
                  name: "GIF",
                  value: "gif",
                  description: "Animated GIF files",
                },
                {
                  name: "Document",
                  value: "document",
                  description: "PDF documents (LinkedIn only)",
                },
              ],
              default: "image",
              description: "Type of media file",
              required: true,
            },
            {
              displayName: "URL",
              name: "url",
              type: "string",
              default: "",
              description:
                "URL of the uploaded media file from the /v1/media endpoint",
              placeholder:
                "https://getlate.dev/api/v1/media/uploaded-file-url.jpg",
              required: true,
            },
            {
              displayName: "Filename",
              name: "filename",
              type: "string",
              default: "",
              description: "Optional filename for the media file",
              placeholder: "vacation-photo.jpg",
            },
            {
              displayName: "MIME Type",
              name: "mimeType",
              type: "string",
              default: "",
              description:
                "MIME type of the file. Required for documents (e.g., application/pdf)",
              placeholder: "image/jpeg",
              displayOptions: {
                show: {
                  type: ["document"],
                },
              },
            },
          ],
        },
      ],
    },
    // Twitter Thread Fields
    {
      displayName: "Twitter Thread Items",
      name: "twitterThreadItems",
      type: "fixedCollection",
      default: { items: [] },
      typeOptions: {
        multipleValues: true,
        sortable: true,
      },
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["twitter"],
        },
      },
      description:
        "Create Twitter/X threads with multiple tweets. Each tweet supports up to 280 characters. Only the first tweet can include media.",
      options: [
        {
          name: "items",
          displayName: "Thread Items",
          values: [
            {
              displayName: "Content",
              name: "content",
              type: "string",
              typeOptions: {
                rows: 3,
              },
              default: "",
              description: "Content of this tweet (280 characters max)",
              placeholder: "This is tweet 1 of my thread...",
              required: true,
            },
            {
              displayName: "Media Items",
              name: "mediaItems",
              type: "fixedCollection",
              default: { items: [] },
              typeOptions: {
                multipleValues: true,
              },
              description:
                "Media files for this tweet. Note: Only the first tweet in a thread can have media.",
              options: [
                {
                  name: "items",
                  displayName: "Media Items",
                  values: [
                    {
                      displayName: "Type",
                      name: "type",
                      type: "options",
                      options: [
                        { name: "Image", value: "image" },
                        { name: "Video", value: "video" },
                        { name: "GIF", value: "gif" },
                      ],
                      default: "image",
                      description: "Type of media file",
                    },
                    {
                      displayName: "URL",
                      name: "url",
                      type: "string",
                      default: "",
                      description: "URL of the uploaded media file",
                      required: true,
                    },
                    {
                      displayName: "Filename",
                      name: "filename",
                      type: "string",
                      default: "",
                      description: "Optional filename",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // Threads Thread Fields
    {
      displayName: "Threads Conversation Items",
      name: "threadsThreadItems",
      type: "fixedCollection",
      default: { items: [] },
      typeOptions: {
        multipleValues: true,
        sortable: true,
      },
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["threads"],
        },
      },
      description:
        "Create Threads conversations with multiple posts. Each post supports up to 500 characters. Only the first post can include media.",
      options: [
        {
          name: "items",
          displayName: "Conversation Items",
          values: [
            {
              displayName: "Content",
              name: "content",
              type: "string",
              typeOptions: {
                rows: 3,
              },
              default: "",
              description: "Content of this post (500 characters max)",
              placeholder: "This is post 1 of my conversation...",
              required: true,
            },
            {
              displayName: "Media Items",
              name: "mediaItems",
              type: "fixedCollection",
              default: { items: [] },
              typeOptions: {
                multipleValues: true,
              },
              description:
                "Media files for this post. Note: Only the first post in a conversation can have media.",
              options: [
                {
                  name: "items",
                  displayName: "Media Items",
                  values: [
                    {
                      displayName: "Type",
                      name: "type",
                      type: "options",
                      options: [
                        { name: "Image", value: "image" },
                        { name: "Video", value: "video" },
                        { name: "GIF", value: "gif" },
                      ],
                      default: "image",
                      description: "Type of media file",
                    },
                    {
                      displayName: "URL",
                      name: "url",
                      type: "string",
                      default: "",
                      description: "URL of the uploaded media file",
                      required: true,
                    },
                    {
                      displayName: "Filename",
                      name: "filename",
                      type: "string",
                      default: "",
                      description: "Optional filename",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    // TikTok Settings
    {
      displayName: "TikTok Privacy Level",
      name: "tiktokPrivacyLevel",
      type: "options",
      options: [
        { name: "Public to Everyone", value: "PUBLIC_TO_EVERYONE" },
        { name: "Followers Only", value: "MUTUAL_FOLLOW_FRIENDS" },
        { name: "Friends Only", value: "SELF_ONLY" },
      ],
      default: "PUBLIC_TO_EVERYONE",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["tiktok"],
        },
      },
      description: "Who can see your TikTok video",
    },
    {
      displayName: "Allow Comments",
      name: "tiktokAllowComments",
      type: "boolean",
      default: true,
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["tiktok"],
        },
      },
      description: "Allow comments on this TikTok video",
    },
    {
      displayName: "Allow Duets",
      name: "tiktokAllowDuet",
      type: "boolean",
      default: true,
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["tiktok"],
        },
      },
      description: "Allow other users to create duets with this video",
    },
    {
      displayName: "Allow Stitches",
      name: "tiktokAllowStitch",
      type: "boolean",
      default: true,
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
          selectedPlatforms: ["tiktok"],
        },
      },
      description: "Allow other users to stitch this video",
    },
    // List filters
    {
      displayName: "Page",
      name: "page",
      type: "number",
      default: 1,
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["list"],
        },
      },
      description: "Page number",
    },
    {
      displayName: "Limit",
      name: "limit",
      type: "number",
      default: 10,
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["list"],
        },
      },
      description: "Posts per page (max 100)",
    },
    {
      displayName: "Status",
      name: "status",
      type: "options",
      options: [
        { name: "All", value: "" },
        { name: "Draft", value: "draft" },
        { name: "Scheduled", value: "scheduled" },
        { name: "Published", value: "published" },
        { name: "Failed", value: "failed" },
      ],
      default: "",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["list"],
        },
      },
      description: "Filter by status",
    },
    {
      displayName: "Platform",
      name: "platform",
      type: "options",
      options: [
        { name: "All", value: "" },
        { name: "Twitter", value: "twitter" },
        { name: "Instagram", value: "instagram" },
        { name: "Facebook", value: "facebook" },
        { name: "LinkedIn", value: "linkedin" },
        { name: "TikTok", value: "tiktok" },
        { name: "YouTube", value: "youtube" },
        { name: "Threads", value: "threads" },
      ],
      default: "",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["list"],
        },
      },
      description: "Filter by platform",
    },
  ],
};