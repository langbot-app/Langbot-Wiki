# platform.json Configuration

:::info Table of Contents
[[toc]]
:::

The `data/config/platform.json` file configures the message platforms that the program connects to and related message processing settings. This includes the list of enabled message adapters, whether to track the process of content function calls, whether to quote the original message when replying in a group, whether to @ the original user when replying in a group, the forced message delay range, long message handling strategies, and whether to hide AI exception information from users.

## Message Platform Adapters (platform-adapters)

```json
"platform-adapters": [
    {
        "adapter": "nakuru",
        "enable": false,
        "host": "127.0.0.1",
        "ws_port": 8080,
        "http_port": 5700,
        "token": ""
    },
    {
        "adapter": "aiocqhttp",
        "enable": false,
        "host": "0.0.0.0",
        "port": 2280,
        "access-token": "",
    },
    {
        "adapter": "qq-botpy",
        "enable": false,
        "appid": "",
        "secret": "",
        "intents": [
            "public_guild_messages",
            "direct_message"
        ]
    }
],
```

Currently, four message platform adapters are supported: `go-cqhttp`, `aiocqhttp`, and `qq-botpy`. Multiple adapters of the same or different types can be enabled simultaneously.  
For configuration details of each message platform, please refer to the deployment documentation.

### Multiple Adapters Example

```json
"platform-adapters": [
    {
        "adapter": "aiocqhttp",
        "enable": false,
        "host": "0.0.0.0",
        "port": 2280,
        "access-token": "",
    },
    {
        "adapter": "nakuru",
        "enable": true,
        "host": "127.0.0.1",
        "ws_port": 8081,
        "http_port": 5701,
        "token": "token"
    }
]
```

## Track Content Function Calls (track-function-calls)

```json
"track-function-calls": true,
```

Whether to track the process of content function calls. If enabled, the records of content function calls during the conversation will also be sent to the user.

If disabled (false), only the final result will be sent to the user.

> For details on the content function feature, please refer to the plugin documentation.

## Quote Original Message (quote-origin)

```json
"quote-origin": false,
```

Whether to quote the original message when replying in a group.

## @ Original User (at-sender)

```json
"at-sender": false,
```

Whether to @ the original user when replying in a group.

## Forced Message Delay Range (force-delay)

```json
"force-delay": [0, 0],
```

The forced message delay range before sending the response back to the user, to prevent risk control. The unit is seconds.

## Long Message Handling Strategy (long-text-process)

```json
"long-text-process": {
    "threshold": 256,
    "strategy": "forward",
    "font-path": ""
},
```

`threshold`: The threshold. Messages longer than this value will use the long message handling strategy.

`strategy`: The long message handling strategy. Currently supported strategies are `forward` (forward message component) and `image` (convert text to image).

`font-path`: The font used for rendering images. If not set, on Windows, the system's Microsoft YaHei font will be attempted. If not found, the strategy will switch to `forward`. If not set on non-Windows systems, it will directly switch to `forward`.

## Hide AI Interface Exception Information from Users (hide-exception-info)

```
"hide-exception-info": true
```

Whether to hide AI exception information from users. If true, when an exception occurs while requesting the AI interface, an error prompt will be returned to the user, and the error details will be output to the console.