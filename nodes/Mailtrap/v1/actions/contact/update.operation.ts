import { IExecuteFunctions, INodeExecutionData, INodeProperties, NodeApiError, updateDisplayOptions } from "n8n-workflow";
import { MailtrapTransport } from "../../transport";
import { processMailtrapError } from "../../helpers/utils";
import {mailtrapFields} from "../mailtrapFields";

const properties: INodeProperties[] = [
  mailtrapFields.accountId,
  mailtrapFields.idOrEmail,
  mailtrapFields.email,
  mailtrapFields.fields,
  mailtrapFields.listIdsIncluded,
  mailtrapFields.listIdsExcluded,
  mailtrapFields.subscribed,
];

const displayOptions = {
  show: {
    resource: ['contact'],
    operation: ['update'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this, await this.getCredentials('mailtrap'));

  try {
    const accountId = this.getNodeParameter('accountId', 0) as string;
    const responseData = await transport.request('PUT', `/accounts/${accountId}/contacts/${this.getNodeParameter('idOrEmail', 0)}`, {
      email: this.getNodeParameter('email', 0) as string,
      fields: this.getNodeParameter('fields', 0) as string,
      list_ids_included: (this.getNodeParameter('listIdsIncluded', 0) as string).split(',').map((id) => id.trim()),
      list_ids_excluded: (this.getNodeParameter('listIdsExcluded', 0) as string).split(',').map((id) => id.trim()),
      subscribed: this.getNodeParameter('subscribed', 0) as boolean,
    });

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
