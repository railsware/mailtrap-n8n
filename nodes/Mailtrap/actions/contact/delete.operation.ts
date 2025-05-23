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
    operation: ['delete_'],
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

  await transport.request('DELETE', `/accounts/${accountId}/contacts/${idOrEmail}`);

  data.push({ json: { deleted: true }, pairedItem: { item } });

  return data;
}
