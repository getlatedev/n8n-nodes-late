import type { LateResourceModule } from "../types";
import { buildProfileIdField, buildSelectorField } from "../utils/commonFields";

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
    // Profile ID for update/delete operations
    buildProfileIdField("profiles", ["update", "delete"]),

    // Name field for create operation
    buildSelectorField(
      "profiles",
      ["create"],
      "name",
      "Name",
      "A descriptive name for your profile (e.g., 'Personal Brand', 'Company Account', 'Client: Acme Corp'). This helps you organize and identify different social media strategies.",
      "Personal Brand",
      true
    ),

    // Name field for update operation
    buildSelectorField(
      "profiles",
      ["update"],
      "name",
      "Name",
      "New name for the profile. Leave empty to keep the current name. Use a descriptive name that helps you identify this profile's purpose.",
      "Updated Profile Name"
    ),

    // Description field
    buildSelectorField(
      "profiles",
      ["create", "update"],
      "description",
      "Description",
      "Optional description to help you remember what this profile is for. For example: 'My personal social media accounts', 'Company marketing campaigns', or 'Client social media management'.",
      "My personal social media accounts"
    ),

    // Color field
    buildSelectorField(
      "profiles",
      ["create", "update"],
      "color",
      "Color",
      "A hex color code to visually identify this profile in the dashboard (e.g., #4ade80 for green, #ef4444 for red, #3b82f6 for blue). This helps you quickly distinguish between different profiles.",
      "#4ade80"
    ),
  ],
};
