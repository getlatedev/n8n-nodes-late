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
            selectedOrganization:
              "={{ { id: $parameter.organizationId || '', urn: $parameter.organizationUrn || '', name: $parameter.organizationName || '', logoUrl: $parameter.organizationLogoUrl || '', description: $parameter.organizationDescription || '' } }}",
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
      displayName: "Organization ID",
      name: "organizationId",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
          accountType: ["organization"],
        },
      },
      description: "LinkedIn organization ID",
      placeholder: "123456",
    },
    {
      displayName: "Organization URN",
      name: "organizationUrn",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
          accountType: ["organization"],
        },
      },
      description: "LinkedIn organization URN",
      placeholder: "urn:li:organization:123456",
    },
    {
      displayName: "Organization Name",
      name: "organizationName",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
          accountType: ["organization"],
        },
      },
      description: "Organization display name",
      placeholder: "Company Name",
    },
    {
      displayName: "Organization Logo URL",
      name: "organizationLogoUrl",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
          accountType: ["organization"],
        },
      },
      description: "URL to the organization's logo",
      placeholder: "https://media.licdn.com/dms/image/...",
    },
    {
      displayName: "Organization Description",
      name: "organizationDescription",
      type: "string",
      default: "",
      displayOptions: {
        show: {
          resource: ["linkedin"],
          operation: ["updateOrganization"],
          accountType: ["organization"],
        },
      },
      description: "Organization description",
      placeholder: "Company description...",
    },
  ],
};
