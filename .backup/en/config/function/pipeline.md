# pipeline.json Configuration

:::info Table of Contents
[[toc]]
:::

The `data/config/pipeline.json` file configures the operational flow of processing a request. After the platform adapter receives a message event, it sends it to the pipeline for queued processing. You can configure features such as blacklists and whitelists, group response rules, whether to check incoming messages, incoming message ignore rules, whether to check for sensitive words, Baidu Cloud content review settings, incoming message length limits, and rate limiting.

## Access Control

```json
"access-control":{
    "mode": "blacklist",
    "blacklist": [],
    "whitelist": []
},
```

`mode`: Set the mode to either `whitelist` (only process messages from sessions in the `whitelist`) or `blacklist` (ignore messages from sessions in the `blacklist`).

`blacklist`: Format `{type}_{id}`, example: `"blacklist": ["group_12345678", "person_12341234"]`.

`whitelist`: Format `{type}_{id}`, example: `"whitelist": ["group_12345678", "person_12341234"]`.

## Group Message Response Rules

Only process messages from sessions that pass the `access-control` check. Multiple keys can be included. To set specific response rules for a group, use the group ID as the key. Groups not specified will use the default response rules.

```json
"respond-rules": {
    "default": {
        "at": true,
        "prefix": [
            "/ai", "!ai", "！ai", "ai"
        ],
        "regexp": [],
        "random": 0.0
    }
},
```

`at`: `true` or `false`. When `true`, all messages that mention the bot will be responded to.

`prefix`: Set response prefixes. Messages with the specified prefixes will be responded to even if they do not mention the bot. The prefix will be removed before sending to the AI. For example:

```json
"prefix": ["/ai", "!ai", "！ai", "ai"]

In this case, the message "ai hello" will be responded to, and the prefix "ai" will be removed before sending to the AI, resulting in "hello".
```

`regexp`: Regular expression matching. [Regular Expression Tutorial](https://www.runoob.com/regexp/regexp-syntax.html).

`random`: Random match probability, ranging from 0.0 to 1.0, corresponding to 0% to 100%. When set to 1.0, all messages will be responded to.

You can set specific response rules for individual groups, for example:

```json
"respond-rules": {
    "default": {
        "at": true,
        "prefix": [
            "/ai", "!ai", "！ai", "ai"
        ],
        "regexp": [],
        "random": 0.0
    },
    "123456":{
        "at": true,
        "prefix": [
            "/ai", "!ai", "！ai", "ai"
        ],
        "regexp": [],
        "random": 0.0
    },
    "789012":{
        "at": true,
        "prefix": [
            "/ai", "!ai", "！ai", "ai"
        ],
        "regexp": [],
        "random": 0.0
    }
},
```

## Incoming Message Check Switch

```json
"income-msg-check": true,
```

`income-msg-check`: Whether to check incoming messages.

## Incoming Message Ignore Rules

```json
"ignore-rules": {
    "prefix": ["/"],
    "regexp": []
},
```

Incoming messages that match the rules will be ignored. Only effective when `income-msg-check` is `true`.

`prefix`: Ignore messages with the prefix `/`.

`regexp`: Ignore messages that match the regular expression.

## Local Sensitive Word Check

```json
"check-sensitive-words": true,
```

`check-sensitive-words`: Whether to check for sensitive words. The sensitive word list is located in `data/config/sensitive-words.json`.

## Baidu Cloud Content Review Configuration

```json
"baidu-cloud-examine": {
    "enable": false,
    "api-key": "",
    "api-secret": ""
},
```

`baidu-cloud-examine`: Controls whether to use Baidu Cloud content review.

`enable`: When `enable=true`, it will always check the AI response results. Only checks incoming messages when `income-msg-check` is `true`.

`api-key`: The `API_KEY` from the Baidu AI Open Platform.

`api-secret`: The `SECRET_KEY` from the Baidu AI Open Platform.

*`API_KEY` and `SECRET_KEY` are assigned to users after creating an application. They are strings used to identify users and perform signature verification for access. They can be viewed in the **Application List** in the AI Service Console.*

## Rate Limit Rules

```json
"rate-limit": {
    "strategy": "drop",
    "algo": "fixwin",
    "fixwin": {
        "default": {
            "window-size": 60,
            "limit": 60
        }
    }
}
```

`strategy`: The handling strategy when the request rate exceeds the limit in a session. `drop` discards new requests, while `wait` waits for the request rate to drop below the limit.

`algo`: The algorithm used. Currently, only `fixwin` (fixed window) is supported, which limits the number of requests processed within a window period. You can implement other rate-limiting algorithms by referring to the plugin development tutorial.

`fixwin`: Specific rate settings, limiting the number of requests processed within a window period. Supports specifying rate limits for specific sessions in the format `{type}_{id}`, example: `group_12345678`, `person_12341234`.

`window-size`: The size of the window period in seconds.

`limit`: The maximum number of requests processed within the window period.

For example:

```json
"fixwin": {
    "default": {
        "window-size": 60,
        "limit": 60
    },
    "group_12345678": {
        "window-size": 30,
        "limit": 60
    },
    "person_12341234": {
        "window-size": 60,
        "limit": 60
    }
}
```

This will set:

- A default group window period of 60 seconds, with a maximum of 60 requests processed.
- A group with ID 12345678 has a window period of 30 seconds, with a maximum of 60 requests processed.
- A user with ID 12341234 has a window period of 60 seconds, with a maximum of 60 requests processed.

## Message History Truncation

Truncates the current session's message history before sending it to the model to limit the length of the message passed to the model.

```json
"msg-truncate": {
    "method": "round",
    "round": {
        "max-round": 10
    }
}
```

`method`: The truncation method. `round` truncates by rounds. Currently, only `round` is supported. You can implement other truncation methods by referring to the plugin development tutorial.

`round`: Truncates by rounds. `max-round` specifies the maximum number of historical message rounds to retain.