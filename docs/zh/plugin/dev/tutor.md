# 插件开发教程

> 请先阅读[插件介绍页](/zh/plugin/plugin-intro)  
> 建议先阅读本项目源码，了解项目架构

> 问题、需求请到仓库issue发起  
> **提问前请先靠自己尝试** 

:::info 目录
[[toc]]
:::

## 💬 简介

本页讲解普通插件开发步骤，插件内部有两种方法：事件监听器、内容函数。  
事件监听器能在某些事件触发时进行响应，更改行为。内容函数可供大语言模型调用，具体请查看插件介绍页。

LangBot 还支持组件扩展，可以不局限于监听预定事件，做到整个组件替换，具体请阅读完此页后查看**组件扩展**页。

## 💻 快速开始

使用[HelloPlugin](https://github.com/langbot-app/HelloPlugin)作为模板生成插件代码仓库，然后将仓库代码克隆到`plugins`目录下。

修改插件的 README.md 文件中需要修改的部分。

编辑`main.py`输入以下内容：

```Python
from pkg.plugin.context import register, handler, llm_func, BasePlugin, APIHost, EventContext
from pkg.plugin.events import *  # 导入事件类


"""
在收到私聊或群聊消息"hello"时，回复"hello, <发送者id>!"或"hello, everyone!"
"""


class HelloPlugin(BasePlugin):

    # 插件加载时触发
    def __init__(self, host: APIHost):
        pass

    # 异步初始化
    async def initialize(self):
        pass

    # 当收到个人消息时触发
    @handler(PersonNormalMessageReceived)
    async def person_normal_message_received(self, ctx: EventContext):
        msg = ctx.event.text_message  # 这里的 event 即为 PersonNormalMessageReceived 的对象
        if msg == "hello":  # 如果消息为hello

            # 输出调试信息
            self.ap.logger.debug("hello, {}".format(ctx.event.sender_id))

            # 回复消息 "hello, <发送者id>!"
            ctx.add_return("reply", ["hello, {}!".format(ctx.event.sender_id)])

            # 阻止该事件默认行为（向接口获取回复）
            ctx.prevent_default()

    # 当收到群消息时触发
    @handler(GroupNormalMessageReceived)
    async def group_normal_message_received(self, ctx: EventContext):
        msg = ctx.event.text_message  # 这里的 event 即为 GroupNormalMessageReceived 的对象
        if msg == "hello":  # 如果消息为hello

            # 输出调试信息
            self.ap.logger.debug("hello, {}".format(ctx.event.sender_id))

            # 回复消息 "hello, everyone!"
            ctx.add_return("reply", ["hello, everyone!"])

            # 阻止该事件默认行为（向接口获取回复）
            ctx.prevent_default()

    # 插件卸载时触发
    def __del__(self):
        pass

```

:::info

解读此插件程序

- `import pkg.plugin.context`导入`register(用于注册插件类)`, `handler(用于注册事件监听器)`, `llm_func(用于注册内容函数)`,`BasePlugin(插件基类)`, `APIHost(API宿主)`, `EventContext(事件上下文类)`等内容
- `import pkg.plugin.events`导入所有支持的事件类
- 声明类`HelloPlugin`继承于`BasePlugin`，此类可以随意命名，插件名称只与`register`调用时的参数有关
- 声明此类的`__init__`方法，此方法是可选的，其中的代码将在主程序启动时加载插件的时候被执行
- 插件类中还支持添加一个异步方法`async def initialize(self)`用于异步初始化
- `@handler`将方法`person_normal_message_received`标记为一个事件监听器，处理`PersonNormalMessageReceived`（收到私聊消息并在获取OpenAI回复前触发）事件，此方法可以随意命名，绑定的事件只与`handler`中的参数有关，更多支持的事件可到`pkg.plugin.events`文件中查看或查看下方`API`节
- 通过`self.ap.logger`日志器输出调试信息，插件类父类中的`ap`对象是整个程序的上下文对象，可以通过这个对象访问程序内所有对象
- 事件监听器方法获得的第二个参数`ctx`即为本次事件的上下文，其中的`event`为本次事件的事件对象，可以从中取出相关参数，具体事件可以取得的参数请查看`pkg.plugin.events`文件中的每个事件类的注释
- 事件监听器方法内部从参数中取出`text_message`参数，判断是否为`hello`，如果是就将返回值`reply`设置为`["hello, {}!".format(ctx.event.sender_id)]`，接下来调用`ctx.prevent_default()`方法，阻止原程序默认行为
    - 每个事件支持的返回值请查看`pkg.plugin.events`中的每个事件的注释
- 用相似的程序注册`GroupNormalMessageReceived`事件处理群消息

编写完毕保存后，重新启动主程序，前往 WebUI 插件页即可看到插件
:::

此插件将实现：私聊收到`hello`消息时回复`hello, <发送者QQ号>!`，群聊收到`hello`消息时回复`hello, everyone!`

### 编写清单文件

从 LangBot 4.0 开始，将使用清单文件来注册插件。  
请在 main.py 同目录下新建文件 `manifest.yaml`。如果已经存在了，请按照下方格式修改。

```yaml
apiVersion: v1  # 不要改动
kind: Plugin  # 不要改动
metadata:
  # author 和 name 唯一确定一个插件
  author: langbot  # 插件作者，修改为你的名称
  name: Hello  # 插件名称，修改为你的插件名称
  repository: 'https://github.com/langbot-app/HelloPlugin'  # 插件仓库地址，修改为你的插件 GitHub 仓库地址
  version: 0.1.0  # 插件版本，修改为你的插件版本
  description:  # 插件简介，修改为你的插件简介，支持多语言。语言代码采用 RFC 1766 标准。
    en_US: Plugin for sending hello
    zh_CN: 示例插件
  label:  # 插件显示名称，支持多语言。在 WebUI 上会显示对应语言的 label。语言代码采用 RFC 1766 标准。
    en_US: Hello
    zh_CN: Hello
spec:
  # 插件配置（可选），可配置多项
  config:
    - name: github_token  # 配置项名称
      label:  # 配置项显示名称，支持多语言。语言代码采用 RFC 1766 标准。
        en_US: Github Token
        zh_CN: Github Token
      description:  # 配置项描述，支持多语言。可选。
        en_US: Image downloading requires a Github token
        zh_CN: 如果不填的话，图片可能会下载失败
      type: string  # 配置项类型，支持 string, integer, float, boolean 等
      default: ''  # 配置项默认值
      required: false  # 配置项是否必填
execution:
  python:
    path: main.py  # 插件主程序路径，必须与上方插件入口代码的文件名相同
    attr: HelloPlugin  # 插件类名，必须与上方代码中声明的类名相同
```

:::info
配置项支持类型：

- string: 字符串
- integer: 整数
- float: 浮点数
- boolean: 布尔值
- array[string]: 字符串数组
- select: 下拉框，可从多个选项中选择一个
    - 需要配置 options 选项，表示下拉框的选项

    ```yaml
    - name: mode
      label:
        en_US: Mode
        zh_CN: 模式
      type: select
      options:
        - name: mode1
          label:
            en_US: Mode 1
            zh_CN: 模式 1
        - name: mode2
          label:
            en_US: Mode 2
            zh_CN: 模式 2
    ```
- prompt-editor: 提示词编辑器。
- llm-model-selector: LLM模型选择器。
:::


## ❗ 规范(重要)

- 请每个插件独立一个目录以便管理，建议在Github上创建一个仓库储存单个插件，以便获取和更新
- 命名规范（重要）：
    - 插件作者：使用英文，大小写均可，如`RockChinQ`
    - 插件名：使用`大驼峰命名法`，如`Hello`、`ExamplePlugin`、`ChineseCommands`等
    - 插件仓库：请使用大驼峰命名法，建议直接与插件名相同，如`HelloPlugin`
    - 插件简介：建议携带`LangBot 插件`字样
- 一个目录内可以存放多个Python程序文件，以独立出插件的各个功能，便于开发者管理，但不建议在一个目录内注册多个插件
- 插件需要的依赖库请在插件目录下的`requirements.txt`中指定，程序从储存库获取此插件时将自动安装依赖

## 🪝 内容函数

通过[GPT的Function Calling能力](https://platform.openai.com/docs/guides/gpt/function-calling)实现的`内容函数`，这是一种嵌入对话中，由GPT自动调用的函数。

> 您的插件不一定必须包含内容函数，请先查看内容函数页了解此功能

### 内容函数编写步骤

1️⃣ 请先按照上方步骤编写您的插件基础结构，现在请删除（当然你也可以不删，只是为了简洁）上述插件内容的诸个由`@handler`装饰的类函数

<details>
<summary>删除后的类结构</summary>

```python

class HelloPlugin(Plugin):

    # 插件加载时触发
    def __init__(self, plugin_host: APIHost):
        pass

    # 插件卸载时触发
    def __del__(self):
        pass
```

</details>

2️⃣ 现在我们将以下函数添加到刚刚删除的函数的位置（作为类方法）

```Python

# 要添加的函数
@llm_func(name="access_the_web")  # 设置函数名称
async def access_web(self, query, url: str):
    """Call this function to search about the question before you answer any questions.
    - Do not search through baidu.com at any time.
    - If you need to search somthing, visit https://www.google.com/search?q=xxx.
    - If user ask you to open a url (start with http:// or https://), visit it directly.
    - Summary the plain content result by yourself, DO NOT directly output anything in the result you got.

    Args:
        url(str): url to visit

    Returns:
        str: plain text content of the web page
    """
    import requests
    from bs4 import BeautifulSoup
    # 你需要先使用
    # pip install beautifulsoup4
    # 安装依赖

    r = requests.get(
        url,
        timeout=10,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183"
        }
    )
    soup = BeautifulSoup(r.text, 'html.parser')

    s = soup.get_text()

    # 删除多余的空行或仅有\t和空格的行
    s = re.sub(r'\n\s*\n', '\n', s)

    if len(s) >= 512:  # 截取获取到的网页纯文本内容的前512个字
        return s[:512]

    return s

```

#### 请注意：

- 函数的注释必须严格按照要求的格式进行书写，具体格式请查看[此文档](https://github.com/RockChinQ/CallingGPT/wiki/1.-Function-Format#function-format)
- 内容函数和`以 @handler 装饰的事件监听器`可以同时存在于同一个插件，并同时受到插件开关的控制
- 务必确保您使用的模型支持函数调用功能

3️⃣ 现在您的程序已具备网络访问功能，重启程序，询问机器人有关在线的内容或直接发送文章链接请求其总结。

- 这仅仅是一个示例，需要更高效的网络访问能力支持插件，请查看[WebwlkrPlugin](https://github.com/RockChinQ/WebwlkrPlugin)

## 📦 上架插件市场

当你的插件开发完成后，请上传到 GitHub，并在 [LangBot 仓库提出 issue](https://github.com/RockChinQ/LangBot/issues/new?assignees=&labels=%E7%8B%AC%E7%AB%8B%E6%8F%92%E4%BB%B6&projects=&template=submit-plugin.yml&title=%5BPlugin%5D%3A+%E8%AF%B7%E6%B1%82%E7%99%BB%E8%AE%B0%E6%96%B0%E6%8F%92%E4%BB%B6) ，待审核后将会添加到插件市场，约半个小时后会在 LangBot WebUI 插件页的插件市场上可见。

![](/assets/image/zh/plugin/dev/plugin_dev_tutor_01.png)

## 📄 名词解释

### 说明

事件监听器方法获得的`ctx: EventContext`对象可以到`pkg.plugin.context`模块中查看其结构，`ctx`对象的`event`属性为本次事件的事件对象，可以从中取出相关参数，具体事件可以取得的参数请查看`pkg.plugin.events`文件中的每个事件类的注释。
事件返回值均为**可选**的，可以通过调用`ctx.add_return(key: str, ret)`来提交返回值

### 事件

若一个事件是一次请求（用户发送消息）中的事件，其事件对象中会含有`query`对象，这个对象中包含了此次请求（即用户发送一条消息的处理过程，一个请求过程可能会触发多个事件）处理过程中的上下文数据。  
所有支持的事件，请查看`pkg.plugin.events`文件中的每个事件类的注释。  
关于`消息链组件`，请查看 [消息平台实体](./messages)

### BasePlugin 结构

#### self.ap

在插件的方法中访问`self.ap`即为`pkg.core.app.Application`类的对象，包含了整个程序的上下文对象，可以通过这个对象访问程序内所有对象。

#### self.host

在插件的方法中访问`self.host`即为`pkg.plugin.context.APIHost`类的对象，提供了主程序的一些API，详细请查看其源码。

### API 参考

关于插件可以调用的 API，请查看 [API 参考](./api-ref)

### 插件开发交流群

插件开发、发布、交流

- LangBot 插件开发：1032327138 ([链接](https://qm.qq.com/q/G7ENGTjeou))  
