# Message Platform Entities

:::info Table of Contents
[[toc]]
:::

LangBot supports multiple message platforms, but the format of `message entities` varies across different platforms. To abstract these differences, LangBot has a unified standard. Plugin developers only need to understand and use the message entities described on this page within their plugins. LangBot's internal message processing logic will automatically handle the parsing and conversion of messages.

:::info
LangBot's message platform entities are based on a modified implementation of [YiriMirai](https://github.com/YiriMiraiProject/YiriMirai).
:::

## Message Chain

The `messages` on message platforms are different from the messages used for AI interactions. Messages on message platforms are described in the form of `message chains`. Each independent message displayed on QQ is a message chain. A message chain can contain various `message chain components` such as `text`, `images`, `@ components`, etc. For example:

![](/assets/image/plugin_dev_messages_01.png)

This is a message chain containing a Plain component ("Hello World") and an Image component ("Usagi").

The definitions of message chains and message chain components are located in `pkg/platform/types/messages.py`.

### Constructing a Message Chain

First, import the `pkg.platform.types` package to use the message components within it.

```python
from pkg.platform.types import *

# Construct a message containing the text "Hello LangBot" and an image (fetched from a URL)
msg_chain = MessageChain([
    Plain("Hello LangBot"),
    Image(url='https://qchatgpt.rockchin.top/langbot-logo.png')
])

# Construct a message containing an @All component and the text "Hello LangBot"
msg_chain = MessageChain([
    AtAll(),
    Plain("Hello LangBot")
])

# Construct a message containing an @ component for a specific member and the text "Hello LangBot"
msg_chain = MessageChain([
    At(123456),
    Plain("Hello LangBot")
])
```

Currently supported message chain components:

- `Source`: Source message chain information. If the message is received from a message platform, this component will be included at the beginning of the message chain, recording the message information.
- `Plain`: Plain text message.
- `Quote`: Quoted message.
- `Image`: Image message.
- `AtAll`: @All members message.
- `At`: @Specific member message.
- `Voice`: Voice message.
    - Requires checking platform support.
- `Forward`: Forwarded message.
    - Not supported on many platforms, not recommended for use.
- `File`: File message.

For specific usage, refer to the definitions in `pkg/platform/types/messages.py`.

## Message Platform Events

These events are different from LangBot plugin events and are part of an independent event system for message platforms. These events are the source events for LangBot plugin events and can be obtained from each `Query.message_event`.

The definitions of message platform events are located in `pkg/platform/types/events.py`.

## Other Entities

In addition to the entities mentioned above, there are entities such as `Friend` and `Group`. The definitions of these entities are located in `pkg/platform/types/entities.py`.
They are generally included in the event objects mentioned above and can be used to retrieve information not included in plugin events.

## Backward Compatibility

Plugins developed based on version 3.x can seamlessly adapt to version 3.4. However, `import mirai` is no longer supported in the new version, and the editor will report errors when developing plugins. Please make the following changes:

- Change `import mirai` to `import pkg.platform.types as mirai`
    - It is not recommended to directly change it to `as mirai`. Instead, use `import pkg.platform.types as platform_types` and replace the corresponding `mirai.xxx` in the plugin code with `platform_types.xxx`.
- Change `from mirai import *` to `from pkg.platform.types import *`