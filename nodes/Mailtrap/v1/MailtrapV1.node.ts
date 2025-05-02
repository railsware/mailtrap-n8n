import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType, INodeTypeBaseDescription,
  INodeTypeDescription,
} from "n8n-workflow";
import { router } from "./actions/router";
import { versionDescription } from "./actions/versionDescription";

export class MailtrapV1 implements INodeType {
  description: INodeTypeDescription;

  constructor(baseDescription: INodeTypeBaseDescription) {
    this.description = {
      ...baseDescription,
      ...versionDescription,
      usableAsTool: true,
    };
  }

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return await router.call(this);
  }
}
