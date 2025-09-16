# 接入来自胜算云的模型

胜算云是一家提供大模型和 GPU 资源的平台，支持将国内外各种大模型接入 LangBot，包括 Claude、GPT、DeepSeek、Gemini 等。

## 注册胜算云

点击[链接](https://www.shengsuanyun.com/?from=CH_KYIPP758)注册胜算云账号，完成后前往`控制台`，`API 密钥`页面，生成并复制 API Key。

## 使用聊天模型

在胜算云顶部进入`大厂模型Router`，即可查看可用的模型列表，并复制模型名称。

<img src="/assets/image/zh/workshop/shengsuanyun-integration/llm-models.png" alt="胜算云模型列表" />

前往 LangBot 模型管理页，添加模型（选择胜算云提供商，填入模型名称和 API Key：

<img src="/assets/image/zh/workshop/shengsuanyun-integration/add-llm-model.png" alt="添加模型" />

现在即可在流水线中选择使用该模型。