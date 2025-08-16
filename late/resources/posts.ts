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
            platforms: "={{ JSON.parse($parameter.platforms || '[]') }}",
            scheduledFor: "={{ $parameter.scheduledFor || undefined }}",
            timezone: "={{ $parameter.timezone || 'UTC' }}",
            publishNow: "={{ $parameter.publishNow || false }}",
            isDraft: "={{ $parameter.isDraft || false }}",
            visibility: "={{ $parameter.visibility || 'public' }}",
            tags: "={{ JSON.parse($parameter.tags || '[]') }}",
            mediaItems: "={{ JSON.parse($parameter.mediaItems || '[]') }}",
            platformSpecificData: "={{ JSON.parse($parameter.platformSpecificData || '{}') }}",
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
            platforms: "={{ $parameter.platforms ? JSON.parse($parameter.platforms) : undefined }}",
            scheduledFor: "={{ $parameter.scheduledFor || undefined }}",
            timezone: "={{ $parameter.timezone || undefined }}",
            publishNow: "={{ $parameter.publishNow || undefined }}",
            isDraft: "={{ $parameter.isDraft || undefined }}",
            visibility: "={{ $parameter.visibility || undefined }}",
            tags: "={{ $parameter.tags ? JSON.parse($parameter.tags) : undefined }}",
            mediaItems: "={{ $parameter.mediaItems ? JSON.parse($parameter.mediaItems) : undefined }}",
            platformSpecificData: "={{ $parameter.platformSpecificData ? JSON.parse($parameter.platformSpecificData) : undefined }}",
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
      description: "The unique identifier of the post. You can get this from the 'List Posts' operation or from the response when creating a post.",
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
      description: "The main text content of your post. Will be used across all selected platforms. Note: Different platforms have different character limits (Twitter: 280, LinkedIn: 3000, Instagram: 2200). Emojis and hashtags are supported.",
      placeholder: "Hello, world! 🌍 #socialmedia #automation",
      required: true,
    },
    {
      displayName: "Platforms",
      name: "platforms",
      type: "json",
      default: "[]",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description: "Array of platforms to post to. Each object needs 'platform' and 'accountId'. Get account IDs from 'Social Accounts > List' operation. Supports: twitter, instagram, facebook, linkedin, tiktok, youtube, threads.",
      placeholder: '[{"platform": "twitter", "accountId": "twitter_account_123"}, {"platform": "linkedin", "accountId": "linkedin_account_456"}]',
      required: true,
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
      description: "When to publish the post. Leave empty to publish immediately. Date/time should be in the future. Use together with timezone for accurate scheduling across different time zones.",
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
      description: "Timezone for the scheduled post. Use standard timezone names like 'America/New_York', 'Europe/London', 'Asia/Tokyo', etc. Defaults to UTC if not specified.",
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
      description: "Publish the post immediately instead of scheduling it. When enabled, 'Scheduled For' will be ignored and the post will be published right away.",
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
      description: "Save as draft instead of scheduling or publishing. Drafts don't count toward your upload limits and can be edited later before publishing.",
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
          description: "Not shown in public feeds but accessible via direct link",
        },
      ],
      default: "public",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description: "Who can see this post. Note: Not all platforms support all visibility options. Platform-specific defaults will be used when not supported.",
    },
    {
      displayName: "Tags",
      name: "tags",
      type: "json",
      default: "[]",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description: "Array of tags/keywords for the post. Primarily used by YouTube for search optimization (500 char limit, ~15 tags max). Keep tags relevant and descriptive.",
      placeholder: '["programming", "tutorial", "automation", "n8n"]',
    },
    {
      displayName: "Media Items",
      name: "mediaItems",
      type: "json",
      default: "[]",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description: "Array of media files to attach (images, videos, GIFs). Upload files first using 'Media > Upload', then use the returned URLs here. Supports up to 5GB per file.",
      placeholder: '[{"type": "image", "url": "https://uploaded-file-url.jpg"}, {"type": "video", "url": "https://uploaded-video-url.mp4"}]',
    },
    {
      displayName: "Platform Specific Data",
      name: "platformSpecificData",
      type: "json",
      default: "{}",
      displayOptions: {
        show: {
          resource: ["posts"],
          operation: ["create", "update"],
        },
      },
      description: "Advanced platform-specific settings. Examples: TikTok privacy settings, Instagram story type, Twitter threads, YouTube first comments, etc. Nested inside each platform in the platforms array.",
      placeholder: '{"tiktokSettings": {"privacy_level": "PUBLIC_TO_EVERYONE", "allow_comment": true}, "threadItems": [{"content": "Tweet 1"}, {"content": "Tweet 2"}]}',
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