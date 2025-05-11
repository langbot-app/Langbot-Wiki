# 接入 PPIO 派欧云 API

1. 修改`data/config/provider.json`

在部署完成 LangBot 后，打开 LangBot 根目录下的`data/config/provider.json`

在`keys`中找到`ppio`，填入密钥，获取地址：https://ppinfra.com/settings/key-management

例如你的密钥为`sk_lA8Ra66Ed0s8Yu9mMw53sj45nNVkFHA-ALeewmqkmd0`，则写为：

![PPIO 设置](/assets/image/ppio_provider.png)

例如要使用模型为`deepseek/deepseek-r1-turbo`，则下面模型设置为

![PPIO 设置](/assets/image/ppio_provider2.png)

2. 修改`data/metadata/llm-models.json`

例如要使用模型为`deepseek/deepseek-r1-turbo`

![PPIO 设置](/assets/image/ppio_llm-models.png)

