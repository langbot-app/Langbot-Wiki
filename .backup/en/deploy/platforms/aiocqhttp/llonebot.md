# Deploying the Message Platform LiteLoaderQQNT

# LiteLoaderQQNT

- [LiteLoaderQQNT's OneBot API Plugin](https://github.com/LLOneBot/LLOneBot) injects into the QQ client and converts it to the OneBot 11 protocol.

Tutorial for installing LiteLoaderQQNT: https://llonebot.github.io/zh-CN/guide/getting-started

![image-20240515185909108](/assets/image/llob_cfg.png)

Ensure that the IP address in the URL is the address of the host running LangBot (use 127.0.0.1 if running on the same network), the port must match the port that the aiocqhttp adapter in the LangBot message platform configuration is listening on, and the suffix must be `/ws`:

Next, please read [Filling in Configuration Information](/deploy/quick-config/config).