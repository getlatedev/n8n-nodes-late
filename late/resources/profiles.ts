import type { LateResourceModule } from "../types";

export const profilesResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List profiles",
      routing: {
        request: {
          method: "GET",
          url: "/profiles",
        },
      },
    },
    {
      name: "Create",
      value: "create",
      action: "Create profile",
      routing: {
        request: {
          method: "POST",
          url: "/profiles",
          body: {
            name: "={{ $parameter.name }}",
            description: "={{ $parameter.description || '' }}",
            color: "={{ $parameter.color || '' }}",
          },
        },
      },
    },
    {
      name: "Update",
      value: "update",
      action: "Update profile",
      routing: {
        request: {
          method: "PUT",
          url: "=/profiles/{{ $parameter.profileId }}",
          body: {
            name: "={{ $parameter.name || undefined }}",
            description: "={{ $parameter.description || undefined }}",
            color: "={{ $parameter.color || undefined }}",
          },
        },
      },
    },
    {
      name: "Delete",
      value: "delete",
      action: "Delete profile",
      routing: {
        request: {
          method: "DELETE",
          url: "=/profiles/{{ $parameter.profileId }}",
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
          resource: ["profiles"],
          operation: ["update", "delete"],
        },
      },
      description: "The unique identifier of the profile you want to update or delete. You can get this from the 'List Profiles' operation.",
      required: true,
    },
    {
      displayName: "Name",
      name: "name",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          resource: ["profiles"],
          operation: ["create"],
        },
      },
      description: "A descriptive name for your profile (e.g., 'Personal Brand', 'Company Account', 'Client: Acme Corp'). This helps you organize and identify different social media strategies.",
      placeholder: "Personal Brand",
    },
    {
      displayName: "Name",
      name: "name",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["profiles"],
          operation: ["update"],
        },
      },
      description: "New name for the profile. Leave empty to keep the current name. Use a descriptive name that helps you identify this profile's purpose.",
      placeholder: "Updated Profile Name",
    },
    {
      displayName: "Description",
      name: "description",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["profiles"],
          operation: ["create", "update"],
        },
      },
      description: "Optional description to help you remember what this profile is for. For example: 'My personal social media accounts', 'Company marketing campaigns', or 'Client social media management'.",
      placeholder: "My personal social media accounts",
    },
    {
      displayName: "Color",
      name: "color",
      type: "string",
      default: "",
      placeholder: "#4ade80",
      displayOptions: {
        show: {
          resource: ["profiles"],
          operation: ["create", "update"],
        },
      },
      description: "A hex color code to visually identify this profile in the dashboard (e.g., #4ade80 for green, #ef4444 for red, #3b82f6 for blue). This helps you quickly distinguish between different profiles.",
    },
  ],
};