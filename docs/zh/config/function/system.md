# system.json 配置项

:::info 目录
[[toc]]
:::



`data/config/system.json` 中配置系统设置，如管理员、网络代理、是否上报遥测数据供开发者分析、日志等级、会话消息处理并发数、流水线消息处理并发数、帮助消息等

## 管理员会话 admin-sessions

```json
"admin-sessions": [],
```

`admin-sessions`：设置管理员会话，格式为 {type}_{id}，type 为 "group" 或 "person"，如：

```json
"admin-sessions": ["group_123456789", "person_123456789"],
```

::: info
1. 如果你使用的是 QQ 官方的 API，session id 为映射之后的值，具体可以查看 [qq-botpy 元数据](https://docs.langbot.app/config/metadata/adapter-qq-botpy.html)，或者查看程序处理消息时的控制台输出。
2. 如果 session 指定了一个群，那么群内所有人的所有消息都会被认为是管理员消息。
:::

## 网络代理 network-proxies

::: info
建议通过环境变量设置代理，配置文件的设置**会覆盖环境变量**  
环境变量设置：`http_proxy` 和 `https_proxy`
:::

```json
"network-proxies": {
    "http": null,
    "https": null
},
```

`network-proxies`：设置网络代理，为正向代理，http和https都要填，例如

```json
"network-proxies": {
    "http": "http://127.0.0.1:7890",
    "https": "http://127.0.0.1:7890"
},
```

## 上报遥测数据 report-usage

```json
"report-usage": true,
```

`report-usage`：是否上报遥测数据供开发者分析，不包含敏感信息

## 日志等级 logging-level

```json
"logging-level": "info",
```

`logging-level`：暂时没用，现在只能通过环境变量 DEBUG=true 来设置调试日志输出

## 会话消息处理并发数 session-concurrency

```json
"session-concurrency": {
    "default": 1
},
```

`session-concurrency`：会话消息处理并发数，粒度是每个会话，session格式为 {type}_{id}，未指定的session使用 default 配置

## 流水线消息处理并发数 pipeline-concurrency

```json
"pipeline-concurrency": 20,
```

`pipeline-concurrency`：流水线消息处理并发数，粒度是整个程序，目前使用 FCFS 算法调度各个请求。

## 遥测服务器url qcg-center-url

LangBot 运行期间推送遥测数据的目标地址，默认为官方地址，若您自己部署了[qcg-center](https://github.com/RockChinQ/qcg-center)，可以改为你的地址。

```json
"qcg-center-url": "https://api.qchatgpt.rockchin.top/api/v2"
```

## 帮助消息 help-message

```json
"help-message": "LangBot - 😎高稳定性、🧩支持插件、🦄多模态的 ChatGPT QQ 机器人🤖\n链接：https://langbot.app"
```

`help-message`：帮助消息，用户发送 !help 命令时的输出

## HTTP 接口 http-api

配置 HTTP 服务，需要启用才能访问 WebUI。

```json
"http-api": {
    "enable": true,
    "host": "0.0.0.0",
    "port": 5300,
    "jwt-expire": 604800
},
```

`enable`：是否启用 HTTP 接口  
`host`：HTTP 接口监听的地址  
`port`：HTTP 接口监听的端口  
`jwt-expire`：JWT 过期时间，单位为秒  

## 持久化配置 persistence

配置数据库信息。

```json
"persistence": {
    "sqlite": {
        "path": "data/persistence.db"
    },
    "use": "sqlite"
}
```

`sqlite`：使用 SQLite 数据库，`path` 为数据库文件路径  
`use`：使用哪种数据库，目前仅支持 `sqlite`
