# command.json 配置项

:::info 目录
[[toc]]
:::

`data/config/command.json` 中配置命令相关的配置项。

## 命令权限 privilege

设置每个命令的权限配置

普通用户权限级别为 1，管理员（`system.json`中设置的）权限级别为 2。 

在这里设置每个命令的最低权限级别，若设置为1，则用户和管理员均可用，若为2，则仅管理员可用

 需要设置子命令，以点号间隔，如`"plugin.on"` 示例：

```json
{
    "plugin": 1, 
    "plugin.on": 2 
}
```

 意思是 plugin 命令的最低权限级别为 1，plugin.on 命令的最低权限级别为 2。 每个命令都有默认的权限级别

若不设置，则使用默认的级别。在`pkg/command/operators`里每个命令类有默认的权限级别

## 命令前缀 command-prefix

设置命令前缀。以数组形式设置，程序将前缀符合设置的消息视为命令（群内需要符合群响应规则）。

如下示例将设置命令前缀为`!`、`！`、`#`：

```json
"command-prefix": [
    "!",
    "！",
    "#"
]
```