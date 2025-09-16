# Debugging Plugin Runtime, CLI, SDK

::: info
Please read the [Plugin Tutorial](/en/plugin/plugin-intro) first to understand the plugin system.

- Plugin Runtime, CLI, SDK are open sourced at: https://github.com/langbot-app/langbot-plugin-sdk
:::

Clone the plugin runtime source code:

```bash
git clone https://github.com/langbot-app/langbot-plugin-sdk
```

Enter the plugin runtime directory and install dependencies:

```bash
cd langbot-plugin-sdk
uv sync --dev
```

At this point, uv will automatically create a virtual environment (.venv) for you. If your editor asks whether to use this virtual environment, please select `Yes`.

Or you can manually activate this virtual environment:

```bash
source .venv/bin/activate
```

## Start Plugin Runtime

```bash
lbp rt
```

Please ensure that the `lbp` command is the `lbp` executable in the virtual environment of this directory, or start it via `python -m langbot_plugin.cli.__init__ rt`.

Plugin Runtime accepts the following parameters:

- `--debug-only`: Do not start plugins in the `data/plugins` directory, only allow loading plugins through debug connections.
- `--ws-debug-port`: Debug port to listen on, default is `5401`.
- `--ws-control-port`: Control port to listen on (for LangBot main program connection), default is `5400`.
- `-s`: Use `stdio` to accept control connections. **Use only in production environment**.

### Make LangBot Connect to This Runtime

Configure `plugin.runtime_ws_url` to `ws://localhost:5400/control/ws` in LangBot's `data/config.yaml`.

```yaml
plugin:
  runtime_ws_url: ws://localhost:5400/control/ws
```

And add the startup parameter `--standalone-runtime` when starting the LangBot main program (e.g., `uv run main.py --standalone-runtime`).  
Restart LangBot, and it will connect to this runtime using WebSocket.

## langbot-plugin-sdk Architecture

This codebase contains the following:

- `langbot_plugin.api`: Plugin-related entities and API definitions.
- `langbot_plugin.assets`: Plugin templates.
- `langbot_plugin.cli`: Plugin development CLI tools.
- `langbot_plugin.entities`: Plugin system-related entities not defined in API.
- `langbot_plugin.runtime`: Plugin runtime and underlying communication (stdio and websocket) implementation.

## `lbp` CLI Tool

The CLI tool provides Runtime startup, plugin initialization, plugin component management, Marketplace interaction, and other functions.

For detailed program entry points, please see [`langbot_plugin.cli.__init__`](https://github.com/langbot-app/langbot-plugin-sdk/blob/main/src/langbot_plugin/cli/__init__.py).