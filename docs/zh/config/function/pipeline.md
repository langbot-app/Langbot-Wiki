# pipeline.json 配置项

:::info 目录
[[toc]]
:::

`data/config/pipeline.json` 配置程序处理一个请求的过程中的操作流程，平台适配器获取到消息事件之后，发送给pipeline排队进行处理。可以设置黑白名单、群响应规则、是否检查传入消息、传入消息忽略规则、是否检查敏感词、百度云内容审核配置、传入消息长度设置、限速配置等功能。


## 访问控制 access-control

```json
"access-control":{
    "mode": "blacklist",
    "blacklist": [],
    "whitelist": []
},
```

`mode`：设置模式白名单 `whitelist`（仅处理`whitelist`列表中的会话的消息）或黑名单 `blacklist`（忽略`blacklist`列表中的会话的消息）

`blacklist`：格式`{type}_{id}`，示例：`"blacklist": ["group_12345678"，"person_12341234"],`

`whitelist`：格式`{type}_{id}`，示例：`"whitelist": ["group_12345678"，"person_12341234"]`


## 群消息响应规则 respond-rules

仅处理`access-control`通过的会话的消息，其中可含有多个key，若要对特定群设置响应规则，则以群号作为键。未特指的群，将使用 default 中的响应规则

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

`at`：`true`或`false`，为true时，所有at机器人的消息都会被响应

`prefix`：设置响应前缀，带有指定前缀的消息即使没有at机器人也会被响应，发送给AI时会删除前缀。例如：

```json
"prefix": ["/ai", "!ai", "！ai", "ai"]

此时，消息"ai 你好"就会被响应，发送给AI时会删除前缀"ai"，即"你好"
```

`regexp`：正则匹配，[正则表达式教程](https://www.runoob.com/regexp/regexp-syntax.html)

`random`：随机匹配概率，数值范围是0.0-1.0，对应概率0%-100%，为1.0时所有消息都响应

你可以为单个群聊设置特定的响应规则，例如

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

## 检查传入消息内容开关 income-msg-check

```json
"income-msg-check": true,
```

`income-msg-check`：是否检查传入的消息

## 传入消息忽略规则 ignore-rules

```json
"ignore-rules": {
    "prefix": ["/"],
    "regexp": []
},
```

符合规则的传入消息将被忽略，仅`income-msg-check`为`true`时生效

`prefix`：前缀为`/`的忽略

`regexp`：正则匹配的忽略

## 本地敏感词检查 check-sensitive-words

```json
"check-sensitive-words": true,
```

`check-sensitive-words`：是否检查敏感词，敏感词词库为`data/config/sensitive-words.json`里面的

## 百度云内容审核配置 baidu-cloud-examine

```json
"baidu-cloud-examine": {
    "enable": false,
    "api-key": "",
    "api-secret": ""
},
```

`baidu-cloud-examine`：控制是否使用是否进行百度云内容审核

`enable`：enable=true时启用，一定会检查AI响应结果，仅`income-msg-check`为true时检查传入消息

`api-key`：百度AI开放平台的`API_KEY`

`api-secret`：百度AI开放平台的`SECRET_KEY`

*`API_KEY`与`SECRET_KEY`是在创建完毕应用后，系统分配给用户的，均为字符串，用于标识用户，为访问做签名验证，可在AI服务控制台中的**应用列表**中查看*

## 请求限速规则 rate-limit

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

`strategy`：会话中的请求速率超过限制时的处理策略，`drop`为丢弃新请求，`wait`为等待请求速率降到限制以下

`algo`： 使用的算法，目前仅支持 `fixwin` （固定窗口），即窗口期内最多处理多少个请求，可自行实现其他限速算法，具体查看插件编写教程

`fixwin`：具体速率设置，设定的窗口期内最多处理多少个请求，支持对特定session指定限速，格式为 {type}_{id}，示例：group_12345678，person_12341234

`window-size`：窗口期大小，单位秒

`limit`：窗口期内最多处理多少个请求

例如：

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

将设定：

- 默认群窗口期60秒内最多处理60个请求
- 群号为12345678的窗口期30秒内最多处理60个请求
- 用户号为12341234的窗口期60秒内最多处理60个请求

## 对话历史记录截断 msg-truncate

将在发送消息给模型之前对当前会话的历史消息进行截断，以限制传给模型的消息长度

```json
"msg-truncate": {
    "method": "round",
    "round": {
        "max-round": 10
    }
}
```

`method`：截断方法，`round`为按回合截断，目前仅支持`round`，可自行实现其他截断方法，具体查看插件编写教程

`round`：按回合截断，`max-round`为最多保留多少回合的历史消息