import {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  NodeApiError,
  NodeOperationError,
  sleep,
} from "n8n-workflow";

import * as mail from './mail/Mail.resource';
import * as contact from './contact/Contact.resource';
import { MailtrapType } from "./node.type";
import { processMailtrapError } from "../helpers/utils";

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const items = this.getInputData();
  const resource = this.getNodeParameter<MailtrapType>('resource', 0);
  const operation = this.getNodeParameter('operation', 0);

  const mailtrapNodeData = {
    resource,
    operation,
  } as MailtrapType;

  let data: INodeExecutionData[] = [];
  let responseData: any;

  for (let i = 0; i < items.length; i++) {
    try {
      switch (mailtrapNodeData.resource) {
        case 'mail':
          responseData = await mail[mailtrapNodeData.operation].execute.call(this, i);
          break;
        case 'contact':
          responseData = await contact[mailtrapNodeData.operation].execute.call(this, i);
          break;
        default:
          throw new NodeOperationError(
            this.getNode(),
            `The operation "${operation}" is not supported!`
          );
      }

      const executionData = this.helpers.constructExecutionMetaData(
        this.helpers.returnJsonArray(responseData as IDataObject[]),
        {
          itemData: { item: i },
        },
      );

      data.push(...executionData);

      if (i < items.length - 1) {
        // Mailtrap rate limit
        await sleep(400);
      }
    } catch (error) {
      const processedError = processMailtrapError(error as NodeApiError, i);

      if (this.continueOnFail()) {
        data.push({ json: { message: processedError.message, error: processedError }, pairedItem: { item: i }});
        continue;
      }

      throw new NodeOperationError(this.getNode(), error as Error, {
        message: processedError.message,
        description: processedError.description ?? '',
        itemIndex: i,
      });
    }
  }

  return [data];
}
