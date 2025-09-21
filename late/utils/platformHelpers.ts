import type { ILoadOptionsFunctions, INodePropertyOptions } from "n8n-workflow";

export interface PlatformAccount {
  _id: string;
  platform: string;
  username?: string;
  displayName?: string;
}

export interface PlatformConfig {
  name: string;
  value: string;
  displayName: string;
  usernamePrefix?: string;
}

export const SUPPORTED_PLATFORMS: PlatformConfig[] = [
  {
    name: "Twitter/X",
    value: "twitter",
    displayName: "Twitter/X Accounts",
    usernamePrefix: "@",
  },
  {
    name: "Instagram",
    value: "instagram",
    displayName: "Instagram Accounts",
    usernamePrefix: "@",
  },
  { name: "Facebook", value: "facebook", displayName: "Facebook Accounts" },
  { name: "LinkedIn", value: "linkedin", displayName: "LinkedIn Accounts" },
  {
    name: "TikTok",
    value: "tiktok",
    displayName: "TikTok Accounts",
    usernamePrefix: "@",
  },
  { name: "YouTube", value: "youtube", displayName: "YouTube Accounts" },
  {
    name: "Threads",
    value: "threads",
    displayName: "Threads Accounts",
    usernamePrefix: "@",
  },
];

/**
 * Generic function to load accounts for any platform
 */
export async function loadPlatformAccounts(
  context: ILoadOptionsFunctions,
  platform: string
): Promise<INodePropertyOptions[]> {
  try {
    const response = await context.helpers.requestWithAuthentication.call(
      context,
      "lateApi",
      {
        method: "GET",
        url: "https://getlate.dev/api/v1/accounts",
        json: true,
      }
    );

    if (!response?.accounts) {
      console.log(`No accounts found in response for ${platform}:`, response);
      return [{ name: `No ${platform} accounts found`, value: "none" }];
    }

    const platformAccounts = response.accounts.filter(
      (account: PlatformAccount) => account.platform === platform
    );

    if (platformAccounts.length === 0) {
      return [{ name: `No ${platform} accounts connected`, value: "none" }];
    }

    const platformConfig = SUPPORTED_PLATFORMS.find(
      (p) => p.value === platform
    );
    const usernamePrefix = platformConfig?.usernamePrefix || "";

    return platformAccounts.map((account: PlatformAccount) => ({
      name: `${usernamePrefix}${account.username || account.displayName || account._id}`,
      value: account._id,
    }));
  } catch (error) {
    console.error(`Error loading ${platform} accounts:`, error);
    const errorMsg =
      (error as any)?.cause?.code === "ECONNREFUSED"
        ? "Cannot connect to LATE API. Please check your internet connection."
        : (error as Error).message || "Failed to load accounts";
    return [{ name: `Error: ${errorMsg}`, value: "error" }];
  }
}

/**
 * Builds the platform mapping expression for create/update operations
 * Fixed: Use proper n8n expression syntax that evaluates correctly
 */
export function buildPlatformMappingExpression(): string {
  return "={{ $parameter.selectedPlatforms.map(platform => { if (platform === 'twitter') return $parameter.twitterAccounts?.map(id => ({ platform: 'twitter', accountId: id })) || []; if (platform === 'instagram') return $parameter.instagramAccounts?.map(id => ({ platform: 'instagram', accountId: id })) || []; if (platform === 'facebook') return $parameter.facebookAccounts?.map(id => ({ platform: 'facebook', accountId: id })) || []; if (platform === 'linkedin') return $parameter.linkedinAccounts?.map(id => ({ platform: 'linkedin', accountId: id })) || []; if (platform === 'tiktok') return $parameter.tiktokAccounts?.map(id => ({ platform: 'tiktok', accountId: id })) || []; if (platform === 'youtube') return $parameter.youtubeAccounts?.map(id => ({ platform: 'youtube', accountId: id })) || []; if (platform === 'threads') return $parameter.threadsAccounts?.map(id => ({ platform: 'threads', accountId: id })) || []; return []; }).flat() }}";
}

/**
 * Processes media items to ensure proper variable evaluation
 */
export function processMediaItems(mediaItems: any): any[] {
  if (!mediaItems || !Array.isArray(mediaItems)) {
    return [];
  }

  return mediaItems.map((item) => ({
    type: item.type || "image",
    url: item.url,
    filename: item.filename || "",
    mimeType: item.mimeType || "",
    ...(item._id && { _id: item._id }),
  }));
}

/**
 * Processes tags string into array
 */
export function processTags(tagsString: string | undefined): string[] {
  if (!tagsString || typeof tagsString !== "string") {
    return [];
  }

  return tagsString
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}
