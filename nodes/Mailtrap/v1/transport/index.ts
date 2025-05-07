import {
  ICredentialDataDecryptedObject,
  IExecuteFunctions,
  IHttpRequestOptions,
  NodeApiError
} from 'n8n-workflow';

export class MailtrapTransport {
  constructor(private thisNode: IExecuteFunctions) {}

  async request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: any,
    host?: string,
  ): Promise<any> {
    const options: IHttpRequestOptions = {
      method,
      baseURL: `https://${host || 'mailtrap.io'}/api`,
      url: path,
      headers: {
        // 'Api-Token': (await this.thisNode.getCredentials('MailtrapApiToken')).apiToken as string, // set in MailtrapTokenApi.credentials.ts
        'Content-Type': 'application/json',
      },
      json: true as const,
      body: body ? body : undefined,
    };

    try {
      return await this.thisNode.helpers.httpRequest(options);
    } catch (error) {
      throw new NodeApiError(
        this.thisNode.getNode(),
        error as any,
      );
    }
  }

  async sendRequest(
    body?: any,
  ): Promise<any> {
    const $credentials = await this.thisNode.getCredentials('MailtrapTokenApi');

    return this.request(
      'POST',
      '/send',
      body,
      $credentials.mailHost as string || 'send.api.mailtrap.io',
    );
  }
}
