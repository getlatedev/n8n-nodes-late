import type { INodeType, INodeTypeDescription } from "n8n-workflow";
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
