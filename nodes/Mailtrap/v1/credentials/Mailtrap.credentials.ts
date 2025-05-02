import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class Mailtrap implements ICredentialType {
  name = 'mailtrap';
  displayName = 'Mailtrap';
  properties: INodeProperties[] = [
    {
      displayName: 'API Token',
      name: 'mailtrapTokenApi',
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
