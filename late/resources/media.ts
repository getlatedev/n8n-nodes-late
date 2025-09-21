import type { LateResourceModule } from "../types";
import { buildMediaFilesField } from "../utils/commonFields";

export const mediaResource: LateResourceModule = {
  operations: [
    {
      name: "Upload",
      value: "upload",
      action: "Upload media",
      routing: {
        request: {
          method: "POST",
          url: "/media",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: "={{ $parameter.files?.items?.reduce((acc, item) => { acc[`file_${Date.now()}_${Math.random()}`] = { value: item.data, options: { filename: item.filename || 'upload', contentType: item.mimeType || 'application/octet-stream' } }; return acc; }, {}) || {} }}",
        },
      },
    },
  ],

  fields: [buildMediaFilesField("media", ["upload"])],
};
