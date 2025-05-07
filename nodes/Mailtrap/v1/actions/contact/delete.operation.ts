import { IExecuteFunctions, INodeExecutionData, INodeProperties, NodeApiError, updateDisplayOptions } from "n8n-workflow";
import { MailtrapTransport } from "../../transport";
import { processMailtrapError } from "../../helpers/utils";
import {mailtrapFields} from "../mailtrapFields";

const properties: INodeProperties[] = [
  mailtrapFields.accountId,
  mailtrapFields.idOrEmail,
];

const displayOptions = {
  show: {
    resource: ['contact'],
    operation: ['delete'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this);

  try {
    const accountId = this.getNodeParameter('accountId', 0) as string;
    const idOrEmail = this.getNodeParameter('idOrEmail', 0) as string;
    const responseData = await transport.request('DELETE', `/accounts/${accountId}/contacts/${idOrEmail}`);

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
