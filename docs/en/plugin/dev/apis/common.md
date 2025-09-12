# Plugin Common APIs

LangBot provides a series of APIs for plugins to operate various LangBot modules and control message contexts.

:::info Table of Contents
[[toc]]
:::

## Request API

Operations for the currently processing user request (message). Only available in `EventListener` and `Command` components. Access methods:

- In event handler methods of `EventListener`: Internal methods of `event_context: context.EventContext` object
- In subcommand handler methods of `Command`: Internal methods of `context: ExecuteContext` object

### Direct Reply Message

Directly reply with a message chain to the session where the current request is located.

For message chain construction methods, please refer to [Message Platform Entities](/en/plugin/dev/apis/messages).

```python
async def reply(
    self, message_chain: platform_message.MessageChain, quote_origin: bool = False
):
    """Reply to the message request

    Args:
        message_chain (platform.types.MessageChain): LangBot message chain
        quote_origin (bool): Whether to quote the original message
    """

# Usage example
await event_context.reply(
    platform_message.MessageChain([
        platform_message.Plain(text="Hello, world!"),
    ]),
)
```

### Get Bot UUID

Get the UUID of the bot that originated the current request.

```python
async def get_bot_uuid(self) -> str:
    """Get the bot uuid"""

# Usage example
bot_uuid = await event_context.get_bot_uuid()
```

### Set Request Variables

Some information in a single request is stored in request variables. When using external LLMOps platforms like Dify, [these variables are explicitly passed to LLMOps platforms](/en/deploy/pipelines/readme.html#request-variables).

```python
async def set_query_var(self, key: str, value: Any):
    """Set a query variable"""

# Usage example
await event_context.set_query_var("key", "value")
```

### Get Request Variables

Get a single request variable.

```python
async def get_query_var(self, key: str) -> Any:
    """Get a query variable"""

# Usage example
query_var = await event_context.get_query_var("key")
```

### Get All Request Variables

```python
async def get_query_vars(self) -> dict[str, Any]:
    """Get all query variables"""

# Usage example
query_vars = await event_context.get_query_vars()
```

## LangBot API

These APIs can be called in any plugin component. Access methods:

- In the plugin root directory `main.py`: Internal methods of the `self` object, these APIs are all provided by the plugin class parent class `BasePlugin`.
- In any plugin component class: Internal methods of the `self.plugin` object.

### Get Plugin Configuration

Plugin configuration format can be written in `manifest.yaml`, and users need to fill it out according to the plugin configuration format in LangBot's plugin management. Plugin code can then call this API to get plugin configuration information.

```python
def get_config(self) -> dict[str, typing.Any]:
    """Get the config of the plugin."""

# Usage example
config = self.plugin.get_config()
```

### Get LangBot Version

Get the LangBot version number, returned as a string in format `v<major>.<minor>.<patch>`.

```python
async def get_langbot_version(self) -> str:
    """Get the langbot version"""

# Usage example
langbot_version = await self.plugin.get_langbot_version()
```

### Get Configured Bot List

Returns a list of all bot UUIDs.

```python
async def get_bots(self) -> list[str]:
    """Get all bots"""

# Usage example
bots = await self.plugin.get_bots()
```

### Get Bot Information

Get bot information.

```python
async def get_bot_info(self, bot_uuid: str) -> dict[str, Any]:
    """Get a bot info"""

# Usage example
bot_info = await self.plugin.get_bot_info("de639861-be05-4018-859b-c2e2d3e0d603")

# Return example
{
    "uuid": "de639861-be05-4018-859b-c2e2d3e0d603",
    "name": "aiocqhttp",
    "description": "Migrated from LangBot v3",
    "adapter": "aiocqhttp",
    "enable": true,
    "use_pipeline_name": "ChatPipeline",
    "use_pipeline_uuid": "c30a1dca-e91c-452b-83ec-84d635a30028",
    "created_at": "2025-05-10T13:53:08",
    "updated_at": "2025-08-12T11:27:30",
    "adapter_runtime_values": {  # Present if the bot is currently running
        "bot_account_id": 960164003  # Bot account ID
    }
}
```

### Send Proactive Message

Send proactive messages through bot UUID and target session ID.

For message chain construction methods, please refer to [Message Platform Entities](/en/plugin/dev/apis/messages).

```python
async def send_message(
    self,
    bot_uuid: str,
    target_type: str,
    target_id: str,
    message_chain: platform_message.MessageChain,
) -> None:
    """Send a message to a session"""

# Usage example
await self.plugin.send_message(
    bot_uuid="de639861-be05-4018-859b-c2e2d3e0d603",
    target_type="person",
    target_id="1010553892",
    message_chain=platform_message.MessageChain([platform_message.Plain(text="Hello, world!")]),
)
```

### Get Configured LLM Model List

Returns a list of UUIDs for all configured LLM models.

```python
async def get_llm_models(self) -> list[str]:
    """Get all LLM models"""

# Usage example
llm_models = await self.plugin.get_llm_models()
```

### Invoke LLM Model

Invoke an LLM model, returns an LLM message. Non-streaming.

```python
async def invoke_llm(
    self,
    llm_model_uuid: str,
    messages: list[provider_message.Message],
    funcs: list[resource_tool.LLMTool] = [],
    extra_args: dict[str, Any] = {},
) -> provider_message.Message:
    """Invoke an LLM model"""

# Usage example
llm_message = await self.plugin.invoke_llm(
    llm_model_uuid="llm_model_uuid",
    messages=[provider_message.Message(role="user", content="Hello, world!")],
    funcs=[],
    extra_args={},
)
```

### Set Plugin Persistent Data

Persistently store plugin data. Data stored through this interface can only be accessed by this plugin. Values need to be converted to bytes manually.

```python
async def set_plugin_storage(self, key: str, value: bytes) -> None:
    """Set a plugin storage value"""

# Usage example
await self.plugin.set_plugin_storage("key", b"value")
```

### Get Plugin Persistent Data

```python
async def get_plugin_storage(self, key: str) -> bytes:
    """Get a plugin storage value"""

# Usage example
plugin_storage = await self.plugin.get_plugin_storage("key")
```

### Get All Plugin Persistent Data Keys

```python
async def get_plugin_storage_keys(self) -> list[str]:
    """Get all plugin storage keys"""

# Usage example
plugin_storage_keys = await self.plugin.get_plugin_storage_keys()
```

### Delete Plugin Persistent Data

```python
async def delete_plugin_storage(self, key: str) -> None:
    """Delete a plugin storage value"""

# Usage example
await self.plugin.delete_plugin_storage("key")
```

### Get Workspace Persistent Data

Data stored through this interface can be accessed by all plugins. Values need to be converted to bytes manually.

```python
async def set_workspace_storage(self, key: str, value: bytes) -> None:
    """Set a workspace storage value"""

# Usage example
await self.plugin.set_workspace_storage("key", b"value")
```

### Get Workspace Persistent Data

```python
async def get_workspace_storage(self, key: str) -> bytes:
    """Get a workspace storage value"""

# Usage example
workspace_storage = await self.plugin.get_workspace_storage("key")
```

### Get All Workspace Persistent Data Keys

```python
async def get_workspace_storage_keys(self) -> list[str]:
    """Get all workspace storage keys"""

# Usage example
workspace_storage_keys = await self.plugin.get_workspace_storage_keys()
```

### Delete Workspace Persistent Data

```python
async def delete_workspace_storage(self, key: str) -> None:
    """Delete a workspace storage value"""

# Usage example
await self.plugin.delete_workspace_storage("key")
```