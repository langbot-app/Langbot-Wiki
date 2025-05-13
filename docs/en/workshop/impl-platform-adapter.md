# How to Implement a Message Platform Adapter?

This guide explains how to implement a custom message platform adapter for LangBot, allowing you to connect the bot to new messaging platforms.

## Overview

LangBot uses a modular architecture that allows for easy integration with various messaging platforms. The core component for platform integration is the `MessageSourceAdapter`, which handles the communication between LangBot and the messaging platform.

![architecture](/assets/image/zh/deploy/bots/arch.png)

## Prerequisites

Before implementing a platform adapter, you should:

1. Understand the API of the messaging platform you want to integrate with
2. Have basic knowledge of Python and asynchronous programming
3. Be familiar with LangBot's architecture and event system

## Implementation Steps

### Step 1: Create a New Adapter Class

Create a new Python file in the `langbot/bot/adapters` directory:

```python
from langbot.bot import MessageSourceAdapter
from langbot.message import Message, PersonSource, GroupSource, Sender
from langbot.event import PersonNormalMessageReceived, GroupNormalMessageReceived

class MyPlatformAdapter(MessageSourceAdapter):
    """
    Adapter for MyPlatform.
    """
    
    def __init__(self, config):
        """
        Initialize the adapter.
        
        Args:
            config: The adapter configuration
        """
        super().__init__(config)
        self.config = config
        # Initialize platform-specific client
        self.client = None
```

### Step 2: Implement the Required Methods

Implement the required methods for the adapter:

```python
async def start(self):
    """
    Start the adapter.
    """
    # Initialize and start the platform client
    self.client = MyPlatformClient(
        api_key=self.config.get("api_key"),
        # Other platform-specific configuration
    )
    
    # Register event handlers
    self.client.on_message(self.on_message)
    
    # Start the client
    await self.client.start()
    
async def stop(self):
    """
    Stop the adapter.
    """
    # Stop the platform client
    if self.client:
        await self.client.stop()
        
async def send_message(self, source, content, **kwargs):
    """
    Send a message to a specific destination.
    
    Args:
        source: The destination to send the message to
        content: The content of the message
        **kwargs: Additional arguments
        
    Returns:
        The message ID
    """
    # Send the message using the platform client
    if isinstance(source, PersonSource):
        # Send a direct message
        message_id = await self.client.send_direct_message(
            source.identity,
            content,
            **kwargs
        )
    elif isinstance(source, GroupSource):
        # Send a group message
        message_id = await self.client.send_group_message(
            source.identity,
            content,
            **kwargs
        )
    else:
        raise ValueError(f"Unsupported source type: {type(source)}")
        
    return message_id
```

### Step 3: Implement Event Handlers

Implement event handlers to convert platform-specific events to LangBot events:

```python
async def on_message(self, platform_message):
    """
    Handle a message from the platform.
    
    Args:
        platform_message: The platform-specific message
    """
    # Convert the platform message to a LangBot message
    message = self.convert_message(platform_message)
    
    # Determine the type of message and emit the appropriate event
    if isinstance(message.source, PersonSource):
        # Emit a person message event
        await self.emit(PersonNormalMessageReceived(message))
    elif isinstance(message.source, GroupSource):
        # Emit a group message event
        await self.emit(GroupNormalMessageReceived(message))
        
def convert_message(self, platform_message):
    """
    Convert a platform-specific message to a LangBot message.
    
    Args:
        platform_message: The platform-specific message
        
    Returns:
        A LangBot message
    """
    # Extract message information
    message_id = platform_message.get("id")
    content = platform_message.get("content")
    time = platform_message.get("timestamp")
    
    # Extract sender information
    sender_id = platform_message.get("sender_id")
    sender_name = platform_message.get("sender_name")
    sender = Sender(sender_id, sender_name)
    
    # Determine the source type
    if platform_message.get("is_group"):
        # Group message
        group_id = platform_message.get("group_id")
        source = GroupSource("my_platform", group_id)
    else:
        # Direct message
        source = PersonSource("my_platform", sender_id)
        
    # Create and return the message
    return Message(
        source=source,
        content=content,
        message_id=message_id,
        sender=sender,
        time=time
    )
```

### Step 4: Register the Adapter

Register the adapter in the `langbot/bot/adapters/__init__.py` file:

```python
from .my_platform import MyPlatformAdapter

__all__ = [
    # Other adapters
    "MyPlatformAdapter",
]
```

### Step 5: Add Configuration Schema

Add the configuration schema for your adapter in the `langbot/schema/bot.py` file:

```python
MY_PLATFORM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"type": "string", "enum": ["my_platform"]},
        "api_key": {"type": "string"},
        # Other platform-specific configuration
    },
    "required": ["type", "api_key"],
}

# Add to the BOT_SCHEMA
BOT_SCHEMA = {
    "type": "object",
    "properties": {
        "bots": {
            "type": "array",
            "items": {
                "oneOf": [
                    # Other adapter schemas
                    MY_PLATFORM_SCHEMA,
                ],
            },
        },
    },
}
```

## Example: Implementing a Discord Adapter

Here's a simplified example of implementing a Discord adapter:

```python
import discord
from langbot.bot import MessageSourceAdapter
from langbot.message import Message, PersonSource, GroupSource, Sender
from langbot.event import PersonNormalMessageReceived, GroupNormalMessageReceived

class DiscordAdapter(MessageSourceAdapter):
    """
    Adapter for Discord.
    """
    
    def __init__(self, config):
        """
        Initialize the adapter.
        
        Args:
            config: The adapter configuration
        """
        super().__init__(config)
        self.config = config
        self.client = discord.Client(intents=discord.Intents.all())
        
        # Register event handlers
        @self.client.event
        async def on_ready():
            print(f"Logged in as {self.client.user}")
            
        @self.client.event
        async def on_message(message):
            # Ignore messages from the bot itself
            if message.author == self.client.user:
                return
                
            # Convert and emit the message
            await self.on_message(message)
            
    async def start(self):
        """
        Start the adapter.
        """
        # Start the Discord client
        await self.client.start(self.config.get("token"))
        
    async def stop(self):
        """
        Stop the adapter.
        """
        # Stop the Discord client
        if self.client:
            await self.client.close()
            
    async def send_message(self, source, content, **kwargs):
        """
        Send a message to a specific destination.
        
        Args:
            source: The destination to send the message to
            content: The content of the message
            **kwargs: Additional arguments
            
        Returns:
            The message ID
        """
        # Send the message using the Discord client
        if isinstance(source, PersonSource):
            # Send a direct message
            user = await self.client.fetch_user(int(source.identity))
            message = await user.send(content)
            return str(message.id)
        elif isinstance(source, GroupSource):
            # Send a group message
            channel = self.client.get_channel(int(source.identity))
            message = await channel.send(content)
            return str(message.id)
        else:
            raise ValueError(f"Unsupported source type: {type(source)}")
            
    async def on_message(self, discord_message):
        """
        Handle a message from Discord.
        
        Args:
            discord_message: The Discord message
        """
        # Convert the Discord message to a LangBot message
        message = self.convert_message(discord_message)
        
        # Determine the type of message and emit the appropriate event
        if isinstance(message.source, PersonSource):
            # Emit a person message event
            await self.emit(PersonNormalMessageReceived(message))
        elif isinstance(message.source, GroupSource):
            # Emit a group message event
            await self.emit(GroupNormalMessageReceived(message))
            
    def convert_message(self, discord_message):
        """
        Convert a Discord message to a LangBot message.
        
        Args:
            discord_message: The Discord message
            
        Returns:
            A LangBot message
        """
        # Extract message information
        message_id = str(discord_message.id)
        content = discord_message.content
        time = discord_message.created_at.timestamp()
        
        # Extract sender information
        sender_id = str(discord_message.author.id)
        sender_name = discord_message.author.name
        sender = Sender(sender_id, sender_name)
        
        # Determine the source type
        if discord_message.guild:
            # Group message
            group_id = str(discord_message.channel.id)
            source = GroupSource("discord", group_id)
        else:
            # Direct message
            source = PersonSource("discord", sender_id)
            
        # Create and return the message
        return Message(
            source=source,
            content=content,
            message_id=message_id,
            sender=sender,
            time=time
        )
```

## Testing Your Adapter

To test your adapter:

1. Add your adapter configuration to the `data/config.yaml` file:

```yaml
bots:
  - id: my_platform
    type: my_platform
    config:
      api_key: your-api-key
      # Other platform-specific configuration
```

2. Start LangBot and check the logs for any errors
3. Send a test message on your platform and verify that LangBot receives and processes it
4. Send a test message from LangBot to your platform and verify that it's delivered correctly

## Best Practices

- Handle errors gracefully and provide meaningful error messages
- Implement proper rate limiting to avoid being blocked by the platform
- Use asynchronous programming to avoid blocking the event loop
- Document your adapter thoroughly, including configuration options and limitations
- Follow the platform's terms of service and API guidelines
- Implement proper logging to help with debugging
- Consider implementing reconnection logic for platforms with unstable connections
- Test your adapter thoroughly with different types of messages and scenarios

## Conclusion

Implementing a custom message platform adapter allows you to extend LangBot to work with new messaging platforms. By following the steps and best practices outlined in this guide, you can create a robust and reliable adapter that integrates seamlessly with LangBot's architecture.

If you encounter any issues or have questions, feel free to ask in the [community chat](https://qm.qq.com/q/Nnz7Vbj8OU) or open an issue on [GitHub](https://github.com/RockChinQ/LangBot/issues).
