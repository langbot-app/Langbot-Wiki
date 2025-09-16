# 修改对话流水线配置 (Pipelines)

流水线控制了收到消息之后的处理流程，以及与大模型之间的信息交互。每个机器人可以绑定到一条流水线上，同一条流水线能被多个机器人绑定。

LangBot 首次启动时会自动创建一个默认的流水线。创建机器人时，会自动绑定到默认流水线。创建第一个模型时，会自动将其设置为默认流水线的模型。

![arch](/assets/image/zh/deploy/pipelines/arch.png)

您可以创建多条流水线，用于不同的机器人，适应不同的场景。



当前流水线可以配置以下功能

## AI 能力

可以选择使用：`内置 Agent`、[`Dify`](https://dify.ai/)、[`阿里云百炼`](https://www.aliyun.com/product/bailian?source=5176.29345612&userCode=ys4ad8gs)、[`n8n`](https://n8n.io/)

AI 能力主要分为两个部分，选择运行器和配置运行器参数。  

运行器定义了如何调度大模型处理消息，默认为`内置 Agent`，这是 LangBot 实现的一个多回合 Agent 策略，当且仅当选择此运行器时，才会使用 LangBot 内部配置的模型和工具。

*<!-- ![edit_pipeline](/assets/image/zh/deploy/pipelines/edit_pipeline_ai.png) -->*

<img width="400px" src="/assets/image/zh/deploy/pipelines/edit_pipeline_ai.png" alt="edit_pipeline" />

您也可以选择使用 `Dify`、 [`n8n`](https://n8n.io/) 等外部 LLMOps 平台，这种情况下所使用的模型和提示词、工具等资源将由 LLMOps 平台提供。

<img width="400px" src="/assets/image/zh/deploy/pipelines/more_runner.png" alt="more_runner" />

- 接入 Dify 的详细步骤可以[参考教程](/zh/deploy/pipelines/dify.html)。
- 接入 n8n 的详细步骤可以[参考教程](/zh/deploy/pipelines/n8n.html)。

### 请求变量

当使用外部 LLMOps 平台时，LangBot 会显式传入以下参数，您可以自行在 LLMOps 平台的开始节点中添加（下图以 Dify 为例）：

- `user_message_text`：用户消息的纯文本
- `session_id`：用户会话id，私聊为 `person_<id>`，群聊为 `group_<id>`
- `conversation_id`：字符串，用户会话id，由 LangBot 生成。用户重置会话后，会重新生成
- `msg_create_time`：数字类型，收到此消息的时间戳（秒）

您可以[通过插件自定义任何变量](/zh/plugin/dev/apis/common.html#%E8%AE%BE%E7%BD%AE%E8%AF%B7%E6%B1%82%E5%8F%98%E9%87%8F)。

![Dify 工作流开始节点配置](/assets/image/zh/workshop/dify-service-api/dify_workflow_var.png)

## 其他配置

请参考配置表单中的描述信息。