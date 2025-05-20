# Mailtrap.io N8N Integration

This is the official Mailtrap.io integration for N8N, allowing you to seamlessly integrate Mailtrap's email testing and delivery services into your N8N workflows.

## Features

This integration provides the following capabilities:
- Send emails through Mailtrap's services:
  - Transactional emails
  - Bulk stream emails
- Manage your Mailtrap contacts:
  - Create new contacts
  - Delete existing contacts
  - Update contact information
  - Get a list of your Mailtrap Lists

## Prerequisites

Before using this integration, please ensure you have:
- A [Mailtrap.io](https://mailtrap.io) account
- Your sending domain verified in Mailtrap (required for sending emails)

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
Go to `~/.n8n/custom` (Linux, Mac), and link it there:
```bash
  cd ~/.n8n/custom
```
OR create the folder manually:
```bash
  mkdir ~/.n8n/custom
  cd ~/.n8n/custom
```
```bash
  pnpm link n8n-nodes-mailtrap
```

After that, you can start the local hosted n8n instance:
```shell
  n8n
```
