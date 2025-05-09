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
];

const displayOptions = {
  show: {
    resource: ['contact'],
    operation: ['getLists'],
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
  const responseData = await transport.request('GET', `/accounts/${accountId}/contacts/lists`);

  data.push({ json: responseData, pairedItem: { item } });

  return data;
}
