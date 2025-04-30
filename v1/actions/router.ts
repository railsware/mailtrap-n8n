import {IExecuteFunctions, INodeExecutionData, NodeOperationError} from "n8n-workflow";
import { MailtrapTransport } from "../transport";

import * as mail from './mail/Mail.resource';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const credentials = await this.getCredentials('mailtrapApi');
  const transport = new MailtrapTransport(this, credentials);

  const items = this.getInputData();
  const resource = this.getNodeParameter('resource', 0);
  const operation = this.getNodeParameter('operation', 0);
  const accountId = this.getNodeParameter('accountId', 0) as string;
  let data;

  try {
    switch (resource) {
      case 'mail':
        data = await mail[operation].execute.call(this, items);
        break;
      case 'sendEmail':
        data = await transport.request('POST', '/send', {
          from: {
            name: this.getNodeParameter('fromName', 0) as string,
            to: this.getNodeParameter('fromEmail', 0) as string,
          },
          to: {
            name: this.getNodeParameter('toName', 0) as string,
            email: this.getNodeParameter('toEmail', 0) as string,
          },
          reply_to: {
            name: this.getNodeParameter('replyToEmail', 0) as string,
            email: this.getNodeParameter('replyToEmail', 0) as string,
          },
          subject: this.getNodeParameter('subject', 0) as string,
          html: this.getNodeParameter('html', 0) as string,
        });
        break;
      case 'createContact':
        data = await transport.request('POST', `/accounts/${accountId}/contacts`, {
          email: this.getNodeParameter('email', 0) as string,
          fields: this.getNodeParameter('fields', 0) as string,
          list_ids: (this.getNodeParameter('listIds', 0) as string).split(',').map((id) => id.trim()),
        });
        break;
      case 'updateContact':
        data = await transport.request('PUT', `/accounts/${accountId}/contacts/${this.getNodeParameter('idOrEmail', 0)}`, {
          email: this.getNodeParameter('email', 0) as string,
          fields: this.getNodeParameter('fields', 0) as string,
          list_ids_included: (this.getNodeParameter('listIdsIncluded', 0) as string).split(',').map((id) => id.trim()),
          list_ids_excluded: (this.getNodeParameter('listIdsExcluded', 0) as string).split(',').map((id) => id.trim()),
          subscribed: this.getNodeParameter('subscribed', 0) as boolean,
        });
        break;
      case 'deleteContact':
        data = await transport.request('DELETE', `/accounts/${accountId}/contacts/${this.getNodeParameter('idOrEmail', 0) as string}`);
        break;
      case 'getContactLists':
        data = await transport.request('GET', `/accounts/${accountId}/contacts/lists`);
        break;
      default:
        throw new NodeOperationError(
          this.getNode(),
          `The operation "${operation}" is not supported!`
        )
    }
  } catch (error) {
    throw error;
  }

  return this.prepareOutputData([{ json: data }]);
}
