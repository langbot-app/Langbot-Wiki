# Adding Components

Plugins consist of one or more components that provide different functionalities to LangBot. Currently supported component types include:

- Event Listeners (EventListener): Listen to events during pipeline execution and modify context or pipelines.
- Commands (Command): Triggered by user command messages starting with `!` (or other configured prefixes).
- Tools (Tool): Called by LLMs during execution of LangBot's built-in Local Agent.

## Adding Components

Execute the command in the plugin directory:

```bash
lbp comp <component_type>
```

For example, to add an event listener:

```bash
lbp comp EventListener
```

Follow the prompts to enter the component configuration (if any).

```bash
➜  HelloPlugin > lbp comp EventListener
Generating component EventListener...
Component EventListener generated successfully.
组件 EventListener 生成成功。
➜  HelloPlugin >
```

:::info
The CLI will generate a `components` directory in the plugin directory and create corresponding component directories within it.

```
.
├── assets
│   └── icon.svg
├── components
│   ├── __init__.py
│   └── event_listener
│       ├── __init__.py
│       ├── default.py
│       └── default.yaml
├── main.py
├── manifest.yaml
├── README.md
└── requirements.txt
```

At the same time, component discovery configuration will be added to the plugin's `manifest.yaml`:

```yaml
...
components:
    EventListener:
      fromDirs:
      - path: components/event_listener/
...
```
To remove components, you can delete the corresponding information manually.
:::

## Component Types

For detailed usage of each component, please refer to:

- [EventListener](./event-listener.md)
- [Command](./command.md)
- [Tool](./tool.md)