# Filling in Configuration Information

To enable the basic functionality of LangBot, modify the following configuration files. After reading this page, it is recommended to check the [Configuration Details](/config/function/platform.md) for more in-depth explanations of the configuration items.

- `data/config/platform.json`
- `data/config/provider.json`
- `data/config/system.json`

## platform.json

Modify this configuration file to specify the messaging platforms you want to connect to. You only need to focus on the `platform-adapters` field. Currently supported platform adapters include `go-cqhttp`, `aiocqhttp`, and `qq-botpy`. You can enable multiple adapters of the same or different types simultaneously. Please fill in the details based on the messaging platforms you have deployed.

::: info
If both the messaging platform and LangBot are running in Docker, please configure the adapter settings below first. For specific network configurations, refer to [Docker Network Configuration Details](/deploy/network-details).
:::

### aiocqhttp Adapter

Used to connect to NapCat/Lagrange/LLOneBot and other OneBot protocol-compatible bot ends (only supports reverse WebSocket).

```json
{
    "adapter": "aiocqhttp",
    "enable": true,
    "host": "0.0.0.0",
    "port": 2280,
    "access-token": ""
},
```

`"adapter": "aiocqhttp"`, no need to change.

`enable`: Whether to enable it. Set it to `true` after configuration.

`host`: The IP address to listen on. Generally, keep it as `0.0.0.0`. When using aiocqhttp, LangBot acts as a server passively waiting for the framework to connect. Please set the `Passive WebSocket Address` or `Reverse WebSocket Address` (depending on the framework) in NapCat/Lagrange/LLOneBot to the address LangBot is listening on, with the path as `/ws`, e.g., `ws://127.0.0.1:2280/ws`.

`port`: The port to listen on. Default is 2280. Set the same port in NapCat/Lagrange/LLOneBot. LangBot started in a container exposes ports 2280-2290 by default. Please choose any one of these ports.

`access-token`: Set the access token, which should match the one set in NapCat/Lagrange/LLOneBot.

### qq-botpy Adapter

Used to connect to the official QQ bot API.

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

`"adapter": "qq-botpy"`, no need to change.

`enable`: Whether to enable it. Set it to `true` after configuration.

`appid`: The appid of the official QQ bot you applied for.

`secret`: The secret of the official QQ bot you applied for.

`intents`: Controls the types of events to listen to. You need to fill this in to receive corresponding messages. Currently supported event types include:

- `public_guild_messages` QQ channel messages
- `direct_message` QQ channel private messages
- `public_messages` QQ group and list private messages

### Nakuru Adapter

Used to connect to go-cqhttp.

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

`"adapter": "nakuru"`, no need to change.

`enable`: Whether to enable it. Set it to `true` after configuration.

`host`: The host address running go-cqhttp. Generally, no need to change.

`ws_port`: The WebSocket server listening address. Keep it consistent with the `config.yml` in `go-cqhttp`.

`http_port`: The HTTP server listening address. Keep it consistent with the `config.yml` in `go-cqhttp`.

`token`: The verification token. Keep it consistent with the `config.yml` in `go-cqhttp`.

## provider.json

Modify this configuration file to set the relevant information for the connected AI providers. Currently supported interfaces and corresponding models include `openai(GPT)`, `anthropic(claude)`, and `moonshot`.

> If you don't have an OpenAI API Key, you can [get it here](https://api.qhaigc.net/)

The following only explains how to enable the OpenAI interface. For specific setup methods, please refer to the [Function Configuration `provider.json` Page](/config/function/provider).

Edit `data/provider.json`, and add your OpenAI API Key under `keys`->`openai`, for example:

```json
    "keys": {
        "openai": [
            "sk-AAAAAAAAAAAABBBBBBBBBBBBCCCCCCCCCCCCCDDDDDDDDD"
        ],
    },
```

If you are using a relay station or another platform compatible with OpenAI format, set `requester`->`openai-chat-completions`->`base-url` to your relay station address. For example:

Remember to add `/v1` after the address.

```json
        "openai-chat-completions": {
            "base-url": "https://api.example.com/v1",
            "args": {},
            "timeout": 120
        },
```

Finally, change the `model` to the one you want to use, for example:

```json
    "model": "gpt-4o",
```

## system.json

In `data/system.json`, modify `admin-sessions` to add `person_your_QQ_number` to set your session with the bot as an administrator (only effective for person session private chats), for example:

```json
    "admin-sessions": [
        "person_1010553892"
    ],
```

::: tip 

After reading and completing the above tutorial, restart LangBot according to your deployment method. You should be able to use it successfully. If not, please read again (you might have missed or made a mistake in some steps). If you still cannot use it after fully reading and thoroughly understanding this document, you can find a community group [here](/insight/community.html).

:::