import { type NodeApiError } from "n8n-workflow";
import set from 'lodash/set';

export function processMailtrapError(error: NodeApiError, itemIndex?: number) {
  // update error.description...
  error.description = error.description || error.message;

  if (itemIndex !== undefined) {
    set(error, 'context.itemIndex', itemIndex);
  }

  return error;
}
