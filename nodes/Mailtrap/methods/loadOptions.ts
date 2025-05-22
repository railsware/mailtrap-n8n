import { ILoadOptionsFunctions, INodePropertyOptions } from "n8n-workflow";
import { MailtrapTransport } from '../transport';

export async function getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const transport = new MailtrapTransport(this);
  const returnData: INodePropertyOptions[] = [];

  const accounts = await transport.request('GET', '/accounts');

  for (const account of accounts) {
    returnData.push({
      name: account.name,
      value: account.id,
    });
  }

  return returnData;
}
