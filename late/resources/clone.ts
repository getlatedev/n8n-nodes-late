import type { LateResourceModule } from "../types";

export const cloneResource: LateResourceModule = {
  operations: [
    {
      name: "Clone Connection",
      value: "cloneConnection",
      action: "Clone connection to profile",
      routing: {
        request: {
          method: "POST",
          url: "=/profiles/{{ $parameter.profileId }}/clone-connection",
          body: {
            sourceAccountId: "={{ $parameter.sourceAccountId }}",
            targetPageId: "={{ $parameter.targetPageId || undefined }}",
            targetPageName: "={{ $parameter.targetPageName || undefined }}",
            targetPageAccessToken: "={{ $parameter.targetPageAccessToken || undefined }}",
            targetOrganizationId: "={{ $parameter.targetOrganizationId || undefined }}",
            targetOrganizationUrn: "={{ $parameter.targetOrganizationUrn || undefined }}",
            targetOrganizationName: "={{ $parameter.targetOrganizationName || undefined }}",
            targetAccountType: "={{ $parameter.targetAccountType || undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    {
      displayName: "Profile ID",
      name: "profileId",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "Target profile ID",
    },
    {
      displayName: "Source Account ID",
      name: "sourceAccountId",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "ID of existing connection to clone",
    },
    {
      displayName: "Target Page ID",
      name: "targetPageId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "Facebook page ID to target (for Facebook)",
    },
    {
      displayName: "Target Page Name",
      name: "targetPageName",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "Facebook page name (for Facebook)",
    },
    {
      displayName: "Target Page Access Token",
      name: "targetPageAccessToken",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "Facebook page access token (for Facebook)",
    },
    {
      displayName: "Target Organization ID",
      name: "targetOrganizationId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "LinkedIn organization ID (for LinkedIn)",
    },
    {
      displayName: "Target Organization URN",
      name: "targetOrganizationUrn",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "LinkedIn organization URN (for LinkedIn)",
    },
    {
      displayName: "Target Organization Name",
      name: "targetOrganizationName",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "LinkedIn organization name (for LinkedIn)",
    },
    {
      displayName: "Target Account Type",
      name: "targetAccountType",
      type: "options",
      options: [
        { name: "Personal", value: "personal" },
        { name: "Organization", value: "organization" },
      ],
      default: "personal",
      displayOptions: {
        show: {
          resource: ["clone"],
          operation: ["cloneConnection"],
        },
      },
      description: "LinkedIn account type (for LinkedIn)",
    },
  ],
};