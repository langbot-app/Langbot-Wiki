# 组件扩展

::: warning
2025年3月～4月：我们正在进行 4.0 版本重构，组件定义变化较大，现阶段不建议使用组件扩展。请优先考虑使用基于事件的插件接口。
:::

> 请先阅读[插件介绍页](/plugin/plugin-intro)  

:::info 目录
[[toc]]
:::

普通的以 `BasePlugin` 子类包装的插件只能监听预定事件，而组件扩展则可以替换整个组件，实现更强大的功能扩展。

- 组件扩展不需要包装在 `BasePlugin` 子类中，可以放在插件目录下任意一个模块中
- 扩展的组件不受插件开关控制
- 扩展的组件通常由配置文件中的选项选用

## 可扩展的组件

![组件扩展图](/assets/image/zh/plugin/dev/develop_comp_arch_1.png)

扩展一个组件的方法，新建一个类，继承于组件的基类，然后在类上使用对应的装饰器，再根据使用方式来配置使用该实现的组件。

大部分组件中包含了`ap: pkg.core.app.Application`对象，可以用这个对象来与整个程序的各个部分进行交互。  
大部分组件支持实现`async def initialize(self)`方法，用于在组件加载时进行异步初始化。  
`ap`对象中包含了各个配置文件的管理器对象，可以用于访问各个配置文件。

### 命令

新增一个命令。

- 基类：`pkg.command.operator.CommandOperator`
- 装饰器：`pkg.command.operator.operator_class(name: str, help: str="", usage: str=None, alias: list[str]=[], privilege: int=1, parent_class: typing.Type[CommandOperator] = None)`
- 参考实现：`pkg.command.operators/`
- 使用方式：加载成功后，执行命令`!cmd`可查看所有命令和命令帮助信息。

### 内容过滤器

新增一个在处理消息前后判断是否要继续的内容处理器。

- 基类：`pkg.pipeline.cntfilter.filter.ContentFilter`
- 装饰器：`pkg.pipeline.cntfilter.filter.filter_class(name: str)`
- 参考实现：`pkg.pipeline.cntfilter.filters/`
- 使用方式：加载成功后，每次都会在过滤器实现声明的检查阶段调用内容过滤器的`process`方法。

### 长消息处理策略

新增一个长消息处理策略。类似：文本转合并转发消息组件、文本转图片。

- 基类：`pkg.pipeline.longtext.strategy.LongTextStrategy`
- 装饰器：`pkg.pipeline.longtext.strategy.strategy_class(name: str)`
- 参考实现：`pkg.pipeline.longtext.strategies/`
- 使用方式：需要在 `data/config/platform.json` 的 `long-text-strategy` 字段中将 `strategy` 设置为新增的策略名称。

### 会话限速算法

新增一个会话限速算法。会话请求在进入和退出时均会调用限速算法实现类的方法，实现类可以控制等待或丢弃请求。

- 基类：`pkg.pipeline.ratelimit.algo.RateLimitAlgo`
- 装饰器：`pkg.pipeline.ratelimit.algo.algo_class(name: str)`
- 参考实现：`pkg.pipeline.ratelimit.algos/`
- 使用方式：需要在 `data/config/pipeline.json` 的 `rate-limit` 字段中将 `algo` 设置为新增的算法名称。

### LLM 接口请求器

新增一个 LLM 接口请求器，例如：接入ChatGLM接口等。

- 基类：`pkg.provider.modelmgr.api.LLMAPIRequester`
- 装饰器：`pkg.provider.modelmgr.api.api_requester_class(name: str)`
- 参考实现：`pkg.provider.modelmgr.apis/`
- 使用方式：需要在`data/metadata/llm-models.json`中添加模型，将模型的`requester`字段设置为新增的请求器名称。具体请查看元数据配置板块。

### Prompt 加载器

新增一个 Prompt 加载器。

- 基类：`pkg.provider.sysprompt.loader.PromptLoader`
- 装饰器：`pkg.provider.sysprompt.loader.loader_class(name: str)`
- 参考实现：`pkg.provider.sysprompt.loaders/`
- 使用方式：需要在`data/config/provider.json`将`prompt-mode`设置为新增的加载器名称。

### 消息平台适配器

新增一个消息平台适配器，例如：接入 WhatsApp、Discord 等。

- 基类：`pkg.platform.adapter.MessageSourceAdapter`
- 装饰器：`pkg.platform.adapter.adapter_class(name: str)`
- 参考实现：`pkg.platform.adapters/`
- 使用方式：`data/config/platform.json`的`platform-adapters`中各个配置信息，将在初始化时自动根据`adapter`名称查找对应的适配器实现，并将配置传递给适配器以进行初始化。消息平台适配器实现复杂，建议多参考现有的实现。

### 对话历史消息截断器

新增一个对话历史消息截断器，在发送到模型之前对历史消息进行截断。

- 基类：`pkg.pipeline.msgtrun.truncator.Truncator`
- 装饰器：`pkg.pipeline.msgtrun.truncator.truncator_class(name: str)`
- 参考实现：`pkg.pipeline.msgtrun.truncators/`
- 使用方式：需要在`data/config/pipeline.json`的`msg-truncate`字段中设置需要使用的截断器`method`为新增的截断器名称。

### Chat 请求运行器

新增一个聊天消息运行器，默认的是 local-agent，提供了基本的 Prompt 组合、Agent 编排、多轮请求等功能。如果需要接入知识库或者本地 RAG，请在这里实现。

- 基类：`pkg.provider.runner.RequesterRunner`
- 装饰器：`pkg.provider.runner.runner_class(name: str)`
- 参考实现：`pkg.provider.runners/`
- 使用方式：需要在`data/config/provider.json`的`runner`字段中设置需要使用的运行器`runner`为新增的运行器名称。