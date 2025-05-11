# provider.json Configuration

:::info Table of Contents
[[toc]]
:::

The `data/config/provider.json` file contains configuration items related to AI interface providers.

## Enable Chat Function (enable-chat)

```json
"enable-chat": true,
```

`enable-chat`: Whether to enable the AI chat function.

## Enable AI Vision Function (enable-vision)

```json
"enable-vision": true,
```

`enable-vision`: Whether to enable the AI vision function. The model used must also support the vision function. For details, refer to the metadata section.

## Model API Keys (keys)

::: info
Different model providers may use different API formats. LangBot determines the usage of each model through a triplet (requester, key group, model name). To view supported models or add custom models, refer to the metadata configuration section in the `llm-models.json` file.
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

`keys`: Configure key groups in dictionary format, where each key group's name is the key and the value is a list of keys. For the correspondence between models and key groups, refer to the metadata section in the `llm-models.json` file.

Currently supported key groups:

- `openai`: Key group for [OpenAI](https://openai.com/). If you don't have an OpenAI API Key, you can [get one here](https://api.qhaigc.net/).
- `anthropic`: Key group for [Anthropic](https://anthropic.com/).
- `moonshot`: Key group for [Moonshot](https://moonshot.cn/) (Moonshot AI).
- `deepseek`: Key group for [Deepseek](https://deepseek.com/) (Deepseek AI).
- `gitee-ai`: Key group for [Gitee AI](https://ai.gitee.com/) Serverless API.

## Large Model Requester (requester)

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

`requester`: Configure requesters, where each requester's name is the key and the value is the requester configuration. For the correspondence between models and requesters, refer to the metadata section in the `llm-models.json` file. For implementing requesters, refer to the plugin development tutorial.

Currently supported requesters (unless a new requester is implemented via a plugin, new requester configurations cannot be added to `requester`):

- `openai-chat-completions`: ChatCompletion requester for [OpenAI](https://openai.com/).
- `anthropic-messages`: Requester for [Anthropic](https://anthropic.com/) (Claude).
- `moonshot-chat-completions`: Requester for [Moonshot](https://moonshot.cn/) (Moonshot AI).
- `deepseek-chat-completions`: Requester for [Deepseek](https://deepseek.com/) (Deepseek AI).
- `ollama-chat`: Requester for [Ollama](https://ollama.com/), which does not require a key and directly requests the Ollama service at the target address.
- `gitee-ai-chat-completions`: Requester for [Gitee AI](https://ai.gitee.com/) Serverless API (OpenAI-compatible interface).

`base-url`: Set the API endpoint.

`args`: Additional parameters for the request, excluding the model, set in dictionary format. Refer to the documentation of each provider for details.

`timeout`: Set the request timeout in seconds. For models that take longer, it is recommended to set a larger value.

## Model to Use (model)

```json
"model": "gpt-3.5-turbo",
```

`model`: Set the name of the model to use. This model must exist in the `llm-models.json` metadata.

For the list of supported models and the corresponding requesters and key groups for each model, refer to the metadata section in the `llm-models.json` file.

## Scenario Preset (Personality) (prompt)

```json
"prompt-mode": "normal",
"prompt": {
    "default": "If the user wants help later, please say 'Input !help to get help.'." 
}
```

`prompt-mode`: Set the scenario preset mode, with values `normal` (single preset mode) and `full-scenario` (full historical conversation mode).

In `normal` mode, use the `prompt` below, which can have multiple entries.

```json
"prompt": {
    "default": "If the user wants help later, please say 'Input !help to get help.'.",
    "help": "If the user wants help later, please say 'Input !help to get help.'."
}
```

The `normal` mode also supports reading the contents of files in the `data/prompts` directory as individual System Prompts, where the file name is the `prompt` name.

In use, set it as the default via the `!default set <preset name>` command (replace `<preset name>` entirely).

### Full-Scenario Mode Configuration

Add complete historical conversations as files to the `data/scenario/` directory, referencing `data/scenario/default.json`.

```json
{
    "prompt": [
        {
            "role": "system",
            "content": "You are a helpful assistant. If I need help, you should say 'Input !help to get help.'"
        },
        {
            "role": "assistant",
            "content": "Okay, I am a capable AI assistant. If you need help, I will say 'Input !help to get help.'"
        }
    ]
}
```

`role` is the role of the message, which can be `user` (user), `assistant` (AI), or `system` (system).  
`content` is a string representing the message content.  
In use, set it as the default via the `!default set <file name>` command (replace `<preset name>` entirely).

## Request Runner (runner)

```json
"runner": "local-agent",
```

Set which runner will handle the chat messages. The default is `local-agent`.  
Currently supported:

- `local-agent`: A local Agent mechanism implemented by LangBot, managing conversations and invoking plugins. Must be set to `local-agent` to use `content functions`.
- `dify-service-api`: Use the Service API mechanism of [Dify](https://dify.ai/), supporting chat assistants, Agents, and workflow applications.

## Dify Service API Configuration (dify-service-api)

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

Only when `runner` is set to `dify-service-api`, configure the following:

- `base-url`: The address of the Dify Service API, default is `https://api.dify.ai/v1`, which is the address of the official Dify cloud service. If you are using a self-deployed community edition, set it to your self-deployed address.
- `app-type`: The type of Dify application to use. Supports `chat` - chat assistant (including advanced orchestration), `agent` - Agent, `workflow` - workflow; fill in the corresponding API parameters for the application type below.
- `chat`: Configuration for Dify chat assistant applications.
    - `api-key`: API key for the Dify chat assistant application.
    - `timeout`: Request timeout for the Dify chat assistant application, in seconds, default is 120 seconds.
- `agent`: Configuration for Dify Agent applications.
    - `api-key`: API key for the Dify Agent application.
    - `timeout`: Request timeout for the Dify Agent application, in seconds, default is 120 seconds.
- `workflow`: Configuration for Dify workflow applications.
    - `api-key`: API key for the Dify workflow application.
    - `output-key`: Output key for the Dify workflow application, used to retrieve the output results of the workflow application. Default is `summary`, corresponding to the output variable of the end node in the workflow orchestration.
    - `timeout`: Request timeout for the Dify workflow application, in seconds, default is 120 seconds.

![Dify Workflow Application Output Key](/assets/image/config_provider_01.png)

When using workflows, LangBot will explicitly pass the following parameters, which you can add to the start node of the Dify workflow:

- `langbot_user_message_text`: Plain text of the user's message.
- `langbot_session_id`: User session ID, `person_<id>` for private chats, `group_<id>` for group chats.
- `langbot_conversation_id`: User conversation ID, generated by LangBot. It will be regenerated after the user resets the conversation.

![Dify Workflow Start Node Configuration](/assets/image/config_provider_02.png)

When using workflow applications or Agent applications, if `track-function-calls` in `platform.json` is enabled, a message `Calling function xxx` will be output to the user when Dify executes each tool call.  
However, if using `ChatFlow` under the `chat` application (chat assistant -> workflow orchestration), only the text returned by the Answer (direct reply) node will be output.