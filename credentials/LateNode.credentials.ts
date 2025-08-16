import {
  IAuthenticateGeneric,
  ICredentialDataDecryptedObject,
  ICredentialType,
} from "n8n-workflow";

export class LateNode implements ICredentialType {
  name = "lateApi";
  displayName = "LATE API";
  documentationUrl = "https://getlate.dev/docs#authentication";

  properties = [
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string" as const,
      typeOptions: { password: true },
      default: "",
      description:
        'Your LATE API key. Generate one from your LATE dashboard at getlate.dev/dashboard. Use the raw token without "Bearer " prefix.',
    },
  ];

  // Add Authorization: Bearer <token> to every request
  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        Authorization: '={{ "Bearer " + $credentials.apiKey }}',
      },
    },
  };
}
