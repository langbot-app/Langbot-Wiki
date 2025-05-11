# Implementing a Message Platform Adapter

:::info
Please read the chapter on Plugin Development -> Component Extension first to understand LangBot's component extension mechanism.
:::

This article will use the `aiocqhttp` adapter as an example to explain how to implement a new message platform adapter for LangBot, enabling integration with new message platform protocols such as WhatsApp and Discord.

- The code in this article is based on version `v3.4.1.5`.

## Registration

First, refer to the instructions on the component extension page:

```text
Add a new message platform adapter, for example, to integrate WhatsApp, Discord, etc.

- Base class: `pkg.platform.adapter.MessageSourceAdapter`
- Decorator: `pkg.platform.adapter.adapter_class(name: str)`
- Reference implementation: `pkg.platform.adapters/`
- Usage: The configuration information in `data/config/platform.json` under `platform-adapters` will automatically look up the corresponding adapter implementation based on the `adapter` name during initialization, and pass the configuration to the adapter for initialization. The implementation of message platform adapters is complex, so it is recommended to refer to existing implementations.
```

Implementing a message platform adapter essentially involves creating a class that inherits from the `base class` and registering it using the `decorator`. Finally, it will be available for users to select and use during runtime.

### Writing to a Plugin

Create a new `aiocqhttp.py` file in the plugin directory:

```python
import pkg.platform.adapter

@pkg.platform.adapter.adapter_class("aiocqhttp")
class AiocqhttpAdapter(pkg.platform.adapter.MessageSourceAdapter):
    pass
```

During startup, LangBot's plugin loader will automatically load this module (file) and register it to the message platform adapter list.

### Contributing Directly to the Main Repository

Create a new `aiocqhttp.py` file in the `pkg/platform/sources/` directory:

```python
from .. import adapter

@adapter.adapter_class("aiocqhttp")
class AiocqhttpAdapter(adapter.MessageSourceAdapter):
    pass
```

Also, import this module at line 40 in `pkg/platform/manager.py`:

```python
        from .sources import nakuru, aiocqhttp, qqbotpy
```

## Event and Message Converters

The main task of a message platform adapter is to `receive events from the message platform protocol, convert them into LangBot's format`, and pass them to the core components. After processing, the core components will pass the content that needs to be replied back to the message platform adapter, which will then `convert the content into the platform protocol's format and send it to the message platform`.

The following diagram illustrates the processing patterns for two scenarios: message platform protocols without an SDK and those with a mature SDK. In the first scenario, we need to implement connection management and convert network format data into LB message Python objects based on the message platform protocol's documentation. In the second scenario, where the message platform has a mature SDK, we only need to create a connection by calling the SDK's API, register event listeners, and implement message converters based on the SDK's documentation.

![alt text](/assets/image/workshop_impl_platform_adapter_01.png)

In the `pkg.platform.sources.aiocqhttp` file, we can see not only `AiocqhttpAdapter`, but also `class AiocqhttpMessageConverter(adapter.MessageConverter):` and `class AiocqhttpEventConverter(adapter.EventConverter):`.

- `MessageConverter` is used to convert between LangBot messages and platform messages.
- `EventConverter` is used to convert between LangBot events and platform events.

TBC...