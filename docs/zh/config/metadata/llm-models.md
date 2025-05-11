# llm-models.json 元数据

`data/metadata/llm-models.json`，受支持的大语言模型列表，本文件中指定了可用于 `data/config/provider.json` 中的 `model` 列表，指定每个模型对应的 `Key 管理器` 和 `API 请求器`。

## 格式

```json
{
    "list": [
        {
            "name": "default",
            "requester": "openai-chat-completions",
            "token_mgr": "openai",
            "tool_call_supported": false,
            "vision_supported": false
        },
        {
            "name": "gpt-3.5-turbo",
            "tool_call_supported": true
        },
        {
            "name": "gpt-4o",
            "tool_call_supported": true,
            "vision_supported": true
        }
    ]
}
```

模型均列于`list`数组中，每个模型的字段如下：

- `name`: 模型名称，用于在 `data/config/provider.json` 中的 `model` 列表中指定。
- `model_name`: 进行请求时使用的模型名称，用于区分使用不同请求器的相同模型，若未设置则使用 `name` 字段。
- `requester`: 请求器名称，指定使用哪个请求器请求该模型的响应，不同的请求器对应不同的接口格式。
    - 已支持的请求器，请到 `配置文件 provider.json` 中字段 `requester` 查看。
    - 需要自行编写插件以实现新的请求器，请查看插件开发文档中的`组件扩展`页。
- `token_mgr`: Key 管理器，此模型使用的 key 组，对应 `data/config/provider.json` 中的 `keys` 列表。
- `tool_call_supported`: 是否支持工具调用，标记此模型是否支持使用`内容函数`。
- `vision_supported`: 是否支持图像输入，标记此模型是否支持使用`图像输入`。

`default` 模型是必须的，这是模型的默认配置，其他模型可以不设置所有的字段，只需设置 `name` 字段即可，其他字段会继承 `default` 模型的配置。

## 自动更新机制

LangBot 每次启动时，程序会自动从中央服务器获取最新的模型列表，本地 `llm-models.json` 中 `name` 与中央服务器返回的模型列表中的 `name` 进行对比，如果本地不存在，则添加，如果本地存在，则被远程获取的覆盖。

## 自定义模型

根据上述格式添加即可。

- 如果需要使用目前不支持的接口（请求器），需要自己扩展请求器，请参考插件开发文档 -> 组件扩展。
- key 组可以自己在 `data/config/provider.json` 中的 `keys` 列表中添加。
- 不建议修改默认的模型配置，因为启动时会被自动更新的信息覆盖。