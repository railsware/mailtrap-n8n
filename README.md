## Node local development setup
### Prerequisites
- Node v18..22
- pnpm
- Local N8N installation (`npm i -g n8n`)
#### After that:
Install the dependencies:
```bash
  pnpm install
```
Publish the node locally:
```bash
  pnpm link
```
And build it:
```bash
  pnpm build
```
Go to `~/.n8n/custom` (Linux, Mac), and link it there
```bash
  cd ~/.n8n/custom
```
```bash
  npm link n8n-nodes-mailtrap
```

After that, you can start the local hosted n8n instance:
```bash
  n8n
```
