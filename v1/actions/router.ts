import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from "n8n-workflow";

import * as mail from './mail/Mail.resource';
import * as contact from './contact/Contact.resource';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const resource = this.getNodeParameter('resource', 0);
  const operation = this.getNodeParameter('operation', 0);
  let data;

  try {
    switch (resource) {
      case 'mail':
        data = await mail[operation].execute.call(this);
        break;
      case 'contact':
        data = await contact[operation].execute.call(this);
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
