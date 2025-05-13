# Modify Dialogue Pipeline

The dialogue pipeline is the core processing flow of LangBot, which handles user messages and generates responses.

## Pipeline Structure

![pipeline](/assets/image/zh/deploy/bots/arch.png)

The pipeline consists of the following components:

1. **Trigger**: Determines whether to process a message
2. **Moderation**: Filters and processes messages before sending to the model
3. **AI**: Sends the message to the LLM and receives a response
4. **Output**: Processes the model's response before sending it back to the user

## Configuration Methods

### Method 1: Configure via WebUI

After deploying LangBot, access the WebUI at `http://your-server-ip:5300` and configure the pipeline in the "Pipeline" section.

### Method 2: Configure via Configuration File

Edit the `data/config.yaml` file and modify the `pipelines` section:

```yaml
pipelines:
  - id: default
    components:
      - id: trigger
        type: trigger
        config:
          # Trigger configuration
      - id: moderation
        type: moderation
        config:
          # Moderation configuration
      - id: ai
        type: ai
        config:
          # AI configuration
      - id: output
        type: output
        config:
          # Output configuration
```

## Component Configuration

### Trigger Component

The trigger component determines whether a message should be processed by the pipeline.

```yaml
- id: trigger
  type: trigger
  config:
    # Whether to respond to messages that start with a command prefix
    command_prefix: true
    # Command prefixes (characters that trigger the bot)
    command_prefixes:
      - "!"
      - "！"
    # Whether to respond to messages that mention the bot
    at: true
    # Whether to respond to private messages
    private: true
    # Whether to respond to group messages without being triggered by command prefix or mention
    group_chat: false
```

### Moderation Component

The moderation component filters and processes messages before sending them to the model.

```yaml
- id: moderation
  type: moderation
  config:
    # Whether to enable sensitive word filtering
    sensitive_word_filter: true
    # Whether to enable rate limiting
    rate_limit: true
    # Rate limit configuration
    rate_limit_config:
      # Number of messages allowed per time period
      count: 10
      # Time period in seconds
      period: 60
    # Whether to enable context management
    context: true
    # Context configuration
    context_config:
      # Maximum number of messages to include in the context
      max_count: 10
      # Maximum context length in tokens
      max_tokens: 4000
```

### AI Component

The AI component sends the message to the LLM and receives a response.

```yaml
- id: ai
  type: ai
  config:
    # System prompt
    system_prompt: "You are LangBot, a helpful assistant."
    # Whether to enable function calling
    function_call: true
    # Whether to enable streaming responses
    stream: true
```

### Output Component

The output component processes the model's response before sending it back to the user.

```yaml
- id: output
  type: output
  config:
    # Whether to enable message splitting for long responses
    split: true
    # Maximum length of a single message
    max_length: 1000
```

## Multiple Pipelines

You can configure multiple pipelines for different scenarios:

```yaml
pipelines:
  - id: default
    # Default pipeline configuration
  - id: image-generation
    # Pipeline for image generation
  - id: code-assistant
    # Pipeline for code assistance
```

To switch between pipelines, use the following command:

```
!pipeline use image-generation
```
