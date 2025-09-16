# 添加组件

插件由一种或多种组件构成，为 LangBot 提供不同的功能。目前支持的组件类型有：

- 事件监听器（EventListener）：监听流水线执行期间的事件，对上下文或流水线进行修改。
- 命令（Command）：由用户通过`!`（或其他已设置的前缀）开头的命令消息触发。
- 工具（Tool）：供 LangBot 内置的 Local Agent 在执行期间由 LLM 调用。

## 添加组件

在插件目录下执行命令：

```bash
lbp comp <component_type>
```

例如，添加一个事件监听器：

```bash
lbp comp EventListener
```

请根据提示输入组件的配置（若有）。

```bash
➜  HelloPlugin > lbp comp EventListener
Generating component EventListener...
Component EventListener generated successfully.
组件 EventListener 生成成功。
➜  HelloPlugin >
```

:::info
CLI 将在插件目录下生成一个 `components` 目录，并在其中创建组件对应目录

```
.
├── assets
│   └── icon.svg
├── components
│   ├── __init__.py
│   └── event_listener
│       ├── __init__.py
│       ├── default.py
│       └── default.yaml
├── main.py
├── manifest.yaml
├── README.md
└── requirements.txt
```

同时，会在插件的`manifest.yaml`中添加组件发现配置：

```yaml
...
components:
    EventListener:
      fromDirs:
      - path: components/event_listener/
...
```
如需删除组件，可自行删除对应信息。
:::


## 组件类型

各个组件的详细使用方式请参考：

- [EventListener](./event-listener.md)
- [Command](./command.md)
- [Tool](./tool.md)