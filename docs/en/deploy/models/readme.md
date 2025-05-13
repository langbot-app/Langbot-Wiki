# Configure Dialogue Models

LangBot supports multiple model providers, including OpenAI, Anthropic, Moonshot, Baichuan, and more.

## Configuration Methods

### Method 1: Configure via WebUI

After deploying LangBot, access the WebUI at `http://your-server-ip:5300` and configure the models in the "Models" section.

### Method 2: Configure via Configuration File

Edit the `data/config.yaml` file and add your model configuration under the `providers` section:

```yaml
providers:
  - id: openai
    type: openai
    config:
      api_key: "your-api-key"
      base_url: "https://api.openai.com/v1"
      models:
        - gpt-3.5-turbo
        - gpt-4
        - gpt-4-turbo
```

## Supported Providers

### OpenAI

```yaml
providers:
  - id: openai
    type: openai
    config:
      api_key: "your-api-key"
      base_url: "https://api.openai.com/v1"
      models:
        - gpt-3.5-turbo
        - gpt-4
        - gpt-4-turbo
```

### Anthropic

```yaml
providers:
  - id: anthropic
    type: anthropic
    config:
      api_key: "your-api-key"
      models:
        - claude-3-opus-20240229
        - claude-3-sonnet-20240229
        - claude-3-haiku-20240307
```

### Moonshot

```yaml
providers:
  - id: moonshot
    type: openai
    config:
      api_key: "your-api-key"
      base_url: "https://api.moonshot.cn/v1"
      models:
        - moonshot-v1-8k
        - moonshot-v1-32k
        - moonshot-v1-128k
```

### OneAPI

```yaml
providers:
  - id: oneapi
    type: openai
    config:
      api_key: "your-api-key"
      base_url: "https://your-oneapi-url/v1"
      models:
        - gpt-3.5-turbo
        - gpt-4
        - claude-3-opus-20240229
```

## Default Model Configuration

You can set the default model in the `data/config.yaml` file:

```yaml
system:
  default_provider: openai
  default_model: gpt-3.5-turbo
```

## Testing Your Configuration

After configuring your models, you can test them by sending a message to your bot:

```
!model list
```

This command will list all available models.

To switch to a specific model:

```
!model use gpt-4
```
