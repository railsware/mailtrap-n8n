import {
  IExecuteFunctions,
  IHttpRequestOptions,
  ILoadOptionsFunctions,
  IPollFunctions,
  NodeApiError
} from 'n8n-workflow';

export class MailtrapTransport {
  constructor(private thisNode: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions) {}

  /**
   * @param method
   * @param path
   * @param body
   * @param host
   * @throws NodeApiError
   */
  async request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: any,
    host?: string,
  ): Promise<any> {
    const $credentials = await this.thisNode.getCredentials('MailtrapTokenApi');

    const options: IHttpRequestOptions = {
      method,
      baseURL: `https://${host || 'mailtrap.io'}/api`,
      url: path,
      headers: {
        'Api-Token': $credentials.apiToken as string,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'n8n',
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
    body: object,
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
