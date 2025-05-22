import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';
import { mailtrapFields } from "../nodes/Mailtrap/v1/actions/mailtrapFields";

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
      placeholder: '123456',
      description: 'The API token used to authenticate with Mailtrap',
      default: '',
    },
    mailtrapFields.mailingHost,
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
      baseURL: 'https://mailtrap.io/api',
      url: '/accounts',
    }
  };
}
