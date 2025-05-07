import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties, NodeApiError,
  updateDisplayOptions,
} from "n8n-workflow";
import { MailtrapTransport } from "../../transport";
import { processMailtrapError } from "../../helpers/utils";
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
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this);

  try {
    const sendOptions: {[p: string]: any} = {
      from: {
        name: this.getNodeParameter('fromName', 0) as string,
        email: this.getNodeParameter('fromEmail', 0) as string,
      },
      to: [{
        name: this.getNodeParameter('toName', 0) as string,
        email: this.getNodeParameter('toEmail', 0) as string,
      }],
      subject: this.getNodeParameter('subject', 0) as string,
      html: this.getNodeParameter('html', 0) as string,
    };

    if (this.getNodeParameter('replyToEmail', 0)) {
      sendOptions.reply_to = {
        name: this.getNodeParameter('replyToName', 0) as string,
        email: this.getNodeParameter('replyToEmail', 0) as string,
      };
    }

    const responseData = await transport.sendRequest(sendOptions);

    data.push({ json: responseData });
  } catch (error) {
    const processedError = processMailtrapError(error as NodeApiError);

    if (this.continueOnFail()) {
      data.push({ json: { message: processedError.message, processedError }});
    } else {
      throw error;
    }
  }

  return data;
}
