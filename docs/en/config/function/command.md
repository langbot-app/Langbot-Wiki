# command.json Configuration

:::info Table of Contents
[[toc]]
:::

The `data/config/command.json` file is used to configure command-related settings.

## Command Privilege

Set the privilege configuration for each command.

The privilege level for regular users is 1, while the privilege level for administrators (set in `system.json`) is 2.

Here, you can set the minimum privilege level for each command. If set to 1, both users and administrators can use the command. If set to 2, only administrators can use the command.

Subcommands need to be specified with a dot separator, such as `"plugin.on"`. Example:

```json
{
    "plugin": 1, 
    "plugin.on": 2 
}
```

This means the minimum privilege level for the `plugin` command is 1, and the minimum privilege level for the `plugin.on` command is 2. Each command has a default privilege level.

If not set, the default level will be used. The default privilege level for each command class is defined in `pkg/command/operators`.

## Command Prefix

Set the command prefix. It is configured as an array, and the program will treat messages that match the prefix as commands (in group chats, they must also comply with group response rules).

The following example sets the command prefix to `!`, `！`, and `#`:

```json
"command-prefix": [
    "!",
    "！",
    "#"
]
```