import {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestOptions,
  ILoadOptionsFunctions,
  IPollFunctions,
  JsonObject,
  NodeApiError,
} from 'n8n-workflow';

export class MailtrapTransport {
  constructor(private node: IExecuteFunctions | ILoadOptionsFunctions | IPollFunctions) {}

  /**
   * @param method
   * @param endpoint
   * @param body
   * @param host
   * @throws NodeApiError
   */
  async request(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
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

    try {
      return await this.node.helpers.requestWithAuthentication.call(
        this.node,
        this.getCredentialType(),
        options,
      );
    } catch (error) {
      throw new NodeApiError(
        this.node.getNode(),
        error as JsonObject,
      );
    }
  }

  async sendRequest(
    body: IDataObject,
  ): Promise<any> {
    const $credentials = await this.node.getCredentials(this.getCredentialType());

    return this.request(
      'POST',
      '/send',
      body,
      $credentials.mailHost as string || 'send.api.mailtrap.io',
    );
  }

  private getCredentialType(): 'MailtrapTokenApi' | 'MailtrapBearerTokenApi' {
    const authenticationMethod = this.node.getNodeParameter('authentication', 0) as string;

    switch (authenticationMethod) {
      case 'apiToken':
        return 'MailtrapTokenApi';
      case 'bearerToken':
        return 'MailtrapBearerTokenApi';
      default:
        throw new Error(`The authentication method "${authenticationMethod}" is not supported!`);
    }
  }
}
