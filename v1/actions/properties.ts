import { INodeProperties } from 'n8n-workflow';

export const mailtrapFields: INodeProperties[] = [
  // ---------------------------------------------------
  //                    Multiple
  // ---------------------------------------------------
  {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: { operation: ['getContacts', 'createContact', 'updateContact', 'deleteContact', 'getContactLists'] },
    },
    description: 'Unique account ID',
  },
  {
    displayName: 'ID or Email',
    name: 'idOrEmail',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: { operation: ['updateContact', 'deleteContact'] },
    },
    description: 'Contact ID or email',
  },

  // ---------------------------------------------------
  //                   Send Email
  // ---------------------------------------------------

  // ---------------------------------------------------
  //                  Create/Update Contact
  // ---------------------------------------------------
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: { operation: ['createContact', 'updateContact', 'deleteContact'] },
    },
  },
  {
    displayName: 'Fields',
    name: 'fields',
    type: 'json',
    default: '',
    displayOptions: {
      show: { operation: ['createContact', 'updateContact'] },
    },
  },
  {
    displayName: 'Lists',
    name: 'listIds',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['createContact'] },
    },
    description: 'Enter List IDs you want a contact to be added to. Multiple IDs can be separated by comma. E.g. "1, 2".',
  },
  {
    displayName: 'Lists to include a contact',
    name: 'listIdsIncluded',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['updateContact'] },
    },
  },
  {
    displayName: 'Lists to exclude a contact',
    name: 'listIdsExcluded',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['updateContact'] },
    },
  },
  {
    displayName: 'Subscribed',
    name: 'subscribed',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: { operation: ['updateContact'] },
    },
  }
];
