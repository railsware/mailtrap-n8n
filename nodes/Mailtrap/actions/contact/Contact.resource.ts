import { INodeProperties } from "n8n-workflow";
import * as create from './create.operation';
import * as update from './update.operation';
import * as delete_ from './delete.operation';
import * as getLists from './getLists.operation';

export { create, update, delete_, getLists };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: [
          'contact',
        ],
      }
    },
    options: [
      {
        name: 'Create Contact',
        value: 'create',
        description: 'Create a contact',
        action: 'Create a contact',
      },
      {
        name: 'Update Contact',
        value: 'update',
        description: 'Update a contact',
        action: 'Update a contact',
      },
      {
        name: 'Delete Contact',
        value: 'delete_',
        description: 'Delete a contact',
        action: 'Delete a contact',
      },
      {
        name: 'Get Contact Lists',
        value: 'getLists',
        action: 'Get contact lists',
      },
    ],
    default: 'create',
  },

  ...create.description,
  ...update.description,
  ...delete_.description,
  ...getLists.description,
];
