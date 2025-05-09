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
  const transport = new MailtrapTransport(this);

  const accountId = this.getNodeParameter('accountId', 0) as string;
  const idOrEmail = this.getNodeParameter('idOrEmail', 0) as string;

  const responseData = await transport.request('PUT', `/accounts/${accountId}/contacts/${idOrEmail}`, {
    contact: {
      email: this.getNodeParameter('email', 0) as string,
      fields: this.getNodeParameter('fields', 0) as string,
      list_ids_included: (this.getNodeParameter('listIdsIncluded', 0) as string).split(',').map((id) => id.trim()),
      list_ids_excluded: (this.getNodeParameter('listIdsExcluded', 0) as string).split(',').map((id) => id.trim()),
      unsubscribed: this.getNodeParameter('unsubscribed', 0) as boolean,
    },
  });

  data.push({ json: responseData });

  return data;
}
