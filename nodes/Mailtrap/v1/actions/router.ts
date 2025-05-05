import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from "n8n-workflow";

import * as mail from './mail/Mail.resource';
import * as contact from './contact/Contact.resource';
import { MailtrapType } from "./node.type";

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const resource = this.getNodeParameter<MailtrapType>('resource', 0);
  const operation = this.getNodeParameter('operation', 0);

  const mailtrapNodeData = {
    resource,
    operation,
  } as MailtrapType;

  let data;

  try {
    switch (mailtrapNodeData.resource) {
      case 'mail':
        data = await mail[mailtrapNodeData.operation].execute.call(this);
        break;
      case 'contact':
        data = await contact[mailtrapNodeData.operation].execute.call(this);
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

  return [data];
}
