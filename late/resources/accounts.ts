import type { LateResourceModule } from "../types";
import {
  buildProfileIdField,
  buildAccountIdField,
} from "../utils/commonFields";

export const accountsResource: LateResourceModule = {
  operations: [
    {
      name: "List",
      value: "list",
      action: "List social accounts",
      routing: {
        request: {
          method: "GET",
          url: "/accounts",
          qs: {
            profileId: "={{ $parameter.profileId || undefined }}",
          },
        },
      },
    },
    {
      name: "Delete",
      value: "delete",
      action: "Disconnect account",
      routing: {
        request: {
          method: "DELETE",
          url: "=/accounts/{{ $parameter.accountId }}",
        },
      },
    },
  ],

  fields: [
    // Profile ID for filtering (optional)
    {
      ...buildProfileIdField("accounts", ["list"], false),
      description:
        "Optional: Filter accounts by a specific profile ID. Leave empty to see all connected accounts across all profiles.",
      placeholder: "profile_123_abc",
    },

    // Account ID for deletion
    {
      ...buildAccountIdField("accounts", ["delete"]),
      description:
        "The unique ID of the social media account to disconnect. You can get this from the 'List' operation. Disconnecting removes the account from your profile but doesn't delete the actual social media account.",
    },
  ],
};
