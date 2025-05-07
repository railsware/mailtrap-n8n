import { INodeTypeBaseDescription, IVersionedNodeType, VersionedNodeType } from "n8n-workflow";
import { MailtrapV1 } from "./v1/MailtrapV1.node";

export class Mailtrap extends VersionedNodeType {
  constructor() {
    const baseDescription: INodeTypeBaseDescription = {
      displayName: 'Mailtrap',
      name: 'mailtrap',
      group: ['output'],
      icon: {
        light: 'file:mailtrap.svg',
        dark: 'file:mailtrap.dark.svg',
      },
      description: 'Interact with Mailtrap API',
      defaultVersion: 1,
    };

    const nodeVersions: IVersionedNodeType['nodeVersions'] = {
      1: new MailtrapV1(baseDescription),
    };

    super(nodeVersions, baseDescription);
  }
}
