# provider.json 配置项

:::info 目录
[[toc]]
:::

`data/config/provider.json` 中配置AI接口提供商相关的配置项。

## 启用聊天功能 enable-chat

```json
"enable-chat": true,
```

`enable-chat`：是否开启AI聊天功能

## 启用 AI 视觉功能 enable-vision

```json
"enable-vision": true,
```

`enable-vision`：是否开启AI视觉功能。需要使用的模型同时支持视觉功能，详情见元数据板块。

## 模型接口密钥 keys

::: info
不同模型的提供商可能使用不同的接口格式，LangBot 通过每个模型的三元组（请求器、密钥组、模型名称）来确定模型的使用方式。查看已支持的模型或添加自定义模型，请查看元数据配置板块 `llm-models.json` 文件。
:::

```json
"keys": {
    "openai": [
        "sk-1234567890"
    ],
    "anthropic": [
        "sk-1234567890"
    ],
    "moonshot": [
        "sk-1234567890"
    ],
    "deepseek": [
        "sk-1234567890"
    ],
    "gitee-ai": [
        "XXXXX"
    ]
},
```

`keys`：设置密钥组，以字典的形式设置若干个密钥组，每个密钥组的键为密钥组名称，值为密钥列表。模型与密钥组的对应关系，请查看元数据板块 `llm-models.json` 文件。

目前支持的密钥组：

- `openai`：[OpenAI](https://openai.com/) 的密钥组，如果你没有OpenAI API Key，你可以[在此中转站获取](https://api.qhaigc.net/)
- `anthropic`：[Anthropic](https://anthropic.com/) 的密钥组
- `moonshot`：[Moonshot](https://moonshot.cn/)（月之暗面 kimi）的密钥组
- `deepseek`：[Deepseek](https://deepseek.com/)（深度求索）的密钥组
- `gitee-ai`: [Gitee AI](https://ai.gitee.com/) Serverless API 的密钥组

## 大模型请求器 requester

```json
"requester": {
        "openai-chat-completions": {
            "base-url": "https://api.openai.com/v1",
            "args": {},
            "timeout": 120
        },
        "anthropic-messages": {
            "base-url": "https://api.anthropic.com",
            "args": {
                "max_tokens": 1024
            },
            "timeout": 120
        },
        "moonshot-chat-completions": {
            "base-url": "https://api.moonshot.cn/v1",
            "args": {},
            "timeout": 120
        },
        "deepseek-chat-completions": {
            "base-url": "https://api.deepseek.com",
            "args": {},
            "timeout": 120
        },
        "ollama-chat": {
            "base-url": "http://127.0.0.1:11434",
            "args": {},
            "timeout": 600
        },
        "gitee-ai-chat-completions": {
            "base-url": "https://ai.gitee.com/v1",
            "args": {},
            "timeout": 120
        }
    },
```

`requester`：设置请求器，每个请求器的键为请求器名称，值为请求器配置。模型与请求器的对应关系，请查看元数据板块 `llm-models.json` 文件。实现请求器的方式，请查看插件编写教程。

目前支持的请求器有（除非编写插件实现了新的请求器，否则不支持在`requester`中添加新的请求器配置）：

- `openai-chat-completions`：[OpenAI](https://openai.com/) 的 ChatCompletion 请求器
- `anthropic-messages`：[Anthropic](https://anthropic.com/) 请求器（Claude）
- `moonshot-chat-completions`：[Moonshot](https://moonshot.cn/) 请求器（月之暗面）
- `deepseek-chat-completions`：[Deepseek](https://deepseek.com/) 请求器（深度求索）
- `ollama-chat`：[Ollama](https://ollama.com/) 请求器，不需要密钥，直接请求目标地址的 Ollama 服务
- `gitee-ai-chat-completions`：[Gitee AI](https://ai.gitee.com/) Serverless API 请求器（OpenAI 兼容接口）

`base-url`：设置接口地址。

`args`：请求时除了model之外的其他参数，以字典的形式设置，具体请查看各个接口提供商的文档。

`timeout`：设置请求超时时间，以秒为单位，对于耗时较长的模型，建议设置较大值。

## 使用的模型 model

```json
"model": "gpt-3.5-turbo",
```

`model`：设置要使用的模型名称。此模型必须存在于 `llm-models.json` 元数据中。

具体支持的模型列表和各个模型对应的请求器和密钥组，请查看元数据板块 `llm-models.json` 文件。

## 情景预设（人格） prompt

```json
"prompt-mode": "normal",
"prompt": {
    "default": "如果用户之后想获取帮助，请你说”输入!help获取帮助“。" 
}
```

`prompt-mode`：设置情景预设模式，值为`normal`（单预设模式）和`full-scenario`（完整历史对话模式）

`normal`时，使用下面的`prompt`，可设置多个

```json
"prompt": {
    "default": "如果用户之后想获取帮助，请你说”输入!help获取帮助“。",
    "help": "如果用户之后想获取帮助，请你说”输入!help获取帮助“。"
}
```

`normal` 模式也支持读取`data/prompts`目录下的文件内容作为单个 System Prompt，文件名即为`prompt`的名称。

在使用中通过`!default set <预设名>`指令将其设为默认（将<预设名>整体替换）

### full-scenario模式配置方法

把完整的历史对话以文件形式添加到`data/scenario/`目录下，参考`data/scenario/default.json`

```json
{
    "prompt": [
        {
            "role": "system",
            "content": "You are a helpful assistant. 如果我需要帮助，你要说“输入!help获得帮助”"
        },
        {
            "role": "assistant",
            "content": "好的，我是一个能干的AI助手。 如果你需要帮助，我会说“输入!help获得帮助”"
        }
    ]
}
```

`role` 为消息的角色，可以是`user`（用户）、`assistant`（AI）、`system`（系统）
`content` 为字符串，表示消息内容。  
在使用中通过`!default set <文件名>`指令将其设为默认（将<预设名>整体替换）

## 请求运行器 runner

```json
"runner": "local-agent",
```

设置聊天消息将由哪个运行器处理，默认是 `local-agent` 
目前支持：

- `local-agent`：LangBot 本地实现的一个 Agent 机制，实现会话管理、插件调用。需要设置为 local-agent 才能使用`内容函数`。
- `dify-service-api`：使用 [Dify](https://dify.ai/) 的 Service API 机制，支持 聊天助手、Agent、工作流应用。

## Dify Service API 配置 dify-service-api

```json
    "dify-service-api": {
        "base-url": "https://api.dify.ai/v1",
        "app-type": "chat",
        "chat": {
            "api-key": "app-1234567890",
            "timeout": 120
        },
        "agent": {
            "api-key": "app-1234567890",
            "timeout": 120
        },
        "workflow": {
            "api-key": "app-1234567890",
            "output-key": "summary",
            "timeout": 120
        }
    }
```

仅在 `runner` 设置为 `dify-service-api` 时，需要配置以下内容：

- `base-url`：Dify Service API 的地址，默认是 `https://api.dify.ai/v1`，这是 Dify 官方云服务的地址，如果你使用的是自部署的社区版，请设置为你的自部署地址。
- `app-type`：使用的 Dify 应用类型。支持 `chat` - 聊天助手（含高级编排）、 `agent` - Agent、 `workflow` - 工作流；请填写下方对应的应用类型 API 参数
- `chat`：Dify 聊天助手应用的配置
    - `api-key`：Dify 聊天助手应用的 API 密钥
    - `timeout`：Dify 聊天助手应用的请求超时时间，以秒为单位，默认是 120 秒。
- `agent`：Dify Agent 应用的配置
    - `api-key`：Dify Agent 应用的 API 密钥
    - `timeout`：Dify Agent 应用的请求超时时间，以秒为单位，默认是 120 秒。
- `workflow`：Dify 工作流应用的配置
    - `api-key`：Dify 工作流应用的 API 密钥
    - `output-key`：Dify 工作流应用的输出键，用于获取工作流应用的输出结果。默认为`summary`，对应工作流编排时，end节点的输出变量。
    - `timeout`：Dify 工作流应用的请求超时时间，以秒为单位，默认是 120 秒。

![Dify 工作流应用的输出键](/assets/image/config_provider_01.png)

当使用工作流时，LangBot 会显式传入以下参数，您可以自行在 Dify 工作流的开始节点中添加：

- `langbot_user_message_text`：用户消息的纯文本
- `langbot_session_id`：用户会话id，私聊为 `person_<id>`，群聊为 `group_<id>`
- `langbot_conversation_id`：用户会话id，由 LangBot 生成。用户重置会话后，会重新生成

![Dify 工作流开始节点配置](/assets/image/config_provider_02.png)

使用 工作流 应用或 Agent 应用时，如果开启了`platform.json`中的`track-function-calls`，将会在 Dify 执行每个工具调用时，输出一个`调用函数xxx`的消息给用户。  
但如果是使用`chat`应用下的`ChatFlow`（聊天助手->工作流编排），无论如何只会输出 Answer（直接回复）节点返回的文本。
