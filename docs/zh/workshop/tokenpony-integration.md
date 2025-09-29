# 接入来自小马算力的模型

![model](/assets/image/zh/workshop/tokenpony-integration/tokenpony-mainpage.png)

TokenPony（小马算力）提供统一的API，可以通过单一端点访问数百个AI模型，同时自动处理回退并选择最具成本效益的选项。在 LangBot 中已完美适配，可按照以下步骤添加来自小马算力的模型。

## 注册小马算力

点击[链接](https://www.tokenpony.cn/453z1)注册小马算力账号，完成后点击右上角账户按钮，点击`API Keys`

![api-keys](/assets/image/zh/workshop/tokenpony-integration/access-api-key-page.png)

生成并复制 API Key。

![api-keys](/assets/image/zh/workshop/tokenpony-integration/get-api-key.png)

## 使用聊天模型

在小马算力顶部进入[`模型`](https://www.tokenpony.cn/#/model)，即可查看可用的模型列表，并复制模型名称。

前往 LangBot 模型管理页，添加模型（选择小马算力提供商，填入模型名称和 API Key）：

![model](/assets/image/zh/workshop/tokenpony-integration/add-model.png)

现在即可在流水线中选择使用该模型。