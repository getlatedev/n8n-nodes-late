import type { LateResourceModule } from "../types";
import {
  buildProfileIdField,
  buildAccountIdField,
  buildAccountTypeField,
  buildSelectorField,
} from "../utils/commonFields";

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
            targetPageAccessToken:
              "={{ $parameter.targetPageAccessToken || undefined }}",
            targetOrganizationId:
              "={{ $parameter.targetOrganizationId || undefined }}",
            targetOrganizationUrn:
              "={{ $parameter.targetOrganizationUrn || undefined }}",
            targetOrganizationName:
              "={{ $parameter.targetOrganizationName || undefined }}",
            targetAccountType:
              "={{ $parameter.targetAccountType || undefined }}",
          },
        },
      },
    },
  ],

  fields: [
    // Common fields using reusable builders
    {
      ...buildProfileIdField("clone", ["cloneConnection"]),
      description: "Target profile ID",
    },

    {
      ...buildAccountIdField(
        "clone",
        ["cloneConnection"],
        "Source Account ID",
        "ID of existing connection to clone"
      ),
      name: "sourceAccountId",
    },

    // Facebook-specific fields
    buildSelectorField(
      "clone",
      ["cloneConnection"],
      "targetPageId",
      "Target Page ID",
      "Facebook page ID to target (for Facebook)"
    ),

    buildSelectorField(
      "clone",
      ["cloneConnection"],
      "targetPageName",
      "Target Page Name",
      "Facebook page name (for Facebook)"
    ),

    buildSelectorField(
      "clone",
      ["cloneConnection"],
      "targetPageAccessToken",
      "Target Page Access Token",
      "Facebook page access token (for Facebook)"
    ),

    // LinkedIn-specific fields
    buildSelectorField(
      "clone",
      ["cloneConnection"],
      "targetOrganizationId",
      "Target Organization ID",
      "LinkedIn organization ID (for LinkedIn)",
      "123456"
    ),

    buildSelectorField(
      "clone",
      ["cloneConnection"],
      "targetOrganizationUrn",
      "Target Organization URN",
      "LinkedIn organization URN (for LinkedIn)",
      "urn:li:organization:123456"
    ),

    buildSelectorField(
      "clone",
      ["cloneConnection"],
      "targetOrganizationName",
      "Target Organization Name",
      "LinkedIn organization name (for LinkedIn)",
      "Company Name"
    ),

    // Account type for LinkedIn
    {
      ...buildAccountTypeField("clone", ["cloneConnection"]),
      name: "targetAccountType",
      description: "LinkedIn account type (for LinkedIn)",
    },
  ],
};
