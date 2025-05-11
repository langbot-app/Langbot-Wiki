# system.json Configuration Items

:::info Table of Contents
[[toc]]
:::

The `data/config/system.json` file is used to configure system settings, such as administrators, network proxies, whether to report telemetry data for developer analysis, logging level, session message processing concurrency, pipeline message processing concurrency, help messages, and more.

## Admin Sessions (admin-sessions)

```json
"admin-sessions": [],
```

`admin-sessions`: Set administrator sessions in the format {type}_{id}, where type is either "group" or "person". For example:

```json
"admin-sessions": ["group_123456789", "person_123456789"],
```

::: info
1. If you are using the official QQ API, the session ID is the mapped value. You can refer to [qq-botpy metadata](https://docs.langbot.app/config/metadata/adapter-qq-botpy.html) or check the console output when the program processes messages.
2. If a session specifies a group, all messages from everyone in that group will be considered as administrator messages.
:::

## Network Proxies (network-proxies)

::: info
It is recommended to set proxies via environment variables, as the configuration file settings **will override environment variables**.  
Environment variables to set: `http_proxy` and `https_proxy`
:::

```json
"network-proxies": {
    "http": null,
    "https": null
},
```

`network-proxies`: Set up network proxies, which are forward proxies. Both http and https must be filled in. For example:

```json
"network-proxies": {
    "http": "http://127.0.0.1:7890",
    "https": "http://127.0.0.1:7890"
},
```

## Report Telemetry Data (report-usage)

```json
"report-usage": true,
```

`report-usage`: Whether to report telemetry data for developer analysis. This does not include sensitive information.

## Logging Level (logging-level)

```json
"logging-level": "info",
```

`logging-level`: Currently unused. Debug logging can only be enabled via the environment variable DEBUG=true.

## Session Message Processing Concurrency (session-concurrency)

```json
"session-concurrency": {
    "default": 1
},
```

`session-concurrency`: The concurrency level for session message processing, granular to each session. The session format is {type}_{id}. Sessions not specified will use the default configuration.

## Pipeline Message Processing Concurrency (pipeline-concurrency)

```json
"pipeline-concurrency": 20,
```

`pipeline-concurrency`: The concurrency level for pipeline message processing, granular to the entire program. Currently, the FCFS algorithm is used to schedule requests.

## Telemetry Server URL (qcg-center-url)

The target URL for pushing telemetry data during LangBot operation. The default is the official URL. If you have deployed [qcg-center](https://github.com/RockChinQ/qcg-center) yourself, you can change it to your own URL.

```json
"qcg-center-url": "https://api.qchatgpt.rockchin.top/api/v2"
```

## Help Message (help-message)

```json
"help-message": "LangBot - 😎High stability, 🧩plugin support, 🦄multimodal ChatGPT QQ bot🤖\nLink: https://langbot.app"
```

`help-message`: The help message displayed when a user sends the !help command.

## HTTP Interface (http-api)

Configure the HTTP service, which needs to be enabled to access the WebUI.

```json
"http-api": {
    "enable": true,
    "host": "0.0.0.0",
    "port": 5300,
    "jwt-expire": 604800
},
```

`enable`: Whether to enable the HTTP interface  
`host`: The address the HTTP interface listens on  
`port`: The port the HTTP interface listens on  
`jwt-expire`: JWT expiration time in seconds  

## Persistence Configuration (persistence)

Configure database information.

```json
"persistence": {
    "sqlite": {
        "path": "data/persistence.db"
    },
    "use": "sqlite"
}
```

`sqlite`: Use SQLite database, `path` is the database file path  
`use`: Which database to use, currently only `sqlite` is supported