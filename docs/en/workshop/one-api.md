# Integrating OneAPI, LinkAI, and Other Third-Party OpenAI-Compatible APIs into LangBot

::: info 
Reposted from: [https://rockchin.top/?p=295](https://rockchin.top/?p=295)
:::

Since the rise of OneAPI, various "ghosts and goblins" models can now be accessed in OpenAI's format. Additionally, relay stations have become popular, and OpenAI's format has become the standard access format for AI App platforms and other AI tools. This article explains how to integrate the aforementioned OpenAI-compatible APIs into LangBot.

First, follow the LangBot documentation to deploy the messaging platform and the LangBot main program, and connect them. When you reach the step of configuring `provider.json`, refer to this document.

From here on, we will not distinguish between LinkAI, OneAPI, or relay stations, and will uniformly refer to them as OneAPI interfaces, representing third-party OpenAI-compatible interfaces.

## Obtaining the OneAPI Interface Address and Access Key

::: warning 
If you have deployed OneAPI yourself, you need to set up the channels first. Please refer to the OneAPI documentation for details. After configuration, you can obtain the key.
:::

Taking OneAPI as an example, if you have deployed OneAPI locally using port 8080, the interface address would be `http://127.0.0.1:8080/v1`.

For others, please refer to their documentation or consult the relay station administrator. In general, the address usually needs to be suffixed with `/v1`.

For the access key, using OneAPI as an example, go to the "Tokens" page and create a new key.

![Obtaining the OneAPI Interface Address and Access Key](/assets/image/one-api-01.png)

![Obtaining the OneAPI Access Key](/assets/image/one-api-02.png)

Return to the Tokens page and click "Copy" to obtain the API key.

For other relay stations, please refer to their documentation or consult the administrator.

## Filling in the LangBot Configuration File

Modify the `provider` configuration in `data/config/provider.json` to use the `openai-chat-completions` requester:

![Filling in the LangBot Configuration File](/assets/image/one-api-03.png)

Fill in the address you just obtained in the `base-url` field as shown in the image. In this example, it is my OneAPI station (for personal use).

Next, fill in the key you just obtained in the `keys` section under `openai`:

![Filling in the LangBot Configuration File](/assets/image/one-api-04.png)

Please ensure it complies with JSON syntax.

Finally, configure the model to be used by filling in the model name provided by your OneAPI.

![Filling in the LangBot Configuration File](/assets/image/one-api-05.png)

Note that some available model names are already preset in the metadata file `data/metadata/llm-models.json`. If the model you are using does not have corresponding metadata, you will need to add it yourself.

## Adding Models Not in the Preset

Check all elements in the `list` field of `data/metadata/llm-models.json`. If no element's `name` matches the model name you want to use, or if the corresponding `requester` or `token_mgr` is not `openai-chat-completions` or `openai`, you will need to add it.

Refer to the metadata configuration. In this example, we add a model with `requester` set to `openai-chat-completions` and `token_mgr` set to `openai`, for example:

```json
    {
        "name": "qwen",
        "requester": "openai-chat-completions",
        "token_mgr": "openai",
        "tool_call_supported": false,
        "vision_supported": false
    },
```

`name` is your model name, corresponding to the model name provided by OneAPI, and matches the value filled in the `model` field above.

`tool_call_supported`: Whether the model supports tool usage, set according to the actual model capabilities.

`vision_supported`: Whether the model supports vision, set according to the actual model capabilities.