# 配置模型 (Models)

模型将被流水线用于处理消息，您配置的第一个模型将被设置为默认流水线的模型。  

![arch](/assets/image/deploy/models/arch.png)

需要将模型用于对话，请到流水线配置页面设置。

## 配置模型

请填写您从模型供应商获取的信息，包括：模型名称、API Key、模型能力等。

<img width="400px" src="/assets/image/deploy/models/create_model.png" alt="create_model" />

::: info

我们内置了大部分主流的模型供应商，您可以直接选择使用。若您的模型来自第三方中转站，请选择 `OpenAI` 作为供应商，并将中转站提供的请求地址（base_url）和 API Key 填写到表单中。注意，请求 URL 后方一般需要添加 `/v1` 路径。

:::

模型能力方面，请根据具体模型特性来选择：

- 视觉能力：需要启用才可以识图
- 函数调用：需要启用才可以在对话中使用 Agent 工具

## 使用模型

请到[流水线配置页面](../pipelines/readme.md)，在 AI 能力配置中选择您配置的模型。