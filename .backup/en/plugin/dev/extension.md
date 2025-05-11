# Component Extension

> Please read the [Plugin Introduction Page](/plugin/plugin-intro) first.

:::info Table of Contents
[[toc]]
:::

Plugins wrapped in subclasses of `BasePlugin` can only listen to predefined events, whereas component extensions can replace entire components, enabling more powerful functionality.

- Component extensions do not need to be wrapped in a subclass of `BasePlugin` and can be placed in any module within the plugin directory.
- Extended components are not controlled by the plugin's on/off switch.
- Extended components are typically selected via options in the configuration file.

## Extendable Components

![Component Extension Diagram](/assets/image/develop_comp_arch_1.png)

To extend a component, create a new class that inherits from the component's base class, then use the corresponding decorator on the class, and configure the component to use this implementation based on the usage method.

Most components contain an `ap: pkg.core.app.Application` object, which can be used to interact with various parts of the entire program.  
Most components support implementing the `async def initialize(self)` method for asynchronous initialization when the component is loaded.  
The `ap` object includes manager objects for various configuration files, which can be used to access these configurations.

### Command

Add a new command.

- Base Class: `pkg.command.operator.CommandOperator`
- Decorator: `pkg.command.operator.operator_class(name: str, help: str="", usage: str=None, alias: list[str]=[], privilege: int=1, parent_class: typing.Type[CommandOperator] = None)`
- Reference Implementation: `pkg.command.operators/`
- Usage: After successful loading, execute the command `!cmd` to view all commands and their help information.

### Content Filter

Add a new content processor that determines whether to continue processing before and after handling a message.

- Base Class: `pkg.pipeline.cntfilter.filter.ContentFilter`
- Decorator: `pkg.pipeline.cntfilter.filter.filter_class(name: str)`
- Reference Implementation: `pkg.pipeline.cntfilter.filters/`
- Usage: After successful loading, the `process` method of the content filter will be called at the declared inspection stage for each filter implementation.

### Long Message Handling Strategy

Add a new long message handling strategy. Examples include components that convert text to merged forwarded messages or text to images.

- Base Class: `pkg.pipeline.longtext.strategy.LongTextStrategy`
- Decorator: `pkg.pipeline.longtext.strategy.strategy_class(name: str)`
- Reference Implementation: `pkg.pipeline.longtext.strategies/`
- Usage: Set the `strategy` field in the `long-text-strategy` section of `data/config/platform.json` to the name of the newly added strategy.

### Conversation Rate Limiting Algorithm

Add a new conversation rate limiting algorithm. The rate limiting algorithm implementation class methods are called when a conversation request enters and exits, allowing the implementation class to control waiting or dropping requests.

- Base Class: `pkg.pipeline.ratelimit.algo.RateLimitAlgo`
- Decorator: `pkg.pipeline.ratelimit.algo.algo_class(name: str)`
- Reference Implementation: `pkg.pipeline.ratelimit.algos/`
- Usage: Set the `algo` field in the `rate-limit` section of `data/config/pipeline.json` to the name of the newly added algorithm.

### LLM Interface Requester

Add a new LLM interface requester, such as integrating the ChatGLM interface.

- Base Class: `pkg.provider.modelmgr.api.LLMAPIRequester`
- Decorator: `pkg.provider.modelmgr.api.api_requester_class(name: str)`
- Reference Implementation: `pkg.provider.modelmgr.apis/`
- Usage: Add a model in `data/metadata/llm-models.json` and set the `requester` field of the model to the name of the newly added requester. For details, refer to the metadata configuration section.

### Prompt Loader

Add a new Prompt loader.

- Base Class: `pkg.provider.sysprompt.loader.PromptLoader`
- Decorator: `pkg.provider.sysprompt.loader.loader_class(name: str)`
- Reference Implementation: `pkg.provider.sysprompt.loaders/`
- Usage: Set the `prompt-mode` field in `data/config/provider.json` to the name of the newly added loader.

### Message Platform Adapter

Add a new message platform adapter, such as integrating WhatsApp or Discord.

- Base Class: `pkg.platform.adapter.MessageSourceAdapter`
- Decorator: `pkg.platform.adapter.adapter_class(name: str)`
- Reference Implementation: `pkg.platform.adapters/`
- Usage: The configuration information in the `platform-adapters` section of `data/config/platform.json` will automatically look up the corresponding adapter implementation based on the `adapter` name during initialization and pass the configuration to the adapter for initialization. Message platform adapters are complex to implement, so it is recommended to refer to existing implementations.

### Conversation History Message Truncator

Add a new conversation history message truncator that truncates historical messages before sending them to the model.

- Base Class: `pkg.pipeline.msgtrun.truncator.Truncator`
- Decorator: `pkg.pipeline.msgtrun.truncator.truncator_class(name: str)`
- Reference Implementation: `pkg.pipeline.msgtrun.truncators/`
- Usage: Set the `method` field in the `msg-truncate` section of `data/config/pipeline.json` to the name of the newly added truncator.

### Chat Request Runner

Add a new chat message runner. The default is local-agent, which provides basic Prompt composition, Agent orchestration, and multi-turn requests. If you need to integrate a knowledge base or local RAG, implement it here.

- Base Class: `pkg.provider.runner.RequesterRunner`
- Decorator: `pkg.provider.runner.runner_class(name: str)`
- Reference Implementation: `pkg.provider.runners/`
- Usage: Set the `runner` field in the `runner` section of `data/config/provider.json` to the name of the newly added runner.