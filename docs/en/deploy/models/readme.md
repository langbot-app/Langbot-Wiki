# Configure Models (Models)

Models will be used by pipelines to process messages. The first model you configure will be set as the model for the default pipeline.

![arch](/assets/image/zh/deploy/models/arch.png)

You can add multiple models, and then select which model to use in the pipeline.

![Model Configuration](/assets/image/zh/deploy/models/model_config.png)

Enter these four parameters: `Model Name`, `Model Provider`, `Request URL`, and `API Key`, then submit.

For model capabilities, please choose according to the specific model characteristics:

- Visual Capability: Needs to be enabled to recognize images

- Function Calling: Needs to be enabled to use Agent tools in conversations

:::info

*If you don't have an API Key, you can [get one from this relay station](https://api.qhaigc.net/)*

If you need to use third-party API relays or other model providers,

Select `OpenAI`

Fill in the relay's Base URL for the Request URL, for example:

![Model Configuration](/assets/image/zh/deploy/models/other_provider.png)

:::
