# Plugin Development Tutorial

> Please read the [Plugin Introduction page](/en/plugin/plugin-intro) first  
> It is recommended to read the source code of this project first to understand the project architecture

> For questions and requirements, please open an issue in the repository  
> **Try to solve problems on your own before asking** 

:::info Table of Contents
[[toc]]
:::

## 💬 Introduction

This page explains the steps for developing a regular plugin. Plugins have two methods: event listeners and content functions.  
Event listeners can respond to certain events when triggered and change behavior. Content functions can be called by large language models, please check the plugin introduction page for details.

## 💻 Quick Start

Use [HelloPlugin](https://github.com/langbot-app/HelloPlugin) as a template to generate a plugin code repository, then clone the repository code to the `plugins` directory.

Modify the parts that need to be changed in the plugin's README.md file.

Edit `main.py` and enter the following content:

```Python
from pkg.plugin.context import register, handler, llm_func, BasePlugin, APIHost, EventContext
from pkg.plugin.events import *  # Import event classes


"""
When receiving a private chat or group chat message "hello", reply with "hello, <sender id>!" or "hello, everyone!"
"""


class HelloPlugin(BasePlugin):

    # Triggered when the plugin is loaded
    def __init__(self, host: APIHost):
        pass

    # Asynchronous initialization
    async def initialize(self):
        pass

    # Triggered when a personal message is received
    @handler(PersonNormalMessageReceived)
    async def person_normal_message_received(self, ctx: EventContext):
        msg = ctx.event.text_message  # Here event is the PersonNormalMessageReceived object
        if msg == "hello":  # If the message is hello

            # Output debug information
            self.ap.logger.debug("hello, {}".format(ctx.event.sender_id))

            # Reply with message "hello, <sender id>!"
            ctx.add_return("reply", ["hello, {}!".format(ctx.event.sender_id)])

            # Prevent the default behavior of this event (getting a reply from the API)
            ctx.prevent_default()

    # Triggered when a group message is received
    @handler(GroupNormalMessageReceived)
    async def group_normal_message_received(self, ctx: EventContext):
        msg = ctx.event.text_message  # Here event is the GroupNormalMessageReceived object
        if msg == "hello":  # If the message is hello

            # Output debug information
            self.ap.logger.debug("hello, {}".format(ctx.event.sender_id))

            # Reply with message "hello, everyone!"
            ctx.add_return("reply", ["hello, everyone!"])

            # Prevent the default behavior of this event (getting a reply from the API)
            ctx.prevent_default()

    # Triggered when the plugin is unloaded
    def __del__(self):
        pass

```

:::info

Interpreting this plugin program

- `import pkg.plugin.context` imports `register (used to register plugin classes)`, `handler (used to register event listeners)`, `llm_func (used to register content functions)`, `BasePlugin (plugin base class)`, `APIHost (API host)`, `EventContext (event context class)` and other content
- `import pkg.plugin.events` imports all supported event classes
- Declare class `HelloPlugin` inheriting from `BasePlugin`, this class can be named arbitrarily, the plugin name is only related to the parameter when calling `register`
- Declare the `__init__` method of this class, this method is optional, the code in it will be executed when the main program loads the plugin at startup
- The plugin class also supports adding an asynchronous method `async def initialize(self)` for asynchronous initialization
- `@handler` marks the method `person_normal_message_received` as an event listener, handling the `PersonNormalMessageReceived` (triggered when a private chat message is received and before getting an OpenAI reply) event, this method can be named arbitrarily, the bound event is only related to the parameter in `handler`, more supported events can be found in the `pkg.plugin.events` file or check the `API` section below
- Output debug information through the `self.ap.logger` logger, the `ap` object in the plugin class parent class is the context object of the entire program, you can access all objects in the program through this object
- The event listener method gets a second parameter `ctx` which is the context of this event, the `event` in it is the event object of this event, you can extract related parameters from it, for specific parameters that can be obtained from each event, please check the comments of each event class in the `pkg.plugin.events` file
- The event listener method extracts the `text_message` parameter from the parameters, checks if it is `hello`, if so, sets the return value `reply` to `["hello, {}!".format(ctx.event.sender_id)]`, then calls the `ctx.prevent_default()` method to prevent the original program's default behavior
    - For return values supported by each event, please check the comments of each event in `pkg.plugin.events`
- Register the `GroupNormalMessageReceived` event with similar code to handle group messages

After writing and saving, restart the main program, go to the WebUI plugin page to see the plugin
:::

This plugin will implement: replying with `hello, <sender QQ number>!` when receiving a `hello` message in private chat, and replying with `hello, everyone!` when receiving a `hello` message in group chat.

### Writing the Manifest File

Starting from LangBot 4.0, manifest files will be used to register plugins.  
Please create a new file `manifest.yaml` in the same directory as main.py. If it already exists, please modify it according to the format below.

```yaml
apiVersion: v1  # Do not change
kind: Plugin  # Do not change
metadata:
  # author and name uniquely identify a plugin
  author: langbot  # Plugin author, change to your name
  name: Hello  # Plugin name, change to your plugin name
  repository: 'https://github.com/langbot-app/HelloPlugin'  # Plugin repository address, change to your plugin GitHub repository address
  version: 0.1.0  # Plugin version, change to your plugin version
  description:  # Plugin description, change to your plugin description, supports multiple languages. Language codes follow the RFC 1766 standard.
    en_US: Plugin for sending hello
    zh_Hans: 示例插件
  label:  # Plugin display name, supports multiple languages. The WebUI will display the label in the corresponding language. Language codes follow the RFC 1766 standard.
    en_US: Hello
    zh_Hans: Hello
spec:
  # Plugin configuration (optional), can configure multiple items
  config:
    - name: github_token  # Configuration item name
      label:  # Configuration item display name, supports multiple languages. Language codes follow the RFC 1766 standard.
        en_US: Github Token
        zh_Hans: Github Token
      description:  # Configuration item description, supports multiple languages. Optional.
        en_US: Image downloading requires a Github token
        zh_Hans: 如果未填写，图片下载可能会失败
      type: string  # Configuration item type, supports string, integer, float, boolean, etc.
      default: ''  # Configuration item default value
      required: false  # Whether the configuration item is required
execution:
  python:
    path: main.py  # Plugin main program path, must be the same as the file name of the plugin entry code above
    attr: HelloPlugin  # Plugin class name, must be the same as the class name declared in the code above
```

:::info
Configuration item supported types:

- string: String
- integer: Integer
- float: Floating point number
- boolean: Boolean value
- array[string]: String array
- select: Dropdown box, can select one option from multiple options
    - Need to configure the options option, indicating the options in the dropdown box

    ```yaml
    - name: mode
      label:
        en_US: Mode
        zh_Hans: 模式
      type: select
      options:
        - name: mode1
          label:
            en_US: Mode 1
            zh_Hans: 模式 1
        - name: mode2
          label:
            en_US: Mode 2
            zh_Hans: 模式 2
    ```
- prompt-editor: Prompt editor.
- llm-model-selector: LLM model selector.

After the user modifies the configuration items through the WebUI, the plugin can get the values of the configuration items in self.config.
:::


## ❗ Standards (Important)

- Please keep each plugin in a separate directory for management, it is recommended to create a repository on Github to store a single plugin for easy retrieval and updates
- Naming conventions (important):
    - Plugin author: Use English, case insensitive, such as `RockChinQ`
    - Plugin name: Use `PascalCase`, such as `Hello`, `ExamplePlugin`, `ChineseCommands`, etc.
    - Plugin repository: Please use PascalCase, it is recommended to be the same as the plugin name, such as `HelloPlugin`
    - Plugin description: It is recommended to include the phrase `LangBot Plugin`
- Multiple Python program files can be stored in one directory to separate the various functions of the plugin for easy management by developers, but it is not recommended to register multiple plugins in one directory
- Please specify the dependencies required by the plugin in the `requirements.txt` file in the plugin directory, the program will automatically install the dependencies when obtaining this plugin from the repository

## 🪝 Content Functions

`Content functions` implemented through [GPT's Function Calling capability](https://platform.openai.com/docs/guides/gpt/function-calling), which is a function embedded in the conversation and automatically called by GPT.

> Your plugin does not necessarily have to include content functions, please check the content function page to understand this feature first

### Content Function Writing Steps

1️⃣ Please first follow the steps above to write your plugin's basic structure, now please delete (of course you can also keep them, just for simplicity) the various class functions decorated by `@handler` in the above plugin content

<details>
<summary>Class structure after deletion</summary>

```python

class HelloPlugin(Plugin):

    # Triggered when the plugin is loaded
    def __init__(self, plugin_host: APIHost):
        pass

    # Triggered when the plugin is unloaded
    def __del__(self):
        pass
```

</details>

2️⃣ Now we add the following function to the position of the functions we just deleted (as a class method)

```Python

# Function to add
@llm_func(name="access_the_web")  # Set function name
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
    # You need to first use
    # pip install beautifulsoup4
    # to install dependencies

    r = requests.get(
        url,
        timeout=10,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.183"
        }
    )
    soup = BeautifulSoup(r.text, 'html.parser')

    s = soup.get_text()

    # Remove extra blank lines or lines with only \t and spaces
    s = re.sub(r'\n\s*\n', '\n', s)

    if len(s) >= 512:  # Truncate the first 512 characters of the plain text content of the web page
        return s[:512]

    return s

```

#### Please note:

- The function's comments must be strictly written according to the required format, please check [this document](https://github.com/RockChinQ/CallingGPT/wiki/1.-Function-Format#function-format) for the specific format
- Content functions and `event listeners decorated with @handler` can coexist in the same plugin and are both controlled by the plugin switch
- Make sure that the model you are using supports the function calling feature

3️⃣ Now your program has web access capability, restart the program, ask the bot about online content or directly send article links requesting summaries.

- This is just an example, for more efficient web access capability support plugin, please check [WebwlkrPlugin](https://github.com/RockChinQ/WebwlkrPlugin)

## 📦 Publishing to the Plugin Market

When your plugin development is complete, please upload it to GitHub and [open an issue in the LangBot repository](https://github.com/RockChinQ/LangBot/issues/new?assignees=&labels=%E7%8B%AC%E7%AB%8B%E6%8F%92%E4%BB%B6&projects=&template=submit-plugin.yml&title=%5BPlugin%5D%3A+%E8%AF%B7%E6%B1%82%E7%99%BB%E8%AE%B0%E6%96%B0%E6%8F%92%E4%BB%B6). After review, it will be added to the plugin market and will be visible on the LangBot WebUI plugin page's plugin market in about half an hour.

![](/assets/image/zh/plugin/dev/plugin_dev_tutor_01.png)

## 📄 Glossary

### Description

The `ctx: EventContext` object obtained by the event listener method can be viewed in the `pkg.plugin.context` module for its structure. The `event` attribute of the `ctx` object is the event object of this event, from which you can extract related parameters. For specific parameters that can be obtained from each event, please check the comments of each event class in the `pkg.plugin.events` file.
Event return values are all **optional**, you can submit return values by calling `ctx.add_return(key: str, ret)`

### Events

If an event is an event in a request (user sending a message), its event object will contain a `query` object, which includes the context data in the processing of this request (i.e., the process of handling a user sending a message, a request process may trigger multiple events).  
For all supported events, please check the comments of each event class in the `pkg.plugin.events` file.  
For `message chain components`, please check [Message Platform Entities](./messages)

### BasePlugin Structure

#### self.ap

Accessing `self.ap` in the plugin's methods is an object of the `pkg.core.app.Application` class, which contains the context object of the entire program, you can access all objects in the program through this object.

#### self.host

Accessing `self.host` in the plugin's methods is an object of the `pkg.plugin.context.APIHost` class, which provides some APIs of the main program, please check its source code for details.

### API Reference

For APIs that plugins can call, please check [API Reference](./api-ref)

### Plugin Development Group

Plugin development, publishing, and discussion

- LangBot Plugin Development: 1032327138 ([Link](https://qm.qq.com/q/G7ENGTjeou))  
