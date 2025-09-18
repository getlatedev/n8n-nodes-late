import type {
  INodeType,
  INodeTypeDescription,
  ILoadOptionsFunctions,
  INodePropertyOptions,
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
