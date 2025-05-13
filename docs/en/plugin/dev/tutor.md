# Plugin Development Tutorial

This tutorial will guide you through the process of developing a plugin for LangBot.

## Plugin Structure

A LangBot plugin consists of the following components:

1. A main Python file that contains the plugin logic
2. A `manifest.yaml` file that describes the plugin
3. Optional additional files for resources, templates, etc.

## Creating a Basic Plugin

Let's create a simple "Hello World" plugin that responds to a specific command.

### Step 1: Create the Plugin Directory

Create a directory for your plugin in the `data/plugins` directory:

```bash
mkdir -p data/plugins/hello-plugin
```

### Step 2: Create the Manifest File

Create a `manifest.yaml` file in your plugin directory:

```yaml
name: HelloPlugin
version: 1.0.0
description: A simple hello world plugin
author: Your Name
entry: hello.py
requirements:
  - requests>=2.28.0
```

### Step 3: Create the Plugin Code

Create a `hello.py` file in your plugin directory:

```python
from langbot.plugin import Plugin, handler
from langbot.event import PersonNormalMessageReceived
from langbot.api import APIHost

class HelloPlugin(Plugin):
    def __init__(self, api_host: APIHost):
        super().__init__(api_host)
        self.api = api_host
        
    @handler(PersonNormalMessageReceived)
    def on_person_message(self, ctx):
        # Get the message content
        message = ctx.event.message.content
        
        # Check if the message is the command we want to handle
        if message == "!hello":
            # Prevent the default handling (don't send to LLM)
            ctx.prevent_default()
            
            # Send a response
            self.api.send_message(
                ctx.event.message.source,
                "Hello, World! This is my first LangBot plugin."
            )
```

### Step 4: Install and Test the Plugin

1. Restart LangBot or use the `!plugin reload` command
2. Send the `!hello` command to your bot
3. The bot should respond with "Hello, World! This is my first LangBot plugin."

## Event Handling

LangBot uses an event-driven architecture. Plugins can register handlers for various events:

```python
@handler(PersonNormalMessageReceived)
def on_person_message(self, ctx):
    # Handle the event
    pass
```

Common events include:

- `PersonNormalMessageReceived`: Received a message from a person
- `GroupNormalMessageReceived`: Received a message in a group
- `GroupInvitationReceived`: Received an invitation to join a group
- `FriendRequestReceived`: Received a friend request

The `ctx` parameter provides access to:

- `ctx.event`: The event that triggered the handler
- `ctx.prevent_default()`: Prevents the default handling of the event
- `ctx.add_return(key, value)`: Adds a return value to the event

## API Access

The `APIHost` provides access to LangBot's API:

```python
# Send a message
self.api.send_message(source, content)

# Get user information
user_info = self.api.get_user_info(user_id)

# Get group information
group_info = self.api.get_group_info(group_id)

# Call the LLM
response = self.api.call_llm(prompt, model="gpt-3.5-turbo")
```

## LLM Function Registration

Plugins can register functions that can be called by the LLM during conversations:

```python
import requests
from langbot.plugin import Plugin, llm_func
from langbot.api import APIHost

class WebSearchPlugin(Plugin):
    def __init__(self, api_host: APIHost):
        super().__init__(api_host)
        self.api = api_host
        
    @llm_func(name="search_the_web")
    def search_web(self, query: str) -> str:
        """
        Search the web for information.
        
        Args:
            query: The search query
            
        Returns:
            The search results
        """
        # Implement web search logic
        response = requests.get(
            "https://api.search.com/search",
            params={"q": query}
        )
        return response.json()["results"]
```

The LLM can then call this function during conversations:

```
User: What's the weather in New York?
Bot: Let me check that for you.
[Function call: search_the_web("weather in New York")]
The current weather in New York is 72°F and sunny.
```

## Configuration

Plugins can have configuration options that users can set:

```python
from langbot.plugin import Plugin, config_field
from langbot.api import APIHost

class WeatherPlugin(Plugin):
    def __init__(self, api_host: APIHost):
        super().__init__(api_host)
        self.api = api_host
        
    @config_field(name="api_key", description="API key for the weather service")
    def set_api_key(self, api_key: str):
        self.api_key = api_key
```

Users can set these options using the WebUI or the `!plugin config` command:

```
!plugin config WeatherPlugin api_key=your-api-key
```

## Persistent Storage

Plugins can store data persistently:

```python
# Store data
self.api.storage.set("key", "value")

# Retrieve data
value = self.api.storage.get("key")

# Check if a key exists
exists = self.api.storage.has("key")

# Delete a key
self.api.storage.delete("key")
```

## Advanced Features

### Command Registration

Plugins can register commands that users can use:

```python
from langbot.plugin import Plugin, command
from langbot.api import APIHost

class EchoPlugin(Plugin):
    def __init__(self, api_host: APIHost):
        super().__init__(api_host)
        self.api = api_host
        
    @command(name="echo", description="Echo a message")
    def echo_command(self, args: str) -> str:
        """
        Echo the provided message.
        
        Usage: !echo <message>
        """
        return args
```

Users can then use the command:

```
!echo Hello, World!
```

### Event Return Values

Handlers can add return values to events:

```python
@handler(PersonNormalMessageReceived)
def on_person_message(self, ctx):
    # Add a return value
    ctx.add_return("reply", ["This is a reply"])
```

### Component Extension

Plugins can extend LangBot's core components:

```python
from langbot.plugin import Plugin, component_extension
from langbot.api import APIHost

class CustomTriggerPlugin(Plugin):
    def __init__(self, api_host: APIHost):
        super().__init__(api_host)
        self.api = api_host
        
    @component_extension("trigger")
    def custom_trigger(self, component, message):
        # Implement custom trigger logic
        if message.content.startswith("custom:"):
            return True
        return None  # Let the default trigger handle it
```

## Publishing Your Plugin

To publish your plugin:

1. Create a GitHub repository for your plugin
2. Add a README.md file with installation and usage instructions
3. Add your plugin to the [LangBot Plugin Market](https://plugins.langbot.app)

## Best Practices

- Keep your plugin focused on a specific functionality
- Handle errors gracefully
- Provide clear documentation
- Follow Python best practices
- Test your plugin thoroughly
- Keep dependencies minimal

## Example Plugins

Check out these example plugins for inspiration:

- [WebSearch](https://github.com/RockChinQ/WebSearch): Search the web for information
- [ImageGen](https://github.com/RockChinQ/ImageGen): Generate images using AI
- [Schedule](https://github.com/RockChinQ/Schedule): Schedule messages to be sent at specific times

## Troubleshooting

If you encounter issues with your plugin:

1. Check the logs for error messages
2. Verify that your plugin is correctly installed
3. Make sure your plugin's dependencies are installed
4. Test your plugin with simple functionality first
5. Ask for help in the [community chat](https://qm.qq.com/q/Nnz7Vbj8OU)
