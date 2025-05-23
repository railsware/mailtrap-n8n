import {
  IExecuteFunctions, INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { getAccounts } from "./methods/loadOptions";
import { description } from "./actions/description";
import { router } from "./actions/router";

export class Mailtrap implements INodeType {
  description: INodeTypeDescription;
  methods = {
    loadOptions: {
      getAccounts,
    },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return await router.call(this);
  }
  constructor() {
    this.description = {
      icon: {
        light: 'file:mailtrap.svg',
        dark: 'file:mailtrap.dark.svg',
      },
      defaultVersion: 1,
      usableAsTool: true,
      ...description,
    };
  }
}
