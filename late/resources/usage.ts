import type { LateResourceModule } from "../types";

export const usageResource: LateResourceModule = {
  operations: [
    {
      name: "Get Stats",
      value: "getStats",
      action: "Get usage statistics",
      routing: {
        request: {
          method: "GET",
          url: "/usage-stats",
        },
      },
    },
  ],

  fields: [],
};