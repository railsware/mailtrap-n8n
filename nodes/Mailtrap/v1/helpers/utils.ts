import { type NodeApiError } from "n8n-workflow";
import set from 'lodash/set';

export function processMailtrapError(error: NodeApiError, itemIndex?: number) {
  // update error.description and message...
  let errorPayload: any;

  try {
    errorPayload = JSON.parse((error.description as string)?.slice(5)); // example error.description from http response: "422 - JSON"
  } catch (_) {
    errorPayload = false;
  }

  if (errorPayload) {
    if (Object.keys(errorPayload).includes('errors')) {
      error.message = Object.entries(errorPayload.errors)
        .map(([key, message]: any) => `"${key}": ${message}`)
        .join('\n');
    } else if (Object.keys(errorPayload).includes('error')) {
      error.message = errorPayload.error;
    }
  }

  const getSolution = () => {
    if (error.description?.includes('422')) {
      return 'Please verify the input data format and required fields. Check if all required parameters are provided and valid.';
    } else if (error.description?.includes('404')) {
      return 'The requested resource was not found. Verify the account ID and/or other information is correct.';
    } else if (error.description?.includes('401')) {
      return 'Authentication failed. Please check your API credentials and permissions.';
    }
    return 'Please check the request parameters and try again.';
  };

  error.description = getSolution();

  if (itemIndex !== undefined) {
    set(error, 'context.itemIndex', itemIndex);
  }

  return error;
}
