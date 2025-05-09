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
  item: number = 0,
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this);

  const accountId = this.getNodeParameter('accountId', item) as string;
  const idOrEmail = this.getNodeParameter('idOrEmail', item) as string;

  const responseData = await transport.request('DELETE', `/accounts/${accountId}/contacts/${idOrEmail}`);

  data.push({ json: responseData, pairedItem: { item } });

  return data;
}
