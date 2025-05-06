// eslint-disable-line
import * as mail from './mail/Mail.resource';
import * as contact from './contact/Contact.resource';
import { INodeTypeDescription, NodeConnectionTypes } from "n8n-workflow";

export const versionDescription: INodeTypeDescription = {
  displayName: 'Mailtrap',
  name: 'mailtrap',
  group: ['output'],
  description: 'Interact with Mailtrap API',
  version: 1,
  subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
  defaults: {
    name: 'Mailtrap',
  },
  inputs: [NodeConnectionTypes.Main],
  outputs: ['main'],
  credentials: [
    {
      name: 'mailtrapTokenApi',
      required: true,
      displayOptions: {
        show: {
          authentication: ['apiKey'],
        },
      },
    },
  ],
  properties: [
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'options',
      options: [
        {
          name: 'API Key',
          value: 'apiKey',
        },
      ],
      default: 'apiKey',
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
}
