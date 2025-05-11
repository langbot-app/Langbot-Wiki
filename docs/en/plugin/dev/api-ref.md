# API Reference

:::info Table of Contents
[[toc]]
:::

The following APIs are only available for **event plugins**. For component extensions, please refer to the source code directly.

## Message Handling

### Reply to a Message

```python
ctx.reply(message_chain: MessageChain)
```

Replies to the conversation that triggered the event.

- `message_chain`: [MessageChain object](./messages.md), which the program can automatically convert into the target message platform's message chain.

### Send an Active Message

> Due to poor support for active messages in the official QQ API, sending active messages may fail if the user is using the official QQ API.

```python
ctx.send_message(target_type: str, target_id: str, message_chain: MessageChain)
```

Sends an active message to the target.

- `target_type`: The type of target, with possible values: `"person"`, `"group"`.
- `target_id`: The target ID (QQ number or group number).
- `message_chain`: [MessageChain object](./messages.md), which the program can automatically convert into the target message platform's message chain.

## Event Handling

### Prevent Default Event Behavior

```python
ctx.prevent_default()
```

Prevents the default behavior of the event, stopping subsequent processing actions (e.g., fetching a reply from the interface when a private message is received, or fetching a reply from the interface when a group message is received).

### Prevent Subsequent Plugin Execution

```python
ctx.prevent_postorder()
```

Prevents the execution of subsequent plugins for this event. The execution order of plugins can be modified by adjusting priorities as described in the `Plugin Management` section of the `Plugin Introduction`.

### Add a Return Value

```python
ctx.add_return(name: str, value: Any)
```

Adds a return value. Return values for events are **optional**. For the return values supported by each event, please refer to the comments in `pkg.plugin.events` for each event.