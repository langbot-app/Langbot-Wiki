# 流水线事件

:::info 目录
[[toc]]
:::

LangBot 插件可注册并处理流水线事件。使用方法见[组件：事件监听器](/zh/plugin/dev/components/event-listener)。

## *MessageReceived

接收到群聊或私聊任何消息时触发。

```python
class PersonMessageReceived(BaseEventModel):
    """收到任何私聊消息时"""

    event_name: str = "PersonMessageReceived"

    launcher_type: str
    """发起对象类型(person)"""

    launcher_id: typing.Union[int, str]
    """发送者ID"""

    sender_id: typing.Union[int, str]
    """发送者ID"""

    message_chain: platform_message.MessageChain = pydantic.Field(
        serialization_alias="message_chain"
    )


class GroupMessageReceived(BaseEventModel):
    """收到任何群聊消息时"""

    event_name: str = "GroupMessageReceived"

    launcher_type: str
    """发起对象类型(group)"""

    launcher_id: typing.Union[int, str]
    """群号"""

    sender_id: typing.Union[int, str]
    """发送者ID"""

    message_chain: platform_message.MessageChain = pydantic.Field(
        serialization_alias="message_chain"
    )
```

## *NormalMessageReceived

接收到群聊或私聊消息，并判断为需要由 LLM 处理的消息（非命令消息）时触发。

```python
class PersonNormalMessageReceived(BaseEventModel):
    """判断为应该处理的私聊普通消息时触发"""

    event_name: str = "PersonNormalMessageReceived"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    text_message: str
    """消息文本"""

    alter: typing.Optional[str] = None
    """修改后的消息文本"""

    reply: typing.Optional[list] = None
    """回复消息组件列表"""

class GroupNormalMessageReceived(BaseEventModel):
    """判断为应该处理的群聊普通消息时触发"""

    event_name: str = "GroupNormalMessageReceived"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    text_message: str
    """消息文本"""

    alter: typing.Optional[str] = None
    """修改后的消息文本"""

    reply: typing.Optional[list] = None
    """回复消息组件列表"""
```

## *CommandSent

:::warning 注意
不再推荐使用，请改为使用[组件：命令](/zh/plugin/dev/components/command)。
:::

接收到群聊或私聊命令时触发。

```python
class PersonCommandSent(BaseEventModel):
    """判断为应该处理的私聊命令时触发"""

    event_name: str = "PersonCommandSent"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    command: str
    """命令文本"""

    params: list[str]
    """命令参数"""

    text_message: str
    """消息文本"""

    is_admin: bool
    """是否为管理员"""

    alter: typing.Optional[str] = None
    """修改后的完整命令文本"""

    reply: typing.Optional[list] = None
    """回复消息组件列表"""

class GroupCommandSent(BaseEventModel):
    """判断为应该处理的群聊命令时触发"""

    event_name: str = "GroupCommandSent"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    command: str
    """命令文本"""

    params: list[str]
    """命令参数"""

    text_message: str
    """消息文本"""

    is_admin: bool
    """是否为管理员"""

    alter: typing.Optional[str] = None
    """修改后的完整命令文本"""

    reply: typing.Optional[list] = None
    """回复消息组件列表"""
```

## NormalMessageResponded

消息得到 LLM 响应时触发。

```python
class NormalMessageResponded(BaseEventModel):
    """回复普通消息时触发"""

    event_name: str = "NormalMessageResponded"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    session: provider_session.Session
    """会话对象"""

    prefix: str
    """回复消息的前缀"""

    response_text: str
    """回复消息的文本"""

    finish_reason: str
    """响应结束原因"""

    funcs_called: list[str]
    """调用的函数列表"""

    reply: typing.Optional[list] = None
    """回复消息组件列表"""
```

## PromptPreProcessing

在构建 LLM 响应的上下文（prompt）时触发。

```python
class PromptPreProcessing(BaseEventModel):
    """会话中的Prompt预处理时触发"""

    event_name: str = "PromptPreProcessing"

    session_name: str

    default_prompt: list[provider_message.Message]
    """此对话的情景预设，可修改"""

    prompt: list[provider_message.Message]
    """此对话现有消息记录，可修改"""
```
