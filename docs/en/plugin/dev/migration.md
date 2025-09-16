# Migration Guide

This tutorial highlights certain considerations. Please read the current version plugin tutorial first, then use this document as a reference for plugin migration.

## Migrating from 3.x Supported Asynchronous Plugins

:::info
Plugin characteristics:
- Main time period: 2024.2 ~ 2025.8
- Registration method: Using `@handler` decorators to register event listeners and `@llm_func` decorators to register content functions (tools) in the plugin class in `main.py`; all handler functions are asynchronous functions (async def)
:::

- Plugin and component registration method: Changed from the previous single plugin class decorator registration method to manifest file registration method. See [Manifest File](/en/plugin/dev/basic-info); and separated different types of components independently. For details, see [Adding Components](/en/plugin/dev/components/add).
- Message chain entities: Now refactored. The construction method of each message chain element now requires explicit passing of **named parameters**. See [Message Platform Entities](/en/plugin/dev/apis/messages).
- Event listeners: Provides backward compatibility, but no longer provides `query: Query` object in context. For details, see [Pipeline Events](/en/plugin/dev/apis/pipeline-events).
- Command components: Now refactored. See [Command Components](/en/plugin/dev/components/command).

## Migrating from 2.x and 3.x Supported Synchronous Plugins

:::info
Plugin characteristics:
- Main time period: 2023.1 ~ 2024.2
- Registration method: Using `@on` decorators to register event listeners and `@func` decorators to register content functions (tools) in the plugin class in `main.py`; all handler functions are synchronous functions (def)
:::

- Synchronous to asynchronous: Plugin runtime has now changed to fully asynchronous (based on asyncio). Please change all plugin code involving IO operations to asynchronous writing.
- For detailed content, please refer to the above 3.x asynchronous plugin migration guide.