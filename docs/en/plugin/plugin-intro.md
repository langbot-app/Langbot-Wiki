# Plugin Introduction

LangBot supports a powerful plugin system that allows you to extend its functionality. Plugins can add new commands, event handlers, and even integrate with external services.

## What Can Plugins Do?

Plugins can:

- Add new commands to the bot
- Handle and respond to various events (messages, group invitations, etc.)
- Integrate with external services and APIs
- Modify the behavior of the bot
- Add new functions that can be called by the LLM during conversations
- Extend the core components of LangBot

## Plugin Market

You can find and install plugins from the [LangBot Plugin Market](https://plugins.langbot.app).

## Installing Plugins

### Method 1: Install via WebUI

1. Access the WebUI at `http://your-server-ip:5300`
2. Navigate to the "Plugins" section
3. Click "Install Plugin"
4. Enter the plugin's GitHub repository URL or select from the featured plugins
5. Click "Install"

### Method 2: Manual Installation

1. Download or clone the plugin repository
2. Place the plugin files in the `data/plugins` directory
3. Restart LangBot or use the `!plugin reload` command

## Managing Plugins

You can manage plugins using the following commands:

```
!plugin list
```

Lists all installed plugins.

```
!plugin enable <plugin_id>
```

Enables the specified plugin.

```
!plugin disable <plugin_id>
```

Disables the specified plugin.

```
!plugin info <plugin_id>
```

Displays information about the specified plugin.

```
!plugin reload
```

Reloads all plugins.

## Popular Plugins

Here are some popular plugins for LangBot:

- **WebSearch**: Allows the bot to search the web and provide information
- **ImageGen**: Generates images using AI models like DALL-E or Stable Diffusion
- **Weather**: Provides weather information for specified locations
- **Translator**: Translates text between languages
- **Calculator**: Performs mathematical calculations
- **Schedule**: Schedules messages to be sent at specific times
- **GroupManager**: Provides group management features like welcome messages and anti-spam

## Developing Plugins

If you want to develop your own plugins, check out the [Plugin Development Tutorial](/en/plugin/dev/tutor).
