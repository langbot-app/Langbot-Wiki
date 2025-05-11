# LangBot Command Details

> Parameters enclosed in `<>` are required; do not include `<>` when using them.  
> Parameters enclosed in `[]` are optional; do not include `[]` when using them.

Below is the default permission classification, which can be modified based on the command permission control described later.

> Only a brief list of commands is provided here. For specific usage, please use the `!cmd` command to view details.

## User-Level Commands

Available to any user.

```
!help                          Display custom help information (can be modified in the configuration file)
!cmd  [command name]           Display the command list or detailed information of a specified command
!list [page number]            List the historical session records of the current user
!del  <record number>          Delete the specified historical record; the record number can be viewed via !list
!del all                       Delete all historical records of the current session user
!last                          Switch to the previous session
!next                          Switch to the next session
!reset                         Reset the current session
!prompt                        View all records of the current session
!version                       Check the current version and check for updates
!resend                        Roll back the previous request
!plugin                        For usage, please refer to the `Management` section on the plugin introduction page
!default                       View available scenario presets
```

## Administrator Commands

Only available when an administrator privately chats with the bot. Administrators must first be set in `data/config/system.json`.

```
!update                              Perform automatic program updates
!default set <scenario preset name>  Set the default scenario preset for !reset
!ollama [show|pull|del] [model name] Display, pull, or delete Ollama model data
!model [show|set] [model name]       Display or set the currently used model
```

## Command Permission Control

You can edit `data/config/command.json` to set the permission level for command nodes. When a command is initiated, if the user's permission level (administrator is `2`, regular user is `1`) is greater than or equal to the command node's permission level, the command can be successfully executed. For specific configuration methods, please refer to the configuration file details page.