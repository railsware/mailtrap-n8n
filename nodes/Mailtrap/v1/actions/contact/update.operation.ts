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
  item: number = 0,
): Promise<INodeExecutionData[]> {
  const data: INodeExecutionData[] = [];
  const transport = new MailtrapTransport(this);

  const accountId = this.getNodeParameter('accountId', item) as string;
  const idOrEmail = this.getNodeParameter('idOrEmail', item) as string;

  const responseData = await transport.request('PATCH', `/accounts/${accountId}/contacts/${idOrEmail}`, {
    contact: {
      email: this.getNodeParameter('email', item) as string,
      fields: JSON.parse(this.getNodeParameter('fields', item) as string),
      list_ids_included: (this.getNodeParameter('listIdsIncluded', item) as string).split(',').map((id) => parseInt(id.trim())),
      list_ids_excluded: (this.getNodeParameter('listIdsExcluded', item) as string).split(',').map((id) => parseInt(id.trim())),
      unsubscribed: this.getNodeParameter('unsubscribed', item) as boolean,
    },
  });

  data.push({ json: responseData, pairedItem: { item } });

  return data;
}
