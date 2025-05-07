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
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Api-Token': '={{$credentials.apiToken}}',
      }
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: '=https://mailtrap.io/api',
      url: '/accounts',
    }
  };
}
