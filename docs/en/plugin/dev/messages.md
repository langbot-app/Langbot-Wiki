# Message Platform Entities

:::info Table of Contents
[[toc]]
:::

LangBot supports multiple messaging platforms, but the `message entity` format of each platform is different. To shield these differences, LangBot has a unified standard. Plugin developers only need to master and use the message entities described on this page in their plugins, and LangBot's internal message processing logic can automatically complete the parsing and conversion of messages.

:::info
LangBot's message platform entities are modified based on the implementation of [YiriMirai](https://github.com/YiriMiraiProject/YiriMirai).
:::

## Message Chain

The `message` of a message platform is different from the message used for AI interaction. The message of a message platform is described in the form of a `message chain`. Each independent message displayed on QQ is a message chain, which can contain multiple `message chain components` such as `text`, `image`, `@ component`, for example:

![](/assets/image/zh/plugin/dev/plugin_dev_messages_01.png)

This is a message chain, containing one Plain component (Hello World) and one Image component (Usagi)

The definitions of message chain and message chain components are located in `pkg/platform/types/messages.py`.

### Constructing Message Chain

Please import the `pkg.platform.types` package first to use the message components.  

```python
from pkg.platform.types import *

# Build a message containing the text Hello LangBot and an image (from URL)
msg_chain = MessageChain([
    Plain("Hello LangBot"),
    Image(url='https://qchatgpt.rockchin.top/langbot-logo.png')
])

# Build a message containing @all and the text Hello LangBot
msg_chain = MessageChain([
    AtAll(),
    Plain("Hello LangBot")
])

# Build a message containing @specific member and the text Hello LangBot
msg_chain = MessageChain([
    At(123456),
    Plain("Hello LangBot")
])
```

Currently supported message chain components:

- `Source` Source message chain information, if it is a message received from a message platform, this component will be included at the beginning of the message chain, recording message information
- `Plain` Plain text message
- `Quote` Quote message
- `Image` Image message
- `AtAll` @all members message
- `At` @specific member message
- `Voice` Voice message
    - Need to check message platform support
- `Forward` Forward message
    - Not supported on many platforms, not recommended to use
- `File` File message

For specific usage, please check the definitions in the source code `pkg/platform/types/messages.py`.

## Message Platform Events

These events are different from LangBot plugin events, they are an independent set of event systems for the message platform system. These events are the source events of LangBot messages, which can be obtained from each Query.message_event.

```python
    # For example in a plugin
    @handler(GroupMessageReceived)
    async def _(self, ctx: EventContext):
        # Get the message platform event
        message_event = ctx.query.message_event
```

Message platform events are defined in `pkg/platform/types/events.py`.

## Other Entities

In addition to the above entities, there are also entities such as `Friend` and `Group`, which are defined in `pkg/platform/types/entities.py`.
They are generally included in the above event objects, from which you can get some information not included in the plugin events.

## Accessing Message Platform Underlying API

In order to smooth out the differences between various platforms, LangBot provides an abstraction layer on top of the message platform APIs, namely the content described above and the platform adapters in the `pkg/platform/sources` directory.  
However, due to the large differences between platforms, the entities and API encapsulation in the abstraction layer are not complete. If your plugin needs to access specific platform functions, you can access the underlying API according to the following instructions.

:::info
The `adapter` here is the instantiated object of each adapter, corresponding to the `xxxAdapter(adapter.MessagePlatformAdapter)` class in each file under `pkg/platform/sources/`. It can be obtained from the plugin event's `query.adapter`, for example:

```python
    # For example in a plugin
    @handler(GroupMessageReceived)
    async def _(self, ctx: EventContext):
        # Get the adapter object
        adapter = ctx.query.adapter
```
:::


| Platform | Adapter | Access Method | Description |
| --- | --- | --- | --- |
| OneBot v11| aiocqhttp | adapter.bot | The bot object corresponds to the CQHttp object of [aiocqhttp](https://github.com/nonebot/aiocqhttp), please refer to the aiocqhttp documentation for detailed usage |
| QQ Official API | qqofficial | adapter.bot | The bot object is the SDK object under libs/qq_official_api, for detailed usage, you can refer to the way of initiating HTTP requests in the `send_group_text_msg` method in `QQOfficialClient` in libs/qq_official_api/api.py, please check the QQ official API documentation for specific interface documentation|
| Personal WeChat | gewechat | adapter.bot | The bot object is the GewechatClient object of [hanfangyuan4396/gewechat-client](https://github.com/hanfangyuan4396/gewechat-python), please refer to the documentation for detailed usage |
| WeCom | wecom | adapter.bot | Refer to the way of initiating HTTP requests in the `send_image` method in `WecomClient` in libs/wecom_api/api.py, please check the WeCom API documentation for specific interface documentation |
| WeChat Official Account | officialaccount | - | Please refer to the interface documentation information in the WeChat Official Account API documentation, the relevant credential information can be obtained from adapter.bot |
| Feishu | lark | adapter.api_client | Feishu SDK's API Client object, please refer to [oapi-sdk-python](https://github.com/larksuite/oapi-sdk-python) |
| DingTalk | dingtalk | - | Please refer to the DingTalk API documentation, the relevant credential information can be obtained from adapter.bot |
| Discord | discord | adapter.bot | The bot object is the Discord object of [Rapptz/discord.py](https://github.com/Rapptz/discord.py), please refer to the documentation for detailed usage |
| Telegram | telegram | adapter.bot | The bot object is the Telegram object of [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot), please refer to the documentation for detailed usage |
| Slack | slack | adapter.bot | The bot object is the object in libs/slack_api/api.py, please refer to its code and Slack SDK for detailed usage |
