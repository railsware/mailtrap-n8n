import {
  IDataObject,
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
   * @param endpoint
   * @param body
   * @param host
   * @throws NodeApiError
   */
  async request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body: IDataObject = {},
    host?: string,
  ): Promise<any> {
    const options: IHttpRequestOptions = {
      method,
      baseURL: `https://${host || 'mailtrap.io'}/api`,
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'n8n',
      },
      json: true as const,
      body: Object.keys(body).length ? body : undefined,
    };

    let credentialType = 'MailtrapTokenApi';
    const authenticationMethod = this.thisNode.getNodeParameter('authentication', 0) as string;
    if (authenticationMethod === 'mailtrapBearerTokenApi') {
      credentialType = 'MailtrapBearerTokenApi';
    }

    try {
      return await this.thisNode.helpers.httpRequestWithAuthentication.call(
        this.thisNode,
        credentialType,
        options,
      );
    } catch (error) {
      throw new NodeApiError(
        this.thisNode.getNode(),
        error as any,
      );
    }
  }

  async sendRequest(
    body: IDataObject,
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
