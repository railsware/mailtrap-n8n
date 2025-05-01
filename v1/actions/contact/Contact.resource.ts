import {INodeProperties} from "n8n-workflow";
import * as create from './create.operation';
import * as update from './update.operation';
import * as deleteOperation from './delete.operation';
import * as getList from './getList.operation';

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    options: [
      {
        name: 'Create Contact',
        value: 'create',
        description: 'Creates a new contact',
      },
      {
        name: 'Update Contact',
        value: 'update',
        description: 'Allows you to update Contact in Mailtrap',
      },
      {
        name: 'Delete Contact',
        value: 'delete',
        description: 'Allows you to delete Contact by their email',
      },
      {
        name: 'Get Contact Lists',
        value: 'getLists',
        description: 'Allows you to get the list of your Lists and their IDs',
      },
    ],
    default: 'create',
    description: 'Which operation to perform',
  },

  ...create.description,
  ...update.description,
  ...deleteOperation.description,
  ...getList.description,
]
