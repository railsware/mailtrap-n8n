import { INodeProperties } from "n8n-workflow";

import * as send from './send.operation';

export { send };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
				noDataExpression: true,
    options: [
      {
        name: 'Send Email',
        value: 'send',
        description: 'Sends an email via Mailtrap',
								action: 'Sends an email via mailtrap',
      },
    ],
    default: 'send',
  },

  ...send.description,
];
