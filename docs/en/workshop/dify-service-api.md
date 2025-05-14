# How to Integrate with Dify?

This guide explains how to integrate LangBot with Dify, a powerful LLMOps platform that allows you to create and deploy AI applications.

## What is Dify?

[Dify](https://dify.ai) is an open-source LLMOps platform that helps you build, deploy, and monitor AI applications. It provides a user-friendly interface for creating AI applications without writing code, as well as APIs for integrating with other systems.

## Integration Methods

There are two ways to integrate LangBot with Dify:

1. **Service API**: Use Dify's Service API to access applications created in Dify
2. **Completion API**: Use Dify's Completion API as a model provider in LangBot

This guide focuses on the Service API integration, which is the recommended approach for most use cases.

## Prerequisites

Before you begin, you need:

1. A Dify account and a deployed application
2. The API key for your Dify application
3. LangBot version 4.0 or higher

## Step 1: Create a Dify Application

1. Sign up or log in to [Dify](https://dify.ai)
2. Create a new application or use an existing one
3. Configure your application with the desired model, prompt, and other settings
4. Deploy your application
5. Go to the API Reference section and copy your API key

## Step 2: Configure LangBot

### Method 1: Configure via WebUI

1. Access the LangBot WebUI at `http://your-server-ip:5300`
2. Navigate to the "Models" section
3. Click "Add Provider"
4. Select "Dify" as the provider type
5. Enter your Dify API key and application ID
6. Save the configuration

### Method 2: Configure via Configuration File

Edit the `data/config.yaml` file and add the Dify provider:

```yaml
providers:
  - id: dify
    type: dify
    config:
      api_key: "your-dify-api-key"
      application_id: "your-dify-application-id"
      base_url: "https://api.dify.ai/v1"  # Optional, defaults to Dify's official API endpoint
```

## Step 3: Test the Integration

Send a test message to your bot:

```
!model use dify
Hello, how are you?
```

The bot should respond using your Dify application.

## Advanced Configuration

### Using Multiple Dify Applications

You can configure multiple Dify applications in LangBot:

```yaml
providers:
  - id: dify-general
    type: dify
    config:
      api_key: "your-dify-api-key-1"
      application_id: "your-dify-application-id-1"
      
  - id: dify-specialized
    type: dify
    config:
      api_key: "your-dify-api-key-2"
      application_id: "your-dify-application-id-2"
```

### Configuring Input Variables

If your Dify application uses input variables, you can configure them in LangBot:

```yaml
providers:
  - id: dify
    type: dify
    config:
      api_key: "your-dify-api-key"
      application_id: "your-dify-application-id"
      input_variables:
        - name: "user_name"
          value: "{sender.name}"
        - name: "group_name"
          value: "{group.name}"
```

### Using Dify's File Capabilities

If your Dify application supports file inputs, you can configure LangBot to handle them:

```yaml
providers:
  - id: dify
    type: dify
    config:
      api_key: "your-dify-api-key"
      application_id: "your-dify-application-id"
      file_enabled: true
```

When file support is enabled, users can send files to the bot, and they will be forwarded to Dify:

```
!model use dify
[Attach a file]
Can you analyze this document?
```

## Troubleshooting

### Connection Issues

If you're having trouble connecting to Dify, check:

1. Your API key is correct
2. Your application ID is correct
3. Your Dify application is deployed and active
4. Your server can access the Dify API endpoint

### Response Format Issues

If the responses from Dify don't look right:

1. Check your Dify application's prompt configuration
2. Make sure your application is using the correct model
3. Verify that your application is configured for chat completion (not text completion)

### Rate Limiting

If you're hitting rate limits:

1. Check your Dify plan's rate limits
2. Consider implementing rate limiting in LangBot
3. Upgrade your Dify plan if necessary

## Example Use Cases

### Customer Support Bot

Create a Dify application for customer support, with knowledge of your products and services, and integrate it with LangBot to provide automated customer support in your messaging channels.

### Content Creation Assistant

Create a Dify application for content creation, with templates and guidelines for your brand, and integrate it with LangBot to help your team create content more efficiently.

### Data Analysis Bot

Create a Dify application for data analysis, with the ability to interpret and visualize data, and integrate it with LangBot to provide data insights on demand.

## Conclusion

Integrating LangBot with Dify allows you to leverage Dify's powerful LLMOps capabilities while using LangBot's messaging platform integrations. This combination provides a flexible and powerful solution for deploying AI applications across multiple messaging platforms.

For more information, check out the [Dify documentation](https://docs.dify.ai) and the [LangBot documentation](https://docs.langbot.app).
