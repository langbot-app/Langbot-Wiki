# LangBot Plugins

LangBot is composed of various internal components such as Large Language Model tools, commands, messaging platform adapters, LLM requesters, and more. To meet extensibility and flexibility requirements, we have implemented a production-grade plugin system.

Each plugin runs in an independent process, managed uniformly by the Plugin Runtime.

<img width="600" src="/assets/image/zh/plugin/dev/plugin_system_arch.png" />

:::warning
Due to Python Asyncio compatibility issues, the plugin system currently cannot run properly in native Windows environments. Please use Docker or WSL2 for deployment: [System Compatibility](/en/plugin/compatibility)
:::

## Plugin Structure

Plugins can consist of the following components based on their specific functionality:

- Event Handlers: Listen to events during pipeline execution and modify context or pipelines.
- Commands: Triggered by user command messages starting with `!` (or other configured prefixes).
- Tools: Called by LLMs during execution of LangBot's built-in Local Agent.

More component types will be supported for plugin implementation in the future.

## Installing Plugins

Currently supports uploading plugin packages and installing plugins from the plugin marketplace.
In LangBot's plugin management page, click the top-right corner to choose the installation method.

<img width="600" src="/assets/image/zh/plugin/install_from_local.png" />

Select `.lbpkg` files shared by others or downloaded from the Marketplace to install plugins.

Or click the Plugin Marketplace tab, select a plugin, and click install.

<img width="600" src="/assets/image/zh/plugin/install_from_marketplace.png" />

## Plugin Management

### Plugin Configuration

Some plugins may require you to fill in specific configuration items (please refer to the plugin README instructions). Click on the plugin card to enter the plugin details page and obtain and input the required information as prompted.

<img width="600" src="/assets/image/zh/plugin/plugin_config.png" />

### Updating Plugins

Only plugins installed from the plugin marketplace can be updated.

<img width="600" src="/assets/image/zh/plugin/update_plugin.png" />

## Plugin Marketplace

The plugin marketplace can be accessed from LangBot's internal `Plugin Management` page, or you can visit the standalone site [LangBot Plugin Marketplace](https://space.langbot.app/market).