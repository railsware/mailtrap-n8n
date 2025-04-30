import { INodeProperties } from "n8n-workflow";

import * as send from './send.operation';

export { send };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    options: [
      {
        name: 'Send Email',
        value: 'sendEmail',
        description: 'Sends an email via Mailtrap',
      },
    ],
    default: 'sendEmail',
    description: 'Which operation to perform',
  },

  ...send.description,
];
