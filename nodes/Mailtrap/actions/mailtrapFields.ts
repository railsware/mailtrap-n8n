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
  | "subscribed"
  | "mailingHost",
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
    description: 'Mailtrap account ID. Find it at: https://mailtrap.io/account-management',
    placeholder: 'e.g. 12345',
  },
  idOrEmail: {
    displayName: 'Contact ID or email',
    name: 'idOrEmail',
    type: 'string',
    default: '',
    required: true,
    description: 'Contact ID or email address.',
    placeholder: 'e.g. 2454 or hello@example.com',
  },

  // ---------------------------------------------------
  //                   Send Email
  // ---------------------------------------------------
  fromName: {
    displayName: 'From name',
    name: 'fromName',
    type: 'string',
    default: '',
    description: 'Name of the sender.',
    placeholder: 'e.g. John Doe',
  },
  fromEmail: {
    displayName: 'From email',
    name: 'fromEmail',
    type: 'string',
    default: '',
    required: true,
    description: 'Sender email address. Domain must be verified in Mailtrap.',
    placeholder: 'e.g. john.doe@mail.com',
  },
  replyToName: {
    displayName: 'Reply-to name',
    name: 'replyToName',
    type: 'string',
    default: '',
    description: 'Name for reply-to address.',
    placeholder: 'e.g. John Doe',
  },
  replyToEmail: {
    displayName: 'Reply-to email',
    name: 'replyToEmail',
    type: 'string',
    default: '',
    description: 'Reply-to email address.',
    placeholder: 'e.g. john.doe@mail.com',
  },
  toName: {
    displayName: 'To name',
    name: 'toName',
    type: 'string',
    default: '',
    description: 'Name of the recipient.',
    placeholder: 'e.g. John Doe',
  },
  toEmail: {
    displayName: 'To email',
    name: 'toEmail',
    type: 'string',
    default: '',
    required: true,
    description: 'Recipient email address.',
    placeholder: 'e.g. john.doe@mail.com',
  },
  subject: {
    displayName: 'Subject',
    name: 'subject',
    type: 'string',
    default: '',
    required: true,
    description: 'Email subject.',
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
    description: 'Email content in HTML format.',
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
    description: 'Contact email address.',
  },
  fields: {
    displayName: 'Fields (JSON)',
    name: 'fields',
    type: 'json',
    default: '{\n  "first_name": "John",\n  "last_name": "Doe"\n}',
    description: 'Additional contact fields in JSON format.',
  },
  listIds: {
    displayName: 'List IDs',
    name: 'listIds',
    type: 'string',
    default: '',
    placeholder: 'e.g. 1, 2, 3',
    description: 'Comma-separated list IDs to add the contact to.',
    hint: 'Multiple IDs can be separated by comma. E.g. "1, 2".',
  },
  listIdsIncluded: {
    displayName: 'List IDs to include contact',
    name: 'listIdsIncluded',
    type: 'string',
    default: '',
    description: 'Comma-separated list IDs to include the contact in.',
    placeholder: 'e.g. 1, 2, 3',
    hint: 'Multiple IDs can be separated by comma. E.g. "1, 2".',
  },
  listIdsExcluded: {
    displayName: 'List IDs to exclude contact',
    name: 'listIdsExcluded',
    type: 'string',
    default: '',
    description: 'Comma-separated list IDs to exclude the contact from.',
    placeholder: 'e.g. 1, 2, 3',
    hint: 'Multiple IDs can be separated by comma. E.g. "1, 2".',
  },
  subscribed: {
    displayName: 'Unsubscribed',
    name: 'unsubscribed',
    type: 'boolean',
    default: false,
    description: 'Whether the contact is unsubscribed.',
  },

  // ---------------------------------------------------
  //                  Credentials
  // ---------------------------------------------------
  mailingHost: {
    displayName: 'Mailing host',
    name: 'mailHost',
    type: 'string',
    required: true,
    description: 'Host used to send emails. Defaults to send.api.mailtrap.io (Transactional stream). For Bulk emails use bulk.api.mailtrap.io.',
    hint: 'Defaults to send.api.mailtrap.io',
    default: 'send.api.mailtrap.io',
  },
};
