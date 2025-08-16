import type { LateResourceModule } from "../types";

export const facebookResource: LateResourceModule = {
  operations: [
    {
      name: "List Pages",
      value: "listPages",
      action: "List Facebook pages",
      routing: {
        request: {
          method: "GET",
          url: "/connect/facebook/select-page",
          qs: {
            profileId: "={{ $parameter.profileId }}",
            tempToken: "={{ $parameter.tempToken }}",
          },
        },
      },
    },
    {
      name: "Select Page",
      value: "selectPage",
      action: "Select Facebook page",
      routing: {
        request: {
          method: "POST",
          url: "/connect/facebook/select-page",
          body: {
            profileId: "={{ $parameter.profileId }}",
            pageId: "={{ $parameter.pageId }}",
            tempToken: "={{ $parameter.tempToken }}",
            userProfile: "={{ JSON.parse($parameter.userProfile || '{}') }}",
          },
        },
      },
    },
    {
      name: "Update Page",
      value: "updatePage",
      action: "Update Facebook page",
      routing: {
        request: {
          method: "PUT",
          url: "=/accounts/{{ $parameter.accountId }}/facebook-page",
          body: {
            selectedPageId: "={{ $parameter.selectedPageId }}",
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
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["listPages", "selectPage"],
        },
      },
      description: "Profile ID",
    },
    {
      displayName: "Temp Token",
      name: "tempToken",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["listPages", "selectPage"],
        },
      },
      description: "Temporary OAuth token",
    },
    {
      displayName: "Page ID",
      name: "pageId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["selectPage"],
        },
      },
      description: "Facebook page ID to select",
    },
    {
      displayName: "User Profile",
      name: "userProfile",
      type: "json",
      default: "{}",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["selectPage"],
        },
      },
      description: "User profile data",
    },
    {
      displayName: "Account ID",
      name: "accountId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["updatePage"],
        },
      },
      description: "Account ID to update",
    },
    {
      displayName: "Selected Page ID",
      name: "selectedPageId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["updatePage"],
        },
      },
      description: "New page ID to select",
    },
  ],
};