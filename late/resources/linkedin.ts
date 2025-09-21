import type { LateResourceModule } from "../types";
import {
  buildAccountIdField,
  buildAccountTypeField,
  buildOrganizationFields,
} from "../utils/commonFields";

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
    // Common fields using reusable builders
    buildAccountIdField(
      "linkedin",
      ["updateOrganization"],
      "Account ID",
      "LinkedIn account ID"
    ),
    buildAccountTypeField("linkedin", ["updateOrganization"]),

    // Organization fields
    ...buildOrganizationFields("linkedin", ["updateOrganization"]),
  ],
};
