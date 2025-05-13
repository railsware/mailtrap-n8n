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
  mailtrapFields.accountId,
  {
    ...mailtrapFields.email,
    required: true,
  },
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
  item: number = 0,
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this);

  const accountId = this.getNodeParameter('accountId', item) as string;
  const responseData = await transport.request('POST', `/accounts/${accountId}/contacts`, {
    contact: {
      email: this.getNodeParameter('email', item) as string,
      fields: JSON.parse(this.getNodeParameter('fields', item) as string),
      list_ids: (this.getNodeParameter('listIds', item) as string).split(',').map((id) => parseInt(id.trim())),
    },
  });

  data.push({ json: responseData, pairedItem: { item } });

  return data;
}
