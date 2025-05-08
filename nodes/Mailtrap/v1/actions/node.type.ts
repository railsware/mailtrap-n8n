import { AllEntities } from "n8n-workflow";

type NodeType = {
  mail: 'send',
  contact: 'create' | 'update' | 'delete_' | 'getLists',
};

export type MailtrapType = AllEntities<NodeType>;
