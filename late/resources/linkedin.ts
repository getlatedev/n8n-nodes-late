import type { LateResourceModule } from "../types";

export const linkedinResource: LateResourceModule = {
  operations: [
    {
      name: "Update Organization",
      value: "updateOrganization",
      action: "Update LinkedIn organization",
      routing: {
        request: {
          method: "PUT",
          url: "=/accounts/{{ $parameter.accountId }}/linkedin-organization",
          body: {
            accountType: "={{ $parameter.accountType }}",
            selectedOrganization: "={{ JSON.parse($parameter.selectedOrganization || '{}') }}",
          },
        },
      },
    },
  ],

  fields: [
    {
      displayName: "Account ID",
      name: "accountId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
        },
      },
      description: "LinkedIn account ID",
    },
    {
      displayName: "Account Type",
      name: "accountType",
      type: "options",
      options: [
        { name: "Personal", value: "personal" },
        { name: "Organization", value: "organization" },
      ],
      default: "personal",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
        },
      },
      description: "Type of LinkedIn account",
    },
    {
      displayName: "Selected Organization",
      name: "selectedOrganization",
      type: "json",
      default: "{}",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
        },
      },
      description: "Organization details",
      placeholder: '{"id": "123456", "urn": "urn:li:organization:123456", "name": "Company Name"}',
    },
  ],
};