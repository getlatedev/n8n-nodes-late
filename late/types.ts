import type { INodeProperties } from "n8n-workflow";

export interface LateResourceConfig {
  name: string;
  value: string;
  description: string;
}

export interface LateOperationConfig {
  name: string;
  value: string;
  action: string;
  routing?: any;
}

export interface LateFieldConfig extends INodeProperties {}

export interface LateResourceModule {
  operations: LateOperationConfig[];
  fields: LateFieldConfig[];
}

export type LateResource =
  | "profiles"
  | "posts"
  | "media"
  | "accounts"
  | "connect"
  | "usage"
  | "facebook"
  | "linkedin"
  | "clone";

export const LATE_RESOURCES: LateResourceConfig[] = [
  {
    name: "Profiles",
    value: "profiles",
    description:
      "Organize your social media accounts into profiles for managing multiple brands, clients, or personal accounts separately",
  },
  {
    name: "Posts",
    value: "posts",
    description:
      "Create, schedule, and manage social media posts across multiple platforms with advanced features like threads, stories, and platform-specific settings",
  },
  {
    name: "Media",
    value: "media",
    description:
      "Upload images and videos up to 5GB for use in your social media posts with automatic optimization",
  },
  {
    name: "Social Accounts",
    value: "accounts",
    description:
      "Manage connected social media accounts, view their status, and disconnect accounts when needed",
  },
  {
    name: "Connect Platform",
    value: "connect",
    description:
      "Initiate OAuth flows to connect new social media platforms (Twitter/X, Instagram, Facebook, LinkedIn, TikTok, YouTube, Threads)",
  },
  {
    name: "Usage Statistics",
    value: "usage",
    description:
      "Monitor your current usage against plan limits including uploads, profiles, and billing information",
  },
  {
    name: "Facebook Management",
    value: "facebook",
    description:
      "Manage Facebook pages, select which page to post to, and handle Facebook-specific settings",
  },
  {
    name: "LinkedIn Management",
    value: "linkedin",
    description:
      "Switch between personal and company posting, manage LinkedIn organization settings",
  },
  {
    name: "Clone Connection",
    value: "clone",
    description:
      "Reuse OAuth connections across multiple profiles while targeting different pages or organizations",
  },
];

