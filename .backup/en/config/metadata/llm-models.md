# llm-models.json Metadata

`data/metadata/llm-models.json` is a list of supported large language models. This file specifies the models that can be used in the `model` list within `data/config/provider.json`, and it defines the corresponding `Key Manager` and `API Requester` for each model.

## Format

```json
{
    "list": [
        {
            "name": "default",
            "requester": "openai-chat-completions",
            "token_mgr": "openai",
            "tool_call_supported": false,
            "vision_supported": false
        },
        {
            "name": "gpt-3.5-turbo",
            "tool_call_supported": true
        },
        {
            "name": "gpt-4o",
            "tool_call_supported": true,
            "vision_supported": true
        }
    ]
}
```

The models are listed in the `list` array, and each model has the following fields:

- `name`: The name of the model, used to specify the model in the `model` list within `data/config/provider.json`.
- `model_name`: The model name used when making requests, used to distinguish between the same model using different requesters. If not set, the `name` field will be used.
- `requester`: The name of the requester, specifying which requester to use to get responses from this model. Different requesters correspond to different API formats.
    - For supported requesters, please refer to the `requester` field in the `provider.json` configuration file.
    - To implement a new requester, you need to write a plugin. Please refer to the `Component Extension` section in the plugin development documentation.
- `token_mgr`: The Key Manager, specifying the key group used by this model, corresponding to the `keys` list in `data/config/provider.json`.
- `tool_call_supported`: Whether the model supports tool calls, indicating if the model can use `content functions`.
- `vision_supported`: Whether the model supports image input, indicating if the model can use `image input`.

The `default` model is mandatory and serves as the default configuration for models. Other models do not need to set all fields; only the `name` field is required, and other fields will inherit the configuration from the `default` model.

## Automatic Update Mechanism

Every time LangBot starts, the program automatically fetches the latest model list from the central server. The `name` field in the local `llm-models.json` is compared with the model list returned by the central server. If a model does not exist locally, it will be added. If it already exists locally, it will be overwritten by the remote version.

## Custom Models

You can add custom models by following the format described above.

- If you need to use an interface (requester) that is currently not supported, you will need to extend the requester yourself. Please refer to the plugin development documentation -> Component Extension.
- You can add your own key groups in the `keys` list within `data/config/provider.json`.
- It is not recommended to modify the default model configuration, as it will be overwritten by the automatically updated information upon startup.