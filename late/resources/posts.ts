import type { LateResourceModule } from "../types";
import { postsCreatePreSend, postsUpdatePreSend } from "../utils/routingHooks";
import {
  buildPlatformSelector,
  buildAccountSelectors,
  buildMediaItemsField,
  buildCommonPostFields,
  buildListFields,
} from "../utils/fieldBuilders";

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
        },
        send: {
          preSend: [postsCreatePreSend],
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
        },
        send: {
          preSend: [postsUpdatePreSend],
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
    // Common fields
    ...buildCommonPostFields(),

    // Platform selection
    buildPlatformSelector(),

    // Account selectors for all platforms
    ...buildAccountSelectors(),

    // Media items with proper variable handling
    buildMediaItemsField(),

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
                      noDataExpression: false,
                      description:
                        "URL of the uploaded media file. You can use expressions like ={{ 'https://' + $json.data.color + '.com' }}",
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

    // Threads Conversation Fields
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
                      noDataExpression: false,
                      description:
                        "URL of the uploaded media file. You can use expressions like ={{ 'https://' + $json.data.color + '.com' }}",
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
    ...buildListFields(),
  ],
};
