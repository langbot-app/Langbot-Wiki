# 在 LangBot 上使用 n8n

[n8n](https://n8n.io/) 是一款开源的自动化工作流平台，可以创建、调度、执行各种自动化任务。

LangBot 目前支持通过 n8n 工作流的 `Webhook` 节点，来触发工作流并获取回复。

## 选用 n8n 作为运行器

请打开已有的流水线配置页面，或新建流水线（推荐）并打开配置页面，到 `AI 能力`中选择 `n8n 工作流 API` 作为运行器。

![n8n 作为运行器](/assets/image/zh/deploy/pipelines/n8n/config_runner.png)

并根据下方内容设置并填写其他配置。

## 配置 n8n 工作流连接

![n8n 工作流](/assets/image/zh/deploy/pipelines/n8n/create_wf.png)

需要选择`Webhook`触发，并参考下图配置：

![n8n webhook 配置](/assets/image/zh/deploy/pipelines/n8n/config_webhook.png)

:::info
Authentication 对应 LangBot 流水线配置中的几种鉴权方式，可自行更改。

![n8n 工作流配置](/assets/image/zh/deploy/pipelines/n8n/config_auth.png)
:::

n8n 的工作流响应内容请使用`Respond to Webhook`节点，并参考下图配置：

![n8n 工作流响应配置](/assets/image/zh/deploy/pipelines/n8n/config_respond.png)

`Response Body`中的响应内容键名需要与 LangBot 流水线配置中的`输出键名`一致。

在完成 n8n 工作流的配置之后，请在其顶部点击`Active`以启用工作流。