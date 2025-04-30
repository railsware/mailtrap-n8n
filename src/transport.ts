// src/transport.ts
import {
  ICredentialDataDecryptedObject,
  IExecuteFunctions,
  IHttpRequestOptions,
  NodeApiError
} from 'n8n-workflow';

export class MailtrapTransport {
  constructor(private thisNode: IExecuteFunctions, private credentials: ICredentialDataDecryptedObject) {}

  async request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: any,
  ): Promise<any> {
    const options: IHttpRequestOptions = {
      method,
      baseURL: 'https://api.mailtrap.io/api',
      url: path,
      headers: {
        'Api-Token': this.credentials.apiToken as string,
        'Content-Type': 'application/json',
      },
      json: true as const,
      body: body ? body : undefined,
    };

    try {
      return await this.thisNode.helpers.httpRequest(options);
    } catch (error) {
      throw new NodeApiError(this.thisNode.getNode(), error as any);
    }
  }
}
