# 在 LangBot 上使用 Langflow

Langflow 是一个开源的用于构建和部署基于 AI 的 Agent 和工作流的项目。其支持本地和云端部署，并提供 API 供其他应用接入。

LangBot 目前支持使用 Langflow 作为运行器。

## 在 Langflow 上创建工作流

请根据 [Langflow 文档](https://langflow.com/docs/introduction) 部署 Langflow 实例。

以默认模板中的 Simple Agent 为例：

![create_flow](/assets/image/zh/deploy/pipelines/langflow/create_flow.png)

您可根据需求修改工作流：

![edit_flow](/assets/image/zh/deploy/pipelines/langflow/edit_flow.png)

## 配置 LangBot

打开 LangBot WebUI 页面，添加一个新的流水线或在已有流水线中切换到 AI 能力配置页面，选择`Langflow API` 作为运行器。

![set_langflow_runner](/assets/image/zh/deploy/pipelines/langflow/set_langflow_runner.png)

根据提示填入`Base URL`(根据实际网络情况填写) `API Key` `Flow ID` 等信息，API Key 可在 Langflow 的 Settings 中获取：   

![get_api_key](/assets/image/zh/deploy/pipelines/langflow/get_api_key.png)

Flow ID 可点击编辑页右上角的`Share` -> `API access` 并示例代码中获取：

![get_flow_id](/assets/image/zh/deploy/pipelines/langflow/get_flow_id.png)