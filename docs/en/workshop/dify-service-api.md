# Using Dify on LangBot

[Dify](https://dify.ai) is an open-source large language model (LLM) application development platform. It combines the concepts of Backend as a Service (BaaS) and LLMOps, enabling developers to quickly build production-grade generative AI applications.  
Dify can create applications such as chat assistants (with advanced orchestration), Agents, text generation applications, workflows, and more.

LangBot currently supports three types of Dify applications: `Chat Assistant`, `Agent`, and `Workflow`.

## Creating an Application on Dify

Please refer to the [Dify documentation](https://docs.dify.ai) to deploy Dify and create your application.  

After publishing the application, generate an API key on the `Access API` page of the application.

![Dify Application API Key](/assets/image/dify_sv_api_01.png)

Save the API server and API key, and configure them in the `provider.json` file of LangBot.

## Configuring LangBot

Refer to the [Dify Service API Configuration](../config/function/provider#dify-service-api-configuration-dify-service-api) documentation to configure the `provider.json` file of LangBot.