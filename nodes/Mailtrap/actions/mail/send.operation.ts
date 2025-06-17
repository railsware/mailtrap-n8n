import {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
  updateDisplayOptions,
} from "n8n-workflow";
import { MailtrapTransport } from "../../transport";
import { mailtrapFields } from "../mailtrapFields";

const properties: INodeProperties[] = [
  mailtrapFields.fromEmail,
  mailtrapFields.toEmail,
  mailtrapFields.subject,
  mailtrapFields.html,
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add optional fields',
    default: {},
    options: [
      mailtrapFields.fromName,
      mailtrapFields.toName,
      mailtrapFields.replyToName,
      mailtrapFields.replyToEmail,
    ],
  },
];

const displayOptions = {
  show: {
    resource: ['mail'],
    operation: ['send'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(
  this: IExecuteFunctions,
  item: number = 0,
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this);

  const fromEmail = this.getNodeParameter('fromEmail', item) as string;
  const toEmail = this.getNodeParameter('toEmail', item) as string;
  const subject = this.getNodeParameter('subject', item) as string;
  const html = this.getNodeParameter('html', item) as string;
  const additionalFields = this.getNodeParameter('additionalFields', item, {}) as IDataObject;

  const sendOptions: IDataObject = {
    from: {
      email: fromEmail,
      name: additionalFields.fromName as string || undefined,
    },
    to: [{
      email: toEmail,
      name: additionalFields.toName as string || undefined,
    }],
    subject,
    html,
  };

  if (additionalFields.replyToEmail) {
    sendOptions.reply_to = {
      name: additionalFields.replyToName as string || undefined,
      email: additionalFields.replyToEmail as string,
    };
  }

  const responseData = await transport.sendRequest(sendOptions);

  data.push({ json: responseData, pairedItem: { item } });

  return data;
}
