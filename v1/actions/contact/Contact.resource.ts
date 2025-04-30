import {INodeProperties} from "n8n-workflow";

export const description: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    options: [
      {
        name: 'Create Contact',
        value: 'createContact',
        description: 'Creates a new contact',
      },
      {
        name: 'Update Contact',
        value: 'updateContact',
        description: 'Allows you to update Contact in Mailtrap',
      },
      {
        name: 'Delete Contact',
        value: 'deleteContact',
        description: 'Allows you to delete Contact by their email',
      },
      {
        name: 'Get Contact Lists',
        value: 'getContactLists',
        description: 'Allows you to get the list of your Lists and their IDs',
      },
    ],
    default: 'createContact',
    description: 'Which operation to perform',
  },
]
