# 使用 Ollama 接入本地模型

## 安装 Ollama

参考此教程：[https://datawhalechina.github.io/handy-ollama](https://datawhalechina.github.io/handy-ollama)

详细介绍了各个平台如何安装部署 Ollama

当你成功安装 Ollama 后

你可以在此找到支持的模型：[https://ollama.com/search](https://ollama.com/search)

然后复制对应指令下载模型即可

> 下文以`deepseek-r1：7b`模型为例
>
> ```powershell
> C:\Users\Lazy>ollama list
> NAME              ID              SIZE      MODIFIED
> deepseek-r1:7b    0a8c26691023    4.7 GB    52 minutes ago
> ```

## 修改 provider.json

打开`data/config/provider.json`，找到`model`配置项，值填写你在 Ollama 中下载的模型，例如我这里填写为：

```json
"model": "ollama/deepseek-r1:7b"
```

*💡Tips: 为什么写了`ollama/`前缀？个人习惯，便于区分*

**注意：这里的模型名称要和下文的`llm-model.json`配置文件相对应**

> **另附：**
>
> 如果你想更改 Ollama 的请求地址，比如说你的 Ollama 并没有在`本地的 11434 端口`运行
>
> 那么你可以在这个文件中找到
>
> ```json
> "ollama-chat": {
>     "base-url": "http://127.0.0.1:11434",
>     "args": {},
>     "timeout": 600
> },
> ```
>
> 修改`ollama-chat`的`base-url`为 Ollama 的实际运行地址即可

## 修改 llm-models.json

打开`data/metadata/llm-models.json`，在`list`数组的末尾，追加如下

```json
{
    "model_name": "deepseek-r1:7b",
    "name": "ollama/deepseek-r1:7b",
    "requester": "ollama-chat"
}
```

`model_name`：意思是请求的实际模型名称

`name`：意思是在 LangBot 中标识的名称

`requester`：意思是使用的请求器为`ollama-chat`，即为使用 Ollama

> 以上是我使用`deepseek-r1：7b`模型为例
>
> 其他模型同理可得

## 对话中使用
