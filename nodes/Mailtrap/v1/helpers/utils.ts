import { type NodeApiError } from "n8n-workflow";
import set from 'lodash/set';
import { mailtrapFields } from "../actions/mailtrapFields";

export function processMailtrapError(error: NodeApiError, itemIndex?: number) {
  // update error.description and message...

  const errorPayload = JSON.parse((error.description as string)?.slice(5)); // example error.description from http response: "422 - JSON"

  if (errorPayload) {
    if (Object.keys(errorPayload).includes('errors')) {
      const fieldMap = Object.entries(mailtrapFields)
        .map(
          ([key, description]: any) => ({ key, name: description.displayName })
        );

      error.message = Object.entries(errorPayload.errors)
        .map(
          ([key, message]: any) => {
            const fieldName = fieldMap.find((field) => field.key === key)?.name;

            return `Value of field "${fieldName}" ${message}`;
          }
        )
        .join('\n');
    } else if (Object.keys(errorPayload).includes('error')) {
      error.message = errorPayload.error;
    }
  }
  error.description = error.description || error.message;

  if (itemIndex !== undefined) {
    set(error, 'context.itemIndex', itemIndex);
  }

  return error;
}
