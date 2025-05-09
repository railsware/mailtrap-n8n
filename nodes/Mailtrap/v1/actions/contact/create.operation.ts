import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
  updateDisplayOptions,
} from "n8n-workflow";
import { MailtrapTransport } from "../../transport";
import { mailtrapFields } from "../mailtrapFields";

const properties: INodeProperties[] = [
  mailtrapFields.accountId,
  mailtrapFields.email,
  mailtrapFields.fields,
  mailtrapFields.listIds,
];

const displayOptions = {
  show: {
    resource: ['contact'],
    operation: ['create'],
  },
};

export const description = updateDisplayOptions(displayOptions, properties);

export async function execute(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this);

  const accountId = this.getNodeParameter('accountId', 0) as string;
  const responseData = await transport.request('POST', `/accounts/${accountId}/contacts`, {
    contact: {
      email: this.getNodeParameter('email', 0) as string,
      fields: this.getNodeParameter('fields', 0) as string,
      list_ids: (this.getNodeParameter('listIds', 0) as string).split(',').map((id) => id.trim()),
    },
  });

  data.push({ json: responseData });

  return data;
}
