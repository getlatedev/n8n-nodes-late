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
            userProfile:
              "={{ { id: $parameter.userProfileId || '', name: $parameter.userProfileName || '', email: $parameter.userProfileEmail || '', picture: $parameter.userProfilePicture || '', accessToken: $parameter.userProfileAccessToken || '' } }}",
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
      displayName: "User Profile ID",
      name: "userProfileId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["selectPage"],
        },
      },
      description: "Facebook user ID",
      placeholder: "123456789",
    },
    {
      displayName: "User Profile Name",
      name: "userProfileName",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["selectPage"],
        },
      },
      description: "Facebook user display name",
      placeholder: "John Doe",
    },
    {
      displayName: "User Profile Email",
      name: "userProfileEmail",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["selectPage"],
        },
      },
      description: "Facebook user email address",
      placeholder: "john@example.com",
    },
    {
      displayName: "User Profile Picture",
      name: "userProfilePicture",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["selectPage"],
        },
      },
      description: "URL to the user's profile picture",
      placeholder: "https://graph.facebook.com/123456789/picture",
    },
    {
      displayName: "User Profile Access Token",
      name: "userProfileAccessToken",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["facebook"],
          operation: ["selectPage"],
        },
      },
      description: "Facebook user access token",
      placeholder: "EAABwzLix...",
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
