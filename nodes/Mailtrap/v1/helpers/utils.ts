import { type NodeApiError } from "n8n-workflow";
import set from 'lodash/set';

export function processMailtrapError(error: NodeApiError, id?: string, itemIndex?: number) {
  // update error.description...

  if (itemIndex !== undefined) {
    set(error, 'context.itemIndex', itemIndex);
  }

  return error;
}
