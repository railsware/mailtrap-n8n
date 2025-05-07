import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MailtrapTokenApi implements ICredentialType {
  name = 'MailtrapTokenApi';
  displayName = 'Mailtrap API Token';
  documentationUrl = '';

  properties: INodeProperties[] = [
    {
      displayName: 'API Token',
      name: 'apiToken',
      type: 'string',
      required: true,
      typeOptions: {
        password: true,
      },
      default: '',
    },
    {
      displayName: 'Mailing Host',
      name: 'mailHost',
      type: 'string',
      required: true,
      hint: 'The host used to send emails. Defaults to send.api.mailtrap.io',
      default: 'send.api.mailtrap.io',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Api-Token': '={{$credentials.apiToken}}',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '=https://mailtrap.io/api',
      url: '/accounts',
    }
  };
}
