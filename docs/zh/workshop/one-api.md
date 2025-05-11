# 在 LangBot 上接入 OneAPI、LinkAI 等第三方 OpenAI 格式接口

::: info 
转载自：[https://rockchin.top/?p=295](https://rockchin.top/?p=295)
:::

自从 OneAPI 流行之后，各种“牛鬼蛇神”模型都能以 OpenAI 的格式访问了，还有中转站也开始流行，OpenAI 的格式也成为了 AI App 平台等各种 AI 工具的访问格式，本文介绍如何将上述的支持 OpenAI 格式的接口接入 LangBot。

首先我们先按照 LangBot 的文档，部署好 消息平台、LangBot 主程序，并将其连接上，进行到 provider.json 配置这一步时，看此文档。

以下我们不再区分 LinkAI、OneAPI、中转站，统一以 OneAPI接口 代指 第三方OpenAI接口。

## 获取 OneAPI 接口地址和访问密钥

::: warning 
自己部署的 OneAPI 需要先设置渠道，具体请看 OneAPI 文档。配置好后再获取密钥。
:::

以 OneAPI 为例，如果你把 OneAPI 部署在本地，使用 8080端口，那么接口地址就是 http://127.0.0.1:8080/v1

其他的请看其文档或咨询中转站负责人，总之一般来说地址后面都是需要加 /v1 的。

访问密钥，以 OneAPI 为例，去 “令牌” 页创建一个新的 key

![获取 OneAPI 接口地址和访问密钥](/assets/image/one-api-01.png)

![获取 OneAPI 访问密钥](/assets/image/one-api-02.png)

回到令牌页点击复制，即可获取到 api key。

其他的中转站请看其文档或咨询负责人。

## 填写到 LangBot 配置文件

修改 data/config/provider.json 中的 provider 配置，使用 openai-chat-completions 请求器：

![填写到 LangBot 配置文件](/assets/image/one-api-03.png)

把你刚刚的地址填写到图中显示位置的 base-url 中，本例是我的 OneAPI 站（自用）。

接着把你刚刚的密钥填写到 keys 的 openai 组中：

![填写到 LangBot 配置文件](/assets/image/one-api-04.png)

请注意符合 JSON 语法。

最后配置所使用的模型，填写你 OneAPI 上提供的模型名称。

![填写到 LangBot 配置文件](/assets/image/one-api-05.png)


注意，可用的模型名称已经预设了一些在 data/metadata/llm-models.json 元数据里，如果你使用的模型没有相应的元数据，需要自己添加。

## 添加不在预设中的模型

查看 data/metadata/llm-models.json 中 list 字段所有的元素，若没有任何元素的 name 是你要使用的模型名称，或其对应的 requester、token_mgr 不是 openai-chat-completions、openai，则需要添加。

参考 元数据配置，本例中我们添加的模型 requester 设置为 openai-chat-completions ，token_mgr 设置为 openai，例如：

```json
    {
        "name": "qwen",
        "requester": "openai-chat-completions",
        "token_mgr": "openai",
        "tool_call_supported": false,
        "vision_supported": false
    },
```

name 为你的模型名称，对应 OneAPI 提供的模型名称，对应 上述 model 字段填写的值。

tool_call_supported：是否支持使用工具，根据实际模型情况设置

vision_supported：是否支持视觉，根据实际模型情况设置