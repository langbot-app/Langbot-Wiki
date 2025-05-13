# Dialogue Commands

LangBot provides various commands that can be used during conversations to control the bot's behavior.

## Command Prefix

Commands start with a prefix, which by default is `!` or `！`. You can configure the command prefixes in the `data/config.yaml` file:

```yaml
trigger:
  command_prefixes:
    - "!"
    - "！"
```

## Available Commands

### Help Command

```
!help
```

Displays a list of available commands.

### Model Commands

```
!model list
```

Lists all available models.

```
!model use <model_name>
```

Switches to the specified model.

```
!model info
```

Displays information about the current model.

### Context Commands

```
!context clear
```

Clears the current conversation context.

```
!context show
```

Displays the current conversation context.

```
!context length
```

Shows the length of the current context in tokens.

### Pipeline Commands

```
!pipeline list
```

Lists all available pipelines.

```
!pipeline use <pipeline_id>
```

Switches to the specified pipeline.

```
!pipeline info
```

Displays information about the current pipeline.

### System Commands

```
!system info
```

Displays system information, including version, uptime, and memory usage.

```
!system reload
```

Reloads the system configuration.

### Plugin Commands

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

### Preset Commands

```
!preset list
```

Lists all available presets.

```
!preset use <preset_id>
```

Switches to the specified preset.

```
!preset info
```

Displays information about the current preset.

## Command Permissions

You can configure command permissions in the `data/config.yaml` file:

```yaml
command:
  permissions:
    - command: "system reload"
      roles:
        - admin
    - command: "plugin *"
      roles:
        - admin
```

## Custom Commands

Plugins can register custom commands. Check the plugin documentation for available commands.
