// eslint-disable-line
import { INodeTypeDescription, NodeConnectionTypes } from "n8n-workflow";
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
  inputs: [NodeConnectionTypes.Main],
  outputs: [NodeConnectionTypes.Main],
  credentials: [
    {
      name: 'MailtrapTokenApi',
      displayName: 'Mailtrap API Token',
      required: true,
    },
  ],
  properties: [
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'credentials',
      options: [
        {
          name: 'API Key',
          value: 'mailtrapTokenApi',
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
