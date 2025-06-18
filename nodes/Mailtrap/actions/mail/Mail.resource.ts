import { INodeProperties } from "n8n-workflow";

import * as send from './send.operation';

export { send };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'mail',
        ],
      }
    },
    options: [
      {
        name: 'Send Email',
        value: 'send',
        description: 'Send an email',
        action: 'Send an email',
      },
    ],
    default: 'send',
  },

  ...send.description,
];
