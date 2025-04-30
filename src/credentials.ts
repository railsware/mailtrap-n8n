import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MailtrapApi implements ICredentialType {
  name = 'mailtrapApi';
  displayName = 'Mailtrap API';
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
      description: 'Your Mailtrap API token',
    },
  ];
}
