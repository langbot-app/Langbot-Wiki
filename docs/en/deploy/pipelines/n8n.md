# Using n8n with LangBot

[n8n](https://n8n.io/) is an open-source workflow automation platform that allows you to create, schedule, and execute various automated tasks.

LangBot currently supports triggering workflows and receiving responses through the `Webhook` node in n8n workflows.

## Configuring n8n Workflow Connection

![n8n Workflow](/assets/image/zh/deploy/pipelines/n8n/create_wf.png)

You need to select `Webhook` as the trigger and configure it according to the image below:

![n8n webhook configuration](/assets/image/zh/deploy/pipelines/n8n/config_webhook.png)

:::info
Authentication corresponds to the authentication methods in LangBot's pipeline configuration, which you can modify as needed.

![n8n workflow configuration](/assets/image/zh/deploy/pipelines/n8n/config_auth.png)
:::

For the workflow response content in n8n, please use the `Respond to Webhook` node and configure it according to the image below:

![n8n workflow response configuration](/assets/image/zh/deploy/pipelines/n8n/config_respond.png)

The response content key name in `Response Body` needs to match the `output key name` in LangBot's pipeline configuration.

After completing the n8n workflow configuration, please click `Active` at the top to enable the workflow.