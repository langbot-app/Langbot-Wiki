# Message Platform Entities

This document describes the message platform entities used in LangBot, which are important for plugin development.

## Message

The `Message` class represents a message in LangBot.

```python
class Message:
    """
    Represents a message in LangBot.
    """
    
    def __init__(self, source, content, message_id=None, sender=None, time=None, **kwargs):
        """
        Initialize a message.
        
        Args:
            source: The source of the message
            content: The content of the message
            message_id: The ID of the message
            sender: The sender of the message
            time: The time the message was sent
            **kwargs: Additional arguments
        """
        self.source = source
        self.content = content
        self.message_id = message_id
        self.sender = sender
        self.time = time
        self.kwargs = kwargs
```

### Properties

- `source`: The source of the message (where it was sent from)
- `content`: The content of the message
- `message_id`: The ID of the message
- `sender`: The sender of the message
- `time`: The time the message was sent
- `kwargs`: Additional arguments

## Source

The `Source` class represents the source of a message.

```python
class Source:
    """
    Represents the source of a message.
    """
    
    def __init__(self, platform, identity, **kwargs):
        """
        Initialize a source.
        
        Args:
            platform: The platform of the source
            identity: The identity of the source
            **kwargs: Additional arguments
        """
        self.platform = platform
        self.identity = identity
        self.kwargs = kwargs
```

### Properties

- `platform`: The platform of the source (e.g., "qq", "wechat", "discord")
- `identity`: The identity of the source (e.g., user ID, group ID)
- `kwargs`: Additional arguments

### Types of Sources

#### Person Source

Represents a direct message from a person.

```python
class PersonSource(Source):
    """
    Represents a direct message from a person.
    """
    
    def __init__(self, platform, identity, **kwargs):
        """
        Initialize a person source.
        
        Args:
            platform: The platform of the source
            identity: The identity of the person
            **kwargs: Additional arguments
        """
        super().__init__(platform, identity, **kwargs)
```

#### Group Source

Represents a message from a group.

```python
class GroupSource(Source):
    """
    Represents a message from a group.
    """
    
    def __init__(self, platform, identity, **kwargs):
        """
        Initialize a group source.
        
        Args:
            platform: The platform of the source
            identity: The identity of the group
            **kwargs: Additional arguments
        """
        super().__init__(platform, identity, **kwargs)
```

## Sender

The `Sender` class represents the sender of a message.

```python
class Sender:
    """
    Represents the sender of a message.
    """
    
    def __init__(self, identity, name=None, **kwargs):
        """
        Initialize a sender.
        
        Args:
            identity: The identity of the sender
            name: The name of the sender
            **kwargs: Additional arguments
        """
        self.identity = identity
        self.name = name
        self.kwargs = kwargs
```

### Properties

- `identity`: The identity of the sender (e.g., user ID)
- `name`: The name of the sender
- `kwargs`: Additional arguments

## Events

LangBot uses events to represent various actions in the system. Here are some common events related to messages:

### PersonNormalMessageReceived

Triggered when a normal message is received from a person.

```python
class PersonNormalMessageReceived(Event):
    """
    Triggered when a normal message is received from a person.
    """
    
    def __init__(self, message):
        """
        Initialize the event.
        
        Args:
            message: The received message
        """
        super().__init__()
        self.message = message
```

### GroupNormalMessageReceived

Triggered when a normal message is received in a group.

```python
class GroupNormalMessageReceived(Event):
    """
    Triggered when a normal message is received in a group.
    """
    
    def __init__(self, message):
        """
        Initialize the event.
        
        Args:
            message: The received message
        """
        super().__init__()
        self.message = message
```

### MessageSent

Triggered when a message is sent.

```python
class MessageSent(Event):
    """
    Triggered when a message is sent.
    """
    
    def __init__(self, message):
        """
        Initialize the event.
        
        Args:
            message: The sent message
        """
        super().__init__()
        self.message = message
```

## Working with Messages in Plugins

### Handling Messages

```python
from langbot.plugin import Plugin, handler
from langbot.event import PersonNormalMessageReceived, GroupNormalMessageReceived
from langbot.api import APIHost

class MessageHandlerPlugin(Plugin):
    def __init__(self, api_host: APIHost):
        super().__init__(api_host)
        self.api = api_host
        
    @handler(PersonNormalMessageReceived)
    def on_person_message(self, ctx):
        # Get the message
        message = ctx.event.message
        
        # Get the content
        content = message.content
        
        # Get the sender
        sender = message.sender
        
        # Get the source
        source = message.source
        
        # Do something with the message
        if content == "!hello":
            self.api.send_message(source, f"Hello, {sender.name}!")
            
    @handler(GroupNormalMessageReceived)
    def on_group_message(self, ctx):
        # Get the message
        message = ctx.event.message
        
        # Get the content
        content = message.content
        
        # Get the sender
        sender = message.sender
        
        # Get the source
        source = message.source
        
        # Do something with the message
        if content == "!hello":
            self.api.send_message(source, f"Hello, {sender.name}!")
```

### Sending Messages

```python
# Send a message to a person
person_source = PersonSource("qq", "12345678")
self.api.send_message(person_source, "Hello!")

# Send a message to a group
group_source = GroupSource("qq", "87654321")
self.api.send_message(group_source, "Hello, everyone!")

# Reply to a message
self.api.reply_message(message, "This is a reply")
```

### Creating Messages

```python
from langbot.message import Message, PersonSource, Sender

# Create a person source
source = PersonSource("qq", "12345678")

# Create a sender
sender = Sender("87654321", "John Doe")

# Create a message
message = Message(
    source=source,
    content="Hello, World!",
    message_id="msg123",
    sender=sender,
    time=1234567890
)
```

## Platform-Specific Considerations

Different messaging platforms may have different capabilities and limitations. Here are some platform-specific considerations:

### QQ

- Supports text, images, and rich media
- Group messages can mention specific users
- Message IDs are platform-specific

### WeChat

- Supports text, images, and rich media
- Limited API for personal accounts
- More features available for official accounts

### Discord

- Supports text, images, embeds, and rich formatting
- Has a robust API with many features
- Supports slash commands

### Telegram

- Supports text, images, and rich formatting
- Has a comprehensive API
- Supports inline bots and commands

## Best Practices

- Always check the platform before using platform-specific features
- Handle message content carefully, as it may contain special formatting
- Use the appropriate source type (PersonSource or GroupSource) when sending messages
- Consider rate limits and message size limits when sending messages
- Handle errors gracefully, as message sending may fail for various reasons
