# API Reference

This document provides a reference for the LangBot API that is available to plugins.

## APIHost

The `APIHost` class provides access to LangBot's API from plugins. It is passed to the plugin's constructor.

```python
from langbot.api import APIHost

class MyPlugin(Plugin):
    def __init__(self, api_host: APIHost):
        super().__init__(api_host)
        self.api = api_host
```

## Message API

### send_message

Sends a message to a specific destination.

```python
def send_message(self, source, content, **kwargs) -> str:
    """
    Send a message to a specific destination.
    
    Args:
        source: The destination to send the message to
        content: The content of the message
        **kwargs: Additional arguments
        
    Returns:
        The message ID
    """
```

Example:

```python
message_id = self.api.send_message(
    ctx.event.message.source,
    "Hello, World!"
)
```

### reply_message

Replies to a specific message.

```python
def reply_message(self, message, content, **kwargs) -> str:
    """
    Reply to a specific message.
    
    Args:
        message: The message to reply to
        content: The content of the reply
        **kwargs: Additional arguments
        
    Returns:
        The message ID
    """
```

Example:

```python
message_id = self.api.reply_message(
    ctx.event.message,
    "This is a reply"
)
```

### delete_message

Deletes a specific message.

```python
def delete_message(self, message_id, **kwargs) -> bool:
    """
    Delete a specific message.
    
    Args:
        message_id: The ID of the message to delete
        **kwargs: Additional arguments
        
    Returns:
        True if successful, False otherwise
    """
```

Example:

```python
success = self.api.delete_message(message_id)
```

## User API

### get_user_info

Gets information about a user.

```python
def get_user_info(self, user_id, **kwargs) -> dict:
    """
    Get information about a user.
    
    Args:
        user_id: The ID of the user
        **kwargs: Additional arguments
        
    Returns:
        A dictionary containing user information
    """
```

Example:

```python
user_info = self.api.get_user_info("12345678")
print(user_info["nickname"])
```

### get_friend_list

Gets a list of the bot's friends.

```python
def get_friend_list(self, **kwargs) -> list:
    """
    Get a list of the bot's friends.
    
    Args:
        **kwargs: Additional arguments
        
    Returns:
        A list of friend information
    """
```

Example:

```python
friends = self.api.get_friend_list()
for friend in friends:
    print(friend["nickname"])
```

## Group API

### get_group_info

Gets information about a group.

```python
def get_group_info(self, group_id, **kwargs) -> dict:
    """
    Get information about a group.
    
    Args:
        group_id: The ID of the group
        **kwargs: Additional arguments
        
    Returns:
        A dictionary containing group information
    """
```

Example:

```python
group_info = self.api.get_group_info("12345678")
print(group_info["name"])
```

### get_group_member_list

Gets a list of members in a group.

```python
def get_group_member_list(self, group_id, **kwargs) -> list:
    """
    Get a list of members in a group.
    
    Args:
        group_id: The ID of the group
        **kwargs: Additional arguments
        
    Returns:
        A list of member information
    """
```

Example:

```python
members = self.api.get_group_member_list("12345678")
for member in members:
    print(member["nickname"])
```

### get_group_list

Gets a list of groups the bot is in.

```python
def get_group_list(self, **kwargs) -> list:
    """
    Get a list of groups the bot is in.
    
    Args:
        **kwargs: Additional arguments
        
    Returns:
        A list of group information
    """
```

Example:

```python
groups = self.api.get_group_list()
for group in groups:
    print(group["name"])
```

## LLM API

### call_llm

Calls the LLM with a specific prompt.

```python
def call_llm(self, prompt, model=None, **kwargs) -> str:
    """
    Call the LLM with a specific prompt.
    
    Args:
        prompt: The prompt to send to the LLM
        model: The model to use (defaults to the system default)
        **kwargs: Additional arguments
        
    Returns:
        The LLM's response
    """
```

Example:

```python
response = self.api.call_llm(
    "What is the capital of France?",
    model="gpt-3.5-turbo"
)
print(response)
```

### call_llm_with_functions

Calls the LLM with a specific prompt and available functions.

```python
def call_llm_with_functions(self, prompt, functions, model=None, **kwargs) -> dict:
    """
    Call the LLM with a specific prompt and available functions.
    
    Args:
        prompt: The prompt to send to the LLM
        functions: A list of function definitions
        model: The model to use (defaults to the system default)
        **kwargs: Additional arguments
        
    Returns:
        A dictionary containing the LLM's response and any function calls
    """
```

Example:

```python
functions = [
    {
        "name": "get_weather",
        "description": "Get the weather for a location",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The location to get weather for"
                }
            },
            "required": ["location"]
        }
    }
]

response = self.api.call_llm_with_functions(
    "What's the weather in Paris?",
    functions,
    model="gpt-3.5-turbo"
)

if "function_call" in response:
    function_name = response["function_call"]["name"]
    function_args = response["function_call"]["arguments"]
    # Handle the function call
```

## Storage API

### storage.set

Stores a value with a specific key.

```python
def set(self, key, value) -> None:
    """
    Store a value with a specific key.
    
    Args:
        key: The key to store the value under
        value: The value to store
    """
```

Example:

```python
self.api.storage.set("my_plugin:counter", 42)
```

### storage.get

Gets a value with a specific key.

```python
def get(self, key, default=None):
    """
    Get a value with a specific key.
    
    Args:
        key: The key to get the value for
        default: The default value to return if the key doesn't exist
        
    Returns:
        The stored value or the default value
    """
```

Example:

```python
counter = self.api.storage.get("my_plugin:counter", 0)
```

### storage.has

Checks if a key exists.

```python
def has(self, key) -> bool:
    """
    Check if a key exists.
    
    Args:
        key: The key to check
        
    Returns:
        True if the key exists, False otherwise
    """
```

Example:

```python
if self.api.storage.has("my_plugin:counter"):
    # Key exists
```

### storage.delete

Deletes a key.

```python
def delete(self, key) -> None:
    """
    Delete a key.
    
    Args:
        key: The key to delete
    """
```

Example:

```python
self.api.storage.delete("my_plugin:counter")
```

## Config API

### config.get

Gets a configuration value.

```python
def get(self, key, default=None):
    """
    Get a configuration value.
    
    Args:
        key: The key to get the value for
        default: The default value to return if the key doesn't exist
        
    Returns:
        The configuration value or the default value
    """
```

Example:

```python
api_key = self.api.config.get("my_plugin:api_key")
```

### config.set

Sets a configuration value.

```python
def set(self, key, value) -> None:
    """
    Set a configuration value.
    
    Args:
        key: The key to set the value for
        value: The value to set
    """
```

Example:

```python
self.api.config.set("my_plugin:api_key", "my-api-key")
```

## Event API

### register_event_handler

Registers a handler for a specific event.

```python
def register_event_handler(self, event_type, handler) -> None:
    """
    Register a handler for a specific event.
    
    Args:
        event_type: The type of event to handle
        handler: The handler function
    """
```

Example:

```python
def my_handler(ctx):
    # Handle the event
    pass

self.api.register_event_handler(PersonNormalMessageReceived, my_handler)
```

### unregister_event_handler

Unregisters a handler for a specific event.

```python
def unregister_event_handler(self, event_type, handler) -> None:
    """
    Unregister a handler for a specific event.
    
    Args:
        event_type: The type of event
        handler: The handler function
    """
```

Example:

```python
self.api.unregister_event_handler(PersonNormalMessageReceived, my_handler)
```

## Command API

### register_command

Registers a command.

```python
def register_command(self, name, handler, description=None) -> None:
    """
    Register a command.
    
    Args:
        name: The name of the command
        handler: The handler function
        description: The description of the command
    """
```

Example:

```python
def echo_handler(args):
    return args

self.api.register_command("echo", echo_handler, "Echo a message")
```

### unregister_command

Unregisters a command.

```python
def unregister_command(self, name) -> None:
    """
    Unregister a command.
    
    Args:
        name: The name of the command
    """
```

Example:

```python
self.api.unregister_command("echo")
```

## Utility API

### logger

Provides access to the logger.

```python
self.api.logger.debug("Debug message")
self.api.logger.info("Info message")
self.api.logger.warning("Warning message")
self.api.logger.error("Error message")
```

### schedule

Schedules a function to be called at a specific time.

```python
def schedule(self, func, when, *args, **kwargs) -> str:
    """
    Schedule a function to be called at a specific time.
    
    Args:
        func: The function to call
        when: When to call the function (datetime or timedelta)
        *args: Arguments to pass to the function
        **kwargs: Keyword arguments to pass to the function
        
    Returns:
        The schedule ID
    """
```

Example:

```python
from datetime import timedelta

def my_function():
    # Do something
    pass

schedule_id = self.api.schedule(my_function, timedelta(hours=1))
```

### cancel_schedule

Cancels a scheduled function.

```python
def cancel_schedule(self, schedule_id) -> bool:
    """
    Cancel a scheduled function.
    
    Args:
        schedule_id: The ID of the schedule
        
    Returns:
        True if successful, False otherwise
    """
```

Example:

```python
success = self.api.cancel_schedule(schedule_id)
```
