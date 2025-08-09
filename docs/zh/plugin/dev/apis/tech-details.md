# 插件技术细节

## 架构

<img width="600" src="/assets/image/zh/plugin/dev/tech-details/plugin_system_arch.png" />

在 4.0 版本中，我们引入了一种高安全性、高灵活性的生产级插件系统，并为插件开发者提供了丰富的 API 和易用的配套工具。

Plugin Runtime （插件运行时），用于管理插件的生命周期，协调 LangBot 与插件之间的交互。有两种运行模式：`stdio` 和 `websocket`。当 LangBot 是由用户直接启动（未运行在容器内时），会使用 `stdio` 模式，这种场景多为个人用户或轻量级环境。当 LangBot 运行在容器内时，会使用 `websocket` 模式，此场景专为生产级环境设计。

Plugin Runtime 会自动启动各个已安装的插件，通过 stdio 交互。在插件开发场景中，开发者可以使用 `lbp` 命令行工具启动插件并通过 WebSocket 连接到已启动的 Runtime 进行调试。