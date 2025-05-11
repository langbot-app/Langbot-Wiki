# 在 LangBot 上使用 Dify

[Dify](https://dify.ai) 是一款开源的大语言模型(LLM) 应用开发平台。它融合了后端即服务（Backend as Service）和 LLMOps 的理念，使开发者可以快速搭建生产级的生成式 AI 应用。  
Dify 可以创建聊天助手（含高级编排）、Agent、文本生成应用、工作流等应用。

LangBot 目前支持`聊天助手`、`Agent`、`工作流`三种 Dify 应用类型。

## 在 Dify 上创建应用

请根据 [Dify文档](https://docs.dify.ai) 部署dify并创建你的应用。  

发布应用后，在应用的 `访问API` 页面，生成 API 密钥。

![Dify 应用 API 密钥](/assets/image/dify_sv_api_01.png)

保存 API 服务器和 API 密钥，在 LangBot 的 `provider.json` 文件中配置。

## 配置 LangBot

参考 [Dify Service API 配置](../config/function/provider#dify-service-api-%E9%85%8D%E7%BD%AE-dify-service-api) 文档，配置 LangBot 的 `provider.json` 文件。
