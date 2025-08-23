# 调试插件运行时、CLI、SDK

::: info
请先阅读[插件教程](/zh/plugin/plugin-intro)，了解插件系统。

- 插件运行时、CLI、SDK 开源在: https://github.com/langbot-app/langbot-plugin-sdk
:::

Clone 插件运行时源码：

```bash
git clone https://github.com/langbot-app/langbot-plugin-sdk
```

进入插件运行时目录，安装依赖：

```bash
cd langbot-plugin-sdk
uv sync --dev
```

## 启动插件运行时

```bash
lbp rt
```

请确保`lbp`命令是该目录下的虚拟环境中的`lbp`可执行文件，或通过`python -m langbot_plugin.cli.__init__ rt`启动。

Plugin Runtime 接受以下参数：

- `--debug-only`: 不启动`data/plugins`目录下的插件，仅允许通过调试连接加载插件。
- `--ws-debug-port`: 监听的调试端口，默认是`5401`。
- `--ws-control-port`: 监听的控制端口（供 LangBot 主程序连接），默认是`5400`。
- `-s`: 使用`stdio`接受控制连接。**仅在生产环境使用**。

### 使 LangBot 连接到此运行时

在 LangBot 的`data/config.yaml`中配置`plugin.runtime_ws_url`为`ws://localhost:5401/control/ws`。

```yaml
plugin:
  runtime_ws_url: ws://localhost:5401/control/ws
```

并在启动 LangBot 主程序时提供环境变量`DOCKER_ENV=true`。  
重启 LangBot，将会使用 WebSocket 连接到此运行时。

## langbot-plugin-sdk 架构

本代码库中包含以下内容：

- `langbot_plugin.api`：插件相关实体和 API 定义。
- `langbot_plugin.assets`：插件模板。
- `langbot_plugin.cli`：插件开发 CLI 工具。
- `langbot_plugin.entities`：插件系统中非 API 定义的相关实体。
- `langbot_plugin.runtime`：插件运行时和底层通信（stdio 和 websocket）实现。

## `lbp` CLI 工具

CLI 工具提供 Runtime 启动、插件初始化、插件组件管理、Marketplace 交互等功能。

详细的程序入口请查看[`langbot_plugin.cli.__init__`](https://github.com/langbot-app/langbot-plugin-sdk/blob/main/src/langbot_plugin/cli/__init__.py)。