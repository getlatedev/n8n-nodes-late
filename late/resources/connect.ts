import type { LateResourceModule } from "../types";
import { buildProfileIdField } from "../utils/commonFields";
import { SUPPORTED_PLATFORMS } from "../utils/platformHelpers";

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
    // Platform selector using centralized platforms
    {
      displayName: "Platform",
      name: "platform",
      type: "options",
      options: SUPPORTED_PLATFORMS.map((platform) => ({
        name: platform.name,
        value: platform.value,
        description: `Connect ${platform.name} account`,
      })),
      default: "twitter",
      displayOptions: {
        show: {
          resource: ["connect"],
          operation: ["connect"],
        },
      },
      description:
        "Social media platform to connect to your profile. Each platform has specific requirements and OAuth flows.",
    },

    // Profile ID field using common builder
    {
      ...buildProfileIdField("connect", ["connect"]),
      description:
        "The profile ID where this social media account will be connected. Each profile can have one account per platform. Get profile IDs from 'Profiles > List'.",
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
      description:
        "Optional: Custom URL to redirect to after OAuth completion. By default, users are redirected to the LATE dashboard. Use this to redirect to your own application with success/error parameters.",
      placeholder: "https://your-app.com/oauth-callback",
    },
  ],
};
