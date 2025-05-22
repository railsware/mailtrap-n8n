import {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';
import { mailtrapFields } from "../nodes/Mailtrap/actions/mailtrapFields";

export class MailtrapBearerTokenApi implements ICredentialType {
  name = 'MailtrapBearerTokenApi';
  displayName = 'Mailtrap Bearer Token';
  documentationUrl = '';

  properties: INodeProperties[] = [
    {
      displayName: 'Bearer Token',
      name: 'bearerToken',
      type: 'string',
      required: true,
      typeOptions: {
        password: true,
      },
      placeholder: 'Bearer 123456',
      description: 'The bearer token used to authenticate with Mailtrap',
      hint: 'The "Bearer " prefix is optional',
      default: '',
    },
    mailtrapFields.mailingHost,
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        'Authorization': '={{$credentials.bearerToken.trim().toLowerCase().startsWith("bearer") ? $credentials.bearerToken.trim() : "Bearer " + $credentials.bearerToken.trim()}}',
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
