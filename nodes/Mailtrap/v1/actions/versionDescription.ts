// eslint-disable-line
import { INodeTypeDescription } from "n8n-workflow";
import * as mail from './mail/Mail.resource';
import * as contact from './contact/Contact.resource';

export const versionDescription: INodeTypeDescription = {
  displayName: 'Mailtrap',
  name: 'mailtrap',
  group: ['input'],
  description: 'Interact with Mailtrap API',
  version: 1,
  subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
  defaults: {
    name: 'Mailtrap',
  },
  inputs: ['main'],
  outputs: ['main'],
  credentials: [
    {
      name: 'MailtrapTokenApi',
      required: true,
      displayOptions: {
        show: {
          authentication: ['mailtrapTokenApi'],
        }
      }
    },
    {
      name: 'MailtrapBearerTokenApi',
      required: true,
      displayOptions: {
        show: {
          authentication: ['mailtrapBearerTokenApi'],
        }
      }
    }
  ],
  properties: [
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'options',
      options: [
        {
          name: 'API Key',
          value: 'mailtrapTokenApi',
        },
        {
          name: 'Bearer Token',
          value: 'mailtrapBearerTokenApi',
        },
      ],
      default: 'mailtrapTokenApi',
      required: true,
    },
    {
      displayName: 'Resource',
      name: 'resource',
      type: 'options',
      noDataExpression: true,
      options: [
        {
          name: 'Mail',
          value: 'mail',
        },
        {
          name: 'Contact',
          value: 'contact',
        },
      ],
      default: 'mail',
    },

    ...mail.description,
    ...contact.description,
  ],
};
