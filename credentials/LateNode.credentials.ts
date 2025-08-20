import {
  IAuthenticateGeneric,
  ICredentialDataDecryptedObject,
  ICredentialTestRequest,
  ICredentialType,
  INodeCredentialTestResult,
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

  // Añadir Authorization: Bearer <token> a cada request
  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        Authorization: '={{ "Bearer " + $credentials.apiKey }}',
      },
    },
  };

  // Test de credenciales obligatorio
  test: ICredentialTestRequest = {
    request: {
      baseURL: "https://getlate.dev/",
      url: "/api/v1/usage-stats",
      method: "GET",
    },
  };
}
