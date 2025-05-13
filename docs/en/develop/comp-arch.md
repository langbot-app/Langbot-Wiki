# Component Architecture

This document describes the component architecture of LangBot, which is designed to be modular and extensible.

## Overview

LangBot is built around a component-based architecture that allows for easy extension and customization. The main components are:

1. **Bots**: Interface with messaging platforms
2. **Pipelines**: Process messages and generate responses
3. **Models**: Connect to LLM providers
4. **Plugins**: Extend functionality

![architecture](/assets/image/zh/deploy/bots/arch.png)

## Bots

Bots are responsible for connecting to messaging platforms and handling message events. Each bot implements a specific platform adapter that translates between the platform's API and LangBot's internal event system.

Key classes:
- `MessageSourceAdapter`: Base class for all platform adapters
- `EventConverter`: Converts platform-specific events to LangBot events
- `MessageConverter`: Converts platform-specific messages to LangBot messages

## Pipelines

Pipelines process messages through a series of components:

1. **Trigger**: Determines whether to process a message
2. **Moderation**: Filters and processes messages before sending to the model
3. **AI**: Sends the message to the LLM and receives a response
4. **Output**: Processes the model's response before sending it back to the user

Each component in the pipeline can be configured and customized.

## Models

The Models component manages connections to various LLM providers, such as OpenAI, Anthropic, and others. It provides a unified interface for sending requests to these providers and handling their responses.

Key classes:
- `ModelProvider`: Base class for all model providers
- `ModelRequest`: Represents a request to a model
- `ModelResponse`: Represents a response from a model

## Plugins

The plugin system allows for extending LangBot's functionality without modifying the core code. Plugins can:

- Register event handlers
- Add new commands
- Provide functions that can be called by the LLM
- Extend core components

Key concepts:
- `@handler`: Decorator for registering event handlers
- `@llm_func`: Decorator for registering functions that can be called by the LLM
- `APIHost`: Provides access to LangBot's API from plugins
- `manifest.yaml`: Configuration file for plugins

## Event System

LangBot uses an event-driven architecture where different components communicate through events. Events include:

- Message events (received, sent)
- Group events (joined, left, invited)
- System events (startup, shutdown)
- Custom events defined by plugins

## Configuration System

The configuration system uses a YAML-based approach with the main configuration file at `data/config.yaml`. The configuration is structured around the component architecture:

```yaml
bots:
  # Bot configurations
pipelines:
  # Pipeline configurations
providers:
  # Model provider configurations
plugins:
  # Plugin configurations
system:
  # System configurations
```

## Development Workflow

When developing for LangBot, follow these steps:

1. Understand the component you want to modify or extend
2. Create a plugin if you're adding new functionality
3. Implement the necessary classes and methods
4. Test your changes
5. Submit a pull request

For more detailed information on development, see the [Development Configuration](/en/develop/dev-config) page.
