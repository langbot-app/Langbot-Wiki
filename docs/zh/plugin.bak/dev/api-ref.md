# API 参考

:::info 目录
[[toc]]
:::

## 事件 API

以下 API 仅在事件处理函数中可用。

### 回复消息

```python
await ctx.reply(message_chain: MessageChain)
```

回复此次事件的发起会话。

- `message_chain`：[消息链对象](./messages.md)，程序能自动转换为目标消息平台消息链

### 发送主动消息

> 由于 QQ 官方 API 对主动消息的支持性很差，故若用户使用的是 QQ 官方 API，发送主动消息可能会失败

```python
await ctx.send_message(target_type: str, target_id: str, message_chain: MessageChain)
```

发送主动消息给目标。

- `target_type`：目标类型，可选值：`"person"`、`"group"`
- `target_id`：目标 ID（QQ 号或群号）
- `message_chain`：[消息链对象](./messages.md)，程序能自动转换为目标消息平台消息链

### 阻止事件默认行为

```python
ctx.prevent_default()
```

阻止此次事件的默认行为即停止处理流程之后的行为（如私聊收到消息时向接口获取回复、群消息收到消息时向接口获取回复等）。

### 阻止后续插件执行

```python
ctx.prevent_postorder()
```

阻止此次事件后续插件的执行。插件的执行顺序请通过`插件介绍`中的`插件管理`介绍的方式修改优先级。

### 添加返回值

```python
ctx.add_return(name: str, value: Any)
```

添加返回值，事件返回值均为**可选**的，每个事件支持的返回值请查看`pkg.plugin.events`中的每个事件的注释。

## 请求 API

`请求（Query）`指的是用户向 LangBot 发送一个问题时，LangBot 处理该问题的程序上下文。此段落的 API 用于与这些上下文交互。  

- 事件处理函数中，Query 对象一般位于`ctx.event.query`

### 设置请求变量

```python
ctx.event.query.set_variable(key: str, value: typing.Any)
```

请求变量是与此次 Query 绑定的一个 `dict`，其中包含了一些程序上下文信息。如果使用的是 Dify 或者 阿里云百炼 等 LLMOps 的runner，[这些变量将被传入对应平台的 API 作为变量](/zh/deploy/pipelines/readme.html#%E5%AF%B9%E8%AF%9D%E5%8F%98%E9%87%8F)。  
如果您需要使用插件设置变量，建议在`PromptPreProcessing`事件时处理。

- `key`：该变量的名称
- `value`：该变量的值

### 获取请求变量

```python
ctx.event.query.get_variable(key: str)
```

获取请求变量。

- `key`：变量名称
- 返回值：`typing.Any`

### 获取所有请求变量

```python
ctx.event.query.get_variables()
```

获取此 Query 对象所有已设置的变量值。

- 返回值：`dict[str, typing.Any]`


## LangBot API

以下 API 是 LangBot 直接提供给插件调用的，可以在事件处理函数之外调用。

- `host` 表示 `pkg.plugin.context.APIHost` 类的对象，会被包含在每个插件类中。

### 获取已启用的消息平台适配器列表

```python
host.get_platform_adapters()
```

获取已启用的消息平台适配器列表。

- 返回值：`list[pkg.platform.adapter.MessageSourceAdapter]`

### 发送主动消息

```python
await host.send_active_message(adapter: pkg.platform.adapter.MessageSourceAdapter, target_type: str, target_id: str, message_chain: MessageChain)
```

发送主动消息给目标。

- `adapter`：消息平台适配器，通过 `host.get_platform_adapters()` 获取并选择其中一个
- `target_type`：目标类型，可选值：`"person"`、`"group"`
- `target_id`：目标 ID（QQ 号或群号）
- `message_chain`：[消息链对象](./messages.md)，程序能自动转换为目标消息平台消息链

:::info
- 某些消息平台可能不支持主动消息，或有严格限制
- 某些消息平台适配器（例如`aiocqhttp`）是作为服务端等待消息平台连接上来推送消息，在连接成功之前，发送主动消息会失败
:::

示例：

```python
import asyncio
import pkg.platform.types as platform_types

...

    # 某个插件的 initialize 函数
    # 此代码将在 LangBot 启动 10 秒后尝试向 QQ 号 1010553892 发送消息 "hello, world!"
    async def initialize(self):
        print(self.host.get_platform_adapters())
        
        async def send_message():
            print("send message start waiting")
            await asyncio.sleep(10)

            try:
                await self.host.send_active_message(
                    adapter=self.host.get_platform_adapters()[0],
                    target_type="person",
                    target_id="1010553892",
                    message=platform_types.MessageChain([
                        platform_types.Plain("hello, world!")
                    ])
                )
            except Exception as e:
                traceback.print_exc()
            print("send message end")

        asyncio.get_running_loop().create_task(send_message())
```