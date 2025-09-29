# 在 LangBot 上使用 TBox（蚂蚁百宝箱）

[TBox（百宝箱）](https://tbox.cn/)是蚂蚁集团推出的面向 AI 开发者的一站式智能体应用开发平台。在平台上，无论您是否拥有编程基础，都可以通过自然语言，基于各种大模型搭建属于您自己的智能体应用，并将其发布到支付宝小程序、web 服务、浏览器插件等生态渠道。

LangBot 支持接入 TBox 上编排好的智能体，用作流水线 Runner。

在 TBox 上搭建好智能体后，请到[`开放平台`](https://www.tbox.cn/open/authorized-management)创建 API Key：

![TBox API Key](/assets/image/zh/deploy/pipelines/tbox/create_api_key.png)

并在 TBox 的智能体编排页面找到该应用的 AppID：

![TBox AppID](/assets/image/zh/deploy/pipelines/tbox/find_appid.png)

接着回到 LangBot 流水线设置中，切到`AI 能力`配置页面，选择`蚂蚁百宝箱平台 API` 作为运行器：

![TBox API Key](/assets/image/zh/deploy/pipelines/tbox/tbox_runner.png)

现在即可使用 TBox 上的智能体了。