import type { LateResourceModule } from "../types";

export const connectResource: LateResourceModule = {
  operations: [
    {
      name: "Connect Platform",
      value: "connect",
      action: "Connect social platform",
      routing: {
        request: {
          method: "GET",
          url: "=/connect/{{ $parameter.platform }}",
          qs: {
            profileId: "={{ $parameter.profileId }}",
            redirect_url: "={{ $parameter.redirectUrl || undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    {
      displayName: "Platform",
      name: "platform",
      type: "options",
      options: [
        {
          name: "Twitter/X",
          value: "twitter",
          description: "Connect Twitter (X) account",
        },
        {
          name: "Instagram",
          value: "instagram",
          description: "Connect Instagram Business account (required)",
        },
        {
          name: "Facebook",
          value: "facebook",
          description: "Connect Facebook page",
        },
        {
          name: "LinkedIn",
          value: "linkedin",
          description: "Connect LinkedIn personal or company page",
        },
        {
          name: "TikTok",
          value: "tiktok",
          description: "Connect TikTok creator account",
        },
        {
          name: "YouTube",
          value: "youtube",
          description: "Connect YouTube channel",
        },
        {
          name: "Threads",
          value: "threads",
          description: "Connect Threads account",
        },
      ],
      default: "twitter",
      displayOptions: {
        show: {
          resource: ["connect"],
          operation: ["connect"],
        },
      },
      description: "Social media platform to connect to your profile. Each platform has specific requirements and OAuth flows.",
    },
    {
      displayName: "Profile ID",
      name: "profileId",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          resource: ["connect"],
          operation: ["connect"],
        },
      },
      description: "The profile ID where this social media account will be connected. Each profile can have one account per platform. Get profile IDs from 'Profiles > List'.",
      placeholder: "profile_123_abc",
    },
    {
      displayName: "Redirect URL",
      name: "redirectUrl",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["connect"],
          operation: ["connect"],
        },
      },
      description: "Optional: Custom URL to redirect to after OAuth completion. By default, users are redirected to the LATE dashboard. Use this to redirect to your own application with success/error parameters.",
      placeholder: "https://your-app.com/oauth-callback",
    },
  ],
};