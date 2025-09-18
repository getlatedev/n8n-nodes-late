import type {
  INodeType,
  INodeTypeDescription,
  ILoadOptionsFunctions,
  INodePropertyOptions,
  IExecuteFunctions,
  INodeExecutionData,
} from "n8n-workflow";
import { NodeConnectionType } from "n8n-workflow";
import { buildNodeProperties } from "./utils/nodeBuilder";
import {
  profilesResource,
  postsResource,
  mediaResource,
  accountsResource,
  connectResource,
  usageResource,
  facebookResource,
  linkedinResource,
  cloneResource,
} from "./resources";

export class Late implements INodeType {
  methods = {
    loadOptions: {
      async getTwitterAccounts(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        try {
          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method: "GET",
              url: "https://getlate.dev/api/v1/accounts",
              json: true,
            }
          );

          if (!response?.accounts) {
            console.log("No accounts found in response:", response);
            return [{ name: "No Twitter accounts found", value: "none" }];
          }

          const twitterAccounts = response.accounts.filter(
            (account: any) => account.platform === "twitter"
          );

          if (twitterAccounts.length === 0) {
            return [{ name: "No Twitter accounts connected", value: "none" }];
          }

          return twitterAccounts.map((account: any) => ({
            name: `@${account.username || account.displayName || account._id}`,
            value: account._id,
          }));
        } catch (error) {
          console.error("Error loading Twitter accounts:", error);
          const errorMsg =
            (error as any)?.cause?.code === "ECONNREFUSED"
              ? "Cannot connect to LATE API. Please check your internet connection."
              : (error as Error).message || "Failed to load accounts";
          return [{ name: `Error: ${errorMsg}`, value: "error" }];
        }
      },

      async getInstagramAccounts(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        try {
          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method: "GET",
              url: "https://getlate.dev/api/v1/accounts",
              json: true,
            }
          );

          if (!response?.accounts) {
            return [{ name: "No Instagram accounts found", value: "none" }];
          }

          const instagramAccounts = response.accounts.filter(
            (account: any) => account.platform === "instagram"
          );

          if (instagramAccounts.length === 0) {
            return [{ name: "No Instagram accounts connected", value: "none" }];
          }

          return instagramAccounts.map((account: any) => ({
            name: `@${account.username || account.displayName || account._id}`,
            value: account._id,
          }));
        } catch (error) {
          console.error("Error loading Instagram accounts:", error);
          const errorMsg =
            (error as any)?.cause?.code === "ECONNREFUSED"
              ? "Cannot connect to LATE API. Please check your internet connection."
              : (error as Error).message || "Failed to load accounts";
          return [{ name: `Error: ${errorMsg}`, value: "error" }];
        }
      },

      async getFacebookAccounts(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        try {
          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method: "GET",
              url: "https://getlate.dev/api/v1/accounts",
              json: true,
            }
          );

          if (!response?.accounts) {
            return [{ name: "No Facebook accounts found", value: "none" }];
          }

          const facebookAccounts = response.accounts.filter(
            (account: any) => account.platform === "facebook"
          );

          if (facebookAccounts.length === 0) {
            return [{ name: "No Facebook accounts connected", value: "none" }];
          }

          return facebookAccounts.map((account: any) => ({
            name: account.username || account.displayName || account._id,
            value: account._id,
          }));
        } catch (error) {
          console.error("Error loading Facebook accounts:", error);
          const errorMsg =
            (error as any)?.cause?.code === "ECONNREFUSED"
              ? "Cannot connect to LATE API. Please check your internet connection."
              : (error as Error).message || "Failed to load accounts";
          return [{ name: `Error: ${errorMsg}`, value: "error" }];
        }
      },

      async getLinkedinAccounts(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        try {
          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method: "GET",
              url: "https://getlate.dev/api/v1/accounts",
              json: true,
            }
          );

          if (!response?.accounts) {
            return [{ name: "No LinkedIn accounts found", value: "none" }];
          }

          const linkedinAccounts = response.accounts.filter(
            (account: any) => account.platform === "linkedin"
          );

          if (linkedinAccounts.length === 0) {
            return [{ name: "No LinkedIn accounts connected", value: "none" }];
          }

          return linkedinAccounts.map((account: any) => ({
            name: account.username || account.displayName || account._id,
            value: account._id,
          }));
        } catch (error) {
          console.error("Error loading LinkedIn accounts:", error);
          const errorMsg =
            (error as any)?.cause?.code === "ECONNREFUSED"
              ? "Cannot connect to LATE API. Please check your internet connection."
              : (error as Error).message || "Failed to load accounts";
          return [{ name: `Error: ${errorMsg}`, value: "error" }];
        }
      },

      async getTiktokAccounts(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        try {
          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method: "GET",
              url: "https://getlate.dev/api/v1/accounts",
              json: true,
            }
          );

          if (!response?.accounts) {
            return [{ name: "No TikTok accounts found", value: "none" }];
          }

          const tiktokAccounts = response.accounts.filter(
            (account: any) => account.platform === "tiktok"
          );

          if (tiktokAccounts.length === 0) {
            return [{ name: "No TikTok accounts connected", value: "none" }];
          }

          return tiktokAccounts.map((account: any) => ({
            name: `@${account.username || account.displayName || account._id}`,
            value: account._id,
          }));
        } catch (error) {
          console.error("Error loading TikTok accounts:", error);
          const errorMsg =
            (error as any)?.cause?.code === "ECONNREFUSED"
              ? "Cannot connect to LATE API. Please check your internet connection."
              : (error as Error).message || "Failed to load accounts";
          return [{ name: `Error: ${errorMsg}`, value: "error" }];
        }
      },

      async getYoutubeAccounts(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        try {
          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method: "GET",
              url: "https://getlate.dev/api/v1/accounts",
              json: true,
            }
          );

          if (!response?.accounts) {
            return [{ name: "No YouTube accounts found", value: "none" }];
          }

          const youtubeAccounts = response.accounts.filter(
            (account: any) => account.platform === "youtube"
          );

          if (youtubeAccounts.length === 0) {
            return [{ name: "No YouTube accounts connected", value: "none" }];
          }

          return youtubeAccounts.map((account: any) => ({
            name: account.username || account.displayName || account._id,
            value: account._id,
          }));
        } catch (error) {
          console.error("Error loading YouTube accounts:", error);
          const errorMsg =
            (error as any)?.cause?.code === "ECONNREFUSED"
              ? "Cannot connect to LATE API. Please check your internet connection."
              : (error as Error).message || "Failed to load accounts";
          return [{ name: `Error: ${errorMsg}`, value: "error" }];
        }
      },

      async getThreadsAccounts(
        this: ILoadOptionsFunctions
      ): Promise<INodePropertyOptions[]> {
        try {
          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method: "GET",
              url: "https://getlate.dev/api/v1/accounts",
              json: true,
            }
          );

          if (!response?.accounts) {
            return [{ name: "No Threads accounts found", value: "none" }];
          }

          const threadsAccounts = response.accounts.filter(
            (account: any) => account.platform === "threads"
          );

          if (threadsAccounts.length === 0) {
            return [{ name: "No Threads accounts connected", value: "none" }];
          }

          return threadsAccounts.map((account: any) => ({
            name: `@${account.username || account.displayName || account._id}`,
            value: account._id,
          }));
        } catch (error) {
          console.error("Error loading Threads accounts:", error);
          const errorMsg =
            (error as any)?.cause?.code === "ECONNREFUSED"
              ? "Cannot connect to LATE API. Please check your internet connection."
              : (error as Error).message || "Failed to load accounts";
          return [{ name: `Error: ${errorMsg}`, value: "error" }];
        }
      },
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;

    if (
      resource === "posts" &&
      (operation === "create" || operation === "update")
    ) {
      const items = this.getInputData();
      const returnData: INodeExecutionData[] = [];

      // Helper functions
      const buildPlatforms = (itemIndex: number): any[] => {
        const platforms: any[] = [];
        const selectedPlatforms =
          (this.getNodeParameter("selectedPlatforms", itemIndex) as string[]) ||
          [];

        if (selectedPlatforms.includes("twitter")) {
          const twitterAccounts =
            (this.getNodeParameter("twitterAccounts", itemIndex) as string[]) ||
            [];
          twitterAccounts.forEach((accountId) => {
            platforms.push({ platform: "twitter", accountId });
          });
        }

        if (selectedPlatforms.includes("instagram")) {
          const instagramAccounts =
            (this.getNodeParameter(
              "instagramAccounts",
              itemIndex
            ) as string[]) || [];
          instagramAccounts.forEach((accountId) => {
            platforms.push({ platform: "instagram", accountId });
          });
        }

        if (selectedPlatforms.includes("facebook")) {
          const facebookAccounts =
            (this.getNodeParameter(
              "facebookAccounts",
              itemIndex
            ) as string[]) || [];
          facebookAccounts.forEach((accountId) => {
            platforms.push({ platform: "facebook", accountId });
          });
        }

        if (selectedPlatforms.includes("linkedin")) {
          const linkedinAccounts =
            (this.getNodeParameter(
              "linkedinAccounts",
              itemIndex
            ) as string[]) || [];
          linkedinAccounts.forEach((accountId) => {
            platforms.push({ platform: "linkedin", accountId });
          });
        }

        if (selectedPlatforms.includes("tiktok")) {
          const tiktokAccounts =
            (this.getNodeParameter("tiktokAccounts", itemIndex) as string[]) ||
            [];
          tiktokAccounts.forEach((accountId) => {
            platforms.push({ platform: "tiktok", accountId });
          });
        }

        if (selectedPlatforms.includes("youtube")) {
          const youtubeAccounts =
            (this.getNodeParameter("youtubeAccounts", itemIndex) as string[]) ||
            [];
          youtubeAccounts.forEach((accountId) => {
            platforms.push({ platform: "youtube", accountId });
          });
        }

        if (selectedPlatforms.includes("threads")) {
          const threadsAccounts =
            (this.getNodeParameter("threadsAccounts", itemIndex) as string[]) ||
            [];
          threadsAccounts.forEach((accountId) => {
            platforms.push({ platform: "threads", accountId });
          });
        }

        return platforms;
      };

      const buildTags = (itemIndex: number): string[] | undefined => {
        let tags: string;
        try {
          tags = this.getNodeParameter("tags", itemIndex) as string;
        } catch (error) {
          return undefined;
        }
        if (!tags) return undefined;
        return tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
      };

      const buildMediaItems = (itemIndex: number): any[] | undefined => {
        let mediaItems: any;
        try {
          mediaItems = this.getNodeParameter("mediaItems", itemIndex) as any;
        } catch (error) {
          return undefined;
        }
        if (!mediaItems?.items?.length) return undefined;

        return mediaItems.items.map((item: any) => ({
          type: item.type,
          url: item.url, // This will be properly resolved by n8n's parameter resolution
          filename: item.filename || undefined,
          mimeType: item.mimeType || undefined,
        }));
      };

      const buildPlatformSpecificData = (itemIndex: number): any => {
        const platformSpecific: any = {};

        // Twitter thread items
        let twitterThreadItems: any;
        try {
          twitterThreadItems = this.getNodeParameter(
            "twitterThreadItems",
            itemIndex
          ) as any;
        } catch (error) {
          twitterThreadItems = undefined;
        }

        if (twitterThreadItems?.items?.length > 0) {
          platformSpecific.threadItems = twitterThreadItems.items.map(
            (item: any) => ({
              content: item.content,
              mediaItems: (item.mediaItems?.items || []).map((media: any) => ({
                type: media.type,
                url: media.url,
                filename: media.filename || undefined,
                mimeType: media.mimeType || undefined,
              })),
            })
          );
        }

        // Threads conversation items
        let threadsThreadItems: any;
        try {
          threadsThreadItems = this.getNodeParameter(
            "threadsThreadItems",
            itemIndex
          ) as any;
        } catch (error) {
          threadsThreadItems = undefined;
        }

        if (threadsThreadItems?.items?.length > 0) {
          platformSpecific.threadItems = threadsThreadItems.items.map(
            (item: any) => ({
              content: item.content,
              mediaItems: (item.mediaItems?.items || []).map((media: any) => ({
                type: media.type,
                url: media.url,
                filename: media.filename || undefined,
                mimeType: media.mimeType || undefined,
              })),
            })
          );
        }

        // TikTok settings
        let tiktokPrivacyLevel: string | undefined;
        let tiktokAllowComments: boolean | undefined;
        let tiktokAllowDuet: boolean | undefined;
        let tiktokAllowStitch: boolean | undefined;

        try {
          tiktokPrivacyLevel = this.getNodeParameter(
            "tiktokPrivacyLevel",
            itemIndex
          ) as string;
        } catch (error) {
          tiktokPrivacyLevel = undefined;
        }

        try {
          tiktokAllowComments = this.getNodeParameter(
            "tiktokAllowComments",
            itemIndex
          ) as boolean;
        } catch (error) {
          tiktokAllowComments = undefined;
        }

        try {
          tiktokAllowDuet = this.getNodeParameter(
            "tiktokAllowDuet",
            itemIndex
          ) as boolean;
        } catch (error) {
          tiktokAllowDuet = undefined;
        }

        try {
          tiktokAllowStitch = this.getNodeParameter(
            "tiktokAllowStitch",
            itemIndex
          ) as boolean;
        } catch (error) {
          tiktokAllowStitch = undefined;
        }

        if (
          tiktokPrivacyLevel ||
          tiktokAllowComments !== undefined ||
          tiktokAllowDuet !== undefined ||
          tiktokAllowStitch !== undefined
        ) {
          platformSpecific.tiktokSettings = {
            privacy_level: tiktokPrivacyLevel || "PUBLIC_TO_EVERYONE",
            allow_comment: tiktokAllowComments !== false,
            allow_duet: tiktokAllowDuet !== false,
            allow_stitch: tiktokAllowStitch !== false,
          };
        }

        return Object.keys(platformSpecific).length > 0
          ? platformSpecific
          : undefined;
      };

      for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        try {
          let requestBody: any = {};

          if (operation === "create") {
            // Build the request body with properly resolved expressions
            requestBody = {
              content: this.getNodeParameter("content", itemIndex) as string,
              platforms: buildPlatforms(itemIndex),
              scheduledFor:
                this.getNodeParameter("scheduledFor", itemIndex) || undefined,
              timezone: this.getNodeParameter("timezone", itemIndex) || "UTC",
              publishNow:
                this.getNodeParameter("publishNow", itemIndex) || false,
              isDraft: this.getNodeParameter("isDraft", itemIndex) || false,
              visibility:
                this.getNodeParameter("visibility", itemIndex) || "public",
              tags: buildTags(itemIndex),
              mediaItems: buildMediaItems(itemIndex),
              platformSpecificData: buildPlatformSpecificData(itemIndex),
            };
          } else if (operation === "update") {
            let content: string | undefined;
            let scheduledFor: any;
            let timezone: string | undefined;
            let publishNow: boolean | undefined;
            let isDraft: boolean | undefined;
            let visibility: string | undefined;

            try {
              content = this.getNodeParameter("content", itemIndex) as string;
            } catch {
              content = undefined;
            }
            try {
              scheduledFor = this.getNodeParameter("scheduledFor", itemIndex);
            } catch {
              scheduledFor = undefined;
            }
            try {
              timezone = this.getNodeParameter("timezone", itemIndex) as string;
            } catch {
              timezone = undefined;
            }
            try {
              publishNow = this.getNodeParameter(
                "publishNow",
                itemIndex
              ) as boolean;
            } catch {
              publishNow = undefined;
            }
            try {
              isDraft = this.getNodeParameter("isDraft", itemIndex) as boolean;
            } catch {
              isDraft = undefined;
            }
            try {
              visibility = this.getNodeParameter(
                "visibility",
                itemIndex
              ) as string;
            } catch {
              visibility = undefined;
            }

            requestBody = {
              content,
              platforms: buildPlatforms(itemIndex),
              scheduledFor,
              timezone,
              publishNow,
              isDraft,
              visibility,
              tags: buildTags(itemIndex),
              mediaItems: buildMediaItems(itemIndex),
              platformSpecificData: buildPlatformSpecificData(itemIndex),
            };
          }

          // Make the API request
          const url =
            operation === "create"
              ? "/posts"
              : `/posts/${this.getNodeParameter("postId", itemIndex)}`;
          const method = operation === "create" ? "POST" : "PUT";

          const response = await this.helpers.requestWithAuthentication.call(
            this,
            "lateApi",
            {
              method,
              url: `https://getlate.dev/api/v1${url}`,
              json: true,
              body: requestBody,
            }
          );

          returnData.push({ json: response });
        } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ json: { error: (error as Error).message } });
          } else {
            throw error;
          }
        }
      }

      return [returnData];
    }

    // For all other operations, use the default routing behavior
    return [[]];
  }

  description: INodeTypeDescription = {
    displayName: "LATE",
    name: "late",
    icon: "file:late-logo.svg",
    group: ["transform"],
    version: 1,
    description:
      "Schedule and manage social media posts across multiple platforms with LATE - the professional social media management platform supporting Twitter/X, Instagram, Facebook, LinkedIn, TikTok, YouTube, and Threads",
    subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
    defaults: {
      name: "LATE",
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],

    credentials: [
      {
        name: "lateApi",
        required: true,
      },
    ],

    requestDefaults: {
      baseURL: "https://getlate.dev/api/v1",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },

    properties: buildNodeProperties({
      profiles: profilesResource,
      posts: postsResource,
      media: mediaResource,
      accounts: accountsResource,
      connect: connectResource,
      usage: usageResource,
      facebook: facebookResource,
      linkedin: linkedinResource,
      clone: cloneResource,
    }),
  };
}
