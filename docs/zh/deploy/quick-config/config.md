# 填写配置信息

修改以下配置文件即可启用 LangBot 的基本功能，当你阅读完此页面后，建议查看[配置详解](/config/function/platform.md)，以了解更多的配置项详解

- `data/config/platform.json`
- `data/config/provider.json`
- `data/config/system.json`

## platform.json

修改此配置文件以指定需要连接的消息平台，只需要关注`platform-adapters`字段。
目前支持 `go-cqhttp`、`aiocqhttp`、`qq-botpy` 消息平台适配器，也可以同时启用多个同种类或不同种类的平台适配器。  
请根据你部署的消息平台的情况选择填写。

::: info
如果消息平台和 LangBot 均运行在 Docker 中，请先配置下方适配器设置，具体网络配置可参考[Docker 网络配置详解](/deploy/network-details)
:::

### aiocqhttp 适配器

用于接入 NapCat/Lagrange/LLOneBot 等兼容 OneBot 协议的机器人端（仅支持反向ws）。

```json
{
    "adapter": "aiocqhttp",
    "enable": true,
    "host": "0.0.0.0",
    "port": 2280,
    "access-token": ""
},
```

`"adapter": "aiocqhttp"`，无需改动。

`enable`：是否启用，配置完成后请将其设为`true`

`host`：监听的 IP 地址，一般就保持 0.0.0.0 就可以了。使用 aiocqhttp 时，LangBot 作为服务端被动等待框架连接，请在 NapCat/Lagrange/LLOneBot 等框架中设置`被动 ws 地址`或者`反向 ws 地址`（具体视框架而定）为 LangBot 监听的地址，且路径为`/ws`，例如：`ws://127.0.0.1:2280/ws`。

`port`：设置监听的端口，默认2280，需在 NapCat/Lagrange/LLOneBot 等框架中设置为与此处一致的端口。使用容器启动的 LangBot 默认暴露了 2280-2290 端口，请选用其中任意一个端口。

`access-token`：设置访问密钥，与 NapCat/Lagrange/LLOneBot 等框架中设置的保持一致

### qq-botpy 适配器

用于接入 QQ 官方机器人 API。

```json
{
    "adapter": "qq-botpy",
    "enable": false,
    "appid": "",
    "secret": "",
    "intents": [
        "public_guild_messages",
        "direct_message",
        "public_messages"
    ]
}
```

`"adapter": "qq-botpy"`，无需改动。

`enable`：是否启用，配置完成后请将其设为`true`

`appid`：申请到的QQ官方机器人的appid

`secret`：申请到的QQ官方机器人的secret

`intents`：控制监听的事件类型，需要填写才能接收到对应消息，目前支持的事件类型有：

- `public_guild_messages` QQ 频道消息
- `direct_message` QQ 频道私聊消息
- `public_messages` Q群 和 列表私聊消息

### Nakuru 适配器

用于接入 go-cqhttp。

```json
{
    "adapter": "nakuru",
    "enable": false,
    "host": "127.0.0.1",
    "ws_port": 8080,
    "http_port": 5700,
    "token": ""
},
```

`"adapter": "nakuru"`，无需改动。

`enable`：是否启用，配置完成后请将其设为`true`

`host`：运行 go-cqhttp 的主机地址，一般不改动

`ws_port`：正向WS服务器监听地址，与`go-cqhttp`的`config.yml`里面的保持一致

`http_port`：http服务器监听地址，与`go-cqhttp`的`config.yml`里面的保持一致

`token`：验证密钥，，与`go-cqhttp`的`config.yml`里面的保持一致

## provider.json

修改此配置文件以设置所连接的 AI 提供商的相关信息，目前支持 `openai(GPT)`, `anthropic(claude)`, `moonshot(月之暗面)` 三种接口及对应模型。

> 如果你没有OpenAI API Key，你可以[在此获取](https://api.qhaigc.net/)

以下仅讲解启用 OpenAI 接口的方式，具体设置方法请查看 [功能配置`provider.json` 页](/config/function/provider)。

编辑 `data/provider.json`，在`keys`->`openai`中添加你的 OpenAI API Key，例如：

```json
    "keys": {
        "openai": [
            "sk-AAAAAAAAAAAABBBBBBBBBBBBCCCCCCCCCCCCCDDDDDDDDD"
        ],
    },
```

如果你使用的是中转站，或者其他兼容 OpenAI 格式的平台，请将`requester`->`openai-chat-completions`->`base-url`设置为你的中转站地址。例如：

地址后记得加`/v1`。

```json
        "openai-chat-completions": {
            "base-url": "https://api.example.com/v1",
            "args": {},
            "timeout": 120
        },
```

最后，将`model`改为你想要使用的模型，例如：

```json
    "model": "gpt-4o",
```

## system.json

在 `data/system.json` 中修改 `admin-sessions`，添加 `person_你的QQ号` 把你与机器人的会话设置为管理员（仅 person 会话私聊有效），例如：

```json
    "admin-sessions": [
        "person_1010553892"
    ],
```

::: tip 

阅读并完成以上教程后，请根据你部署 LangBot 的方式重启，你应该可以成功使用了，如果不能请再次阅读（你或许漏做或错做某些步骤），如果完全阅读并充分理解本文档后仍然确实无法使用，你可以在[这里](/insight/community.html)找到交流群。

:::