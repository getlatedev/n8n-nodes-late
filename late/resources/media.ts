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
          body: "={{ $parameter.files?.items?.reduce((acc, item) => { acc[`file_${Date.now()}_${Math.random()}`] = { value: item.data, options: { filename: item.filename || 'upload', contentType: item.mimeType || 'application/octet-stream' } }; return acc; }, {}) || {} }}",
        },
      },
    },
  ],

  fields: [
    {
      displayName: "Files",
      name: "files",
      type: "fixedCollection",
      default: { items: [] },
      typeOptions: {
        multipleValues: true,
        sortable: true,
      },
      displayOptions: {
        show: {
          resource: ["media"],
          operation: ["upload"],
        },
      },
      description:
        "Files to upload for use in posts. Supports images (JPEG, PNG, WebP, GIF) and videos (MP4, MOV, AVI, WebM) up to 5GB. For large files (>4MB), use the @vercel/blob client-upload method described in the documentation.",
      required: true,
      options: [
        {
          name: "items",
          displayName: "Files",
          values: [
            {
              displayName: "Filename",
              name: "filename",
              type: "string",
              default: "",
              description: "Name of the file including extension",
              placeholder: "image.jpg",
              required: true,
            },
            {
              displayName: "File Data",
              name: "data",
              type: "string",
              default: "",
              description: "Base64 encoded file data or binary data",
              placeholder: "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
              required: true,
            },
            {
              displayName: "MIME Type",
              name: "mimeType",
              type: "options",
              options: [
                { name: "JPEG Image", value: "image/jpeg" },
                { name: "PNG Image", value: "image/png" },
                { name: "WebP Image", value: "image/webp" },
                { name: "GIF Image", value: "image/gif" },
                { name: "MP4 Video", value: "video/mp4" },
                { name: "MOV Video", value: "video/quicktime" },
                { name: "AVI Video", value: "video/x-msvideo" },
                { name: "WebM Video", value: "video/webm" },
                { name: "PDF Document", value: "application/pdf" },
                { name: "Other", value: "application/octet-stream" },
              ],
              default: "image/jpeg",
              description: "MIME type of the file",
              required: true,
            },
            {
              displayName: "File Size (bytes)",
              name: "fileSize",
              type: "number",
              default: 0,
              description:
                "Size of the file in bytes (optional, for validation)",
              placeholder: "1048576",
            },
          ],
        },
      ],
    },
  ],
};
