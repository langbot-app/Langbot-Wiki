# 系统兼容性

LangBot 插件系统运用了`Asyncio`和`Subprocess`等机制，这在unix-like系统（如Linux、MacOS）上运行良好，但在Windows上存在一些问题，导致插件无法正常运行。

Windows 上的 Python 异步事件循环默认使用 `ProactorEventLoop`，但该事件循环对 Stdio 的支持性缺失，而非 Docker 环境下 LangBot 依赖 Stdio 与 Plugin Runtime 通信、Plugin Runtime 也依赖 Stdio 与插件通信。

若改为使用`SelectorEventLoop`，则会导致无法正常启动 Plugin Runtime 和插件，因为`SelectorEventLoop`不支持`Subprocess`。

详细问题参阅：[Python官方文档](https://docs.python.org/zh-cn/3.13/library/asyncio-platforms.html)

## 解决方案（拟）

后续将支持在 Windows 上默认采用 Websocket 作为 LangBot 到 Plugin Runtime 、Plugin Runtime 到插件的通信方式。

现阶段请您使用 Unix-like 系统部署 LangBot，或在 Windows 上使用 Docker 或 WSL2。