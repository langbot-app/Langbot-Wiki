# Command Details

> Parameters in `<>` are required, do not include `<>` when using  
> Parameters in `[]` are optional, do not include `[]` when using
> Here we only list the commands briefly, for detailed usage please use the `!cmd` command

## Command List

Available to any object

```
!help                          Display custom help information (can be changed in the configuration file)
!cmd  [command name]           Display command list or detailed information for a specific command
!list [page number]            List the history sessions for this object
!del  <number>                 Delete the specified history record, you can view the number with !list
!del all                       Delete all history records for this session object
!last                         Switch to the previous session
!next                         Switch to the next session
!reset                        Reset the current session
!prompt                       View all records of the current session
!version                      Check the current version and check for updates
!resend                       Rollback the previous request
!plugin                       For usage, please see the `Management` section of the plugin introduction page
```

## Command Permission Control

You can [edit the system environment settings](/en/deploy/settings.md) to set permissions for command nodes. When a command is initiated, if the user's permission level (administrator is `2`, regular user is `1`) is greater than or equal to the command node's permission level, the command can be successfully executed.
