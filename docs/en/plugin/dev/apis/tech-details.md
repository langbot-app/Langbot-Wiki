# Plugin Technical Details

## Architecture

<img width="600" src="/assets/image/zh/plugin/dev/plugin_system_arch.png" />

In version 4.0, we introduced a high-security, high-flexibility production-grade plugin system and provided developers with rich APIs and easy-to-use supporting tools.

Plugin Runtime is used to manage plugin lifecycles and coordinate interactions between LangBot and plugins. It has two operating modes: `stdio` and `websocket`. When LangBot is started directly by users (not running in a container), it uses `stdio` mode, which is common for personal users or lightweight environments. When LangBot runs in a container, it uses `websocket` mode, designed specifically for production environments.

Plugin Runtime automatically starts each installed plugin and interacts through stdio. In plugin development scenarios, developers can use the `lbp` command-line tool to start plugins and connect to the running Runtime via WebSocket for debugging.