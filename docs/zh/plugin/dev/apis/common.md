# 插件通用 API

LangBot 为插件提供了一系列 API ，用于操作 LangBot 各个模块、控制消息上下文等。

:::info 目录
[[toc]]
:::

## 请求 API

操作当前正在处理的用户请求（消息）。仅在`EventListener`和`Command`组件中可用。访问方式如下：

- `EventListener` 的各个事件处理器方法中：`event_context: context.EventContext`对象内部方法
- `Command` 的各个子命令处理器方法中：`context: ExecuteContext`对象内部方法

### 直接回复消息

直接回复一个消息链到当前请求所在会话。

消息链构造方式请参考[消息平台实体](/zh/plugin/dev/apis/messages)。

```python
async def reply(
    self, message_chain: platform_message.MessageChain, quote_origin: bool = False
):
    """Reply to the message request

    Args:
        message_chain (platform.types.MessageChain): LangBot message chain
        quote_origin (bool): Whether to quote the original message
    """

# 调用示例
await event_context.reply(
    platform_message.MessageChain([
        platform_message.Plain(text="Hello, world!"),
    ]),
)
```

### 获取机器人 UUID

获取当前请求来源机器人 UUID。

```python
async def get_bot_uuid(self) -> str:
    """Get the bot uuid"""

# 调用示例
bot_uuid = await event_context.get_bot_uuid()
```

### 设置请求变量

单次请求中某些信息会被存储到请求变量中，在使用 Dify 等外部 LLMOps 平台时，[这些变量会显式传入 LLMOps 平台](/zh/deploy/pipelines/readme.html#%E8%AF%B7%E6%B1%82%E5%8F%98%E9%87%8F)。

```python
async def set_query_var(self, key: str, value: Any):
    """Set a query variable"""

# 调用示例
await event_context.set_query_var("key", "value")
```

### 获取请求变量

获取单个请求变量。

```python
async def get_query_var(self, key: str) -> Any:
    """Get a query variable"""

# 调用示例
query_var = await event_context.get_query_var("key")
```

### 获取所有请求变量

```python
async def get_query_vars(self) -> dict[str, Any]:
    """Get all query variables"""

# 调用示例
query_vars = await event_context.get_query_vars()
```

## LangBot API

这些 API 可在插件任何组件中调用。访问方式如下：

- 插件根目录`main.py`中：`self` 对象内部方法，这些 API 均由插件类父类 `BasePlugin` 提供。
- 插件任何组件类中：`self.plugin` 对象内部方法。

### 获取插件配置信息

插件配置格式可在`manifest.yaml`中编写，用户需要在 LangBot 的插件管理中按照插件配置格式填写。之后插件代码可以调用此 API 获取插件配置信息。

```python
def get_config(self) -> dict[str, typing.Any]:
    """Get the config of the plugin."""

# 调用示例
config = self.plugin.get_config()
```

### 获取 LangBot 版本

获取 LangBot 版本号，返回格式为字符串`v<major>.<minor>.<patch>`。

```python
async def get_langbot_version(self) -> str:
    """Get the langbot version"""

# 调用示例
langbot_version = await self.plugin.get_langbot_version()
```

### 获取已配置的机器人列表

返回由所有机器人 UUID 组成的列表。

```python
async def get_bots(self) -> list[str]:
    """Get all bots"""

# 调用示例
bots = await self.plugin.get_bots()
```

### 获取机器人信息

获取机器人信息。

```python
async def get_bot_info(self, bot_uuid: str) -> dict[str, Any]:
    """Get a bot info"""

# 调用示例
bot_info = await self.plugin.get_bot_info("de639861-be05-4018-859b-c2e2d3e0d603")

# 返回示例
{
    "uuid": "de639861-be05-4018-859b-c2e2d3e0d603",
    "name": "aiocqhttp",
    "description": "由 LangBot v3 迁移而来",
    "adapter": "aiocqhttp",
    "enable": true,
    "use_pipeline_name": "ChatPipeline",
    "use_pipeline_uuid": "c30a1dca-e91c-452b-83ec-84d635a30028",
    "created_at": "2025-05-10T13:53:08",
    "updated_at": "2025-08-12T11:27:30",
    "adapter_runtime_values": {  # 若该机器人正在运行中，则具有该字段
        "bot_account_id": 960164003  # 机器人账号 ID
    }
}
```

### 发送主动消息

通过机器人 UUID 和目标会话 ID 发送主动消息。

消息链构造方式请参考[消息平台实体](/zh/plugin/dev/apis/messages)。

```python
async def send_message(
    self,
    bot_uuid: str,
    target_type: str,
    target_id: str,
    message_chain: platform_message.MessageChain,
) -> None:
    """Send a message to a session"""

# 调用示例
await self.plugin.send_message(
    bot_uuid="de639861-be05-4018-859b-c2e2d3e0d603",
    target_type="person",
    target_id="1010553892",
    message_chain=platform_message.MessageChain([platform_message.Plain(text="Hello, world!")]),
)
```

### 获取已配置的 LLM 模型列表

返回由所有已配置的 LLM 模型 UUID 组成的列表。

```python
async def get_llm_models(self) -> list[str]:
    """Get all LLM models"""

# 调用示例
llm_models = await self.plugin.get_llm_models()
```

### 调用 LLM 模型

调用 LLM 模型，返回 LLM 消息。非流式。

```python
async def invoke_llm(
    self,
    llm_model_uuid: str,
    messages: list[provider_message.Message],
    funcs: list[resource_tool.LLMTool] = [],
    extra_args: dict[str, Any] = {},
) -> provider_message.Message:
    """Invoke an LLM model"""

# 调用示例
llm_message = await self.plugin.invoke_llm(
    llm_model_uuid="llm_model_uuid",
    messages=[provider_message.Message(role="user", content="Hello, world!")],
    funcs=[],
    extra_args={},
)
```

### 设置插件持久化数据

持久化存储插件数据。通过这个接口存储的数据，仅可被该插件访问。值需要自行转换为字节。

```python
async def set_plugin_storage(self, key: str, value: bytes) -> None:
    """Set a plugin storage value"""

# 调用示例
await self.plugin.set_plugin_storage("key", b"value")
```

### 获取插件持久化数据

```python
async def get_plugin_storage(self, key: str) -> bytes:
    """Get a plugin storage value"""

# 调用示例
plugin_storage = await self.plugin.get_plugin_storage("key")
```

### 获取插件所有持久化数据键

```python
async def get_plugin_storage_keys(self) -> list[str]:
    """Get all plugin storage keys"""

# 调用示例
plugin_storage_keys = await self.plugin.get_plugin_storage_keys()
```

### 删除插件持久化数据

```python
async def delete_plugin_storage(self, key: str) -> None:
    """Delete a plugin storage value"""

# 调用示例
await self.plugin.delete_plugin_storage("key")
```

### 获取工作空间持久化数据

通过这个接口存储的数据，可被所有插件访问。值需要自行转换为字节。

```python
async def set_workspace_storage(self, key: str, value: bytes) -> None:
    """Set a workspace storage value"""

# 调用示例
await self.plugin.set_workspace_storage("key", b"value")
```

### 获取工作空间持久化数据

```python
async def get_workspace_storage(self, key: str) -> bytes:
    """Get a workspace storage value"""

# 调用示例
workspace_storage = await self.plugin.get_workspace_storage("key")
```

### 获取工作空间所有持久化数据键

```python
async def get_workspace_storage_keys(self) -> list[str]:
    """Get all workspace storage keys"""

# 调用示例
workspace_storage_keys = await self.plugin.get_workspace_storage_keys()
```

### 删除工作空间持久化数据

```python
async def delete_workspace_storage(self, key: str) -> None:
    """Delete a workspace storage value"""

# 调用示例
await self.plugin.delete_workspace_storage("key")
```