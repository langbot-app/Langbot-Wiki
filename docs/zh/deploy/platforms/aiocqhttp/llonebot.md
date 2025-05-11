# 部署消息平台 LiteLoaderQQNT

# LiteLoaderQQNT

- [LiteLoaderQQNT 的 OneBot API 插件](https://github.com/LLOneBot/LLOneBot) 注入 QQ 客户端并将其转换为 OneBot 11 协议

安装LiteLoaderQQNT的教程：https://llonebot.github.io/zh-CN/guide/getting-started

![image-20240515185909108](/assets/image/llob_cfg.png)

确保地址中 IP地址 是 LangBot 运行的主机的地址（若在同一网络内运行则为 127.0.0.1），端口必须与 LangBot 消息平台配置中的 aiocqhttp 适配器监听的端口相同，后缀必须为`/ws`：

接下来请阅读[填写配置信息](/deploy/quick-config/config)。
