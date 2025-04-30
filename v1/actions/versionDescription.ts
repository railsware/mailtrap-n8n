import { mailtrapFields } from "./properties";
import {INodeTypeDescription, NodeConnectionTypes} from "n8n-workflow";

export const versionDescription: INodeTypeDescription = {
  displayName: 'Mailtrap',
  name: 'mailtrap',
  group: ['output'],
  description: 'Interact with Mailtrap API',
  version: 1,
  subtitle: '={{$parameter["operation"]}}',
  defaults: {
    name: 'Mailtrap'
  },
  inputs: [NodeConnectionTypes.Main],
  outputs: [NodeConnectionTypes.Main],
  credentials: [
    {
      name: 'mailtrapTokenApi',
      required: true,
      displayOptions: {
        show: {
          authentication: ['mailtrapTokenApi'],
        },
      }
    },
  ],
  properties: [
    ...mailtrapFields,
  ],
}
