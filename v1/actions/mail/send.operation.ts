import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties, NodeApiError,
  updateDisplayOptions,
} from "n8n-workflow";
import { MailtrapTransport } from "../../transport";
import {processMailtrapError} from "../../helpers/utils";

const properties: INodeProperties[] = [
  {
    displayName: 'From Name',
    name: 'fromName',
    type: 'string',
    default: '',
    description: 'Sender name',
  },
  {
    displayName: 'From Email',
    name: 'fromEmail',
    type: 'string',
    default: '',
    description: 'Sender E-mail',
  },
  {
    displayName: 'Reply-to Name',
    name: 'replyToName',
    type: 'string',
    default: '',
    description: 'Name of a receiver to reply to',
  },
  {
    displayName: 'Reply-to Email',
    name: 'replyToEmail',
    type: 'string',
    default: '',
    description: 'E-mail of a receiver to reply to',
  },
  {
    displayName: 'To Name',
    name: 'toName',
    type: 'string',
    default: '',
    description: 'Receiver name',
  },
  {
    displayName: 'To Email',
    name: 'toEmail',
    type: 'string',
    default: '',
  },
  {
    displayName: 'Subject',
    name: 'subject',
    type: 'string',
    default: '',
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
    description: 'The content of your email',
  },
]

const displayOptions = {
  show: {
    resource: ['mail'],
    operation: ['sendEmail'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this, await this.getCredentials('mailtrap'));

  const responseData = await transport.request('POST', '/send', {
    from: {
      name: this.getNodeParameter('fromName', 0) as string,
      to: this.getNodeParameter('fromEmail', 0) as string,
    },
    to: {
      name: this.getNodeParameter('toName', 0) as string,
      email: this.getNodeParameter('toEmail', 0) as string,
    },
    reply_to: {
      name: this.getNodeParameter('replyToName', 0) as string,
      email: this.getNodeParameter('replyToEmail', 0) as string,
    },
    subject: this.getNodeParameter('subject', 0) as string,
    html: this.getNodeParameter('html', 0) as string,
  });

  for (let i = 0; i < items.length; i++) {
    try {
      const executionData = this.helpers.constructExecutionMetaData(
        responseData,
        { itemData: { item: i }},
      );

      data.push(...executionData);
    } catch (error) {
      error = processMailtrapError(error as NodeApiError, undefined, i);

      if (this.continueOnFail()) {
        data.push({ json: { message: error.message, error }});
        continue;
      }
      throw error;
    }
  }

  return data;
}
