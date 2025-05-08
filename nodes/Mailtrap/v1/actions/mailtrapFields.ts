import { INodeProperties } from 'n8n-workflow';

export interface MailtrapFields extends Record<
  | "accountId"
  | "idOrEmail"
  | "fromName"
  | "fromEmail"
  | "replyToName"
  | "replyToEmail"
  | "toName"
  | "toEmail"
  | "subject"
  | "html"
  | "email"
  | "fields"
  | "listIds"
  | "listIdsIncluded"
  | "listIdsExcluded"
  | "subscribed",
  INodeProperties
>{}

export const mailtrapFields: MailtrapFields = {
  // ---------------------------------------------------
  //                  Route params
  // ---------------------------------------------------
  accountId: {
    displayName: 'Account ID',
    name: 'accountId',
    type: 'string',
    default: '',
    required: true,
    description: 'Unique account ID',
    placeholder: 'e.g. 2334',

  },
  idOrEmail: {
    displayName: 'ID or Email',
    name: 'idOrEmail',
    type: 'string',
    default: '',
    required: true,
    description: 'Contact ID or email',
    placeholder: 'e.g. 2454 or hello@example.com',
  },

  // ---------------------------------------------------
  //                   Send Email
  // ---------------------------------------------------
  fromName: {
    displayName: 'From Name',
    name: 'fromName',
    type: 'string',
    default: '',
    description: 'Sender name',
    placeholder: 'e.g. John Doe',
  },
  fromEmail: {
    displayName: 'From Email',
    name: 'fromEmail',
    type: 'string',
    default: '',
    required: true,
    description: 'Sender E-mail',
    placeholder: 'e.g. john.doe@mail.com',
  },
  replyToName: {
    displayName: 'Reply-to Name',
    name: 'replyToName',
    type: 'string',
    default: '',
    description: 'Name of a receiver to reply to',
    placeholder: 'e.g. John Doe',
  },
  replyToEmail: {
    displayName: 'Reply-to Email',
    name: 'replyToEmail',
    type: 'string',
    default: '',
    description: 'E-mail of a receiver to reply to',
    placeholder: 'e.g. john.doe@mail.com',
  },
  toName: {
    displayName: 'To Name',
    name: 'toName',
    type: 'string',
    default: '',
    description: 'Receiver name',
    placeholder: 'e.g. John Doe',
  },
  toEmail: {
    displayName: 'To Email',
    name: 'toEmail',
    type: 'string',
    default: '',
    required: true,
    description: 'Receiver E-mail',
    placeholder: 'e.g. john.doe@mail.com',
  },
  subject: {
    displayName: 'Subject',
    name: 'subject',
    type: 'string',
    default: '',
    required: true,
    description: 'Subject of your email',
    placeholder: 'e.g. Hello',
  },
  html: {
    displayName: 'HTML',
    name: 'html',
    type: 'string',
    default: '',
    required: true,
    typeOptions: {
      editor: 'htmlEditor',
    },
    description: 'The content of your email',
  },
  // ---------------------------------------------------
  //                  Create/Update Contact
  // ---------------------------------------------------
  email: {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    default: '',
    required: true,
  },
  fields: {
    displayName: 'Fields',
    name: 'fields',
    type: 'json',
    default: '{}',
  },
  listIds: {
    displayName: 'Lists',
    name: 'listIds',
    type: 'string',
    default: '',
    placeholder: 'e.g. 1, 2, 3',
    description: 'Enter List IDs you want a contact to be added to',
    hint: 'Multiple IDs can be separated by comma. E.g. "1, 2".',
  },
  listIdsIncluded: {
    displayName: 'Lists to Include a Contact',
    name: 'listIdsIncluded',
    type: 'string',
    default: '',
    description: 'Enter List IDs you want a contact to be included in',
    placeholder: 'e.g. 1, 2, 3',
    hint: 'Multiple IDs can be separated by comma. E.g. "1, 2".',
  },
  listIdsExcluded: {
    displayName: 'Lists to Exclude a Contact',
    name: 'listIdsExcluded',
    type: 'string',
    default: '',
    description: 'Enter List IDs you want a contact to be excluded from',
    placeholder: 'e.g. 1, 2, 3',
    hint: 'Multiple IDs can be separated by comma. E.g. "1, 2".',
  },
  subscribed: {
    displayName: 'Unsubscribed?',
    name: 'unsubscribed',
    type: 'boolean',
    default: false,
  },
};
