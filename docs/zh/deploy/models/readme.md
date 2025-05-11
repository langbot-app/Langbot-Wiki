# 配置模型 (Models)

模型将被流水线用于处理消息，您配置的第一个模型将被设置为默认流水线的模型。

![arch](/assets/image/zh/deploy/models/arch.png)

可以添加多个模型，然后再流水线中选择具体使用什么模型

![模型配置](/assets/image/zh/deploy/models/model_config.png)

填入这四个参数`模型名称`、`模型供应商`、`请求 URL`、`API Key`，然后提交即可

模型能力方面，请根据具体模型特性来选择：

- 视觉能力：需要启用才可以识图

- 函数调用：需要启用才可以在对话中使用 Agent 工具

:::info

*如果你没有API Key，你可以[在此中转站获取](https://api.qhaigc.net/)*

如果需要使用第三方中转 API 等模型提供商

选择 `OpenAI`即可

请求 URL 填入中转的 Base URL 即可，例如

![模型配置](/assets/image/zh/deploy/models/other_provider.png)

:::