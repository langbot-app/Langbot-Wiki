# Plugin Development Tutorial

## Architecture Foundation

In version 4.0, we introduced a high-security, high-flexibility production-grade plugin system and provided developers with rich APIs and easy-to-use supporting tools.

<img width="600" src="/assets/image/zh/plugin/dev/plugin_system_arch.png" />

Plugin Runtime is used to manage plugin lifecycles and coordinate interactions between LangBot and plugins. It has two operating modes: `stdio` and `websocket`. When LangBot is started directly by users (not running in a container), it uses `stdio` mode, which is common for personal users or lightweight environments. When LangBot runs in a container, it uses `websocket` mode, designed specifically for production environments.

Plugin Runtime automatically starts each installed plugin and interacts through stdio. In plugin development scenarios, developers can use the `lbp` command-line tool to start plugins and connect to the running Runtime via WebSocket for debugging.

### Plugin Structure

A plugin's directory structure is similar to the following:

```bash
➜  HelloPlugin > tree
.
├── assets
│   └── icon.svg  # Plugin icon, displayed on the plugin marketplace page
├── components  # Plugin component directory, stores various component code and manifest files
│   ├── __init__.py
│   ├── commands
│   │   ├── __init__.py
│   │   ├── info.py
│   │   └── info.yaml
│   ├── event_listener
│   │   ├── __init__.py
│   │   ├── default.py
│   │   └── default.yaml
│   └── tools
│       ├── __init__.py
│       ├── get_weather_alerts.py
│       └── get_weather_alerts.yaml
├── main.py  # Plugin main program, listens to plugin lifecycle
├── manifest.yaml  # Plugin manifest file, describes plugin metadata
├── README.md  # Plugin documentation file, describes plugin functionality and usage, displayed on the plugin marketplace page
└── requirements.txt  # Plugin dependencies file
```

The plugin class in main.py is common code for each plugin, initialized when the plugin starts and passed context information (configuration, etc.). You can implement initialization and shutdown logic for the plugin here. The plugin class inherits from `langbot_plugin.api.definition.plugin.BasePlugin` and provides [LangBot Global APIs](/en/plugin/dev/apis/common).

Each component is a core functional module of your plugin, which can be [added and removed](/en/plugin/dev/components/add) as needed. Different components are called in different situations, making it easy to extend plugin functionality later. Each component directly inherits from the various component base classes under the `langbot_plugin.api.definition.components` package and contains a `plugin: BasePlugin` object, allowing you to directly call the plugin's APIs.

::: info
- For detailed API documentation, please refer to [API Reference](/en/plugin/dev/apis/common).

Please continue reading this tutorial to understand the plugin development process.
:::

## Installing CLI

Please ensure you have Python 3.10 or higher installed, and have installed the [uv package manager](https://docs.astral.sh/uv/).

Execute the command in any empty directory to install LangBot CLI and SDK:

```bash
pip install langbot_plugin==0.1.1b5
```

## Initializing Plugin Directory

Assuming your plugin name is `HelloPlugin`, create a directory `HelloPlugin` in any directory, enter that directory, and execute the command to initialize the plugin:

```bash
lbp init
```

Follow the prompts to enter `Author`, `Description`, and other information.

:::info
You can also use the `lbp init HelloPlugin` command to initialize the plugin in the subdirectory `HelloPlugin`.

<img width="600" src="/assets/image/zh/plugin/dev/create_plugin.png" />
:::

This operation will generate the initial files for the plugin. You can now open the `HelloPlugin` directory in your favorite editor and start writing plugin code.

:::info
If you get a "command not found" error for `lbp`, it may be because you haven't properly set the `PATH` environment variable.
You can use `python -m langbot_plugin.cli.__init__` instead of the `lbp` command.

For example:

```bash
python -m langbot_plugin.cli.__init__ init HelloPlugin
cd HelloPlugin
```
:::

## Starting Debug Mode

You need to first deploy and start LangBot, ensuring that Plugin Runtime is running and listening on port `5401`.

::: info
Runtime has two startup modes:

- `Stdio` mode: When you start LangBot using source code without the startup parameter `--standalone-runtime`, LangBot will automatically start Plugin Runtime as a subprocess and communicate with Plugin Runtime through `stdio` (standard input/output streams). In this case, Runtime will load plugins from the `data/plugins` directory in the LangBot root directory and listen on port `5401` of the LangBot host as a debug port.

- `WebSocket` mode:
    - Production environment: When you start LangBot using the official `docker-compose.yaml`, Plugin Runtime will run in a separate container, and LangBot will communicate with Plugin Runtime in WebSocket mode due to the startup parameter `--standalone-runtime`.
    - Development environment: If you start LangBot through source code with the startup parameter `--standalone-runtime`, LangBot will connect to the already started Plugin Runtime according to the `plugin.runtime_ws_url` address (port usually 5400) configured in `data/config.yaml`. You need to start the standalone Plugin Runtime yourself, see [Developing Plugin Runtime](/en/develop/plugin-runtime).

Whether in `stdio` or `websocket` mode, Plugin Runtime will listen on port `5401` of its host as a debug port for plugin debugging connections.

When developing plugins, we recommend starting LangBot according to the [Development Configuration](/en/develop/dev-config) method, which will start Plugin Runtime in Stdio mode, making plugin development easier.
:::

Copy the `.env.example` file in the plugin directory to `.env`, and check or modify `DEBUG_RUNTIME_WS_URL` to your Plugin Runtime's WebSocket address.

```bash
cp .env.example .env
```

Start plugin debugging, and you will see the plugin output:

```bash
lbp run
```

<img width="600" src="/assets/image/zh/plugin/dev/launch_debug_plugin.png" />

And you can see this plugin has been loaded in LangBot's WebUI.

<img width="600" src="/assets/image/zh/plugin/dev/debug_plugin_loaded.png" />

## What's Next

This tutorial will guide you through step-by-step completion of plugin functionality.

- Modify Plugin Information: The plugin has been created with basic plugin information. Please [complete the plugin information](/en/plugin/dev/basic-info).
- Add Components: Plugin components are the core functional units of plugins. You can [add components](/en/plugin/dev/components/add) based on your needs.