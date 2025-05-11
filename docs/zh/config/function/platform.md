# platform.json 配置项

:::info 目录
[[toc]]
:::

`data/config/platform.json` 配置程序连接的消息平台和相关消息处理配置项。启用的消息适配器列表，是否跟踪内容函数调用过程，群内回复时是否引用原消息，群内回复时是否at原用户，强制消息延迟范围，长消息处理策略，是否向用户隐藏AI的异常信息等。

## 消息平台适配器 platform-adapters

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

目前支持 `go-cqhttp`、`aiocqhttp`、`qq-botpy` 四种消息平台适配器，也可以同时启用多个同种类或不同种类的平台适配器。  
各个消息平台的配置方式请查看部署文档。

### 多开示例

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

## 跟踪内容函数调用 track-function-calls

```json
"track-function-calls": true,
```

是否跟踪内容函数调用过程，如果开启了，在对话中调用的内容函数记录也会发给用户

关闭后(false)仅会发给用户最终结果

> 内容函数功能请查看插件功能文档。


## 引用原消息 quote-origin

```json
"quote-origin": false,
```

在群内回复时是否引用原消息

## 是否at原用户 at-sender

```json
"at-sender": false,
```

在群内回复时是否at原用户

## 强制消息延迟范围 force-delay

```json
"force-delay": [0, 0],
```

在将响应内容发回给用户前的强制消息延迟时间范围，以防风控，单位是秒。

## 长消息处理策略 long-text-process

```json
"long-text-process": {
    "threshold": 256,
    "strategy": "forward",
    "font-path": ""
},
```

`threshold`：阈值，文字长度大于此值的消息会使用长消息处理策略

`strategy`：长消息处理策略，目前支持forward（转发消息组件）和image（文字转图片）

`font-path`： image的渲染字体。未设置时，如果在windows下，会尝试寻找系统的微软雅黑字体，若找不到，则转为forward策略。未设置时，若不是windows系统，则直接转为forward策略。

## 向用户隐藏AI接口的异常信息 hide-exception-info

```
"hide-exception-info": true
```

 是否向用户隐藏AI的异常信息，如果为true，当请求AI接口出现异常时，会返回一个错误的提示给用户。而把报错详情输出在控制台。