# Mailtrap.io N8N Integration - Official

This is the official Mailtrap.io integration for N8N, allowing you to seamlessly integrate Mailtrap's email testing and delivery services into your N8N workflows.

## Prerequisites

Before using this integration, please ensure you have:
- A [Mailtrap.io](https://mailtrap.io/signup) account
- Your sending [domain verified](https://mailtrap.io/sending/domains) in Mailtrap (required for sending emails)

## Installation

### Community Nodes (Recommended)
For n8n version 0.187 and later, you can install this node through the Community Nodes panel:

1. Go to Settings > Community Nodes
2. Select Install
3. Enter `n8n-nodes-mailtrap` in Enter npm package name
4. Agree to the risks of using community nodes
5. Select Install

### n8n Cloud
If you're using [n8n Cloud](https://cloud.n8n.io/), the Mailtrap node is available out of the box. Simply search for "Mailtrap" in the node library when building your workflows.

### Manual Installation
Alternatively, you can install the node manually using one of these methods:

#### Using npm
```bash
npm install n8n-nodes-mailtrap
```

#### Using pnpm
```bash
pnpm add n8n-nodes-mailtrap
```

For more detailed installation instructions, please refer to the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/installation/).

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

## Usage

1. After installation, restart your n8n instance
2. In your n8n workflow, you'll find the Mailtrap node under the "Mailtrap" category
3. Configure the node with your [Mailtrap API token](https://mailtrap.io/api-tokens) (you can find it in your Mailtrap account settings)
4. Use the node to send emails or manage contacts according to your needs

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
