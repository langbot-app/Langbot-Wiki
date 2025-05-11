# 消息平台实体

:::info 目录
[[toc]]
:::

LangBot 支持多种消息平台，但每个消息平台的`消息实体`格式均不相同，为了屏蔽这些差异，LangBot 具有一套统一的标准。插件开发者只需要掌握并在插件中使用此页所述的消息实体，LangBot 内部的消息处理逻辑能够自动完成消息的解析和转换。

:::info
LangBot 的消息平台实体是基于 [YiriMirai](https://github.com/YiriMiraiProject/YiriMirai) 的实现改造的。
:::

## 消息链

消息平台的`消息`不同于用于 AI 交互的消息，消息平台的消息以`消息链`的形式描述，QQ 上展示的每一个独立的消息就是一条消息链，消息链中可以包含`文字`、`图片`、`@组件`等多种`消息链组件`，例如：

![](/assets/image/plugin_dev_messages_01.png)

这就是一个消息链，包含 一个 Plain 组件（Hello World）和 一个 Image 组件（乌萨奇）

消息链和消息链组件的定义位于`pkg/platform/types/messages.py`中。

### 构造消息链

请先引入`pkg.platform.types`包，才能使用其中的消息组件。  

```python
from pkg.platform.types import *

# 构建一个包含文字 Hello LangBot 和图片（从URL获取）的消息
msg_chain = MessageChain([
    Plain("Hello LangBot"),
    Image(url='https://qchatgpt.rockchin.top/langbot-logo.png')
])

# 构建一个包含 @全体成员 和文字 Hello LangBot 的消息
msg_chain = MessageChain([
    AtAll(),
    Plain("Hello LangBot")
])

# 构建一个包含 @指定成员 和文字 Hello LangBot 的消息
msg_chain = MessageChain([
    At(123456),
    Plain("Hello LangBot")
])
```

目前支持的消息链组件：

- `Source` 源消息链信息，如果是从消息平台收到的消息，都会在消息链最前端包含此组件，记录消息信息
- `Plain` 纯文本消息
- `Quote` 引用消息
- `Image` 图片消息
- `AtAll` @全体成员消息
- `At` @指定成员消息
- `Voice` 语音消息
    - 需要检查消息平台支持性
- `Forward` 转发消息
    - 在很多平台不受支持，不建议使用
- `File` 文件消息

具体使用方式可以查看源码`pkg/platform/types/messages.py`中的定义。

## 消息平台事件

这些事件不同于 LangBot 插件事件，是消息平台系统独立的一套事件系统。这些事件是 LangBot 插件事件的源事件，可以从每个 Query.message_event 取得。

消息平台事件定义位于`pkg/platform/types/events.py`中。

## 其他实体

除了上述实体之外，还有`好友 Friend`和`群 Group`等实体，这些实体的定义位于`pkg/platform/types/entities.py`中。
他们一般被包含于上述事件对象中，可以从中取得一些未被包含在插件事件中的信息。

## 向后兼容性

以 3.x 版本为基础开发的插件，均可以无缝适配 3.4 版本。但 `import mirai` 在新版本已经不受支持，开发插件时编辑器会报错。请做如下修改：

- `import mirai` 改为 `import pkg.platform.types as mirai`
    - 不建议直接改成 `as mirai`，建议使用 `import pkg.platform.types as platform_types` 并将插件代码中对应的 `mirai.xxx` 替换为 `platform_types.xxx`
- `from mirai import *` 改为 `from pkg.platform.types import *`
