# 插件开发教程

## 架构基础

<img width="600" src="/assets/image/zh/plugin/dev/plugin_system_arch.png" />

在 4.0 版本中，我们引入了一种高安全性、高灵活性的生产级插件系统，并为插件开发者提供了丰富的 API 和易用的配套工具。

Plugin Runtime （插件运行时），用于管理插件的生命周期，协调 LangBot 与插件之间的交互。有两种运行模式：`stdio` 和 `websocket`。当 LangBot 是由用户直接启动（未运行在容器内时），会使用 `stdio` 模式，这种场景多为个人用户或轻量级环境。当 LangBot 运行在容器内时，会使用 `websocket` 模式，此场景专为生产级环境设计。

Plugin Runtime 会自动启动各个已安装的插件，通过 stdio 交互。在插件开发场景中，开发者可以使用 `lbp` 命令行工具启动插件并通过 WebSocket 连接到已启动的 Runtime 进行调试。

## 安装 CLI

请确保您已安装 Python 3.10 或更高版本，并已安装 [uv 包管理器](https://docs.astral.sh/uv/)。

在任意空目录执行命令，安装 LangBot CLI 和 SDK

```bash
pip install langbot_plugin==0.1.1b1
```

## 初始化插件目录

假设您的插件名称为 `HelloPlugin`，则执行

```bash
lbp init HelloPlugin
cd HelloPlugin
```

按照提示输入`Author(作者)`、`Description(描述)`等信息

<img width="600" src="/assets/image/zh/plugin/dev/create_plugin.png" />

此操作将创建目录 `HelloPlugin`，并生成插件的初始化文件。您现在可以在您喜爱的编辑器中打开 `HelloPlugin` 目录，开始编写插件代码。

:::info
若提示找不到 `lbp` 命令，可能是由于您未正确设置 `PATH` 环境变量。
可使用`python -m langbot_plugin.cli.__init__`替代`lbp`命令。

例如：

```bash
python -m langbot_plugin.cli.__init__ init HelloPlugin
cd HelloPlugin
```
:::

## 启动调试

您需要先部署并启动 LangBot，确保 Plugin Runtime 正在运行并监听 `5401` 端口。

复制插件目录下的`.env.example`文件为`.env`，检查或修改`DEBUG_RUNTIME_WS_URL`为您的 Plugin Runtime 的 WebSocket 地址。

```bash
cp .env.example .env
```

启动插件调试，您将看到插件的输出：

```bash
lbp run
```

<img width="600" src="/assets/image/zh/plugin/dev/launch_debug_plugin.png" />

并可以在 LangBot 的 WebUI 中看到此插件已被加载。

<img width="600" src="/assets/image/zh/plugin/dev/debug_plugin_loaded.png" />

## 接下来做什么

该教程将指引您逐步完善插件功能。

- 修改插件信息：插件已创建，并填入了最基础的插件信息，请您[完善插件信息](/zh/plugin/dev/basic-info)。
- 添加组件：插件组件是插件的核心功能单元，您可以根据需求[添加组件](/zh/plugin/dev/components/add)。
