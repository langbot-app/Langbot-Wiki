# Pipeline Events

:::info Table of Contents
[[toc]]
:::

LangBot plugins can register and handle pipeline events. For usage instructions, see [Component: Event Listener](/en/plugin/dev/components/event-listener).

## *MessageReceived

Triggered when any message is received in group chat or private chat.

```python
class PersonMessageReceived(BaseEventModel):
    """When any private chat message is received"""

    event_name: str = "PersonMessageReceived"

    launcher_type: str
    """Launcher object type (person)"""

    launcher_id: typing.Union[int, str]
    """Sender ID"""

    sender_id: typing.Union[int, str]
    """Sender ID"""

    message_chain: platform_message.MessageChain = pydantic.Field(
        serialization_alias="message_chain"
    )


class GroupMessageReceived(BaseEventModel):
    """When any group chat message is received"""

    event_name: str = "GroupMessageReceived"

    launcher_type: str
    """Launcher object type (group)"""

    launcher_id: typing.Union[int, str]
    """Group ID"""

    sender_id: typing.Union[int, str]
    """Sender ID"""

    message_chain: platform_message.MessageChain = pydantic.Field(
        serialization_alias="message_chain"
    )
```

## *NormalMessageReceived

Triggered when a group chat or private chat message is received and determined to be a message that needs to be processed by LLM (non-command message).

```python
class PersonNormalMessageReceived(BaseEventModel):
    """Triggered when a private chat normal message that should be processed is determined"""

    event_name: str = "PersonNormalMessageReceived"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    text_message: str
    """Message text"""

    alter: typing.Optional[str] = None
    """Modified message text"""

    reply: typing.Optional[list] = None
    """Reply message component list"""

class GroupNormalMessageReceived(BaseEventModel):
    """Triggered when a group chat normal message that should be processed is determined"""

    event_name: str = "GroupNormalMessageReceived"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    text_message: str
    """Message text"""

    alter: typing.Optional[str] = None
    """Modified message text"""

    reply: typing.Optional[list] = None
    """Reply message component list"""
```

## *CommandSent

:::warning Note
No longer recommended for use, please use [Component: Command](/en/plugin/dev/components/command) instead.
:::

Triggered when a group chat or private chat command is received.

```python
class PersonCommandSent(BaseEventModel):
    """Triggered when a private chat command that should be processed is determined"""

    event_name: str = "PersonCommandSent"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    command: str
    """Command text"""

    params: list[str]
    """Command parameters"""

    text_message: str
    """Message text"""

    is_admin: bool
    """Whether it's an administrator"""

    alter: typing.Optional[str] = None
    """Modified complete command text"""

    reply: typing.Optional[list] = None
    """Reply message component list"""

class GroupCommandSent(BaseEventModel):
    """Triggered when a group chat command that should be processed is determined"""

    event_name: str = "GroupCommandSent"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    command: str
    """Command text"""

    params: list[str]
    """Command parameters"""

    text_message: str
    """Message text"""

    is_admin: bool
    """Whether it's an administrator"""

    alter: typing.Optional[str] = None
    """Modified complete command text"""

    reply: typing.Optional[list] = None
    """Reply message component list"""
```

## NormalMessageResponded

Triggered when a message receives an LLM response.

```python
class NormalMessageResponded(BaseEventModel):
    """Triggered when replying to a normal message"""

    event_name: str = "NormalMessageResponded"

    launcher_type: str

    launcher_id: typing.Union[int, str]

    sender_id: typing.Union[int, str]

    session: provider_session.Session
    """Session object"""

    prefix: str
    """Reply message prefix"""

    response_text: str
    """Reply message text"""

    finish_reason: str
    """Response end reason"""

    funcs_called: list[str]
    """List of called functions"""

    reply: typing.Optional[list] = None
    """Reply message component list"""
```

## PromptPreProcessing

Triggered when building the LLM response context (prompt).

```python
class PromptPreProcessing(BaseEventModel):
    """Triggered when preprocessing prompt in session"""

    event_name: str = "PromptPreProcessing"

    session_name: str

    default_prompt: list[provider_message.Message]
    """Scenario preset for this conversation, can be modified"""

    prompt: list[provider_message.Message]
    """Existing message records for this conversation, can be modified"""
```