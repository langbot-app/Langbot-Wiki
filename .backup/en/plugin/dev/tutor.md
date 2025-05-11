# Plugin Development Tutorial

> Please read the [Plugin Introduction Page](/plugin/plugin-intro) first.  
> It is recommended to read the project source code to understand the project architecture.

> For issues and feature requests, please create an issue in the repository.  
> **Please try to solve the problem on your own before asking questions.**

:::info Table of Contents
[[toc]]
:::

## 💬 Introduction

This page explains the steps for developing a regular plugin. There are two methods inside a plugin: event listeners and content functions.  
Event listeners can respond to certain events and modify behavior. Content functions can be called by large language models. For more details, please refer to the plugin introduction page.

LangBot also supports component extensions, allowing you to replace entire components without being limited to listening to predefined events. Please read this page and then check the **Component Extension** page for more details.

## 💻 Quick Start

Deploy this project according to the documentation and ensure it runs properly.  

Use [hello_plugin](https://github.com/RockChinQ/hello_plugin) as a template to generate a plugin code repository, then clone the repository code into the `plugins` directory.

Modify the necessary parts in the plugin's README.md file.

Edit `main.py` and input the following content:

```Python
from pkg.plugin.context import register, handler, llm_func, BasePlugin, APIHost, EventContext
from pkg.plugin.events import *  # Import event classes


"""
When receiving a private or group chat message "hello", reply with "hello, <sender_id>!" or "hello, everyone!"
"""


# Register the plugin
@register(name="Hello", description="hello world", version="0.1", author="RockChinQ")
class HelloPlugin(BasePlugin):

    # Triggered when the plugin is loaded
    def __init__(self, host: APIHost):
        pass

    # Asynchronous initialization
    async def initialize(self):
        pass

    # Triggered when a private message is received
    @handler(PersonNormalMessageReceived)
    async def person_normal_message_received(self, ctx: EventContext):
        msg = ctx.event.text_message  # Here, event is the object of PersonNormalMessageReceived
        if msg == "hello":  # If the message is "hello"

            # Output debug information
            self.ap.logger.debug("hello, {}".format(ctx.event.sender_id))

            # Reply with "hello, <sender_id>!"
            ctx.add_return("reply", ["hello, {}!".format(ctx.event.sender_id)])

            # Prevent the default behavior of this event (fetching a reply from the API)
            ctx.prevent_default()

    # Triggered when a group message is received
    @handler(GroupNormalMessageReceived)
    async def group_normal_message_received(self, ctx: EventContext):
        msg = ctx.event.text_message  # Here, event is the object of GroupNormalMessageReceived
        if msg == "hello":  # If the message is "hello"

            # Output debug information
            self.ap.logger.debug("hello, {}".format(ctx.event.sender_id))

            # Reply with "hello, everyone!"
            ctx.add_return("reply", ["hello, everyone!"])

            # Prevent the default behavior of this event (fetching a reply from the API)
            ctx.prevent_default()

    # Triggered when the plugin is unloaded
    def __del__(self):
        pass

```

This plugin will implement: when a private chat receives a `hello` message, it replies with `hello, <sender QQ number>!`, and when a group chat receives a `hello` message, it replies with `hello, everyone!`.

### Interpreting This Plugin Program

- `import pkg.plugin.context` imports `register (for registering plugin classes)`, `handler (for registering event listeners)`, `llm_func (for registering content functions)`, `BasePlugin (plugin base class)`, `APIHost (API host)`, `EventContext (event context class)`, etc.
- `import pkg.plugin.events` imports all supported event classes.
- `@register` marks the class `HelloPlugin` as a plugin class, declaring the plugin name as `Hello` along with the plugin description, version, and author.
- The class `HelloPlugin` inherits from `BasePlugin`. This class can be named arbitrarily; the plugin name is only related to the parameters in the `register` call.
- The `__init__` method of this class is optional, and the code inside it will be executed when the plugin is loaded during the main program startup.
- The plugin class also supports adding an asynchronous method `async def initialize(self)` for asynchronous initialization.
- `@handler` marks the method `person_normal_message_received` as an event listener, handling the `PersonNormalMessageReceived` event (triggered when a private message is received before fetching a reply from OpenAI). This method can be named arbitrarily; the bound event is only related to the parameters in `handler`. For more supported events, please refer to the `pkg.plugin.events` file or the `API` section below.
- Debug information is output through the `self.ap.logger` logger. The `ap` object in the plugin class's parent class is the context object of the entire program, through which all objects in the program can be accessed.
- The second parameter `ctx` obtained by the event listener method is the context of this event, where `event` is the event object of this event. Relevant parameters can be extracted from it. For specific parameters that can be obtained from events, please refer to the comments of each event class in the `pkg.plugin.events` file.
- Inside the event listener method, the `text_message` parameter is extracted from the parameters, and if it is `hello`, the return value `reply` is set to `["hello, {}!".format(ctx.event.sender_id)]`. Then, the `ctx.prevent_default()` method is called to prevent the default behavior of the original program.
    - For the return values supported by each event, please refer to the comments of each event in `pkg.plugin.events`.
- A similar program is used to register the `GroupNormalMessageReceived` event to handle group messages.

After saving the changes, restart the main program and send the `!plugin` command to the bot. If the `Hello` plugin appears, it means the plugin has been successfully loaded.

## ❗ Guidelines (Important)

- Each plugin should be in a separate directory for easier management. It is recommended to create a repository on GitHub to store a single plugin for easy access and updates.
- Plugin names should use `PascalCase`, such as `Hello`, `ExamplePlugin`, `ChineseCommands`, etc.
- Multiple Python program files can be stored in one directory to separate the various functions of the plugin, making it easier for developers to manage. However, it is not recommended to register multiple plugins in one directory.
- The dependencies required by the plugin should be specified in the `requirements.txt` file in the plugin directory. The program will automatically install the dependencies when fetching this plugin from the repository.

## 🪝 Content Functions

`Content functions` are implemented through [GPT's Function Calling capability](https://platform.openai.com/docs/guides/gpt/function-calling). These are functions embedded in conversations and automatically called by GPT.

> Your plugin does not necessarily need to include content functions. Please read the content function page to understand this feature first.

### Steps to Write Content Functions

1️⃣ First, follow the steps above to write the basic structure of your plugin. Now, please delete (or you can keep them for simplicity) the class functions decorated with `@handler` in the plugin content above.

<details>
<summary>Class Structure After Deletion</summary>

```python

# Register the plugin
@register(name="Hello", description="hello world", version="0.1", author="RockChinQ")
class HelloPlugin(Plugin):

    # Triggered when the plugin is loaded
    def __init__(self, plugin_host: APIHost):
        pass

    # Triggered when the plugin is unloaded
    def __del__(self):
        pass
```

</details>

2️⃣ Now, add the following function to the position where the functions were deleted (as a class method).

```Python

# Function to add
@llm_func(name="access_the_web")  # Set the function name
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
    # to install the dependencies

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

    if len(s) >= 512:  # Truncate the first 512 characters of the obtained webpage plain text content
        return s[:512]

    return s

```

#### Please Note:

- The function's comments must be written strictly according to the required format. For the specific format, please refer to [this document](https://github.com/RockChinQ/CallingGPT/wiki/1.-Function-Format#function-format).
- Content functions and `event listeners decorated with @handler` can coexist in the same plugin and are simultaneously controlled by the plugin switch in `plugins/plugins.json`.
- Ensure that the model you are using supports function calling.

3️⃣ Now your program has web access capabilities. Restart the program and ask the bot about online content or directly send an article link to request a summary.

- This is just an example. For more efficient web access capabilities, please refer to [WebwlkrPlugin](https://github.com/RockChinQ/WebwlkrPlugin).

## 📄 Terminology Explanation

### Explanation

The `ctx: EventContext` object obtained by event listener methods can be viewed in the `pkg.plugin.context` module. The `event` property of the `ctx` object is the event object of this event, from which relevant parameters can be extracted. For specific parameters that can be obtained from events, please refer to the comments of each event class in the `pkg.plugin.events` file.
Event return values are **optional** and can be submitted by calling `ctx.add_return(key: str, ret)`.

### Events

If an event is part of a request (user sending a message), its event object will contain a `query` object, which includes the context data of this request (the process of handling a user sending a message, where one request process may trigger multiple events).  
For all supported events, please refer to the comments of each event class in the `pkg.plugin.events` file.  
For `message chain components`, please refer to [Message Platform Entities](./messages).

### BasePlugin Structure

#### self.ap

Accessing `self.ap` in plugin methods refers to the object of the `pkg.core.app.Application` class, which contains the context object of the entire program. All objects in the program can be accessed through this object.

#### self.host

Accessing `self.host` in plugin methods refers to the object of the `pkg.plugin.context.APIHost` class, which provides some APIs of the main program. For more details, please refer to its source code.

### API Reference

For the APIs that plugins can call, please refer to the [API Reference](./api-ref).