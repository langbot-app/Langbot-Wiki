# 修改对话流水线配置 (Pipelines)

流水线控制了收到消息之后的处理流程，以及与大模型之间的信息交互。每个机器人可以绑定到一条流水线上，同一条流水线能被多个机器人绑定。

LangBot 首次启动时会自动创建一个默认的流水线。创建机器人时，会自动绑定到默认流水线。创建第一个模型时，会自动将其设置为默认流水线的模型。

![arch](/assets/image/deploy/pipelines/arch.png)

您可以创建多条流水线，用于不同的机器人，适应不同的场景。

## 修改流水线

流水线分为以下几部分配置：

- 基础信息 - 名称和描述
- AI 能力 - 配置模型和提示词等信息，或选择接入 Dify 等平台
- 触发条件 - 消息事件符合什么条件时需要处理
- 安全检查 - 消息内容审核规则
- 输出处理 - 处理大模型的响应数据

### AI 能力

AI 能力主要分为两个部分，选择运行器和配置运行器参数。  
运行器定义了如何调度大模型处理消息，默认为`内置 Agent`，这是 LangBot 实现的一个多回合 Agent 策略，当且仅当选择此运行器时，才会使用 LangBot 内部配置的模型和工具。

<!-- ![edit_pipeline](/assets/image/deploy/pipelines/edit_pipeline_ai.png) -->
<img width="400px" src="/assets/image/deploy/pipelines/edit_pipeline_ai.png" alt="edit_pipeline" />

您也可以选择使用 `Dify` `阿里云百炼` 等外部 LLMOps 平台，这种情况下所使用的模型和提示词、工具等资源将由 LLMOps 平台提供。

<img width="400px" src="/assets/image/deploy/pipelines/more_runner.png" alt="more_runner" />

### 其他配置

可以查看表单上的描述信息。