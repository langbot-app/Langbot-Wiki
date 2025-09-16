# System Compatibility

LangBot's plugin system utilizes mechanisms such as `Asyncio` and `Subprocess`, which work well on Unix-like systems (such as Linux, macOS), but have some issues on Windows, preventing plugins from running properly.

Python's asynchronous event loop on Windows defaults to using `ProactorEventLoop`, but this event loop lacks support for Stdio, while LangBot in non-Docker environments relies on Stdio to communicate with Plugin Runtime, and Plugin Runtime also depends on Stdio to communicate with plugins.

If we switch to using `SelectorEventLoop`, it would prevent Plugin Runtime and plugins from starting properly, as `SelectorEventLoop` does not support `Subprocess`.

For detailed information about these issues, please refer to: [Python Official Documentation](https://docs.python.org/3.13/library/asyncio-platforms.html)

## Proposed Solution

In the future, we plan to support WebSocket as the default communication method between LangBot and Plugin Runtime, as well as between Plugin Runtime and plugins on Windows.

For now, please deploy LangBot on Unix-like systems, or use Docker or WSL2 on Windows.