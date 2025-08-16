import type { LateResourceModule } from "../types";

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
          body: {
            files: "={{ $parameter.files }}",
          },
        },
      },
    },
  ],

  fields: [
    {
      displayName: "Files",
      name: "files",
      type: "json",
      default: "[]",
      displayOptions: {
        show: {
          resource: ["media"],
          operation: ["upload"],
        },
      },
      description: "Files to upload for use in posts. Supports images (JPEG, PNG, WebP, GIF) and videos (MP4, MOV, AVI, WebM) up to 5GB. For large files (>4MB), use the @vercel/blob client-upload method described in the documentation.",
      placeholder: '[{"filename": "image.jpg", "data": "base64data"}, {"filename": "video.mp4", "data": "base64data"}]',
      required: true,
    },
  ],
};