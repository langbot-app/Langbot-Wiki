# 事件监听器

LangBot 的流水线在运行期间会产生一些事件，供插件 Hook 并处理。每个插件中只允许添加一个事件监听器(components/event_listener/default.yaml)，但在其中可以注册任意数量的事件。