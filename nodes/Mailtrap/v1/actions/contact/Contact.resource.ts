import {INodeProperties} from "n8n-workflow";
import * as create from './create.operation';
import * as update from './update.operation';
import * as delete_ from './delete.operation';
import * as getList from './getList.operation';

export { create, update, delete_, getList };

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    options: [
      {
        name: 'Create Contact',
        value: 'create',
        description: 'Creates a new contact',
        action: 'Creates a new contact',
      },
      {
        name: 'Update Contact',
        value: 'update',
        description: 'Allows you to update Contact in Mailtrap',
        action: 'Allows you to update contact in mailtrap',
      },
      {
        name: 'Delete Contact',
        value: 'delete',
        description: 'Allows you to delete Contact by their email',
        action: 'Allows you to delete contact by their email',
      },
      {
        name: 'Get Contact Lists',
        value: 'getLists',
        description: 'Allows you to get the list of your Lists and their IDs',
        action: 'Allows you to get the list of your lists and their i ds',
      },
    ],
    default: 'create',
  },

  ...create.description,
  ...update.description,
  ...delete_.description,
  ...getList.description,
]
