## Node local development setup
### Prerequisites
- Node v18..22
- pnpm
- Local N8N installation (`npm i -g n8n`)
#### After that:
Install the dependencies:
```shell
  pnpm install
```
Publish the node locally:
```shell
  pnpm link
```
And build it:
```shell
  pnpm build
```
Go to `~/.n8n/custom` (Linux, Mac), and link it there
```shell
  cd ~/.n8n/custom
```
OR create the folder manually:
```shell
  mkdir -p ~/.n8n/custom
  cd ~/.n8n/custom
```
```shell
  pnpm link n8n-nodes-mailtrap
```

After that, you can start the local hosted n8n instance:
```shell
  n8n
```
