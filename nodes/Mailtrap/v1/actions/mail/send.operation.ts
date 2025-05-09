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
  mailtrapFields.fromName,
  mailtrapFields.fromEmail,
  mailtrapFields.replyToName,
  mailtrapFields.replyToEmail,
  mailtrapFields.toName,
  mailtrapFields.toEmail,
  mailtrapFields.subject,
  mailtrapFields.html,
]

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

  const sendOptions: IDataObject = {
    from: {
      name: this.getNodeParameter('fromName', item) as string,
      email: this.getNodeParameter('fromEmail', item) as string,
    },
    to: [{
      name: this.getNodeParameter('toName', item) as string,
      email: this.getNodeParameter('toEmail', item) as string,
    }],
    subject: this.getNodeParameter('subject', item) as string,
    html: this.getNodeParameter('html', item) as string,
  };

  if (this.getNodeParameter('replyToEmail', item)) {
    sendOptions.reply_to = {
      name: this.getNodeParameter('replyToName', item) as string,
      email: this.getNodeParameter('replyToEmail', item) as string,
    };
  }

  const responseData = await transport.sendRequest(sendOptions);

  data.push({ json: responseData, pairedItem: { item } });

  return data;
}
