import { INodeProperties } from 'n8n-workflow';

export const mailtrapOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    options: [
      { name: 'Send Email', value: 'sendEmail' },
      { name: 'Create Contact', value: 'createContact' },
      { name: 'Update Contact', value: 'updateContact' },
      { name: 'Delete Contact', value: 'deleteContact' },
      { name: 'Get Contact Lists', value: 'getContactLists' },
    ],
    default: 'sendEmail',
    description: 'Which operation to perform',
  },
];

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
  {
    displayName: 'From Name',
    name: 'fromName',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
    description: 'Sender name',
  },
  {
    displayName: 'From Email',
    name: 'fromEmail',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
    description: 'Sender E-mail',
  },
  {
    displayName: 'Reply-to Name',
    name: 'replyToName',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
    description: 'Name of a receiver to reply to',
  },
  {
    displayName: 'Reply-to Email',
    name: 'replyToEmail',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
    description: 'E-mail of a receiver to reply to',
  },
  {
    displayName: 'To Name',
    name: 'toName',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
    description: 'Receiver name',
  },
  {
    displayName: 'To Email',
    name: 'toEmail',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
  },
  {
    displayName: 'Subject',
    name: 'subject',
    type: 'string',
    default: '',
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
  },
  {
    displayName: 'HTML',
    name: 'html',
    type: 'string',
    default: '',
    required: true,
    typeOptions: {
      editor: 'htmlEditor',
    },
    displayOptions: {
      show: { operation: ['sendEmail'] },
    },
    description: 'The content of your email',
  },

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
