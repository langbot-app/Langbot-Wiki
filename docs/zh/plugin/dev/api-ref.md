# API 参考

:::info 目录
[[toc]]
:::

以下 API 仅针对 事件插件 可用，组件扩展形式请自行阅读源码。

## 消息处理

### 回复消息

```python
ctx.reply(message_chain: MessageChain)
```

回复此次事件的发起会话。

- `message_chain`：[消息链对象](./messages.md)，程序能自动转换为目标消息平台消息链

### 发送主动消息

> 由于 QQ 官方 API 对主动消息的支持性很差，故若用户使用的是 QQ 官方 API，发送主动消息可能会失败

```python
ctx.send_message(target_type: str, target_id: str, message_chain: MessageChain)
```

发送主动消息给目标。

- `target_type`：目标类型，可选值：`"person"`、`"group"`
- `target_id`：目标 ID（QQ 号或群号）
- `message_chain`：[消息链对象](./messages.md)，程序能自动转换为目标消息平台消息链

## 事件处理

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
